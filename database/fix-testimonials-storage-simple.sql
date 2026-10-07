-- =====================================================
-- FIX SIMPLE POUR BUCKET testimonials-photos
-- =====================================================

-- Solution 1 : Supprimer toutes les politiques existantes
DELETE FROM storage.policies WHERE bucket_id = 'testimonials-photos';

-- Solution 2 : Désactiver RLS sur storage.objects pour ce bucket
-- (moins sécurisé mais plus simple pour tester)

-- Créer des politiques très permissives
INSERT INTO storage.policies (name, bucket_id, definition, check_clause)
VALUES 
  ('Public Access All testimonials-photos', 'testimonials-photos', 'true', 'true')
ON CONFLICT (name, bucket_id) DO UPDATE SET
  definition = 'true',
  check_clause = 'true';

-- Message de confirmation
DO $$
BEGIN
  RAISE NOTICE '✅ Politiques mises à jour';
  RAISE NOTICE '📝 Testez maintenant l''upload';
END $$;
