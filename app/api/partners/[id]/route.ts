import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// PUT : Mettre à jour un partenaire
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Configuration Supabase manquante dans PUT partner');
      return NextResponse.json({ error: 'Configuration serveur incomplète' }, { status: 500 });
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
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
      .select();

    if (error) {
      console.error('Erreur Supabase PUT partner:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Aucune ligne modifiée : la politique RLS a bloqué l'écriture ou l'id est inconnu
    if (!data || data.length === 0) {
      console.error('PUT partner bloqué : aucune ligne modifiée (RLS ou id introuvable)', id);
      return NextResponse.json(
        { error: 'Modification refusée par la base de données (politique RLS). Vérifiez la configuration Supabase.' },
        { status: 403 }
      );
    }

    return NextResponse.json({ partner: data[0] });
  } catch (error: any) {
    console.error('Erreur serveur PUT partner:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE : Supprimer un partenaire
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Configuration Supabase manquante dans DELETE partner');
      return NextResponse.json({ error: 'Configuration serveur incomplète' }, { status: 500 });
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
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
    const { data: deleted, error } = await supabase
      .from('partners')
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      console.error('Erreur Supabase DELETE partner:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Aucune ligne supprimée : la politique RLS a bloqué l'écriture
    if (!deleted || deleted.length === 0) {
      console.error('DELETE partner bloqué : aucune ligne supprimée (RLS)', id);
      return NextResponse.json(
        { error: 'Suppression refusée par la base de données (politique RLS). Vérifiez la configuration Supabase.' },
        { status: 403 }
      );
    }

    return NextResponse.json({ message: 'Partenaire supprimé avec succès' });
  } catch (error: any) {
    console.error('Erreur serveur DELETE partner:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
