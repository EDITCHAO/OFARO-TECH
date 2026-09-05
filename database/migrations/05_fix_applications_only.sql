-- ============================================================================
-- FIX SPÉCIFIQUE POUR APPLICATIONS (Candidatures)
-- ============================================================================

-- ÉTAPE 1: Supprimer la contrainte existante
ALTER TABLE applications DROP CONSTRAINT IF EXISTS applications_status_check;

-- ÉTAPE 2: Normaliser TOUS les statuts existants vers le format minuscule avec underscores
UPDATE applications SET status = 'nouvelle' WHERE status IN ('Nouvelle', 'nouveau', 'Nouveau', 'new');
UPDATE applications SET status = 'en_analyse' WHERE status IN ('En analyse', 'en analyse', 'en_analyse');
UPDATE applications SET status = 'en_cours_de_traitement' WHERE status IN ('En cours de traitement', 'en cours de traitement', 'entretien', 'Entretien', 'en_cours', 'En cours');
UPDATE applications SET status = 'retenu' WHERE status IN ('Retenu', 'acceptee', 'acceptée', 'Acceptée', 'preselectionee', 'présélectionnée');
UPDATE applications SET status = 'rejete' WHERE status IN ('Rejeté', 'rejete', 'rejeté', 'refusee', 'refusée', 'Refusée');
UPDATE applications SET status = 'sans_suite' WHERE status IN ('Sans suite', 'sans suite', 'sans_suite');
UPDATE applications SET status = 'dossier_incomplet' WHERE status IN ('Dossier incomplet', 'dossier incomplet', 'dossier_incomplet');
UPDATE applications SET status = 'en_attente' WHERE status IN ('En attente', 'en attente', 'en_attente');
UPDATE applications SET status = 'retire' WHERE status IN ('Retiré', 'retiré', 'retire', 'retirée', 'retiree');
UPDATE applications SET status = 'archivee' WHERE status IN ('Archivée', 'archivée', 'archivee', 'Archivé');

-- ÉTAPE 3: Créer la nouvelle contrainte avec TOUS les statuts autorisés
ALTER TABLE applications ADD CONSTRAINT applications_status_check 
CHECK (status IN (
  'nouvelle', 
  'en_analyse', 
  'en_cours_de_traitement', 
  'retenu', 
  'rejete', 
  'sans_suite', 
  'dossier_incomplet', 
  'en_attente', 
  'retire', 
  'archivee'
));

-- ÉTAPE 4: Vérification - Afficher les statuts après mise à jour
SELECT status, COUNT(*) as count 
FROM applications 
GROUP BY status 
ORDER BY status;

-- ============================================================================
-- Si tu vois "Success" et une liste de statuts, c'est bon !
-- ============================================================================
