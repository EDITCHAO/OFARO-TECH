-- =====================================================
-- SUPPRIMER LES DOCUMENTS D'EXEMPLE FICTIFS
-- =====================================================

-- Supprimer tous les documents d'exemple avec les URL placeholder
DELETE FROM documents_library 
WHERE file_url LIKE '%placeholder.com%';

-- Message de confirmation
DO $$
DECLARE
  deleted_count INTEGER;
BEGIN
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RAISE NOTICE 'Documents fictifs supprimés : % document(s)', deleted_count;
  RAISE NOTICE 'La table documents_library est maintenant vide et prête à recevoir vos vrais documents.';
END $$;
