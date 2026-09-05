-- Diagnostic complet pour les candidatures

-- 1. Voir TOUS les statuts actuels dans applications
SELECT status, COUNT(*) as count 
FROM applications 
GROUP BY status 
ORDER BY status;

-- 2. Vérifier si la contrainte existe
SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conrelid = 'applications'::regclass 
AND contype = 'c';

-- 3. Voir quelques exemples de candidatures
SELECT id, first_name, last_name, status, submitted_at 
FROM applications 
ORDER BY submitted_at DESC 
LIMIT 5;
