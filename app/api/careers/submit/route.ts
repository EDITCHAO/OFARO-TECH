import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialiser le client Supabase avec la meilleure clé disponible
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Récupération des données du formulaire
    const prenom = formData.get('prenom') as string;
    const nom = formData.get('nom') as string;
    const email = formData.get('email') as string;
    const telephone = formData.get('telephone') as string;
    const poste = formData.get('poste') as string;
    const portfolio = formData.get('portfolio') as string;
    const message = formData.get('message') as string;
    const cvFile = formData.get('cv') as File;

    // Validation des champs requis
    if (!prenom || !nom || !email || !telephone || !poste || !message || !cvFile) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
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

    // Validation du fichier CV
    if (!cvFile.type.includes('pdf')) {
      return NextResponse.json(
        { error: 'Le CV doit être un fichier PDF' },
        { status: 400 }
      );
    }

    if (cvFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Le fichier CV ne doit pas dépasser 5 MB' },
        { status: 400 }
      );
    }

    // Générer le numéro de référence
    const { count, error: countError } = await supabase
      .from('applications')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Erreur comptage applications:', countError);
      return NextResponse.json(
        { error: 'Erreur lors de la génération de la référence', details: countError.message },
        { status: 500 }
      );
    }

    const reference_number = `APP-${String((count || 0) + 1).padStart(3, '0')}`;

    // Upload du CV vers Supabase Storage
    const fileName = `${reference_number}_${prenom}_${nom}_${Date.now()}.pdf`;
    const filePath = `cv/${fileName}`;

    const cvBuffer = await cvFile.arrayBuffer();
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('applications')
      .upload(filePath, cvBuffer, {
        contentType: 'application/pdf',
        upsert: false
      });

    if (uploadError) {
      console.error('Erreur upload CV vers Supabase Storage:', uploadError);
      return NextResponse.json(
        { 
          error: 'Erreur lors de l\'upload du CV', 
          details: uploadError.message,
          hint: 'Vérifiez que le bucket "applications" existe et est public dans Supabase Storage'
        },
        { status: 500 }
      );
    }

    // Obtenir l'URL publique du CV
    const { data: urlData } = supabase.storage
      .from('applications')
      .getPublicUrl(filePath);

    const cvUrl = urlData.publicUrl;

    // Déterminer le type (Stage vs Emploi)
    const applicationType = ['stage', 'alternance'].includes(poste.toLowerCase()) ? 'Stage' : 'Emploi';

    // Insérer dans la base de données
    const { data, error } = await supabase
      .from('applications')
      .insert({
        reference_number,
        first_name: prenom,
        last_name: nom,
        email,
        phone: telephone,
        position_sought: poste,
        education_level: 'Non spécifié',
        professional_experience: message,
        portfolio_url: portfolio || null,
        cv_file_name: cvFile.name,
        cv_file_path: cvUrl,
        status: 'nouvelle',
        submitted_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Erreur insertion candidature dans BDD:', error);
      console.error('Détails erreur:', JSON.stringify(error, null, 2));
      
      // Supprimer le fichier uploadé en cas d'erreur
      await supabase.storage
        .from('applications')
        .remove([filePath]);

      return NextResponse.json(
        { 
          error: 'Erreur lors de l\'enregistrement de votre candidature', 
          details: error.message,
          hint: error.hint || 'Vérifiez que la table "applications" existe dans Supabase'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Candidature envoyée avec succès',
      reference: reference_number,
      data: {
        id: data.id,
        reference_number: data.reference_number
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error('Erreur soumission candidature:', error);
    console.error('Stack trace:', error.stack);
    return NextResponse.json(
      { 
        error: 'Une erreur est survenue lors du traitement de votre candidature',
        details: error.message || 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}
