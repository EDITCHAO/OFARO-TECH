import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

// GET — récupérer une offre par id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('job_offers')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) throw error;

    return NextResponse.json({ offer: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT — modifier une offre
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = getSupabase();
    const body = await request.json();

    const { data, error } = await supabase
      .from('job_offers')
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ offer: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE — supprimer une offre
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = getSupabase();
    const { error } = await supabase
      .from('job_offers')
      .delete()
      .eq('id', params.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
