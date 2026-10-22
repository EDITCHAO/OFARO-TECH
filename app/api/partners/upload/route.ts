import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    // Valider le type de fichier
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Type de fichier non autorisé. Utilisez PNG, JPG, SVG ou WebP' },
        { status: 400 }
      );
    }

    // Valider la taille (5 MB max)
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Fichier trop volumineux. Taille maximale : 5 MB' },
        { status: 400 }
      );
    }

    // Générer un nom de fichier unique
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '-')}`;

    // Convertir le fichier en Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Uploader vers Supabase Storage
    const { data, error } = await supabase.storage
      .from('partners-logos')
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Erreur upload Supabase Storage:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Construire l'URL publique du logo
    const { data: urlData } = supabase.storage
      .from('partners-logos')
      .getPublicUrl(fileName);

    return NextResponse.json({
      logo_url: urlData.publicUrl,
      file_name: fileName,
    });
  } catch (error: any) {
    console.error('Erreur serveur upload logo:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
