const { query, memoryStore } = require('../config/database');

const getContactMessages = async (_req, res, next) => {
  try {
    const result = await query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    const messages = result.rows && result.rows.length > 0 ? result.rows : (memoryStore ? memoryStore.messages : []);
    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

const getContactMessageById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM contact_messages WHERE id = $1 OR reference_number = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Message non trouvé' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

const updateMessageStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, response } = req.body;
    const result = await query(
      'UPDATE contact_messages SET status = $1, response = COALESCE($2, response), is_read = true, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
      [status, response || null, id]
    );
    res.json({ success: true, data: result.rows[0] || { id, status, response } });
  } catch (error) {
    next(error);
  }
};

const sendContactMessage = async (req, res, next) => {
  try {
    const {
      sender_name,
      name,
      sender_email,
      email,
      sender_phone,
      phone,
      subject,
      message
    } = req.body;

    const contactName = sender_name || name;
    const contactEmail = sender_email || email;
    const contactPhone = sender_phone || phone;

    const countResult = await query('SELECT COUNT(*) as total FROM contact_messages');
    const count = parseInt(countResult.rows[0]?.total || '0', 10) + 1;
    const reference_number = `MSG-${String(count).padStart(3, '0')}`;

    let contactResult = await query(
      'SELECT id FROM contacts WHERE email = $1',
      [contactEmail]
    );

    let contactId;
    if (contactResult.rows.length === 0) {
      const newContact = await query(
        `INSERT INTO contacts 
        (full_name, email, phone, contact_type, total_messages, source) 
        VALUES ($1, $2, $3, 'prospect', 1, 'Site web') 
        RETURNING id`,
        [contactName, contactEmail, contactPhone || null]
      );
      contactId = newContact.rows[0]?.id;
    } else {
      contactId = contactResult.rows[0].id;
      await query(
        `UPDATE contacts 
        SET total_messages = total_messages + 1, 
            last_contact_at = CURRENT_TIMESTAMP,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1`,
        [contactId]
      );
    }

    const result = await query(
      `INSERT INTO contact_messages 
      (full_name, email, phone, subject, message, reference_number, status, is_read) 
      VALUES ($1, $2, $3, $4, $5, $6, 'nouveau', false) 
      RETURNING *`,
      [
        contactName,
        contactEmail,
        contactPhone || null,
        subject,
        message,
        reference_number
      ]
    );

    const contactMessage = result.rows[0] || {
      id: count,
      reference_number,
      full_name: contactName,
      email: contactEmail,
      subject,
      message,
      status: 'nouveau'
    };

    res.status(201).json({
      success: true,
      message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
      reference: reference_number,
      data: contactMessage
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContactMessages,
  getContactMessageById,
  updateMessageStatus,
  sendContactMessage
};
