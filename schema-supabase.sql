-- ============================================================================
-- OFARO TECH - Schéma de base de données Back-office
-- ============================================================================

-- Table des utilisateurs du back-office
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('administrateur', 'editeur', 'commercial', 'rh')),
    is_active BOOLEAN DEFAULT true,
    two_factor_enabled BOOLEAN DEFAULT false,
    two_factor_secret VARCHAR(255),
    last_login_at TIMESTAMP,
    last_login_ip VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des logs de connexion
CREATE TABLE IF NOT EXISTS login_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    success BOOLEAN NOT NULL,
    attempt_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des tentatives de connexion échouées (anti brute-force)
CREATE TABLE IF NOT EXISTS failed_login_attempts (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    attempts INTEGER DEFAULT 1,
    locked_until TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des demandes de devis
CREATE TABLE IF NOT EXISTS quote_requests (
    id SERIAL PRIMARY KEY,
    -- Informations demandeur
    company_name VARCHAR(255) NOT NULL,
    sector VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    city VARCHAR(100),
    -- Informations projet
    services TEXT NOT NULL, -- JSON array des services
    project_description TEXT NOT NULL,
    has_logo BOOLEAN DEFAULT false,
    has_domain BOOLEAN DEFAULT false,
    key_feature TEXT,
    expected_result TEXT,
    budget VARCHAR(100),
    -- Contact projet
    contact_first_name VARCHAR(100) NOT NULL,
    contact_last_name VARCHAR(100) NOT NULL,
    desired_delivery_date DATE,
    -- Statut et suivi
    status VARCHAR(50) DEFAULT 'nouveau' CHECK (status IN ('nouveau', 'en_cours', 'traite', 'sans_suite')),
    assigned_to INTEGER REFERENCES users(id),
    notes TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des pièces jointes des devis
CREATE TABLE IF NOT EXISTS quote_attachments (
    id SERIAL PRIMARY KEY,
    quote_request_id INTEGER REFERENCES quote_requests(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des messages de contact
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    status VARCHAR(50) DEFAULT 'nouveau' CHECK (status IN ('nouveau', 'en_cours', 'traite')),
    assigned_to INTEGER REFERENCES users(id),
    response TEXT,
    responded_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des demandes de services spécifiques
CREATE TABLE IF NOT EXISTS service_requests (
    id SERIAL PRIMARY KEY,
    -- Informations client
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50) NOT NULL,
    company_name VARCHAR(255),
    -- Informations demande
    service_type VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    urgency VARCHAR(50), -- normale, urgent, très urgent
    budget_range VARCHAR(100),
    -- Suivi
    status VARCHAR(50) DEFAULT 'nouvelle' CHECK (status IN ('nouvelle', 'en_analyse', 'en_cours', 'terminee', 'en_attente', 'rejetee', 'archivee')),
    assigned_to INTEGER REFERENCES users(id),
    internal_notes TEXT,
    reference_number VARCHAR(50) UNIQUE, -- SR-001, SR-002, etc.
    -- Dates
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Table des demandes de stage
CREATE TABLE IF NOT EXISTS internship_requests (
    id SERIAL PRIMARY KEY,
    -- Informations personnelles
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address TEXT,
    date_of_birth DATE,
    -- Informations formation
    institution VARCHAR(255), -- Établissement
    field_of_study VARCHAR(255), -- Domaine de formation
    education_level VARCHAR(100), -- Licence, Master, etc.
    -- Informations stage
    internship_type VARCHAR(100), -- Stage académique, stage professionnel, etc.
    desired_duration VARCHAR(100), -- 3 mois, 6 mois, etc.
    desired_period_start DATE, -- Date de début souhaitée
    desired_period_end DATE, -- Date de fin souhaitée
    internship_objectives TEXT, -- Objectifs du stage
    -- Documents
    cv_file_name VARCHAR(255),
    cv_file_path VARCHAR(500),
    cover_letter_file_name VARCHAR(255),
    cover_letter_file_path VARCHAR(500),
    other_documents TEXT, -- JSON array de fichiers
    -- Suivi
    status VARCHAR(50) DEFAULT 'nouvelle' CHECK (status IN ('nouvelle', 'en_analyse', 'dossier_incomplet', 'entretien', 'acceptee', 'refusee', 'stage_en_cours', 'stage_termine', 'annulee', 'archivee')),
    assigned_to INTEGER REFERENCES users(id),
    internal_notes TEXT,
    reference_number VARCHAR(50) UNIQUE, -- ST-001, ST-002, etc.
    -- Dates
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    interview_date TIMESTAMP,
    start_date DATE,
    end_date DATE
);

-- Table des offres d'emploi
CREATE TABLE IF NOT EXISTS job_offers (
    id SERIAL PRIMARY KEY,
    reference VARCHAR(50) UNIQUE NOT NULL, -- Référence de l'offre
    title VARCHAR(255) NOT NULL, -- Titre du poste
    department VARCHAR(255), -- Service/Département
    contract_type VARCHAR(100), -- CDI, CDD, Stage, Freelance, etc.
    location VARCHAR(255), -- Localisation
    work_mode VARCHAR(100), -- Présentiel, Remote, Hybride
    -- Description
    description TEXT NOT NULL,
    missions TEXT, -- Liste des missions
    responsibilities TEXT, -- Responsabilités
    required_skills TEXT, -- Compétences recherchées
    profile TEXT, -- Profil recherché
    education_level VARCHAR(100), -- Niveau d'étude
    experience_level VARCHAR(100), -- Niveau d'expérience
    -- Dates et statut
    publication_date DATE,
    application_deadline DATE,
    status VARCHAR(50) DEFAULT 'brouillon' CHECK (status IN ('brouillon', 'publiee', 'suspendue', 'expiree', 'archivee')),
    -- Métadonnées
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP
);

-- Table des candidatures
CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    -- Type de candidature
    application_type VARCHAR(50) CHECK (application_type IN ('offre', 'spontanee')),
    job_offer_id INTEGER REFERENCES job_offers(id) ON DELETE SET NULL,
    -- Informations personnelles
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address TEXT,
    -- Informations professionnelles
    position_sought VARCHAR(255), -- Poste recherché (pour spontanée)
    education_level VARCHAR(100),
    professional_experience TEXT, -- Expérience professionnelle
    skills TEXT, -- Compétences
    -- Documents
    cv_file_name VARCHAR(255),
    cv_file_path VARCHAR(500),
    cover_letter_file_name VARCHAR(255),
    cover_letter_file_path VARCHAR(500),
    portfolio_url VARCHAR(500),
    additional_message TEXT,
    -- Suivi
    status VARCHAR(50) DEFAULT 'nouvelle' CHECK (status IN ('nouvelle', 'en_analyse', 'preselectionee', 'entretien', 'acceptee', 'refusee', 'dossier_incomplet', 'en_attente', 'retiree', 'archivee')),
    assigned_to INTEGER REFERENCES users(id),
    internal_notes TEXT,
    reference_number VARCHAR(50) UNIQUE, -- APP-001, APP-002, etc.
    -- Dates
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    interview_date TIMESTAMP
);

-- Table des réalisations (portfolio)
CREATE TABLE IF NOT EXISTS realizations (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    client_name VARCHAR(255),
    client_sector VARCHAR(255),
    description TEXT NOT NULL,
    technologies TEXT, -- JSON array
    project_url VARCHAR(500),
    main_image VARCHAR(500),
    gallery TEXT, -- JSON array d'images
    is_published BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP
);

-- Table des articles/actualités
CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image VARCHAR(500),
    author_id INTEGER REFERENCES users(id),
    category VARCHAR(100),
    tags TEXT, -- JSON array
    is_published BOOLEAN DEFAULT false,
    views_count INTEGER DEFAULT 0,
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP
);

-- Table des témoignages
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    position VARCHAR(255),
    testimonial TEXT NOT NULL,
    photo VARCHAR(500),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    is_published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des clients
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    sector VARCHAR(255),
    logo VARCHAR(500),
    website VARCHAR(500),
    contact_name VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    description TEXT,
    projects_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des membres de l'équipe
CREATE TABLE IF NOT EXISTS team_members (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    position VARCHAR(255) NOT NULL,
    bio TEXT,
    photo VARCHAR(500),
    email VARCHAR(255),
    linkedin VARCHAR(500),
    display_order INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table de la médiathèque
CREATE TABLE IF NOT EXISTS media_library (
    id SERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(50), -- image, video, document, etc.
    mime_type VARCHAR(100),
    file_size INTEGER,
    width INTEGER, -- pour images
    height INTEGER, -- pour images
    alt_text VARCHAR(255),
    title VARCHAR(255),
    uploaded_by INTEGER REFERENCES users(id),
    folder VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des documents téléchargeables
CREATE TABLE IF NOT EXISTS downloadable_documents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER,
    download_count INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des paramètres SEO par page
CREATE TABLE IF NOT EXISTS seo_settings (
    id SERIAL PRIMARY KEY,
    page_name VARCHAR(255) UNIQUE NOT NULL,
    page_url VARCHAR(500) NOT NULL,
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    og_title VARCHAR(255),
    og_description TEXT,
    og_image VARCHAR(500),
    canonical_url VARCHAR(500),
    robots VARCHAR(50) DEFAULT 'index, follow',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table centralisée des contacts/clients
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    -- Informations de base
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    company_name VARCHAR(255),
    -- Classification
    contact_type VARCHAR(50) DEFAULT 'prospect' CHECK (contact_type IN ('prospect', 'client', 'candidat', 'stagiaire')),
    status VARCHAR(50) DEFAULT 'actif' CHECK (status IN ('actif', 'inactif', 'blacklist')),
    -- Statistiques
    total_requests INTEGER DEFAULT 0,
    total_quotes INTEGER DEFAULT 0,
    total_messages INTEGER DEFAULT 0,
    total_applications INTEGER DEFAULT 0,
    total_internships INTEGER DEFAULT 0,
    -- Métadonnées
    source VARCHAR(100), -- Site web, Référence, LinkedIn, etc.
    tags TEXT, -- JSON array de tags
    notes TEXT, -- Notes générales sur le contact
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_contact_at TIMESTAMP
);

-- Table d'historique des demandes (toutes catégories)
CREATE TABLE IF NOT EXISTS request_history (
    id SERIAL PRIMARY KEY,
    -- Référence à l'entité
    entity_type VARCHAR(50) NOT NULL, -- service_request, quote_request, contact_message, internship_request, application
    entity_id INTEGER NOT NULL,
    reference_number VARCHAR(50), -- SR-001, DV-001, MSG-001, ST-001, APP-001
    -- Action
    action VARCHAR(100) NOT NULL, -- created, status_changed, assigned, note_added, etc.
    old_status VARCHAR(50),
    new_status VARCHAR(50),
    description TEXT,
    -- Utilisateur
    user_id INTEGER REFERENCES users(id),
    user_name VARCHAR(255),
    -- Métadonnées
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des statistiques du site
CREATE TABLE IF NOT EXISTS site_statistics (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    visitors_count INTEGER DEFAULT 0,
    page_views INTEGER DEFAULT 0,
    quote_requests_count INTEGER DEFAULT 0,
    contact_messages_count INTEGER DEFAULT 0,
    applications_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- Index pour optimisation des performances
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON quote_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON contact_messages(is_read);
CREATE INDEX IF NOT EXISTS idx_realizations_is_published ON realizations(is_published);
CREATE INDEX IF NOT EXISTS idx_realizations_slug ON realizations(slug);
CREATE INDEX IF NOT EXISTS idx_articles_is_published ON articles(is_published);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_media_library_uploaded_by ON media_library(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_site_statistics_date ON site_statistics(date DESC);

-- ============================================================================
-- Données initiales
-- ============================================================================

-- Utilisateur administrateur par défaut (mot de passe: Admin@2025)
INSERT INTO users (email, password_hash, first_name, last_name, role, is_active) 
VALUES (
    'admin@ofarotech.com',
    '$2a$10$rZ3qKX.xqKJHX5YqC8qVXe3QQh8j9KX.PYHx8j9KX.PYHx8j9KX.PY', -- À hasher avec bcrypt
    'Admin',
    'OFARO TECH',
    'administrateur',
    true
)
ON CONFLICT (email) DO NOTHING;

-- Paramètres SEO des pages principales
INSERT INTO seo_settings (page_name, page_url, meta_title, meta_description) VALUES
('Accueil', '/', 'OFARO TECH - Solutions IT & Transformation Digitale au Togo', 'Entreprise spécialisée en développement web, mobile, cybersécurité et conseil IT basée à Lomé, Togo.'),
('À propos', '/a-propos', 'À propos - OFARO TECH', 'Découvrez OFARO TECH, votre partenaire de confiance pour la transformation digitale au Togo.'),
('Services', '/services', 'Nos Services - OFARO TECH', 'Développement web, mobile, cybersécurité, réseaux et maintenance informatique.'),
('Réalisations', '/realisations', 'Nos Réalisations - OFARO TECH', 'Découvrez nos projets réussis et notre expertise technique.'),
('Secteurs', '/secteurs', 'Secteurs d''activité - OFARO TECH', 'Nous servons les banques, l''éducation, la santé, le commerce et l''administration publique.'),
('Contact', '/contact', 'Contact - OFARO TECH', 'Contactez-nous pour vos projets IT et obtenez un devis personnalisé.')
ON CONFLICT (page_name) DO NOTHING;

-- ============================================================================
-- Fin du schéma
-- ============================================================================
