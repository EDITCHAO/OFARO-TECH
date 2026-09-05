-- ============================================================================
-- MIGRATION ULTRA-SÉCURISÉE: Suppression des contraintes d'abord
-- Cette version évite les erreurs de contrainte
-- ============================================================================

-- ÉTAPE 1: Supprimer TOUTES les contraintes CHECK
ALTER TABLE service_requests DROP CONSTRAINT IF EXISTS service_requests_status_check;
ALTER TABLE contact_messages DROP CONSTRAINT IF EXISTS contact_messages_status_check;
ALTER TABLE applications DROP CONSTRAINT IF EXISTS applications_status_check;


-- ÉTAPE 2: Mettre à jour les données sans contraintes

-- SERVICE_REQUESTS
UPDATE service_requests SET status = 'nouveau' WHERE status IN ('nouvelle', 'Nouveau', 'Nouvelle');
UPDATE service_requests SET status = 'en_analyse' WHERE status = 'En analyse';
UPDATE service_requests SET status = 'en_cours_de_traitement' WHERE status IN ('en_cours', 'En cours', 'En cours de traitement');
UPDATE service_requests SET status = 'traite' WHERE status IN ('terminee', 'Traité', 'Traite');
UPDATE service_requests SET status = 'rejete' WHERE status IN ('rejetee', 'Rejeté', 'Rejete', 'refusee');
UPDATE service_requests SET status = 'sans_suite' WHERE status = 'Sans suite';

-- CONTACT_MESSAGES
UPDATE contact_messages SET status = 'nouveau' WHERE status IN ('Nouveau', 'Nouvelle', 'nouvelle');
UPDATE contact_messages SET status = 'en_analyse' WHERE status = 'En analyse';
UPDATE contact_messages SET status = 'en_cours_de_traitement' WHERE status IN ('en_cours', 'En cours', 'En cours de traitement');
UPDATE contact_messages SET status = 'traite' WHERE status IN ('Traité', 'Traite');
UPDATE contact_messages SET status = 'sans_suite' WHERE status = 'Sans suite';

-- APPLICATIONS
UPDATE applications SET status = 'nouvelle' WHERE status IN ('Nouvelle', 'nouveau');
UPDATE applications SET status = 'en_analyse' WHERE status IN ('En analyse', 'en_analyse');
UPDATE applications SET status = 'en_cours_de_traitement' WHERE status IN ('entretien', 'Entretien', 'en_cours', 'En cours de traitement');
UPDATE applications SET status = 'retenu' WHERE status IN ('acceptee', 'Retenu', 'preselectionee', 'acceptée');
UPDATE applications SET status = 'rejete' WHERE status IN ('refusee', 'Rejeté', 'Rejete', 'rejetee', 'refusée');
UPDATE applications SET status = 'sans_suite' WHERE status = 'Sans suite';
UPDATE applications SET status = 'retire' WHERE status IN ('retiree', 'Retiré', 'retirée');


-- ÉTAPE 3: Recréer les contraintes avec les nouveaux statuts

ALTER TABLE service_requests ADD CONSTRAINT service_requests_status_check 
CHECK (status IN ('nouveau', 'en_analyse', 'en_cours_de_traitement', 'traite', 'sans_suite', 'en_attente', 'rejete', 'archivee'));

ALTER TABLE contact_messages ADD CONSTRAINT contact_messages_status_check 
CHECK (status IN ('nouveau', 'en_analyse', 'en_cours_de_traitement', 'traite', 'sans_suite'));

ALTER TABLE applications ADD CONSTRAINT applications_status_check 
CHECK (status IN ('nouvelle', 'en_analyse', 'en_cours_de_traitement', 'retenu', 'rejete', 'sans_suite', 'dossier_incomplet', 'en_attente', 'retire', 'archivee'));

-- ============================================================================
-- Migration terminée avec succès !
-- ============================================================================
