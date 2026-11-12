-- ============================================================================
-- FIX COMPLET : Trigger récursif sur job_offers
-- Exécuter dans Supabase Dashboard > SQL Editor
-- ============================================================================

-- ETAPE 1 : Voir tous les triggers actuels (pour diagnostic)
SELECT trigger_name, event_manipulation, action_timing, action_statement
FROM information_schema.triggers
WHERE event_object_table = 'job_offers'
ORDER BY trigger_name;

-- ETAPE 2 : Supprimer TOUS les triggers possibles sur job_offers
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT trigger_name
    FROM information_schema.triggers
    WHERE event_object_table = 'job_offers'
      AND trigger_schema = 'public'
  LOOP
    EXECUTE 'DROP TRIGGER IF EXISTS ' || quote_ident(r.trigger_name) || ' ON job_offers';
    RAISE NOTICE 'Trigger supprimé: %', r.trigger_name;
  END LOOP;
END;
$$;

-- ETAPE 3 : Supprimer les noms connus manuellement (double sécurité)
DROP TRIGGER IF EXISTS update_job_offers_updated_at ON job_offers;
DROP TRIGGER IF EXISTS trg_job_offers_updated_at ON job_offers;
DROP TRIGGER IF EXISTS set_updated_at ON job_offers;
DROP TRIGGER IF EXISTS handle_updated_at ON job_offers;
DROP TRIGGER IF EXISTS job_offers_updated_at ON job_offers;
DROP TRIGGER IF EXISTS moddatetime ON job_offers;
DROP TRIGGER IF EXISTS set_current_timestamp_updated_at ON job_offers;

-- ETAPE 4 : Créer une fonction propre et non récursive
CREATE OR REPLACE FUNCTION set_job_offers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ETAPE 5 : Recréer un trigger correct
CREATE TRIGGER trg_job_offers_updated_at
  BEFORE UPDATE ON job_offers
  FOR EACH ROW
  EXECUTE FUNCTION set_job_offers_updated_at();

-- ETAPE 6 : Vérification finale
SELECT trigger_name, event_manipulation, action_timing
FROM information_schema.triggers
WHERE event_object_table = 'job_offers';

-- ETAPE 7 : Test rapide de mise à jour
UPDATE job_offers SET status = status WHERE id = (SELECT id FROM job_offers LIMIT 1);
SELECT 'Test OK - trigger non récursif' AS result;
