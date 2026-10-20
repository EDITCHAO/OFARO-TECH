-- Insertion des partenaires initiaux dans la table partners
-- À exécuter dans l'éditeur SQL de Supabase

INSERT INTO partners (name, logo_url, website, display_order, is_published) VALUES
  ('Microsoft', 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg', 'https://www.microsoft.com', 1, true),
  ('Amazon Web Services', 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg', 'https://aws.amazon.com', 2, true),
  ('Google Cloud', 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg', 'https://cloud.google.com', 3, true),
  ('Oracle', 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg', 'https://www.oracle.com', 4, true),
  ('Cisco', 'https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg', 'https://www.cisco.com', 5, true);

-- Vérification
SELECT * FROM partners ORDER BY display_order;
