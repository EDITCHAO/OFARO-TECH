import { Request, Response, NextFunction } from 'express';
import { query } from '../config/database';
import { AppError } from '../middleware/error.middleware';

/**
 * Soumettre une candidature
 * POST /api/applications/submit
 */
export const submitApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    // Vérifier que les fichiers requis sont présents
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

    // Validation du type de candidature
    if (!['offre', 'spontanee'].includes(application_type)) {
      return next(new AppError('Type de candidature invalide', 400));
    }

    // Pour une candidature à une offre, vérifier que l'offre existe et est publiée
    if (application_type === 'offre') {
      if (!job_offer_id) {
        return next(new AppError('L\'identifiant de l\'offre est requis', 400));
      }

      const offerCheck = await query(
        'SELECT id FROM job_offers WHERE id = $1 AND status = $2',
        [job_offer_id, 'publiee']
      );

      if (offerCheck.rows.length === 0) {
        return next(new AppError('Cette offre n\'est plus disponible', 404));
      }
    } else {
      // Pour une candidature spontanée, le poste recherché est requis
      if (!position_sought) {
        return next(new AppError('Le poste recherché est requis pour une candidature spontanée', 400));
      }
    }

    // Génération du numéro de référence
    const countResult = await query(
      'SELECT COUNT(*) as total FROM applications'
    );
    const count = parseInt(countResult.rows[0].total) + 1;
    const reference_number = `APP-${String(count).padStart(3, '0')}`;

    // Vérifier si le contact existe déjà
    let contactResult = await query(
      'SELECT id FROM contacts WHERE email = $1',
      [email]
    );

    const full_name = `${first_name} ${last_name}`;
    let contactId;

    if (contactResult.rows.length === 0) {
      // Créer un nouveau contact
      const newContact = await query(
        `INSERT INTO contacts 
        (first_name, last_name, full_name, email, phone, contact_type, total_applications, source) 
        VALUES ($1, $2, $3, $4, $5, 'candidat', 1, 'Site web') 
        RETURNING id`,
        [first_name, last_name, full_name, email, phone]
      );
      contactId = newContact.rows[0].id;
    } else {
      // Mettre à jour le contact existant
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

    // Insérer la candidature
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
        job_offer_id ? parseInt(job_offer_id) : null,
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

    // Créer une entrée dans l'historique
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

    // Ne pas exposer les chemins complets des fichiers
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
