-- ============================================================================
-- Migration: Ajouter les champs image aux offres d'emploi et créer les offres de stage
-- Date: 2025-02-04
-- ============================================================================

-- Ajouter les colonnes d'image à la table job_offers
ALTER TABLE job_offers 
ADD COLUMN IF NOT EXISTS image_url VARCHAR(500),
ADD COLUMN IF NOT EXISTS image_alt VARCHAR(255);

-- Créer la table des offres de stage
CREATE TABLE IF NOT EXISTS internship_offers (
    id SERIAL PRIMARY KEY,
    reference VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(255),
    duration VARCHAR(100),
    location VARCHAR(255),
    work_mode VARCHAR(100),
    -- Image de l'offre
    image_url VARCHAR(500),
    image_alt VARCHAR(255),
    -- Description
    description TEXT NOT NULL,
    missions TEXT,
    required_skills TEXT,
    profile TEXT,
    education_level VARCHAR(100),
    benefits TEXT,
    -- Dates et statut
    publication_date DATE,
    application_deadline DATE,
    start_date DATE,
    status VARCHAR(50) DEFAULT 'brouillon' CHECK (status IN ('brouillon', 'publiee', 'suspendue', 'expiree', 'archivee')),
    -- Métadonnées
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP
);

-- Créer les index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_internship_offers_status ON internship_offers(status);
CREATE INDEX IF NOT EXISTS idx_internship_offers_published ON internship_offers(publication_date DESC);
CREATE INDEX IF NOT EXISTS idx_internship_offers_reference ON internship_offers(reference);

-- Ajouter un commentaire pour la documentation
COMMENT ON TABLE internship_offers IS 'Table des offres de stage publiées sur le site';
COMMENT ON COLUMN job_offers.image_url IS 'URL de l''image illustrant l''offre d''emploi';
COMMENT ON COLUMN job_offers.image_alt IS 'Texte alternatif pour l''accessibilité de l''image';
COMMENT ON COLUMN internship_offers.image_url IS 'URL de l''image illustrant l''offre de stage';
COMMENT ON COLUMN internship_offers.image_alt IS 'Texte alternatif pour l''accessibilité de l''image';

-- ============================================================================
-- Données de test (optionnel - à commenter en production)
-- ============================================================================

-- Exemple d'offre d'emploi avec image
INSERT INTO job_offers (
    reference, 
    title, 
    department, 
    contract_type, 
    location, 
    work_mode,
    image_url,
    image_alt,
    description, 
    missions, 
    required_skills, 
    profile,
    education_level,
    experience_level,
    publication_date,
    application_deadline,
    status
) VALUES (
    'JOB-2025-001',
    'Développeur Full Stack',
    'Département Technique',
    'CDI',
    'Lomé, Togo',
    'Hybride',
    '/images/offers/fullstack-developer.jpg',
    'Développeur travaillant sur un ordinateur',
    'Nous recherchons un développeur Full Stack passionné pour rejoindre notre équipe technique dynamique.',
    '- Développer des applications web et mobile\n- Participer à la conception technique\n- Assurer la maintenance des projets',
    '- JavaScript, TypeScript, React, Node.js\n- SQL et NoSQL\n- Git et méthodologies agiles',
    'Développeur avec une expérience significative en développement web moderne',
    'Licence/Master en Informatique',
    '3-5 ans',
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '30 days',
    'publiee'
);

-- Exemple d'offre de stage avec image
INSERT INTO internship_offers (
    reference,
    title,
    department,
    duration,
    location,
    work_mode,
    image_url,
    image_alt,
    description,
    missions,
    required_skills,
    profile,
    education_level,
    benefits,
    publication_date,
    application_deadline,
    start_date,
    status
) VALUES (
    'STAGE-2025-001',
    'Stage en Développement Web',
    'Département Technique',
    '6 mois',
    'Lomé, Togo',
    'Présentiel',
    '/images/offers/web-development-internship.jpg',
    'Stagiaire en développement web',
    'Stage de 6 mois pour découvrir le développement web professionnel au sein d''une équipe expérimentée.',
    '- Participer au développement de projets web\n- Apprendre les bonnes pratiques du développement\n- Contribuer à la documentation technique',
    '- Bases en HTML, CSS, JavaScript\n- Notions de React ou Vue.js\n- Motivation et curiosité',
    'Étudiant en informatique motivé par le développement web',
    'Licence 3 ou Master 1',
    '- Encadrement par des développeurs seniors\n- Formation continue\n- Possibilité d''embauche à l''issue du stage',
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '45 days',
    CURRENT_DATE + INTERVAL '60 days',
    'publiee'
);

-- ============================================================================
-- Fin de la migration
-- ============================================================================
