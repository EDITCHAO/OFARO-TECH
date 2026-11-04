import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Slugify partagé avec le formulaire admin
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// GET : Récupérer les services
// - Par défaut (public) : uniquement les services publiés, triés par display_order
// - ?admin=true : tous les services (page admin)
export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Configuration Supabase manquante dans GET services');
      return NextResponse.json({ error: 'Configuration serveur incomplète' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { searchParams } = new URL(request.url);
    const admin = searchParams.get('admin') === 'true';

    let query = supabase
      .from('services')
      .select('*')
      .order('display_order', { ascending: true });

    if (!admin) {
      query = query.eq('is_published', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Erreur Supabase GET services:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ services: data || [] });
  } catch (error: any) {
    console.error('Erreur serveur GET services:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST : Créer un nouveau service
export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Configuration Supabase manquante dans POST service');
      return NextResponse.json({ error: 'Configuration serveur incomplète' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await request.json();
    const {
      title,
      slug,
      description,
      short_description,
      icon,
      image_url,
      features,
      category,
      display_order,
      is_published,
      is_featured,
      color_accent,
    } = body;

    // Validation
    if (!title || !title.trim()) {
      return NextResponse.json({ error: 'Le titre est obligatoire' }, { status: 400 });
    }

    const finalSlug = (slug && slug.trim()) ? slugify(slug) : slugify(title);

    const { data, error } = await supabase
      .from('services')
      .insert([
        {
          title: title.trim(),
          slug: finalSlug,
          description: description || null,
          short_description: short_description || null,
          icon: icon || null,
          image_url: image_url || null,
          features: Array.isArray(features) ? features : [],
          category: category || null,
          display_order: display_order ?? 0,
          is_published: is_published !== false,
          is_featured: is_featured === true,
          color_accent: color_accent || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Erreur Supabase POST service:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ service: data }, { status: 201 });
  } catch (error: any) {
    console.error('Erreur serveur POST service:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
