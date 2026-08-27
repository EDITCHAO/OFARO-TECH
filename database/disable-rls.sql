-- Désactiver Row Level Security pour permettre les insertions depuis l'application
-- À exécuter dans Supabase SQL Editor

ALTER TABLE quote_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE service_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE internship_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE request_history DISABLE ROW LEVEL SECURITY;

-- Note: En production, vous devriez créer des policies RLS appropriées
-- au lieu de désactiver complètement RLS
