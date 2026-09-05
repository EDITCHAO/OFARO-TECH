-- ============================================================================
-- Migration: Ajout du champ is_archived pour le système d'archivage
-- ============================================================================

-- Ajouter is_archived à quote_requests
ALTER TABLE quote_requests 
ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT false;

-- Ajouter is_archived à contact_messages
ALTER TABLE contact_messages 
ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT false;

-- Ajouter is_archived à service_requests
ALTER TABLE service_requests 
ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT false;

-- Ajouter is_archived à applications
ALTER TABLE applications 
ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT false;

-- Ajouter is_archived à internship_requests
ALTER TABLE internship_requests 
ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT false;

-- Créer des index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_quote_requests_is_archived ON quote_requests(is_archived);
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_archived ON contact_messages(is_archived);
CREATE INDEX IF NOT EXISTS idx_service_requests_is_archived ON service_requests(is_archived);
CREATE INDEX IF NOT EXISTS idx_applications_is_archived ON applications(is_archived);
CREATE INDEX IF NOT EXISTS idx_internship_requests_is_archived ON internship_requests(is_archived);

-- ============================================================================
-- Migration terminée
-- ============================================================================
