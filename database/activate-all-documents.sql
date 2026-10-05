-- =====================================================
-- ACTIVER TOUS LES DOCUMENTS
-- =====================================================

-- Mettre is_active = true pour tous les documents
UPDATE documents_library 
SET is_active = true
WHERE is_active = false OR is_active IS NULL;

-- Afficher le résultat
DO $$
DECLARE
  updated_count INTEGER;
  total_count INTEGER;
BEGIN
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  SELECT COUNT(*) INTO total_count FROM documents_library;
  
  RAISE NOTICE '✅ Documents activés : % document(s)', updated_count;
  RAISE NOTICE '📊 Total de documents dans la base : %', total_count;
  RAISE NOTICE '✨ Tous les documents sont maintenant visibles !';
END $$;
