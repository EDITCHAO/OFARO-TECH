import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      client_name,
      client_email,
      client_phone,
      service_type,
      description
    } = body;

    // Validation des données requises
    if (!client_name || !client_email || !client_phone || !service_type || !description) {
      return NextResponse.json(
        { error: 'Tous les champs sont obligatoires' },
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
      'SELECT COUNT(*) as total FROM service_requests'
    );
    const count = parseInt(countResult.rows[0].total) + 1;
    const reference_number = `SR-${String(count).padStart(3, '0')}`;

    // Insérer la demande de service
    const result = await query(
      `INSERT INTO service_requests 
      (client_name, client_email, client_phone, service_type, description, 
       reference_number, status, submitted_at) 
      VALUES ($1, $2, $3, $4, $5, $6, 'nouvelle', CURRENT_TIMESTAMP) 
      RETURNING *`,
      [
        client_name,
        client_email,
        client_phone,
        service_type,
        description,
        reference_number
      ]
    );

    const serviceRequest = result.rows[0];

    // Créer une entrée dans l'historique
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

    // Vérifier si le contact existe déjà
    let contact = await query(
      'SELECT id FROM contacts WHERE email = $1',
      [client_email]
    );

    if (contact.rows.length === 0) {
      // Créer un nouveau contact
      await query(
        `INSERT INTO contacts 
        (full_name, email, phone, contact_type, total_requests, source) 
        VALUES ($1, $2, $3, 'prospect', 1, 'Site web - Demande de service')`,
        [client_name, client_email, client_phone]
      );
    } else {
      // Mettre à jour le contact existant
      await query(
        `UPDATE contacts 
        SET total_requests = total_requests + 1,
            last_contact_at = CURRENT_TIMESTAMP,
            updated_at = CURRENT_TIMESTAMP
        WHERE email = $1`,
        [client_email]
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Votre demande a été envoyée avec succès. Nous vous contacterons dans les plus brefs délais.',
      reference: reference_number,
      data: serviceRequest
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de la soumission de la demande:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du traitement de votre demande' },
      { status: 500 }
    );
  }
}
