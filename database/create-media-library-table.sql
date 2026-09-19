-- Table pour la médiathèque (images)
CREATE TABLE IF NOT EXISTS media_library (
  id SERIAL PRIMARY KEY,
  
  -- Informations du fichier
  file_name VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER, -- Taille en octets
  mime_type VARCHAR(100), -- image/jpeg, image/png, etc.
  
  -- Dimensions
  width INTEGER,
  height INTEGER,
  
  -- Métadonnées
  alt_text VARCHAR(500),
  caption TEXT,
  category VARCHAR(100), -- portfolio, blog, team, icons, etc.
  
  -- Gestion
  uploaded_by VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_media_category ON media_library(category);
CREATE INDEX IF NOT EXISTS idx_media_active ON media_library(is_active);
CREATE INDEX IF NOT EXISTS idx_media_created ON media_library(created_at DESC);

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

-- Commentaires
COMMENT ON TABLE media_library IS 'Médiathèque centralisée pour toutes les images du site';
COMMENT ON COLUMN media_library.file_name IS 'Nom du fichier stocké (avec timestamp)';
COMMENT ON COLUMN media_library.original_name IS 'Nom original du fichier uploadé';
COMMENT ON COLUMN media_library.file_url IS 'URL complète vers l''image dans Supabase Storage';
COMMENT ON COLUMN media_library.category IS 'Catégorie: portfolio, blog, team, icons, banners, etc.';

-- RLS (Row Level Security)
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;

-- Politique pour lecture publique
CREATE POLICY "Lecture publique des médias actifs" ON media_library
  FOR SELECT
  USING (is_active = true);

-- Politique pour admin
CREATE POLICY "Admin complet sur media_library" ON media_library
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Vérification : Afficher la structure de la table
SELECT column_name, data_type, character_maximum_length, is_nullable
FROM information_schema.columns
WHERE table_name = 'media_library'
ORDER BY ordinal_position;
