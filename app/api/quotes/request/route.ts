import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation des données requises
    const { 
      client_name, 
      client_email, 
      client_phone, 
      project_type, 
      project_description 
    } = body;

    if (!client_name || !client_email || !client_phone || !project_type || !project_description) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(client_email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    // Génération du numéro de référence
    const countResult = await query(
      'SELECT COUNT(*) as total FROM quote_requests'
    );
    const count = parseInt(countResult.rows[0].total) + 1;
    const reference_number = `DV-${String(count).padStart(3, '0')}`;

    // Vérifier si le contact existe déjà
    let contact = await query(
      'SELECT id FROM contacts WHERE email = $1',
      [client_email]
    );

    let contactId;
    if (contact.rows.length === 0) {
      // Créer un nouveau contact
      const newContact = await query(
        `INSERT INTO contacts 
        (full_name, email, phone, company_name, contact_type, total_quotes, source) 
        VALUES ($1, $2, $3, $4, 'prospect', 1, 'Site web') 
        RETURNING id`,
        [client_name, client_email, client_phone, body.company_name || null]
      );
      contactId = newContact.rows[0].id;
    } else {
      // Mettre à jour le contact existant
      contactId = contact.rows[0].id;
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
      (company_name, sector, email, phone, services, project_description,
       budget, contact_first_name, contact_last_name, desired_delivery_date, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'nouveau')
      RETURNING *`,
      [
        body.company_name || null,
        body.sector || null,
        client_email,
        client_phone,
        project_type,
        project_description,
        body.budget || null,
        client_name.split(' ')[0],
        client_name.split(' ').slice(1).join(' ') || client_name.split(' ')[0],
        body.deadline || null
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

    // TODO: Envoyer une notification par email à l'administration

    return NextResponse.json({
      success: true,
      message: 'Votre demande de devis a été envoyée avec succès',
      reference: reference_number,
      data: quoteRequest
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de la création de la demande de devis:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du traitement de votre demande' },
      { status: 500 }
    );
  }
}
