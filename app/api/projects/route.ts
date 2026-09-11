import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// GET - Récupérer tous les projets (public)
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

    // Récupérer seulement les projets actifs, triés par display_order
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'active')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Erreur récupération projets:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: data || []
    });

  } catch (error) {
    console.error('Erreur API projects GET:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des projets' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau projet (admin uniquement)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      category,
      description,
      client_name,
      duration,
      year,
      image_url,
      technologies,
      display_order
    } = body;

    // Validation
    if (!title || !category || !description) {
      return NextResponse.json(
        { error: 'Titre, catégorie et description sont obligatoires' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Configuration Supabase manquante' },
        { status: 503 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('projects')
      .insert({
        title,
        category,
        description,
        client_name: client_name || null,
        duration: duration || null,
        year: year || new Date().getFullYear().toString(),
        image_url: image_url || null,
        technologies: technologies || [],
        display_order: display_order || 0,
        status: 'active'
      })
      .select()
      .single();

    if (error) {
      console.error('Erreur création projet:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'Projet créé avec succès',
      data
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur API projects POST:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du projet' },
      { status: 500 }
    );
  }
}
