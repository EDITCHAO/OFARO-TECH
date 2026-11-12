import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

// GET — liste toutes les offres (admin) ou seulement publiées (public)
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const admin = new URL(request.url).searchParams.get('admin') === 'true';

    let query = supabase
      .from('job_offers')
      .select('*')
      .order('created_at', { ascending: false });

    if (!admin) {
      query = query.eq('status', 'publiee');
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ offers: data || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST — créer une nouvelle offre
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const body = await request.json();

    // Champs autorisés — NE PAS inclure created_at/updated_at (gérés par Supabase)
    const allowed = [
      'title', 'reference', 'department', 'contract_type', 'location', 'work_mode',
      'image_url', 'image_alt', 'description', 'missions', 'responsibilities',
      'required_skills', 'profile', 'education_level', 'experience_level',
      'publication_date', 'application_deadline', 'status', 'published_at',
    ];
    const payload: Record<string, any> = {};
    for (const key of allowed) {
      if (key in body) payload[key] = body[key];
    }

    const { data, error } = await supabase
      .from('job_offers')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ offer: data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
