-- =====================================================
-- NETTOYAGE COMPLET DE LA BIBLIOTHÈQUE DE DOCUMENTS
-- =====================================================

-- 1. Supprimer tous les documents de la table
DELETE FROM documents_library;

-- 2. Réinitialiser la séquence de l'ID (recommencer à 1)
ALTER SEQUENCE documents_library_id_seq RESTART WITH 1;

-- 3. Message de confirmation
DO $$
BEGIN
  RAISE NOTICE '✅ Table documents_library nettoyée avec succès !';
  RAISE NOTICE '📊 Tous les enregistrements ont été supprimés.';
  RAISE NOTICE '🔢 La séquence des IDs a été réinitialisée à 1.';
  RAISE NOTICE '';
  RAISE NOTICE '⚠️  ATTENTION : Les fichiers dans le bucket Storage ne sont PAS supprimés automatiquement.';
  RAISE NOTICE '📁 Vous devez supprimer manuellement les fichiers orphelins dans Supabase Storage :';
  RAISE NOTICE '   1. Allez dans Storage → documents-library';
  RAISE NOTICE '   2. Sélectionnez les fichiers (ex: dossier "autres")';
  RAISE NOTICE '   3. Cliquez sur les 3 points → Delete';
  RAISE NOTICE '';
  RAISE NOTICE '✨ Ensuite, vous pourrez réuploader vos documents via l''interface admin !';
END $$;
