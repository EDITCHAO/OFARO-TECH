-- ============================================================================
-- OFARO TECH - Correction FINALE de la table partners
-- Script qui fonctionne peu importe l'état actuel de la table
-- ============================================================================

-- ÉTAPE 1: Supprimer TOUS les partenaires existants
DELETE FROM partners;

-- ÉTAPE 2: Insérer les 8 partenaires corrects avec de vraies URLs d'images
INSERT INTO partners (name, logo_url, website, display_order, is_published) VALUES
  (
    'Microsoft', 
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/200px-Microsoft_logo.svg.png', 
    'https://www.microsoft.com', 
    1, 
    true
  ),
  (
    'Amazon Web Services', 
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/200px-Amazon_Web_Services_Logo.svg.png', 
    'https://aws.amazon.com', 
    2, 
    true
  ),
  (
    'Google Cloud', 
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/200px-Google_Cloud_logo.svg.png', 
    'https://cloud.google.com', 
    3, 
    true
  ),
  (
    'Oracle', 
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/200px-Oracle_logo.svg.png', 
    'https://www.oracle.com', 
    4, 
    true
  ),
  (
    'Cisco', 
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Cisco_logo.svg/200px-Cisco_logo.svg.png', 
    'https://www.cisco.com', 
    5, 
    true
  ),
  (
    'IBM', 
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/200px-IBM_logo.svg.png', 
    'https://www.ibm.com', 
    6, 
    true
  ),
  (
    'SAP', 
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/200px-SAP_2011_logo.svg.png', 
    'https://www.sap.com', 
    7, 
    true
  ),
  (
    'Dell Technologies', 
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/200px-Dell_Logo.svg.png', 
    'https://www.dell.com', 
    8, 
    true
  );

-- ÉTAPE 3: Vérification - Afficher tous les partenaires
SELECT 
  id, 
  name, 
  SUBSTRING(logo_url, 1, 70) as logo_preview,
  is_published,
  display_order 
FROM partners 
ORDER BY display_order;

-- ÉTAPE 4: Statistiques
SELECT 
  COUNT(*) as total_partners,
  COUNT(*) FILTER (WHERE is_published = true) as published_partners,
  COUNT(*) FILTER (WHERE is_published = false) as unpublished_partners
FROM partners;

-- ============================================================================
-- RÉSULTAT ATTENDU: 
-- - 8 partenaires au total
-- - 8 partenaires publiés
-- - Chaque logo_url commence par https://upload.wikimedia.org...
-- ============================================================================
