-- =====================================================
-- POLITIQUES STORAGE POUR BIBLIOTHÈQUE DE DOCUMENTS
-- =====================================================

-- 1. Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Public read documents" ON storage.objects;
DROP POLICY IF EXISTS "Public upload documents" ON storage.objects;
DROP POLICY IF EXISTS "Public update documents" ON storage.objects;
DROP POLICY IF EXISTS "Public delete documents" ON storage.objects;

-- 2. Créer les nouvelles politiques PUBLIQUES

-- Lecture publique (bucket documents-library)
CREATE POLICY "Public read documents"
ON storage.objects
FOR SELECT
USING (bucket_id = 'documents-library');

-- Upload public
CREATE POLICY "Public upload documents"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'documents-library');

-- Mise à jour publique
CREATE POLICY "Public update documents"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'documents-library')
WITH CHECK (bucket_id = 'documents-library');

-- Suppression publique
CREATE POLICY "Public delete documents"
ON storage.objects
FOR DELETE
USING (bucket_id = 'documents-library');

-- 3. Forcer le bucket à être PUBLIC
UPDATE storage.buckets
SET public = true
WHERE id = 'documents-library';

-- Message de confirmation
DO $$
BEGIN
  RAISE NOTICE 'Politiques de stockage pour documents-library configurées !';
  RAISE NOTICE 'Le bucket est maintenant public.';
END $$;
