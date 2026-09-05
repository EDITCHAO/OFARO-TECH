-- ============================================================================
-- Migration SIMPLIFIÉE: Mise à jour uniquement quote_requests et contact_messages
-- ============================================================================

-- ÉTAPE 1: QUOTE_REQUESTS
UPDATE quote_requests SET status = 'en_cours_de_traitement' WHERE status = 'en_cours';
ALTER TABLE quote_requests DROP CONSTRAINT IF EXISTS quote_requests_status_check;
ALTER TABLE quote_requests ADD CONSTRAINT quote_requests_status_check 
CHECK (status IN ('nouveau', 'en_analyse', 'en_cours_de_traitement', 'traite', 'sans_suite'));

-- ÉTAPE 2: CONTACT_MESSAGES
UPDATE contact_messages SET status = 'en_cours_de_traitement' WHERE status = 'en_cours';
ALTER TABLE contact_messages DROP CONSTRAINT IF EXISTS contact_messages_status_check;
ALTER TABLE contact_messages ADD CONSTRAINT contact_messages_status_check 
CHECK (status IN ('nouveau', 'en_analyse', 'en_cours_de_traitement', 'traite', 'sans_suite'));

-- Fin
