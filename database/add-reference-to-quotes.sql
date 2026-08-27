-- Ajouter le champ reference_number à la table quote_requests si il n'existe pas

ALTER TABLE quote_requests 
ADD COLUMN IF NOT EXISTS reference_number VARCHAR(50) UNIQUE;

-- Fonction pour générer des références automatiques
CREATE OR REPLACE FUNCTION generate_quote_reference()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.reference_number IS NULL THEN
    NEW.reference_number := 'DV-' || LPAD(NEW.id::TEXT, 3, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour générer la référence automatiquement
DROP TRIGGER IF EXISTS set_quote_reference ON quote_requests;
CREATE TRIGGER set_quote_reference
  BEFORE INSERT ON quote_requests
  FOR EACH ROW
  EXECUTE FUNCTION generate_quote_reference();

-- Mettre à jour les références existantes
UPDATE quote_requests 
SET reference_number = 'DV-' || LPAD(id::TEXT, 3, '0')
WHERE reference_number IS NULL;
