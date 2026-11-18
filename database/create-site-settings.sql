-- ============================================================================
-- OFARO TECH - Table des paramètres du site (coordonnées, horaires, etc.)
-- À exécuter dans Supabase Dashboard > SQL Editor
-- ============================================================================

CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "settings_select_public" ON site_settings;
CREATE POLICY "settings_select_public" ON site_settings FOR SELECT USING (true);

-- Données initiales
INSERT INTO site_settings (key, value) VALUES
  ('phone',         '+228 XX XX XX XX'),
  ('whatsapp',      '+228 XX XX XX XX'),
  ('email',         'contact@ofaro-tech.com'),
  ('address',       'Agbalepedo, Lomé, Togo'),
  ('opening_hours', 'Lundi - Vendredi: 8h00 - 18h00 | Samedi: 9h00 - 13h00'),
  ('google_maps_url', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d1.2314!3d6.1725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTAnMjEuMCJOIDHCsDEzJzUzLjAiRQ!5e0!3m2!1sfr!2stg!4v1234567890')
ON CONFLICT (key) DO NOTHING;

SELECT key, value FROM site_settings ORDER BY key;
