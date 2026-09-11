-- ÉTAPE 1: Vérifier la contrainte actuelle
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'service_requests'::regclass
AND conname LIKE '%status%';

-- ÉTAPE 2: Voir toutes les lignes avec leur statut actuel
SELECT id, client_name, status, submitted_at 
FROM service_requests 
ORDER BY id;

-- ÉTAPE 3: Supprimer temporairement la contrainte pour pouvoir modifier les données
ALTER TABLE service_requests DROP CONSTRAINT IF EXISTS service_requests_status_check;

-- ÉTAPE 4: Corriger toutes les lignes qui ont un statut invalide
-- Remplacer tous les statuts invalides par 'nouvelle'
UPDATE service_requests 
SET status = 'nouvelle' 
WHERE status NOT IN ('nouvelle', 'en_analyse', 'en_cours', 'terminee', 'en_attente', 'rejetee', 'archivee')
OR status IS NULL;

-- ÉTAPE 5: Recréer la contrainte avec les bonnes valeurs
ALTER TABLE service_requests 
ADD CONSTRAINT service_requests_status_check 
CHECK (status IN ('nouvelle', 'en_analyse', 'en_cours', 'terminee', 'en_attente', 'rejetee', 'archivee'));

-- ÉTAPE 6: Vérifier le résultat
SELECT id, client_name, status, submitted_at 
FROM service_requests 
ORDER BY id;
