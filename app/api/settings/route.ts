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
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const res = await fetch(
      `${url}/rest/v1/site_settings?select=key,value&order=key`,
      {
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
        },
        cache: 'no-store',
      }
    );

    if (!res.ok) throw new Error(await res.text());

    const data: { key: string; value: string }[] = await res.json();

    const settings: Record<string, string> = {};
    data.forEach(row => { settings[row.key] = row.value || ''; });

    return NextResponse.json({ settings });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT — mettre à jour un ou plusieurs paramètres
export async function PUT(request: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const body = await request.json();

    const allowed = ['phone', 'whatsapp', 'email', 'address', 'opening_hours', 'google_maps_url'];
    const entries = Object.entries(body).filter(([k]) => allowed.includes(k));

    if (entries.length === 0) {
      return NextResponse.json({ error: 'Aucun champ valide fourni' }, { status: 400 });
    }

    // Utiliser fetch direct vers l'API REST Supabase (plus fiable que le client JS pour les PATCH)
    for (const [k, v] of entries) {
      const res = await fetch(
        `${url}/rest/v1/site_settings?key=eq.${k}`,
        {
          method: 'PATCH',
          headers: {
            'apikey': key,
            'Authorization': `Bearer ${key}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({ value: String(v), updated_at: new Date().toISOString() }),
        }
      );
      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Erreur mise à jour ${k}: ${err}`);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
