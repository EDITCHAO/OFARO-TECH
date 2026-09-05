-- ============================================================================
-- Migration: Mise à jour des contraintes de statuts
-- Date: 2026-08-08
-- Description: Mise à jour des statuts autorisés pour les tables
--              quote_requests, contact_messages, service_requests et applications
-- IMPORTANT: Exécuter les commandes UNE PAR UNE dans l'ordre
-- ============================================================================

-- ===== ÉTAPE 1: QUOTE_REQUESTS =====

-- 1.1 Mettre à jour les données existantes AVANT de changer la contrainte
UPDATE quote_requests SET status = 'en_cours_de_traitement' WHERE status = 'en_cours';

-- 1.2 Supprimer l'ancienne contrainte
ALTER TABLE quote_requests DROP CONSTRAINT IF EXISTS quote_requests_status_check;

-- 1.3 Ajouter la nouvelle contrainte
ALTER TABLE quote_requests ADD CONSTRAINT quote_requests_status_check 
CHECK (status IN ('nouveau', 'en_analyse', 'en_cours_de_traitement', 'traite', 'sans_suite'));


-- ===== ÉTAPE 2: CONTACT_MESSAGES =====

-- 2.1 Mettre à jour les données existantes AVANT de changer la contrainte
UPDATE contact_messages SET status = 'en_cours_de_traitement' WHERE status = 'en_cours';

-- 2.2 Supprimer l'ancienne contrainte
ALTER TABLE contact_messages DROP CONSTRAINT IF EXISTS contact_messages_status_check;

-- 2.3 Ajouter la nouvelle contrainte
ALTER TABLE contact_messages ADD CONSTRAINT contact_messages_status_check 
CHECK (status IN ('nouveau', 'en_analyse', 'en_cours_de_traitement', 'traite', 'sans_suite'));


-- ===== ÉTAPE 3: SERVICE_REQUESTS =====

-- 3.1 Mettre à jour les données existantes AVANT de changer la contrainte
UPDATE service_requests SET status = 'nouveau' WHERE status = 'nouvelle';
UPDATE service_requests SET status = 'traite' WHERE status = 'terminee';
UPDATE service_requests SET status = 'rejete' WHERE status = 'rejetee';
UPDATE service_requests SET status = 'en_cours_de_traitement' WHERE status = 'en_cours';

-- 3.2 Supprimer l'ancienne contrainte
ALTER TABLE service_requests DROP CONSTRAINT IF EXISTS service_requests_status_check;

-- 3.3 Ajouter la nouvelle contrainte
ALTER TABLE service_requests ADD CONSTRAINT service_requests_status_check 
CHECK (status IN ('nouveau', 'en_analyse', 'en_cours_de_traitement', 'traite', 'sans_suite', 'en_attente', 'rejete', 'archivee'));


-- ===== ÉTAPE 4: APPLICATIONS =====

-- 4.1 Mettre à jour les données existantes AVANT de changer la contrainte
UPDATE applications SET status = 'retenu' WHERE status IN ('acceptee', 'preselectionee');
UPDATE applications SET status = 'rejete' WHERE status = 'refusee';
UPDATE applications SET status = 'retire' WHERE status = 'retiree';
UPDATE applications SET status = 'en_cours_de_traitement' WHERE status = 'entretien';

-- 4.2 Supprimer l'ancienne contrainte
ALTER TABLE applications DROP CONSTRAINT IF EXISTS applications_status_check;

-- 4.3 Ajouter la nouvelle contrainte
ALTER TABLE applications ADD CONSTRAINT applications_status_check 
CHECK (status IN ('nouvelle', 'en_analyse', 'en_cours_de_traitement', 'retenu', 'rejete', 'sans_suite', 'dossier_incomplet', 'en_attente', 'retire', 'archivee'));

-- ============================================================================
-- Fin de la migration
-- ============================================================================
