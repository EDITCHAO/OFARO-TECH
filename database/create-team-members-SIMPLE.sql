-- SCRIPT SIMPLIFIÉ : Création de la table team_members
-- Copiez-collez TOUT ce script dans Supabase SQL Editor et cliquez RUN

-- Supprimer la table si elle existe
DROP TABLE IF EXISTS team_members CASCADE;

-- Créer la table
CREATE TABLE team_members (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  department VARCHAR(255),
  biography TEXT,
  skills TEXT,
  experience VARCHAR(100),
  professional_email VARCHAR(255),
  phone VARCHAR(50),
  photo_url TEXT,
  display_on_site BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Créer les index
CREATE INDEX idx_team_display ON team_members(display_on_site, display_order);
CREATE INDEX idx_team_active ON team_members(is_active);
CREATE INDEX idx_team_department ON team_members(department);

-- Créer la fonction pour updated_at
CREATE OR REPLACE FUNCTION update_team_members_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Créer le trigger
CREATE TRIGGER trigger_update_team_members_updated_at
  BEFORE UPDATE ON team_members
  FOR EACH ROW
  EXECUTE FUNCTION update_team_members_updated_at();

-- Insérer les données d'exemple
INSERT INTO team_members (full_name, position, department, biography, skills, experience, professional_email, phone, display_on_site, display_order) VALUES
('Jean-Baptiste KOUAME', 'Directeur Général & Fondateur', 'Direction', 'Passionné par l''innovation technologique et l''entrepreneuriat, Jean-Baptiste a fondé OFARO TECH avec la vision de transformer les idées en solutions numériques impactantes.', 'Leadership, Stratégie d''entreprise, Gestion de projet, Innovation', '10+ ans', 'jb.kouame@ofaro-tech.com', '+228 XX XX XX XX', true, 1),
('Marie ASSOU', 'Directrice Technique', 'Développement', 'Experte en architecture logicielle avec une passion pour les technologies émergentes. Marie dirige notre équipe technique avec excellence.', 'Architecture logicielle, Cloud Computing, DevOps, IA', '8 ans', 'marie.assou@ofaro-tech.com', '+228 XX XX XX XX', true, 2),
('Kofi MENSAH', 'Chef de Projet Digital', 'Gestion de Projet', 'Spécialiste en transformation digitale, Kofi accompagne nos clients dans la réalisation de leurs projets les plus ambitieux.', 'Gestion de projet, Agilité, Transformation digitale', '6 ans', 'kofi.mensah@ofaro-tech.com', '+228 XX XX XX XX', true, 3),
('Aïcha TRAORE', 'Designer UX/UI Lead', 'Design', 'Créative et centrée sur l''utilisateur, Aïcha conçoit des expériences digitales mémorables et intuitives.', 'UX/UI Design, Design Thinking, Prototypage, Figma', '5 ans', 'aicha.traore@ofaro-tech.com', '+228 XX XX XX XX', true, 4);

-- Activer Row Level Security
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Créer les politiques RLS
CREATE POLICY "Lecture publique des profils actifs" ON team_members
  FOR SELECT
  USING (display_on_site = true AND is_active = true);

CREATE POLICY "Admin complet sur team_members" ON team_members
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Vérification finale
SELECT id, full_name, position, display_on_site FROM team_members ORDER BY display_order;
