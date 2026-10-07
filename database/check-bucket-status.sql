-- =====================================================
-- VÉRIFIER LE STATUT DU BUCKET
-- =====================================================

-- 1. Vérifier si le bucket existe
SELECT 
  id,
  name,
  public,
  created_at
FROM storage.buckets
WHERE name = 'testimonials-photos';

-- 2. Vérifier les politiques existantes
SELECT 
  policyname as nom_politique,
  permissive,
  roles,
  cmd as commande,
  qual as condition
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects';

-- 3. Compter les fichiers dans le bucket
SELECT COUNT(*) as nombre_fichiers
FROM storage.objects
WHERE bucket_id = 'testimonials-photos';

-- Message
DO $$
DECLARE
  bucket_public BOOLEAN;
  bucket_exists BOOLEAN;
BEGIN
  SELECT public INTO bucket_public
  FROM storage.buckets
  WHERE name = 'testimonials-photos';
  
  bucket_exists := FOUND;
  
  IF NOT bucket_exists THEN
    RAISE WARNING '❌ Le bucket "testimonials-photos" N''EXISTE PAS';
    RAISE NOTICE '📁 Créez-le : Storage → New bucket → testimonials-photos → Public: OUI';
  ELSIF bucket_public THEN
    RAISE NOTICE '✅ Le bucket existe et est PUBLIC';
  ELSE
    RAISE WARNING '⚠️ Le bucket existe mais n''est PAS PUBLIC';
    RAISE NOTICE '🔧 Rendez-le public dans les paramètres du bucket';
  END IF;
END $$;
