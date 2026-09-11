-- Script pour corriger le statut des demandes de service
-- Toutes les demandes doivent commencer avec le statut 'nouvelle' et non 'en_analyse'

-- 1. Voir les statuts actuels
SELECT id, client_name, status, submitted_at 
FROM service_requests 
WHERE is_archived = false
ORDER BY submitted_at DESC
LIMIT 20;

-- 2. Corriger les demandes qui ont 'en_analyse' comme statut initial
-- On va mettre 'nouvelle' uniquement pour celles qui n'ont jamais été modifiées
UPDATE service_requests 
SET status = 'nouvelle'
WHERE status = 'en_analyse' 
  AND updated_at IS NULL;

-- 3. Alternative : Corriger TOUTES les demandes 'en_analyse' en 'nouvelle'
-- (Décommentez si vous voulez forcer toutes les demandes en analyse à devenir nouvelles)
-- UPDATE service_requests 
-- SET status = 'nouvelle'
-- WHERE status = 'en_analyse';

-- 4. Vérifier le résultat
SELECT id, client_name, status, submitted_at, updated_at
FROM service_requests 
WHERE is_archived = false
ORDER BY submitted_at DESC
LIMIT 20;

-- 5. Vérifier la contrainte de status actuelle
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'service_requests'::regclass
AND conname LIKE '%status%';
