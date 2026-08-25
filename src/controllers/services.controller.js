const { query } = require('../config/database');

const createServiceRequest = async (req, res, next) => {
  try {
    const {
      client_name,
      client_email,
      client_phone,
      company_name,
      service_type,
      description,
      urgency = 'normale',
      budget_range
    } = req.body;

    const countResult = await query('SELECT COUNT(*) as total FROM service_requests');
    const count = parseInt(countResult.rows[0].total, 10) + 1;
    const reference_number = `SR-${String(count).padStart(3, '0')}`;

    let contactResult = await query(
      'SELECT id FROM contacts WHERE email = $1',
      [client_email]
    );

    let contactId;
    if (contactResult.rows.length === 0) {
      const newContact = await query(
        `INSERT INTO contacts 
        (full_name, email, phone, company_name, contact_type, total_requests, source) 
        VALUES ($1, $2, $3, $4, 'prospect', 1, 'Site web') 
        RETURNING id`,
        [client_name, client_email, client_phone, company_name || null]
      );
      contactId = newContact.rows[0].id;
    } else {
      contactId = contactResult.rows[0].id;
      await query(
        `UPDATE contacts 
        SET total_requests = total_requests + 1, 
            last_contact_at = CURRENT_TIMESTAMP,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1`,
        [contactId]
      );
    }

    const result = await query(
      `INSERT INTO service_requests 
      (client_name, client_email, client_phone, company_name, service_type, 
       description, urgency, budget_range, reference_number, status) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'nouvelle') 
      RETURNING *`,
      [
        client_name,
        client_email,
        client_phone,
        company_name || null,
        service_type,
        description,
        urgency,
        budget_range || null,
        reference_number
      ]
    );

    const serviceRequest = result.rows[0];

    await query(
      `INSERT INTO request_history 
      (entity_type, entity_id, reference_number, action, new_status, description) 
      VALUES ($1, $2, $3, 'created', 'nouvelle', $4)`,
      [
        'service_request',
        serviceRequest.id,
        reference_number,
        `Nouvelle demande de service: ${service_type}`
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Votre demande a été envoyée avec succès',
      reference: reference_number,
      data: serviceRequest
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createServiceRequest
};
