-- =====================================================
-- BUCKET STORAGE POUR PHOTOS DES TÉMOIGNAGES
-- =====================================================

-- Instructions pour créer le bucket dans Supabase Dashboard :
-- 1. Allez dans Storage → Buckets
-- 2. Cliquez sur "New bucket"
-- 3. Nom : testimonials-photos
-- 4. Cochez "Public bucket" (OUI)
-- 5. Cliquez sur "Create bucket"

-- Politiques de stockage pour le bucket testimonials-photos
-- Ces politiques permettent l'upload, la lecture et la suppression publique

-- Politique SELECT (lecture publique)
-- Cette commande crée la politique via SQL (alternative à l'interface)
INSERT INTO storage.policies (name, bucket_id, definition, check_clause)
SELECT 
  'Lecture publique des photos de témoignages',
  id,
  'bucket_id = ''testimonials-photos''',
  NULL
FROM storage.buckets
WHERE name = 'testimonials-photos'
ON CONFLICT DO NOTHING;

-- Politique INSERT (upload public)
INSERT INTO storage.policies (name, bucket_id, definition, check_clause)
SELECT 
  'Upload public des photos de témoignages',
  id,
  'bucket_id = ''testimonials-photos''',
  'bucket_id = ''testimonials-photos'''
FROM storage.buckets
WHERE name = 'testimonials-photos'
ON CONFLICT DO NOTHING;

-- Politique DELETE (suppression publique)
INSERT INTO storage.policies (name, bucket_id, definition, check_clause)
SELECT 
  'Suppression publique des photos de témoignages',
  id,
  'bucket_id = ''testimonials-photos''',
  NULL
FROM storage.buckets
WHERE name = 'testimonials-photos'
ON CONFLICT DO NOTHING;

-- Message de confirmation
DO $$
BEGIN
  RAISE NOTICE '✅ Créez maintenant le bucket "testimonials-photos" dans Supabase Storage';
  RAISE NOTICE '📁 Storage → New bucket → Nom: testimonials-photos → Public: OUI';
  RAISE NOTICE '🔒 Les politiques RLS seront créées automatiquement pour un bucket public';
END $$;
