-- SCRIPT SIMPLE : Politiques pour le bucket team-photos
-- ATTENTION : Vous devez d'abord créer le bucket "team-photos" via l'interface Supabase Storage !
-- Copiez-collez ce script dans Supabase SQL Editor après avoir créé le bucket

-- 1. Politique de lecture publique (tout le monde peut voir les photos)
INSERT INTO storage.policies (name, bucket_id, definition, check_definition)
VALUES (
  'Photos équipe lisibles publiquement',
  'team-photos',
  '(bucket_id = ''team-photos'')',
  '(bucket_id = ''team-photos'')'
)
ON CONFLICT (bucket_id, name) 
DO NOTHING;

-- Vérification : afficher les politiques du bucket
SELECT * FROM storage.policies WHERE bucket_id = 'team-photos';
