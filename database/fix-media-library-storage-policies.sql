-- =====================================================
-- FIX STORAGE POLICIES POUR MÉDIATHÈQUE
-- =====================================================
-- Ce script corrige les politiques RLS du bucket media-library
-- pour permettre l'upload et la suppression des images

-- 1. Supprimer les anciennes politiques (si elles existent)
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated upload" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated delete" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads to media-library" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes from media-library" ON storage.objects;

-- 2. Créer les nouvelles politiques PERMISSIVES

-- Politique 1 : Lecture publique pour tous (bucket media-library)
CREATE POLICY "Public read access for media-library"
ON storage.objects
FOR SELECT
USING (bucket_id = 'media-library');

-- Politique 2 : Upload public (bucket media-library)
CREATE POLICY "Public upload to media-library"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'media-library');

-- Politique 3 : Mise à jour publique (bucket media-library)
CREATE POLICY "Public update in media-library"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'media-library')
WITH CHECK (bucket_id = 'media-library');

-- Politique 4 : Suppression publique (bucket media-library)
CREATE POLICY "Public delete from media-library"
ON storage.objects
FOR DELETE
USING (bucket_id = 'media-library');

-- 3. Vérifier que le bucket est PUBLIC
UPDATE storage.buckets
SET public = true
WHERE id = 'media-library';

-- Message de confirmation
DO $$
BEGIN
  RAISE NOTICE 'Politiques de stockage mises à jour avec succès !';
  RAISE NOTICE 'Le bucket media-library est maintenant accessible publiquement.';
END $$;
