import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// GET : Récupérer un service par son id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Configuration Supabase manquante dans GET service');
      return NextResponse.json({ error: 'Configuration serveur incomplète' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { id } = params;

    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erreur Supabase GET service:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ service: data });
  } catch (error: any) {
    console.error('Erreur serveur GET service:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT : Mettre à jour un service
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Configuration Supabase manquante dans PUT service');
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
    const { id } = params;

    const { data, error } = await supabase
      .from('services')
      .update({
        title,
        slug,
        description,
        short_description,
        icon,
        image_url,
        features: Array.isArray(features) ? features : [],
        category,
        display_order,
        is_published,
        is_featured,
        color_accent,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Erreur Supabase PUT service:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Aucune ligne modifiée : la politique RLS a bloqué l'écriture ou l'id est inconnu
    if (!data || data.length === 0) {
      console.error('PUT service bloqué : aucune ligne modifiée (RLS ou id introuvable)', id);
      return NextResponse.json(
        {
          error:
            'Modification refusée par la base de données (politique RLS). Vérifiez la configuration Supabase.',
        },
        { status: 403 }
      );
    }

    return NextResponse.json({ service: data[0] });
  } catch (error: any) {
    console.error('Erreur serveur PUT service:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE : Supprimer un service
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Configuration Supabase manquante dans DELETE service');
      return NextResponse.json({ error: 'Configuration serveur incomplète' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { id } = params;

    // Récupérer d'abord le service pour obtenir image_url (suppression du storage)
    const { data: service, error: fetchError } = await supabase
      .from('services')
      .select('image_url')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Erreur fetch service:', fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    // Supprimer l'image du storage si c'est une URL Supabase
    if (service?.image_url && service.image_url.includes('supabase.co/storage')) {
      const fileName = service.image_url.split('/').pop();
      if (fileName) {
        await supabase.storage.from('services-images').remove([fileName]);
      }
    }

    const { data: deleted, error } = await supabase
      .from('services')
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      console.error('Erreur Supabase DELETE service:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Aucune ligne supprimée : la politique RLS a bloqué l'écriture
    if (!deleted || deleted.length === 0) {
      console.error('DELETE service bloqué : aucune ligne supprimée (RLS)', id);
      return NextResponse.json(
        {
          error:
            'Suppression refusée par la base de données (politique RLS). Vérifiez la configuration Supabase.',
        },
        { status: 403 }
      );
    }

    return NextResponse.json({ message: 'Service supprimé avec succès' });
  } catch (error: any) {
    console.error('Erreur serveur DELETE service:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
