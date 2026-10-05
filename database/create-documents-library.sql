-- =====================================================
-- TABLE BIBLIOTHÈQUE DE DOCUMENTS
-- =====================================================

-- Supprimer la table si elle existe
DROP TABLE IF EXISTS documents_library CASCADE;

-- Créer la table
CREATE TABLE documents_library (
  id SERIAL PRIMARY KEY,
  
  -- Informations du fichier
  file_name VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER NOT NULL, -- Taille en octets
  file_type VARCHAR(100) NOT NULL, -- application/pdf, application/vnd.ms-excel, etc.
  
  -- Métadonnées
  title VARCHAR(500) NOT NULL,
  description TEXT,
  category VARCHAR(100), -- brochures, guides, cahiers-charges, devis, contrats, factures, offres, rapports, presentations, autres
  tags TEXT[], -- Array de tags
  
  -- Statistiques
  download_count INTEGER DEFAULT 0,
  
  -- Gestion
  uploaded_by VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour améliorer les performances
CREATE INDEX idx_documents_category ON documents_library(category);
CREATE INDEX idx_documents_active ON documents_library(is_active);
CREATE INDEX idx_documents_created ON documents_library(created_at DESC);
CREATE INDEX idx_documents_tags ON documents_library USING GIN(tags);

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_documents_library_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour updated_at
DROP TRIGGER IF EXISTS trigger_update_documents_library_updated_at ON documents_library;
CREATE TRIGGER trigger_update_documents_library_updated_at
  BEFORE UPDATE ON documents_library
  FOR EACH ROW
  EXECUTE FUNCTION update_documents_library_updated_at();

-- RLS (Row Level Security)
ALTER TABLE documents_library ENABLE ROW LEVEL SECURITY;

-- Politique pour lecture publique (documents actifs)
DROP POLICY IF EXISTS "Lecture publique des documents actifs" ON documents_library;
CREATE POLICY "Lecture publique des documents actifs" ON documents_library
  FOR SELECT
  USING (is_active = true);

-- Politique pour admin complet
DROP POLICY IF EXISTS "Admin complet sur documents_library" ON documents_library;
CREATE POLICY "Admin complet sur documents_library" ON documents_library
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Commentaires
COMMENT ON TABLE documents_library IS 'Bibliothèque de documents PDF, Excel, etc.';
COMMENT ON COLUMN documents_library.file_name IS 'Nom du fichier stocké (avec timestamp)';
COMMENT ON COLUMN documents_library.original_name IS 'Nom original du fichier uploadé';
COMMENT ON COLUMN documents_library.file_url IS 'URL complète vers le fichier dans Supabase Storage';
COMMENT ON COLUMN documents_library.category IS 'Catégorie: brochures, guides, cahiers-charges, devis, contrats, factures, offres, rapports, presentations, autres';
COMMENT ON COLUMN documents_library.tags IS 'Tags pour recherche (array)';

-- Message de confirmation
DO $$
BEGIN
  RAISE NOTICE 'Table documents_library créée avec succès !';
  RAISE NOTICE 'La table est vide et prête à recevoir vos documents.';
END $$;
