import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// PUT : Mettre à jour un partenaire
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const body = await request.json();
    const { name, logo_url, website, display_order, is_published } = body;
    const { id } = params;

    const { data, error } = await supabase
      .from('partners')
      .update({
        name,
        logo_url,
        website,
        display_order,
        is_published,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erreur Supabase PUT partner:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ partner: data });
  } catch (error: any) {
    console.error('Erreur serveur PUT partner:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE : Supprimer un partenaire
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;

    // Récupérer d'abord le partenaire pour obtenir logo_url
    const { data: partner, error: fetchError } = await supabase
      .from('partners')
      .select('logo_url')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Erreur fetch partner:', fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    // Supprimer le logo du storage si c'est une URL Supabase
    if (partner?.logo_url && partner.logo_url.includes('supabase.co/storage')) {
      const fileName = partner.logo_url.split('/').pop();
      if (fileName) {
        await supabase.storage.from('partners-logos').remove([fileName]);
      }
    }

    // Supprimer l'enregistrement de la base de données
    const { error } = await supabase.from('partners').delete().eq('id', id);

    if (error) {
      console.error('Erreur Supabase DELETE partner:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Partenaire supprimé avec succès' });
  } catch (error: any) {
    console.error('Erreur serveur DELETE partner:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
