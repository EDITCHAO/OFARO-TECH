import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Variables Supabase manquantes');
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
    const { count, error: countError } = await supabase
      .from('service_requests')
      .select('id', { count: 'exact', head: true });

    if (countError) throw countError;

    const reference_number = `SR-${String(count).padStart(3, '0')}`;

    // Insérer la demande de service
    const { data: serviceRequest, error: insertError } = await supabase
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
      .select()
      .single();

    if (insertError) throw insertError;

    // Créer une entrée dans l'historique
    const { error: historyError } = await supabase
      .from('request_history')
      .insert({
        entity_type: 'service_request',
        entity_id: serviceRequest.id,
        reference_number,
        action: 'created',
        new_status: 'nouvelle',
        description: `Nouvelle demande de service: ${service_type}`
      });

    if (historyError) {
      console.warn('Historique de demande non enregistré:', historyError);
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
