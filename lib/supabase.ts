import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Client principal pour les opérations publiques (formulaires du site)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// ============================================================
// HELPERS : Persistence des formulaires publics en Supabase
// ============================================================

/**
 * Enregistre une demande de devis dans Supabase
 * Fallback vers AdminStore local si Supabase indisponible
 */
export async function saveQuoteToSupabase(data: {
  company_name: string;
  activity_field?: string;
  email: string;
  phone?: string;
  city?: string;
  desired_services?: string[];
  description?: string;
  has_logo?: string;
  has_domain_name?: string;
  domain_name?: string;
  key_features?: string;
  expected_result?: string;
  budget?: string;
  contact_person_name?: string;
  delivery_date?: string;
}) {
  try {
    if (!supabaseUrl || supabaseUrl.includes('votre')) {
      throw new Error('Supabase non configuré - fallback local');
    }

    const { data: result, error } = await supabase
      .from('quote_requests')
      .insert([{
        ...data,
        delivery_date: data.delivery_date || null,
        status: 'Nouveau'
      }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, reference: result.reference, data: result };
  } catch (err) {
    console.warn('Supabase indisponible, enregistrement local:', err);
    return { success: false, fallback: true };
  }
}

/**
 * Enregistre un message de contact dans Supabase
 * Fallback vers AdminStore local si Supabase indisponible
 */
export async function saveMessageToSupabase(data: {
  full_name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  try {
    if (!supabaseUrl || supabaseUrl.includes('votre')) {
      throw new Error('Supabase non configuré - fallback local');
    }

    const { data: result, error } = await supabase
      .from('contact_messages')
      .insert([{
        ...data,
        status: 'Nouveau',
        is_read: false
      }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, reference: result.reference, data: result };
  } catch (err) {
    console.warn('Supabase indisponible, enregistrement local:', err);
    return { success: false, fallback: true };
  }
}

/**
 * Enregistre une candidature ou demande de stage dans Supabase
 */
export async function saveApplicationToSupabase(data: {
  type: 'Emploi' | 'Stage' | 'Alternance' | 'Freelance';
  position: string;
  full_name: string;
  email: string;
  phone?: string;
  city?: string;
  education?: string;
  school?: string;
  experience?: string;
  skills?: string[];
  cover_letter?: string;
  cv_file_name?: string;
  cv_file_url?: string;
  portfolio_url?: string;
  internship_start_date?: string;
  internship_end_date?: string;
  internship_school_ref?: string;
}) {
  try {
    if (!supabaseUrl || supabaseUrl.includes('votre')) {
      throw new Error('Supabase non configuré - fallback local');
    }

    const { data: result, error } = await supabase
      .from('job_applications')
      .insert([{
        ...data,
        status: 'Nouvelle'
      }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, reference: result.reference, data: result };
  } catch (err) {
    console.warn('Supabase indisponible, enregistrement local:', err);
    return { success: false, fallback: true };
  }
}

/**
 * Upload une image de réalisation dans Supabase Storage
 * et enregistre l'URL en base de données
 */
export async function uploadRealizationImage(
  file: File,
  realizationId: string,
  options: {
    altText?: string;
    caption?: string;
    isCover?: boolean;
    uploadedBy?: string;
  } = {}
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    if (!supabaseUrl || supabaseUrl.includes('votre')) {
      throw new Error('Supabase non configuré');
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = `${realizationId}/${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`;

    // Upload vers Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('realization-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type
      });

    if (uploadError) throw uploadError;

    // Récupérer l'URL publique
    const { data: { publicUrl } } = supabase.storage
      .from('realization-images')
      .getPublicUrl(uploadData.path);

    // Enregistrer en base de données
    const { error: dbError } = await supabase
      .from('realization_media')
      .insert([{
        realization_id: realizationId,
        file_name: file.name,
        file_url: publicUrl,
        file_size: file.size,
        file_type: file.type,
        alt_text: options.altText || file.name,
        caption: options.caption,
        is_cover: options.isCover || false,
        uploaded_by: options.uploadedBy || 'admin'
      }]);

    if (dbError) throw dbError;

    // Si c'est la photo de couverture, mettre à jour la table realizations
    if (options.isCover) {
      await supabase
        .from('realizations')
        .update({ main_image_url: publicUrl, main_image_name: file.name })
        .eq('id', realizationId);
    }

    return { success: true, url: publicUrl };
  } catch (err: any) {
    console.error('Erreur upload image:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Récupère les demandes de devis (admin seulement)
 */
export async function getQuoteRequests() {
  const { data, error } = await supabase
    .from('quote_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Met à jour le statut d'un devis
 */
export async function updateQuoteStatus(id: string, status: string, notes?: string) {
  const { data, error } = await supabase
    .from('quote_requests')
    .update({ status, notes: notes || undefined, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Récupère les messages de contact (admin seulement)
 */
export async function getContactMessages() {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Récupère les réalisations publiées (public) ou toutes (admin)
 */
export async function getRealizations(adminMode = false) {
  let query = supabase
    .from('realizations')
    .select('*, realization_media(*)')
    .order('project_date', { ascending: false });

  if (!adminMode) {
    query = query.eq('is_published', true);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export default supabase;
