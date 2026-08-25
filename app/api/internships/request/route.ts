import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Récupération des données du formulaire
    const first_name = formData.get('first_name') as string;
    const last_name = formData.get('last_name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;
    const institution = formData.get('institution') as string;
    const field_of_study = formData.get('field_of_study') as string;
    const education_level = formData.get('education_level') as string;
    const internship_type = formData.get('internship_type') as string;
    const desired_duration = formData.get('desired_duration') as string;
    const desired_period_start = formData.get('desired_period_start') as string;
    const desired_period_end = formData.get('desired_period_end') as string;
    const internship_objectives = formData.get('internship_objectives') as string;

    // Fichiers
    const cv = formData.get('cv') as File | null;
    const coverLetter = formData.get('cover_letter') as File | null;

    // Validation des données requises
    if (!first_name || !last_name || !email || !phone || !institution || 
        !field_of_study || !internship_type || !desired_duration || 
        !desired_period_start || !desired_period_end || !internship_objectives) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    if (!cv || !coverLetter) {
      return NextResponse.json(
        { error: 'Le CV et la lettre de motivation sont obligatoires' },
        { status: 400 }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    // Génération du numéro de référence
    const countResult = await query(
      'SELECT COUNT(*) as total FROM internship_requests'
    );
    const count = parseInt(countResult.rows[0].total) + 1;
    const reference_number = `ST-${String(count).padStart(3, '0')}`;

    // Créer le dossier uploads s'il n'existe pas
    const uploadsDir = join(process.cwd(), 'uploads', 'internships', reference_number);
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Sauvegarder le CV
    const cvBuffer = Buffer.from(await cv.arrayBuffer());
    const cvFileName = `${Date.now()}_${cv.name}`;
    const cvPath = join(uploadsDir, cvFileName);
    await writeFile(cvPath, cvBuffer);

    // Sauvegarder la lettre de motivation
    const coverLetterBuffer = Buffer.from(await coverLetter.arrayBuffer());
    const coverLetterFileName = `${Date.now()}_${coverLetter.name}`;
    const coverLetterPath = join(uploadsDir, coverLetterFileName);
    await writeFile(coverLetterPath, coverLetterBuffer);

    // Vérifier si le contact existe déjà
    let contact = await query(
      'SELECT id FROM contacts WHERE email = $1',
      [email]
    );

    let contactId;
    const full_name = `${first_name} ${last_name}`;

    if (contact.rows.length === 0) {
      // Créer un nouveau contact
      const newContact = await query(
        `INSERT INTO contacts 
        (first_name, last_name, full_name, email, phone, contact_type, total_internships, source) 
        VALUES ($1, $2, $3, $4, $5, 'candidat', 1, 'Site web') 
        RETURNING id`,
        [first_name, last_name, full_name, email, phone]
      );
      contactId = newContact.rows[0].id;
    } else {
      // Mettre à jour le contact existant
      contactId = contact.rows[0].id;
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

    // Insérer la demande de stage
    const result = await query(
      `INSERT INTO internship_requests 
      (first_name, last_name, email, phone, address, institution, field_of_study, 
       education_level, internship_type, desired_duration, desired_period_start, 
       desired_period_end, internship_objectives, cv_file_name, cv_file_path, 
       cover_letter_file_name, cover_letter_file_path, reference_number, status) 
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
        cvFileName,
        cvPath,
        coverLetterFileName,
        coverLetterPath,
        reference_number
      ]
    );

    const internshipRequest = result.rows[0];

    // Créer une entrée dans l'historique
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

    // TODO: Envoyer une notification par email à l'administration

    return NextResponse.json({
      success: true,
      message: 'Votre demande de stage a été envoyée avec succès',
      reference: reference_number,
      data: {
        ...internshipRequest,
        cv_file_path: undefined, // Ne pas exposer le chemin complet
        cover_letter_file_path: undefined
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de la création de la demande de stage:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du traitement de votre demande' },
      { status: 500 }
    );
  }
}
