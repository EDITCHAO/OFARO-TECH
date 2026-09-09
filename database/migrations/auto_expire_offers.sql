-- Migration: Expiration automatique des offres d'emploi
-- Date: 2026-09-09
-- Description: Créer une fonction et un trigger pour mettre automatiquement les offres en statut 'expiree' quand la date limite est dépassée

-- Fonction pour mettre à jour le statut en 'expiree'
CREATE OR REPLACE FUNCTION auto_expire_job_offers()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Mettre à jour toutes les offres dont la date limite est dépassée
  UPDATE job_offers
  SET 
    status = 'expiree',
    updated_at = NOW()
  WHERE 
    status IN ('publiee', 'suspendue') -- Seulement les offres actives
    AND application_deadline IS NOT NULL
    AND application_deadline < CURRENT_DATE
    AND status != 'expiree'; -- Éviter les mises à jour inutiles
END;
$$;

-- Créer un trigger qui s'exécute à chaque lecture de la table
-- Note: Cette approche est simple mais pas optimale pour la performance
-- Pour une meilleure solution, utilisez pg_cron (voir ci-dessous)

-- Option 1: Trigger sur SELECT (simple mais peut impacter la performance)
-- CREATE OR REPLACE FUNCTION trigger_auto_expire()
-- RETURNS trigger
-- LANGUAGE plpgsql
-- AS $$
-- BEGIN
--   PERFORM auto_expire_job_offers();
--   RETURN NEW;
-- END;
-- $$;

-- CREATE TRIGGER auto_expire_on_select
-- BEFORE SELECT ON job_offers
-- FOR EACH STATEMENT
-- EXECUTE FUNCTION trigger_auto_expire();

-- Option 2: MEILLEURE SOLUTION avec pg_cron (à installer)
-- Décommentez les lignes suivantes si pg_cron est disponible:

-- Installation de pg_cron (à faire une seule fois dans le dashboard Supabase)
-- 1. Allez dans Database > Extensions
-- 2. Activez l'extension "pg_cron"

-- Créer une tâche cron qui s'exécute tous les jours à minuit
-- SELECT cron.schedule(
--   'auto-expire-job-offers', -- nom de la tâche
--   '0 0 * * *',              -- tous les jours à minuit
--   $$ SELECT auto_expire_job_offers(); $$
-- );

-- Pour vérifier les tâches cron:
-- SELECT * FROM cron.job;

-- Pour désactiver la tâche cron:
-- SELECT cron.unschedule('auto-expire-job-offers');

-- Option 3: SOLUTION HYBRIDE - Trigger sur INSERT/UPDATE
-- Cette solution met à jour le statut lors de modifications de la table
CREATE OR REPLACE FUNCTION check_and_expire_on_change()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  -- Vérifier si l'offre actuelle doit être expirée
  IF NEW.application_deadline IS NOT NULL 
     AND NEW.application_deadline < CURRENT_DATE 
     AND NEW.status IN ('publiee', 'suspendue') THEN
    NEW.status := 'expiree';
    NEW.updated_at := NOW();
  END IF;
  
  -- Expirer toutes les autres offres également (optimisation)
  PERFORM auto_expire_job_offers();
  
  RETURN NEW;
END;
$$;

-- Créer le trigger sur INSERT et UPDATE
DROP TRIGGER IF EXISTS auto_expire_on_change ON job_offers;
CREATE TRIGGER auto_expire_on_change
BEFORE INSERT OR UPDATE ON job_offers
FOR EACH ROW
EXECUTE FUNCTION check_and_expire_on_change();

-- Exécuter une première fois pour mettre à jour les offres existantes
SELECT auto_expire_job_offers();

-- Vérification
SELECT 
  id, 
  title, 
  status, 
  application_deadline,
  CASE 
    WHEN application_deadline < CURRENT_DATE THEN 'DEVRAIT ÊTRE EXPIRÉ'
    ELSE 'OK'
  END as verification
FROM job_offers
WHERE application_deadline IS NOT NULL
ORDER BY application_deadline DESC;

-- NOTES IMPORTANTES:
-- 1. Le trigger sur INSERT/UPDATE est activé automatiquement
-- 2. Pour une solution plus robuste en production, utilisez pg_cron (Option 2)
-- 3. Vous pouvez aussi appeler manuellement: SELECT auto_expire_job_offers();
-- 4. Pour forcer l'expiration immédiate de toutes les offres: SELECT auto_expire_job_offers();

COMMENT ON FUNCTION auto_expire_job_offers() IS 'Met automatiquement les offres en statut expiree quand application_deadline est dépassée';
COMMENT ON FUNCTION check_and_expire_on_change() IS 'Trigger function qui vérifie et expire les offres lors des INSERT/UPDATE';
