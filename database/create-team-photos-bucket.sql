-- Script pour créer le bucket 'team-photos' dans Supabase Storage
-- Ce bucket stockera les photos des membres de l'équipe

-- ÉTAPE 1: Créer le bucket via l'interface Supabase
-- Allez dans Storage > Create new bucket
-- Nom: team-photos
-- Public: OUI (pour que les photos soient accessibles publiquement)

-- ÉTAPE 2: Exécuter ce script SQL dans le SQL Editor de Supabase

-- Politiques pour le bucket 'team-photos'

-- 1. Politique de lecture publique (tout le monde peut voir les photos)
CREATE POLICY "Photos équipe lisibles publiquement"
ON storage.objects FOR SELECT
USING (bucket_id = 'team-photos');

-- 2. Politique d'upload (authentifié ou public selon vos besoins)
-- Option A: Permettre l'upload authentifié uniquement
CREATE POLICY "Upload photos équipe (authentifié)"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'team-photos'
  AND auth.role() = 'authenticated'
);

-- Option B: Permettre l'upload public (si vous utilisez des API keys)
-- Décommenter si nécessaire
-- CREATE POLICY "Upload photos équipe (public)"
-- ON storage.objects FOR INSERT
-- WITH CHECK (bucket_id = 'team-photos');

-- 3. Politique de mise à jour
CREATE POLICY "Update photos équipe"
ON storage.objects FOR UPDATE
USING (bucket_id = 'team-photos')
WITH CHECK (bucket_id = 'team-photos');

-- 4. Politique de suppression
CREATE POLICY "Delete photos équipe"
ON storage.objects FOR DELETE
USING (bucket_id = 'team-photos');

-- Vérification des politiques
SELECT * FROM storage.buckets WHERE name = 'team-photos';
SELECT * FROM storage.policies WHERE bucket_id = 'team-photos';

-- NOTES:
-- - Les photos seront accessibles via: 
--   https://[VOTRE_PROJET].supabase.co/storage/v1/object/public/team-photos/[CHEMIN_FICHIER]
-- - Format de chemin recommandé: team-photos/membre-{id}-{timestamp}.jpg
-- - Taille maximale recommandée: 5MB par photo
-- - Formats acceptés: JPG, PNG, WebP
