-- =====================================================
-- CRÉATION TABLE MÉDIATHÈQUE (VERSION SIMPLE)
-- =====================================================

-- Supprimer la table si elle existe déjà
DROP TABLE IF EXISTS media_library CASCADE;

-- Créer la table
CREATE TABLE media_library (
  id SERIAL PRIMARY KEY,
  
  -- Informations du fichier
  file_name VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type VARCHAR(100),
  
  -- Dimensions
  width INTEGER,
  height INTEGER,
  
  -- Métadonnées
  alt_text VARCHAR(500),
  caption TEXT,
  category VARCHAR(100),
  
  -- Gestion
  uploaded_by VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour améliorer les performances
CREATE INDEX idx_media_category ON media_library(category);
CREATE INDEX idx_media_active ON media_library(is_active);
CREATE INDEX idx_media_created ON media_library(created_at DESC);

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_media_library_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour updated_at
DROP TRIGGER IF EXISTS trigger_update_media_library_updated_at ON media_library;
CREATE TRIGGER trigger_update_media_library_updated_at
  BEFORE UPDATE ON media_library
  FOR EACH ROW
  EXECUTE FUNCTION update_media_library_updated_at();

-- RLS (Row Level Security)
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;

-- Politique pour lecture publique
DROP POLICY IF EXISTS "Lecture publique des médias actifs" ON media_library;
CREATE POLICY "Lecture publique des médias actifs" ON media_library
  FOR SELECT
  USING (is_active = true);

-- Politique pour admin
DROP POLICY IF EXISTS "Admin complet sur media_library" ON media_library;
CREATE POLICY "Admin complet sur media_library" ON media_library
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Message de succès
DO $$
BEGIN
  RAISE NOTICE 'Table media_library créée avec succès !';
END $$;
