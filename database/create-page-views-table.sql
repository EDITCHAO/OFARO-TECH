-- Table pour enregistrer toutes les visites du site
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visited_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  page_url TEXT,
  user_agent TEXT,
  ip_address TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour améliorer les performances des requêtes par date
CREATE INDEX IF NOT EXISTS idx_page_views_visited_at ON page_views(visited_at DESC);

-- Index pour les requêtes par mois
CREATE INDEX IF NOT EXISTS idx_page_views_month ON page_views(EXTRACT(YEAR FROM visited_at), EXTRACT(MONTH FROM visited_at));

-- Fonction pour obtenir le nombre de visiteurs du mois en cours
CREATE OR REPLACE FUNCTION get_current_month_views()
RETURNS BIGINT AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM page_views
    WHERE EXTRACT(YEAR FROM visited_at) = EXTRACT(YEAR FROM CURRENT_DATE)
      AND EXTRACT(MONTH FROM visited_at) = EXTRACT(MONTH FROM CURRENT_DATE)
  );
END;
$$ LANGUAGE plpgsql;

-- Fonction pour obtenir le nombre de visiteurs du mois précédent
CREATE OR REPLACE FUNCTION get_previous_month_views()
RETURNS BIGINT AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM page_views
    WHERE visited_at >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
      AND visited_at < DATE_TRUNC('month', CURRENT_DATE)
  );
END;
$$ LANGUAGE plpgsql;

-- Politique RLS : Tout le monde peut insérer (pour enregistrer les visites)
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON page_views
  FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "Allow authenticated read" ON page_views
  FOR SELECT TO authenticated
  USING (true);

-- Commentaires
COMMENT ON TABLE page_views IS 'Enregistre toutes les visites du site web';
COMMENT ON COLUMN page_views.visited_at IS 'Date et heure de la visite';
COMMENT ON COLUMN page_views.page_url IS 'URL de la page visitée';
COMMENT ON COLUMN page_views.user_agent IS 'Navigateur et système de l utilisateur';
COMMENT ON COLUMN page_views.ip_address IS 'Adresse IP du visiteur (optionnel)';
COMMENT ON COLUMN page_views.referrer IS 'Page d où vient le visiteur';
