import { Request, Response, NextFunction } from 'express';
import { query } from '../config/database';

/**
 * Créer une nouvelle demande de devis
 * POST /api/quotes/request
 */
export const createQuoteRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      client_name,
      client_email,
      client_phone,
      company_name,
      project_type,
      project_description,
      budget,
      deadline
    } = req.body;

    // Génération du numéro de référence
    const countResult = await query(
      'SELECT COUNT(*) as total FROM quote_requests'
    );
    const count = parseInt(countResult.rows[0].total) + 1;
    const reference_number = `DV-${String(count).padStart(3, '0')}`;

    // Vérifier si le contact existe déjà
    let contactResult = await query(
      'SELECT id FROM contacts WHERE email = $1',
      [client_email]
    );

    let contactId;
    if (contactResult.rows.length === 0) {
      // Créer un nouveau contact
      const newContact = await query(
        `INSERT INTO contacts 
        (full_name, email, phone, company_name, contact_type, total_quotes, source) 
        VALUES ($1, $2, $3, $4, 'prospect', 1, 'Site web') 
        RETURNING id`,
        [client_name, client_email, client_phone, company_name || null]
      );
      contactId = newContact.rows[0].id;
    } else {
      // Mettre à jour le contact existant
      contactId = contactResult.rows[0].id;
      await query(
        `UPDATE contacts 
        SET total_quotes = total_quotes + 1, 
            last_contact_at = CURRENT_TIMESTAMP,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1`,
        [contactId]
      );
    }

    // Insérer la demande de devis
    const result = await query(
      `INSERT INTO quote_requests 
      (client_name, client_email, client_phone, company_name, project_type, 
       project_description, budget, deadline, reference_number, status) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'nouveau') 
      RETURNING *`,
      [
        client_name,
        client_email,
        client_phone,
        company_name || null,
        project_type,
        project_description,
        budget || null,
        deadline || null,
        reference_number
      ]
    );

    const quoteRequest = result.rows[0];

    // Créer une entrée dans l'historique
    await query(
      `INSERT INTO request_history 
      (entity_type, entity_id, reference_number, action, new_status, description) 
      VALUES ($1, $2, $3, 'created', 'nouveau', $4)`,
      [
        'quote_request',
        quoteRequest.id,
        reference_number,
        `Nouvelle demande de devis: ${project_type}`
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Votre demande de devis a été envoyée avec succès',
      reference: reference_number,
      data: quoteRequest
    });
  } catch (error) {
    next(error);
  }
};
