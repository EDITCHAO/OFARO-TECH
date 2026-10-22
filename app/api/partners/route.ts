import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// GET : Récupérer tous les partenaires
export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Erreur Supabase GET partners:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ partners: data || [] });
  } catch (error: any) {
    console.error('Erreur serveur GET partners:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST : Créer un nouveau partenaire
export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const body = await request.json();
    const { name, logo_url, website, display_order, is_published } = body;

    // Validation
    if (!name || !logo_url) {
      return NextResponse.json(
        { error: 'Le nom et le logo sont obligatoires' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('partners')
      .insert([
        {
          name,
          logo_url,
          website: website || null,
          display_order: display_order || 1,
          is_published: is_published !== false,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Erreur Supabase POST partner:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ partner: data }, { status: 201 });
  } catch (error: any) {
    console.error('Erreur serveur POST partner:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
