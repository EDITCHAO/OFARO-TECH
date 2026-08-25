const { query } = require('../config/database');
const { AppError } = require('../middleware/error.middleware');

const submitApplication = async (req, res, next) => {
  try {
    const files = req.files;

    if (!files || !files.cv || !files.cover_letter) {
      return next(new AppError('Le CV et la lettre de motivation sont requis', 400));
    }

    const cv = files.cv[0];
    const coverLetter = files.cover_letter[0];

    const {
      application_type,
      job_offer_id,
      position_sought,
      first_name,
      last_name,
      email,
      phone,
      address,
      education_level,
      professional_experience,
      skills,
      portfolio_url,
      additional_message
    } = req.body;

    if (!['offre', 'spontanee'].includes(application_type)) {
      return next(new AppError('Type de candidature invalide', 400));
    }

    if (application_type === 'offre') {
      if (!job_offer_id) {
        return next(new AppError("L'identifiant de l'offre est requis", 400));
      }

      const offerCheck = await query(
        'SELECT id FROM job_offers WHERE id = $1 AND status = $2',
        [job_offer_id, 'publiee']
      );

      if (offerCheck.rows.length === 0) {
        return next(new AppError("Cette offre n'est plus disponible", 404));
      }
    } else if (!position_sought) {
      return next(new AppError('Le poste recherché est requis pour une candidature spontanée', 400));
    }

    const countResult = await query('SELECT COUNT(*) as total FROM applications');
    const count = parseInt(countResult.rows[0].total, 10) + 1;
    const reference_number = `APP-${String(count).padStart(3, '0')}`;

    let contactResult = await query(
      'SELECT id FROM contacts WHERE email = $1',
      [email]
    );

    const full_name = `${first_name} ${last_name}`;
    let contactId;

    if (contactResult.rows.length === 0) {
      const newContact = await query(
        `INSERT INTO contacts 
        (first_name, last_name, full_name, email, phone, contact_type, total_applications, source) 
        VALUES ($1, $2, $3, $4, $5, 'candidat', 1, 'Site web') 
        RETURNING id`,
        [first_name, last_name, full_name, email, phone]
      );
      contactId = newContact.rows[0].id;
    } else {
      contactId = contactResult.rows[0].id;
      await query(
        `UPDATE contacts 
        SET total_applications = total_applications + 1, 
            contact_type = 'candidat',
            last_contact_at = CURRENT_TIMESTAMP,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1`,
        [contactId]
      );
    }

    const result = await query(
      `INSERT INTO applications 
      (application_type, job_offer_id, first_name, last_name, email, phone, address, 
       position_sought, education_level, professional_experience, skills, 
       cv_file_name, cv_file_path, cover_letter_file_name, cover_letter_file_path, 
       portfolio_url, additional_message, reference_number, status) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, 'nouvelle') 
      RETURNING *`,
      [
        application_type,
        job_offer_id ? parseInt(job_offer_id, 10) : null,
        first_name,
        last_name,
        email,
        phone,
        address || null,
        position_sought || null,
        education_level,
        professional_experience,
        skills,
        cv.filename,
        cv.path,
        coverLetter.filename,
        coverLetter.path,
        portfolio_url || null,
        additional_message || null,
        reference_number
      ]
    );

    const application = result.rows[0];

    await query(
      `INSERT INTO request_history 
      (entity_type, entity_id, reference_number, action, new_status, description) 
      VALUES ($1, $2, $3, 'created', 'nouvelle', $4)`,
      [
        'application',
        application.id,
        reference_number,
        `Nouvelle candidature ${application_type}: ${position_sought || 'Offre #' + job_offer_id}`
      ]
    );

    const responseData = {
      ...application,
      cv_file_path: undefined,
      cover_letter_file_path: undefined
    };

    res.status(201).json({
      success: true,
      message: 'Votre candidature a été envoyée avec succès',
      reference: reference_number,
      data: responseData
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitApplication
};
