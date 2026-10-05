-- =====================================================
-- DIAGNOSTIC DE LA TABLE DOCUMENTS_LIBRARY
-- =====================================================

-- 1. Compter tous les documents
SELECT COUNT(*) as total_documents FROM documents_library;

-- 2. Afficher tous les documents avec leurs détails
SELECT 
  id,
  title,
  original_name,
  category,
  file_type,
  is_active,
  created_at,
  LENGTH(file_url) as url_length
FROM documents_library
ORDER BY created_at DESC;

-- 3. Vérifier les documents inactifs
SELECT COUNT(*) as documents_inactifs 
FROM documents_library 
WHERE is_active = false;

-- 4. Vérifier les documents par catégorie
SELECT 
  category,
  COUNT(*) as nombre
FROM documents_library
GROUP BY category
ORDER BY nombre DESC;

-- 5. Vérifier les politiques RLS
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'documents_library';

-- Message
DO $$
BEGIN
  RAISE NOTICE '=== DIAGNOSTIC TERMINÉ ===';
  RAISE NOTICE 'Vérifiez les résultats ci-dessus pour identifier le problème.';
END $$;
