const { query } = require('../config/database');
const { AppError } = require('../middleware/error.middleware');

const createInternshipRequest = async (req, res, next) => {
  try {
    const files = req.files;

    if (!files || !files.cv || !files.cover_letter) {
      return next(new AppError('Le CV et la lettre de motivation sont requis', 400));
    }

    const cv = files.cv[0];
    const coverLetter = files.cover_letter[0];

    const {
      first_name,
      last_name,
      email,
      phone,
      address,
      institution,
      field_of_study,
      education_level,
      internship_type,
      desired_duration,
      desired_period_start,
      desired_period_end,
      internship_objectives
    } = req.body;

    const countResult = await query('SELECT COUNT(*) as total FROM internship_requests');
    const count = parseInt(countResult.rows[0].total, 10) + 1;
    const reference_number = `ST-${String(count).padStart(3, '0')}`;

    let contactResult = await query(
      'SELECT id FROM contacts WHERE email = $1',
      [email]
    );

    const full_name = `${first_name} ${last_name}`;
    let contactId;

    if (contactResult.rows.length === 0) {
      const newContact = await query(
        `INSERT INTO contacts 
        (first_name, last_name, full_name, email, phone, contact_type, total_internships, source) 
        VALUES ($1, $2, $3, $4, $5, 'candidat', 1, 'Site web') 
        RETURNING id`,
        [first_name, last_name, full_name, email, phone]
      );
      contactId = newContact.rows[0].id;
    } else {
      contactId = contactResult.rows[0].id;
      await query(
        `UPDATE contacts 
        SET total_internships = total_internships + 1, 
            contact_type = 'candidat',
            last_contact_at = CURRENT_TIMESTAMP,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1`,
        [contactId]
      );
    }

    const result = await query(
      `INSERT INTO internship_requests 
      (first_name, last_name, email, phone, address, institution, 
       field_of_study, education_level, internship_type, desired_duration, 
       desired_period_start, desired_period_end, internship_objectives, 
       cv_file_name, cv_file_path, cover_letter_file_name, cover_letter_file_path, 
       reference_number, status) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, 'nouvelle') 
      RETURNING *`,
      [
        first_name,
        last_name,
        email,
        phone,
        address || null,
        institution,
        field_of_study,
        education_level || null,
        internship_type,
        desired_duration,
        desired_period_start,
        desired_period_end,
        internship_objectives,
        cv.filename,
        cv.path,
        coverLetter.filename,
        coverLetter.path,
        reference_number
      ]
    );

    const internshipRequest = result.rows[0];

    await query(
      `INSERT INTO request_history 
      (entity_type, entity_id, reference_number, action, new_status, description) 
      VALUES ($1, $2, $3, 'created', 'nouvelle', $4)`,
      [
        'internship_request',
        internshipRequest.id,
        reference_number,
        `Nouvelle demande de stage: ${internship_type} - ${field_of_study}`
      ]
    );

    const responseData = {
      ...internshipRequest,
      cv_file_path: undefined,
      cover_letter_file_path: undefined
    };

    res.status(201).json({
      success: true,
      message: 'Votre demande de stage a été envoyée avec succès',
      reference: reference_number,
      data: responseData
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInternshipRequest
};
