-- =====================================================
-- TABLE TÉMOIGNAGES CLIENTS
-- =====================================================

-- Supprimer la table si elle existe
DROP TABLE IF EXISTS testimonials CASCADE;

-- Créer la table
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  
  -- Informations du client
  client_name VARCHAR(255) NOT NULL,
  client_position VARCHAR(255) NOT NULL, -- Poste du client
  client_company VARCHAR(255) NOT NULL, -- Entreprise du client
  client_photo_url TEXT, -- Photo du client (optionnel)
  
  -- Contenu du témoignage
  testimonial_text TEXT NOT NULL, -- Le témoignage complet
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5), -- Note sur 5
  
  -- Métadonnées
  is_featured BOOLEAN DEFAULT false, -- Mis en avant sur la page d'accueil
  display_order INTEGER DEFAULT 0, -- Ordre d'affichage
  is_active BOOLEAN DEFAULT true, -- Actif/Inactif
  
  -- Dates
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour améliorer les performances
CREATE INDEX idx_testimonials_active ON testimonials(is_active);
CREATE INDEX idx_testimonials_featured ON testimonials(is_featured);
CREATE INDEX idx_testimonials_order ON testimonials(display_order);

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_testimonials_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour updated_at
DROP TRIGGER IF EXISTS trigger_update_testimonials_updated_at ON testimonials;
CREATE TRIGGER trigger_update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_testimonials_updated_at();

-- RLS (Row Level Security)
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Politique pour lecture publique (témoignages actifs uniquement)
DROP POLICY IF EXISTS "Lecture publique des témoignages actifs" ON testimonials;
CREATE POLICY "Lecture publique des témoignages actifs" ON testimonials
  FOR SELECT
  USING (is_active = true);

-- Politique pour admin complet
DROP POLICY IF EXISTS "Admin complet sur testimonials" ON testimonials;
CREATE POLICY "Admin complet sur testimonials" ON testimonials
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Commentaires
COMMENT ON TABLE testimonials IS 'Témoignages et avis clients';
COMMENT ON COLUMN testimonials.client_name IS 'Nom complet du client';
COMMENT ON COLUMN testimonials.client_position IS 'Poste/Fonction du client';
COMMENT ON COLUMN testimonials.client_company IS 'Entreprise du client';
COMMENT ON COLUMN testimonials.client_photo_url IS 'URL de la photo du client';
COMMENT ON COLUMN testimonials.testimonial_text IS 'Contenu du témoignage';
COMMENT ON COLUMN testimonials.rating IS 'Note sur 5 étoiles (1-5)';
COMMENT ON COLUMN testimonials.is_featured IS 'Mis en avant sur la page d''accueil';
COMMENT ON COLUMN testimonials.display_order IS 'Ordre d''affichage (plus petit = premier)';

-- Insérer les témoignages existants (depuis votre admin)
INSERT INTO testimonials (
  client_name, 
  client_position, 
  client_company, 
  testimonial_text, 
  rating, 
  is_featured,
  display_order
) VALUES 
(
  'Dr. Kofi MENSAH',
  'Directeur Général',
  'Hôpital Central de Lomé',
  'OFARO TECH a transformé notre gestion hospitalière. Le système qu''ils ont développé est intuitif, performant et a considérablement amélioré notre efficacité opérationnelle. Je recommande vivement leurs services.',
  5,
  true,
  1
),
(
  'Mme Aïcha DIALLO',
  'Responsable IT',
  'Banque Atlantique Togo',
  'L''équipe d''OFARO TECH a fait un travail exceptionnel sur notre infrastructure réseau. Leur professionnalisme et leur expertise technique sont remarquables. Nous sommes très satisfaits des résultats.',
  5,
  true,
  2
),
(
  'M. Jean-Pierre KOUASSI',
  'CEO',
  'TechStart Solutions',
  'Grâce à OFARO TECH, nous avons pu lancer notre application mobile dans les délais. Leur accompagnement tout au long du projet a été précieux. Une équipe réactive et compétente.',
  5,
  true,
  3
),
(
  'Mme Patricia AGBOM',
  'Directrice',
  'École Internationale de Lomé',
  'La plateforme e-learning développée par OFARO TECH a révolutionné notre façon d''enseigner. Les élèves et les parents sont très satisfaits de cette solution moderne et facile d''utilisation.',
  5,
  true,
  4
),
(
  'M. Abdoul RAHMAN',
  'Fondateur',
  'Ministère de l''Éducation',
  'OFARO TECH nous accompagne depuis 3 ans dans notre transformation digitale. Leur sérieux, leur disponibilité et la qualité de leur prestations font d''eux un partenaire de confiance.',
  5,
  true,
  5
),
(
  'M. Emmanuel KOFFI',
  'Gérant',
  'Supermarché le Bon Prix',
  'Le système de gestion de stock et de caisse installé par OFARO TECH nous a fait gagner en efficacité et en transparence dans notre gestion quotidienne.',
  5,
  true,
  6
);

-- Message de confirmation
DO $$
BEGIN
  RAISE NOTICE '✅ Table testimonials créée avec succès !';
  RAISE NOTICE '📊 6 témoignages d''exemple insérés.';
  RAISE NOTICE '⭐ Tous les témoignages ont une note de 5/5.';
END $$;
