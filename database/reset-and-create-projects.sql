-- Script de réinitialisation et création de la table projects
-- À utiliser si la table existe déjà partiellement

-- 1. NETTOYER (supprimer si existe)
DROP TRIGGER IF EXISTS trigger_update_projects_timestamp ON projects;
DROP FUNCTION IF EXISTS update_projects_updated_at();
DROP POLICY IF EXISTS "Admins peuvent tout faire" ON projects;
DROP POLICY IF EXISTS "Projets actifs publics" ON projects;
DROP INDEX IF EXISTS idx_projects_display_order;
DROP INDEX IF EXISTS idx_projects_category;
DROP INDEX IF EXISTS idx_projects_status;
DROP TABLE IF EXISTS projects CASCADE;

-- 2. CRÉER LA TABLE
CREATE TABLE projects (
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
    created_by INTEGER,
    updated_by INTEGER
);

-- 3. CRÉER LES INDEX
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_display_order ON projects(display_order);

-- 4. CRÉER LA FONCTION DE MISE À JOUR
CREATE OR REPLACE FUNCTION update_projects_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. CRÉER LE TRIGGER
CREATE TRIGGER trigger_update_projects_timestamp
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_projects_updated_at();

-- 6. ACTIVER RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 7. CRÉER LES POLICIES
CREATE POLICY "Projets actifs publics" ON projects
    FOR SELECT
    USING (status = 'active');

CREATE POLICY "Admins peuvent tout faire" ON projects
    FOR ALL
    USING (true);

-- 8. INSÉRER DES DONNÉES DE TEST
INSERT INTO projects (title, category, description, client_name, duration, year, technologies, display_order) VALUES
('Plateforme E-Commerce Multi-vendeurs', 'web', 'Développement d''une plateforme e-commerce complète avec gestion multi-vendeurs, paiement en ligne et système de livraison', 'Confidential', '6 mois', '2025', '["Next.js", "Node.js", "PostgreSQL", "Stripe"]', 1),
('Application Mobile de Gestion Bancaire', 'mobile', 'Application mobile permettant la gestion complète des comptes bancaires, virements et paiements mobiles', 'Banque Atlantique Togo', '8 mois', '2025', '["React Native", "Firebase", "Node.js", "Stripe"]', 2),
('Système de Gestion Hospitalière (ERP)', 'web', 'ERP complet pour la gestion des hôpitaux: patients, rendez-vous, dossiers médicaux, pharmacie et facturation', 'Hôpital Central de Lomé', '10 mois', '2024', '["Laravel", "Vue.js", "MySQL", "WebSocket"]', 3),
('Application de Suivi de Flotte', 'mobile', 'Application mobile et web de géolocalisation et suivi en temps réel d''une flotte de véhicules avec rapports d''activité et alertes automatiques', 'TransLog Togo', '5 mois', '2025', '["Flutter", "Firebase", "Google Maps API"]', 4),
('Identité Visuelle Complète', 'design', 'Création complète d''identité visuelle incluant logo, charte graphique et supports de communication', 'TechCorp Inc.', '3 mois', '2025', '["Adobe Illustrator", "Figma", "Photoshop"]', 5),
('Infrastructure Réseau Sécurisée', 'network', 'Mise en place d''une infrastructure réseau sécurisée avec VPN, firewall et supervision 24/7', 'Groupe Industriel ABC', '4 mois', '2024', '["Cisco", "Mikrotik", "Zabbix", "pfSense"]', 6);

-- 9. VÉRIFICATION
SELECT 'Table "projects" créée avec succès !' AS message;
SELECT COUNT(*) AS nombre_projets FROM projects;
