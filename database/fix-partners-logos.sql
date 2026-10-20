-- Script de correction des partenaires avec logos complets
-- Exécuter dans Supabase SQL Editor

-- 1. Supprimer tous les anciens partenaires (avec logos texte invalides)
DELETE FROM partners;

-- 2. Réinitialiser la séquence des IDs
ALTER SEQUENCE partners_id_seq RESTART WITH 1;

-- 3. Insérer les partenaires avec de vrais logos
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

-- 4. Vérification - Afficher tous les partenaires
SELECT 
  id, 
  name, 
  LEFT(logo_url, 50) as logo_preview,
  is_published,
  display_order 
FROM partners 
ORDER BY display_order;

-- 5. Compter les partenaires publiés
SELECT COUNT(*) as total_published FROM partners WHERE is_published = true;
