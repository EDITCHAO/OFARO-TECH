const { query } = require('../config/database');

const sendContactMessage = async (req, res, next) => {
  try {
    const {
      sender_name,
      sender_email,
      sender_phone,
      subject,
      message
    } = req.body;

    const countResult = await query('SELECT COUNT(*) as total FROM contact_messages');
    const count = parseInt(countResult.rows[0].total, 10) + 1;
    const reference_number = `MSG-${String(count).padStart(3, '0')}`;

    let contactResult = await query(
      'SELECT id FROM contacts WHERE email = $1',
      [sender_email]
    );

    let contactId;
    if (contactResult.rows.length === 0) {
      const newContact = await query(
        `INSERT INTO contacts 
        (full_name, email, phone, contact_type, total_messages, source) 
        VALUES ($1, $2, $3, 'prospect', 1, 'Site web') 
        RETURNING id`,
        [sender_name, sender_email, sender_phone || null]
      );
      contactId = newContact.rows[0].id;
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
      (sender_name, sender_email, sender_phone, subject, message, reference_number, status) 
      VALUES ($1, $2, $3, $4, $5, $6, 'non_lu') 
      RETURNING *`,
      [
        sender_name,
        sender_email,
        sender_phone || null,
        subject,
        message,
        reference_number
      ]
    );

    const contactMessage = result.rows[0];

    await query(
      `INSERT INTO request_history 
      (entity_type, entity_id, reference_number, action, new_status, description) 
      VALUES ($1, $2, $3, 'created', 'non_lu', $4)`,
      [
        'contact_message',
        contactMessage.id,
        reference_number,
        `Nouveau message: ${subject}`
      ]
    );

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
  sendContactMessage
};
