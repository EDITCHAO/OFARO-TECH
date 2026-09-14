-- Créer le bucket "applications" pour stocker les CV et lettres de motivation
INSERT INTO storage.buckets (id, name, public)
VALUES ('applications', 'applications', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Supprimer les anciennes policies si elles existent
DROP POLICY IF EXISTS "Allow public uploads to applications" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read from applications" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated delete from applications" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated update in applications" ON storage.objects;

-- Politique pour permettre les uploads (tout le monde peut uploader un CV)
CREATE POLICY "Allow public uploads to applications"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'applications');

-- Politique pour permettre la lecture publique des CV
CREATE POLICY "Allow public read from applications"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'applications');

-- Politique pour permettre les suppressions (authentifiés seulement - admin)
CREATE POLICY "Allow authenticated delete from applications"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'applications');

-- Politique pour permettre les mises à jour (authentifiés seulement)
CREATE POLICY "Allow authenticated update in applications"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'applications');

-- Commentaire
COMMENT ON TABLE storage.buckets IS 'Bucket applications pour stocker les CV et lettres de motivation des candidats';
