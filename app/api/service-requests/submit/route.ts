import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Variables Supabase manquantes sur le serveur');
      return NextResponse.json(
        { error: 'Le service est temporairement indisponible' },
        { status: 503 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(client_email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    // Évite une requête COUNT qui peut être bloquée par les policies RLS.
    const reference_number = `SR-${Date.now().toString().slice(-8)}`;

    // Insérer la demande de service
    const { error: insertError } = await supabase
      .from('service_requests')
      .insert({
        client_name,
        client_email,
        client_phone,
        service_type,
        description,
        reference_number,
        status: 'nouvelle'
      })

    if (insertError) throw insertError;

    const serviceRequest = {
      client_name,
      client_email,
      client_phone,
      service_type,
      description,
      reference_number,
      status: 'nouvelle'
    };

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
