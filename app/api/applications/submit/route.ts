import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Récupération des données du formulaire
    const application_type = formData.get('application_type') as string; // 'offre' ou 'spontanee'
    const job_offer_id = formData.get('job_offer_id') as string | null;
    const first_name = formData.get('first_name') as string;
    const last_name = formData.get('last_name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;
    const position_sought = formData.get('position_sought') as string; // Pour candidature spontanée
    const education_level = formData.get('education_level') as string;
    const professional_experience = formData.get('professional_experience') as string;
    const skills = formData.get('skills') as string;
    const portfolio_url = formData.get('portfolio_url') as string;
    const additional_message = formData.get('additional_message') as string;

    // Fichiers
    const cv = formData.get('cv') as File | null;
    const coverLetter = formData.get('cover_letter') as File | null;

    // Validation des données requises
    if (!application_type || !first_name || !last_name || !email || !phone || 
        !education_level || !professional_experience || !skills) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Validation du type de candidature
    if (!['offre', 'spontanee'].includes(application_type)) {
      return NextResponse.json(
        { error: 'Type de candidature invalide' },
        { status: 400 }
      );
    }

    // Pour une candidature à une offre, vérifier que l'offre existe et est publiée
    if (application_type === 'offre') {
      if (!job_offer_id) {
        return NextResponse.json(
          { error: 'L\'identifiant de l\'offre est requis' },
          { status: 400 }
        );
      }

      const offerCheck = await query(
        'SELECT id FROM job_offers WHERE id = $1 AND status = $2',
        [job_offer_id, 'publiee']
      );

      if (offerCheck.rows.length === 0) {
        return NextResponse.json(
          { error: 'Cette offre n\'est plus disponible' },
          { status: 404 }
        );
      }
    } else {
      // Pour une candidature spontanée, le poste recherché est requis
      if (!position_sought) {
        return NextResponse.json(
          { error: 'Le poste recherché est requis pour une candidature spontanée' },
          { status: 400 }
        );
      }
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
      'SELECT COUNT(*) as total FROM applications'
    );
    const count = parseInt(countResult.rows[0].total) + 1;
    const reference_number = `APP-${String(count).padStart(3, '0')}`;

    // Créer le dossier uploads s'il n'existe pas
    const uploadsDir = join(process.cwd(), 'uploads', 'applications', reference_number);
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
        (first_name, last_name, full_name, email, phone, contact_type, total_applications, source) 
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
        cvFileName,
        cvPath,
        coverLetterFileName,
        coverLetterPath,
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

    // TODO: Envoyer une notification par email à l'administration

    return NextResponse.json({
      success: true,
      message: 'Votre candidature a été envoyée avec succès',
      reference: reference_number,
      data: {
        ...application,
        cv_file_path: undefined, // Ne pas exposer le chemin complet
        cover_letter_file_path: undefined
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de la soumission de la candidature:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du traitement de votre candidature' },
      { status: 500 }
    );
  }
}
