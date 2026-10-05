-- =====================================================
-- CORRECTION DE LA VISIBILITÉ DES DOCUMENTS
-- =====================================================

-- 1. Activer tous les documents (is_active = true)
UPDATE documents_library 
SET is_active = true
WHERE is_active = false OR is_active IS NULL;

-- 2. S'assurer que les politiques RLS sont correctes
-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Lecture publique des documents actifs" ON documents_library;
DROP POLICY IF EXISTS "Admin complet sur documents_library" ON documents_library;

-- 3. Créer des politiques RLS permissives pour l'admin
-- Politique pour LECTURE (SELECT) - Tous les documents
CREATE POLICY "Lecture de tous les documents" ON documents_library
  FOR SELECT
  USING (true);

-- Politique pour INSERTION (INSERT) - Tout le monde peut insérer
CREATE POLICY "Insertion des documents" ON documents_library
  FOR INSERT
  WITH CHECK (true);

-- Politique pour MISE À JOUR (UPDATE) - Tout le monde peut modifier
CREATE POLICY "Modification des documents" ON documents_library
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Politique pour SUPPRESSION (DELETE) - Tout le monde peut supprimer
CREATE POLICY "Suppression des documents" ON documents_library
  FOR DELETE
  USING (true);

-- 4. Afficher le résultat
DO $$
DECLARE
  doc_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO doc_count FROM documents_library;
  RAISE NOTICE '✅ Politiques RLS mises à jour avec succès !';
  RAISE NOTICE 'Total de documents dans la base : %', doc_count;
  RAISE NOTICE 'Tous les documents devraient maintenant être visibles.';
END $$;
