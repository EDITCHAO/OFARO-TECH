-- POLITIQUES STORAGE pour le bucket team-photos
-- Assurez-vous d'avoir créé le bucket "team-photos" (PUBLIC) dans Storage d'abord !

-- 1. Permettre la lecture publique (SELECT)
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'team-photos' );

-- 2. Permettre l'upload (INSERT)
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'team-photos' );

-- 3. Permettre la mise à jour (UPDATE)
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'team-photos' )
WITH CHECK ( bucket_id = 'team-photos' );

-- 4. Permettre la suppression (DELETE)
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'team-photos' );

-- Vérification : Lister toutes les politiques du bucket
SELECT 
  policyname, 
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'objects' 
  AND schemaname = 'storage';
