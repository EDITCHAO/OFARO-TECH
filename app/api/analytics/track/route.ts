import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pageUrl, referrer } = body;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Configuration Supabase manquante' },
        { status: 503 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Extraire les informations de la requête
    const userAgent = request.headers.get('user-agent') || '';
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ipAddress = forwardedFor?.split(',')[0] || realIp || 'unknown';

    // Insérer la visite dans la base de données
    const { error } = await supabase
      .from('page_views')
      .insert({
        page_url: pageUrl,
        user_agent: userAgent,
        ip_address: ipAddress,
        referrer: referrer || null,
      });

    if (error) {
      console.error('Erreur enregistrement visite:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Erreur API track:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// GET - Obtenir les statistiques des visiteurs
export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Configuration Supabase manquante' },
        { status: 503 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Obtenir le nombre de visiteurs du mois en cours
    const { data: currentMonthData, error: currentMonthError } = await supabase
      .rpc('get_current_month_views');

    if (currentMonthError) {
      console.error('Erreur récupération visiteurs mois courant:', currentMonthError);
      throw currentMonthError;
    }

    // Obtenir le nombre de visiteurs du mois précédent
    const { data: previousMonthData, error: previousMonthError } = await supabase
      .rpc('get_previous_month_views');

    if (previousMonthError) {
      console.error('Erreur récupération visiteurs mois précédent:', previousMonthError);
      throw previousMonthError;
    }

    const currentMonth = currentMonthData || 0;
    const previousMonth = previousMonthData || 0;

    // Calculer le pourcentage de changement
    let percentageChange = 0;
    if (previousMonth > 0) {
      percentageChange = ((currentMonth - previousMonth) / previousMonth) * 100;
    }

    return NextResponse.json({
      currentMonth,
      previousMonth,
      percentageChange: percentageChange.toFixed(1),
    });

  } catch (error) {
    console.error('Erreur API analytics:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
