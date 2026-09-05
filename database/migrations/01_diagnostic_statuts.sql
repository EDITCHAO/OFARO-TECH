-- ============================================================================
-- DIAGNOSTIC: Vérifier les statuts existants dans chaque table
-- INSTRUCTIONS: Exécuter ces requêtes UNE PAR UNE et noter les résultats
-- ============================================================================

-- 1. Statuts existants dans service_requests
SELECT DISTINCT status, COUNT(*) as count 
FROM service_requests 
GROUP BY status 
ORDER BY status;

-- 2. Statuts existants dans contact_messages
SELECT DISTINCT status, COUNT(*) as count 
FROM contact_messages 
GROUP BY status 
ORDER BY status;

-- 3. Statuts existants dans applications
SELECT DISTINCT status, COUNT(*) as count 
FROM applications 
GROUP BY status 
ORDER BY status;

-- ============================================================================
-- NOTE: Garde les résultats pour la prochaine étape
-- ============================================================================
