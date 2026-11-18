import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase(admin = false) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = admin
    ? (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

// GET — lire tous les paramètres
export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value')
      .order('key');

    if (error) throw error;

    // Convertir en objet clé/valeur
    const settings: Record<string, string> = {};
    (data || []).forEach((row: { key: string; value: string }) => {
      settings[row.key] = row.value || '';
    });

    return NextResponse.json({ settings });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT — mettre à jour un ou plusieurs paramètres
export async function PUT(request: NextRequest) {
  try {
    const supabase = getSupabase(true);
    const body = await request.json(); // { phone: "...", email: "...", ... }

    const allowed = ['phone', 'whatsapp', 'email', 'address', 'opening_hours', 'google_maps_url'];

    const updates = Object.entries(body)
      .filter(([key]) => allowed.includes(key))
      .map(([key, value]) => ({
        key,
        value: String(value),
        updated_at: new Date().toISOString(),
      }));

    if (updates.length === 0) {
      return NextResponse.json({ error: 'Aucun champ valide fourni' }, { status: 400 });
    }

    const { error } = await supabase
      .from('site_settings')
      .upsert(updates, { onConflict: 'key' });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
