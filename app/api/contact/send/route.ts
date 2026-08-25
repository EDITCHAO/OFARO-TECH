import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation des données requises
    const { 
      sender_name, 
      sender_email, 
      subject, 
      message 
    } = body;

    if (!sender_name || !sender_email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sender_email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    // Génération du numéro de référence
    const countResult = await query(
      'SELECT COUNT(*) as total FROM contact_messages'
    );
    const count = parseInt(countResult.rows[0].total) + 1;
    const reference_number = `MSG-${String(count).padStart(3, '0')}`;

    // Vérifier si le contact existe déjà
    let contact = await query(
      'SELECT id FROM contacts WHERE email = $1',
      [sender_email]
    );

    let contactId;
    if (contact.rows.length === 0) {
      // Créer un nouveau contact
      const newContact = await query(
        `INSERT INTO contacts 
        (full_name, email, phone, contact_type, total_messages, source) 
        VALUES ($1, $2, $3, 'prospect', 1, 'Site web') 
        RETURNING id`,
        [sender_name, sender_email, body.sender_phone || null]
      );
      contactId = newContact.rows[0].id;
    } else {
      // Mettre à jour le contact existant
      contactId = contact.rows[0].id;
      await query(
        `UPDATE contacts 
        SET total_messages = total_messages + 1, 
            last_contact_at = CURRENT_TIMESTAMP,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1`,
        [contactId]
      );
    }

    // Insérer le message de contact
    const result = await query(
        `INSERT INTO contact_messages 
        (full_name, email, phone, subject, message, status, is_read) 
        VALUES ($1, $2, $3, $4, $5, 'nouveau', false) 
      RETURNING *`,
      [
        sender_name,
        sender_email,
        body.sender_phone || null,
        subject,
        message
      ]
    );

    const contactMessage = result.rows[0];

    // Créer une entrée dans l'historique
    await query(
        `INSERT INTO request_history 
        (entity_type, entity_id, reference_number, action, new_status, description) 
        VALUES ($1, $2, $3, 'created', 'nouveau', $4)`,
      [
        'contact_message',
        contactMessage.id,
        reference_number,
        `Nouveau message: ${subject}`
      ]
    );

    // TODO: Envoyer une notification par email à l'administration

    return NextResponse.json({
      success: true,
      message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
      reference: reference_number,
      data: contactMessage
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de l\'envoi du message de contact:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi de votre message' },
      { status: 500 }
    );
  }
}
