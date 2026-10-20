-- ============================================================================
-- OFARO TECH - Création de la table des partenaires
-- ============================================================================

-- Créer la table des partenaires
CREATE TABLE IF NOT EXISTS partners (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo_url VARCHAR(500) NOT NULL,
    website VARCHAR(500),
    description TEXT,
    display_order INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_partners_is_published ON partners(is_published);
CREATE INDEX IF NOT EXISTS idx_partners_display_order ON partners(display_order);

-- Insérer les partenaires initiaux avec de vrais logos
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

-- Vérification - Afficher tous les partenaires
SELECT 
  id, 
  name, 
  LEFT(logo_url, 50) as logo_preview,
  is_published,
  display_order 
FROM partners 
ORDER BY display_order;

-- Compter les partenaires publiés
SELECT COUNT(*) as total_published FROM partners WHERE is_published = true;

-- ============================================================================
-- Fin du script
-- ============================================================================
