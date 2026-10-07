-- =====================================================
-- FIX POLITIQUES RLS POUR BUCKET testimonials-photos
-- =====================================================

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Lecture publique photos témoignages" ON storage.objects;
DROP POLICY IF EXISTS "Upload public photos témoignages" ON storage.objects;
DROP POLICY IF EXISTS "Suppression publique photos témoignages" ON storage.objects;
DROP POLICY IF EXISTS "Mise à jour publique photos témoignages" ON storage.objects;

-- Politique SELECT (lecture publique)
CREATE POLICY "Lecture publique photos témoignages"
ON storage.objects FOR SELECT
USING (bucket_id = 'testimonials-photos');

-- Politique INSERT (upload public)
CREATE POLICY "Upload public photos témoignages"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'testimonials-photos');

-- Politique UPDATE (mise à jour publique)
CREATE POLICY "Mise à jour publique photos témoignages"
ON storage.objects FOR UPDATE
USING (bucket_id = 'testimonials-photos')
WITH CHECK (bucket_id = 'testimonials-photos');

-- Politique DELETE (suppression publique)
CREATE POLICY "Suppression publique photos témoignages"
ON storage.objects FOR DELETE
USING (bucket_id = 'testimonials-photos');

-- Vérifier que le bucket existe
DO $$
DECLARE
  bucket_exists BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM storage.buckets WHERE name = 'testimonials-photos'
  ) INTO bucket_exists;
  
  IF bucket_exists THEN
    RAISE NOTICE '✅ Le bucket "testimonials-photos" existe';
    RAISE NOTICE '✅ Politiques RLS créées avec succès !';
    RAISE NOTICE '📝 Vous pouvez maintenant uploader des photos';
  ELSE
    RAISE WARNING '⚠️ Le bucket "testimonials-photos" n''existe pas !';
    RAISE NOTICE '📁 Créez-le dans Supabase Storage → New bucket → testimonials-photos (PUBLIC)';
  END IF;
END $$;
