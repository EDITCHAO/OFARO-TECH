import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation des données requises
    const { 
      sender_name, 
      sender_email,
      sender_phone,
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

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Variables Supabase manquantes');
      return NextResponse.json(
        { error: 'Le service est temporairement indisponible' },
        { status: 503 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insérer le message de contact
    const { data, error: insertError } = await supabase
      .from('contact_messages')
      .insert({
        full_name: sender_name,
        email: sender_email,
        phone: sender_phone || null,
        subject,
        message,
        status: 'nouveau',
        is_read: false
      })
      .select();

    if (insertError) {
      console.error('Erreur insertion message:', insertError);
      throw insertError;
    }

    return NextResponse.json({
      success: true,
      message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
      data: data?.[0]
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de l\'envoi du message de contact:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi de votre message' },
      { status: 500 }
    );
  }
}
