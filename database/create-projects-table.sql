-- Table des projets/réalisations
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- web, mobile, design, network
    description TEXT NOT NULL,
    client_name VARCHAR(255),
    duration VARCHAR(100), -- ex: "6 mois"
    year VARCHAR(10), -- ex: "2025"
    image_url TEXT, -- URL de l'image uploadée dans Supabase Storage
    technologies JSONB, -- Array de technologies: ["Next.js", "Node.js"]
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'archived', 'draft')),
    display_order INTEGER DEFAULT 0, -- Pour l'ordre d'affichage
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id)
);

-- Index pour améliorer les performances
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_display_order ON projects(display_order);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_projects_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour appeler la fonction
CREATE TRIGGER trigger_update_projects_timestamp
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_projects_updated_at();

-- Politique RLS (Row Level Security)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut lire les projets actifs
CREATE POLICY "Projets actifs publics" ON projects
    FOR SELECT
    USING (status = 'active');

-- Les admins peuvent tout faire (à adapter selon votre système d'auth)
CREATE POLICY "Admins peuvent tout faire" ON projects
    FOR ALL
    USING (true);

-- Créer le bucket Storage pour les images de projets
-- À exécuter dans Supabase Dashboard > Storage
-- INSERT INTO storage.buckets (id, name, public) VALUES ('projects', 'projects', true);

-- Insérer des données de test (optionnel)
INSERT INTO projects (title, category, description, client_name, duration, year, technologies, display_order) VALUES
('Plateforme E-Commerce Multi-vendeurs', 'web', 'Développement d''une plateforme e-commerce complète avec gestion multi-vendeurs, paiement en ligne et système de livraison', 'Confidential', '6 mois', '2025', '["Next.js", "Node.js", "PostgreSQL", "Stripe"]', 1),
('Application Mobile de Gestion Bancaire', 'mobile', 'Application mobile permettant la gestion complète des comptes bancaires, virements et paiements mobiles', 'Banque Atlantique Togo', '8 mois', '2025', '["React Native", "Firebase", "Node.js", "Stripe"]', 2),
('Système de Gestion Hospitalière (ERP)', 'web', 'ERP complet pour la gestion des hôpitaux: patients, rendez-vous, dossiers médicaux, pharmacie et facturation', 'Hôpital Central de Lomé', '10 mois', '2024', '["Laravel", "Vue.js", "MySQL", "WebSocket"]', 3),
('Application de Suivi de Flotte', 'mobile', 'Application mobile et web de géolocalisation et suivi en temps réel d''une flotte de véhicules avec rapports d''activité et alertes automatiques', 'TransLog Togo', '5 mois', '2025', '["Flutter", "Firebase", "Google Maps API"]', 4),
('Identité Visuelle Complète', 'design', 'Création complète d''identité visuelle incluant logo, charte graphique et supports de communication', 'TechCorp Inc.', '3 mois', '2025', '["Adobe Illustrator", "Figma", "Photoshop"]', 5),
('Infrastructure Réseau Sécurisée', 'network', 'Mise en place d''une infrastructure réseau sécurisée avec VPN, firewall et supervision 24/7', 'Groupe Industriel ABC', '4 mois', '2024', '["Cisco", "Mikrotik", "Zabbix", "pfSense"]', 6);
