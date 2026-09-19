-- Table pour les membres de l'équipe OFARO TECH
CREATE TABLE IF NOT EXISTS team_members (
  id SERIAL PRIMARY KEY,
  
  -- Informations personnelles
  full_name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL, -- Fonction/Poste
  department VARCHAR(255), -- Département/Service
  
  -- Détails professionnels
  biography TEXT,
  skills TEXT, -- Compétences/Spécialités (JSON array ou texte)
  experience VARCHAR(100), -- Ex: "5 ans", "10+ ans"
  
  -- Contact
  professional_email VARCHAR(255),
  phone VARCHAR(50),
  
  -- Photo
  photo_url TEXT,
  
  -- Affichage
  display_on_site BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0, -- Pour l'ordre d'affichage
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_team_display ON team_members(display_on_site, display_order);
CREATE INDEX IF NOT EXISTS idx_team_active ON team_members(is_active);
CREATE INDEX IF NOT EXISTS idx_team_department ON team_members(department);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_team_members_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour updated_at
DROP TRIGGER IF EXISTS trigger_update_team_members_updated_at ON team_members;
CREATE TRIGGER trigger_update_team_members_updated_at
  BEFORE UPDATE ON team_members
  FOR EACH ROW
  EXECUTE FUNCTION update_team_members_updated_at();

-- Données d'exemple (optionnel - à supprimer après tests)
INSERT INTO team_members (full_name, position, department, biography, skills, experience, professional_email, phone, display_on_site, display_order) VALUES
('Jean-Baptiste KOUAME', 'Directeur Général & Fondateur', 'Direction', 'Passionné par l''innovation technologique et l''entrepreneuriat, Jean-Baptiste a fondé OFARO TECH avec la vision de transformer les idées en solutions numériques impactantes.', 'Leadership, Stratégie d''entreprise, Gestion de projet, Innovation', '10+ ans', 'jb.kouame@ofaro-tech.com', '+228 XX XX XX XX', true, 1),
('Marie ASSOU', 'Directrice Technique', 'Développement', 'Experte en architecture logicielle avec une passion pour les technologies émergentes. Marie dirige notre équipe technique avec excellence.', 'Architecture logicielle, Cloud Computing, DevOps, IA', '8 ans', 'marie.assou@ofaro-tech.com', '+228 XX XX XX XX', true, 2),
('Kofi MENSAH', 'Chef de Projet Digital', 'Gestion de Projet', 'Spécialiste en transformation digitale, Kofi accompagne nos clients dans la réalisation de leurs projets les plus ambitieux.', 'Gestion de projet, Agilité, Transformation digitale', '6 ans', 'kofi.mensah@ofaro-tech.com', '+228 XX XX XX XX', true, 3),
('Aïcha TRAORE', 'Designer UX/UI Lead', 'Design', 'Créative et centrée sur l''utilisateur, Aïcha conçoit des expériences digitales mémorables et intuitives.', 'UX/UI Design, Design Thinking, Prototypage, Figma', '5 ans', 'aicha.traore@ofaro-tech.com', '+228 XX XX XX XX', true, 4);

-- Commentaires sur la table
COMMENT ON TABLE team_members IS 'Table contenant les profils des membres de l''équipe OFARO TECH';
COMMENT ON COLUMN team_members.display_on_site IS 'Détermine si le profil doit être affiché publiquement sur le site';
COMMENT ON COLUMN team_members.display_order IS 'Ordre d''affichage sur le site (plus petit = affiché en premier)';
COMMENT ON COLUMN team_members.skills IS 'Compétences et spécialités du membre (peut être un JSON array ou texte séparé par virgules)';

-- RLS (Row Level Security) - À configurer selon vos besoins
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Politique pour lecture publique (uniquement les profils actifs et à afficher)
CREATE POLICY "Lecture publique des profils actifs" ON team_members
  FOR SELECT
  USING (display_on_site = true AND is_active = true);

-- Politique pour admin (toutes opérations) - À adapter selon votre système d'authentification
CREATE POLICY "Admin complet sur team_members" ON team_members
  FOR ALL
  USING (true)
  WITH CHECK (true);
