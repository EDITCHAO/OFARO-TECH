-- ============================================================================
-- OFARO TECH - Création de la table des services
-- ============================================================================
-- À exécuter une seule fois dans le SQL Editor de Supabase.
-- ----------------------------------------------------------------------------

-- 1) Table des services
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    short_description TEXT,
    icon TEXT,
    image_url TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    category TEXT,
    display_order INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    color_accent TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Index d'optimisation
CREATE INDEX IF NOT EXISTS idx_services_is_published ON services(is_published);
CREATE INDEX IF NOT EXISTS idx_services_display_order ON services(display_order);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);

-- 2) Mise à jour automatique de updated_at
CREATE OR REPLACE FUNCTION update_services_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_services_updated_at ON services;
CREATE TRIGGER trg_services_updated_at
    BEFORE UPDATE ON services
    FOR EACH ROW
    EXECUTE FUNCTION update_services_updated_at();

-- 3) Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Lecture publique (anonyme + authentifié) : la page /services et l'API
-- publique lisent avec la anon key.
DROP POLICY IF EXISTS "services_select_public" ON services;
CREATE POLICY "services_select_public"
    ON services FOR SELECT
    USING (true);

-- Écritures (INSERT / UPDATE / DELETE) :
-- Les routes API backend utilisent la SUPABASE_SERVICE_ROLE_KEY qui contourne
-- le RLS : aucune politique d'écriture n'est nécessaire et l'accès public en
-- écriture reste impossible. Si seule la anon key est configurée
-- (service_role absente), les écritures sont bloquées par RLS — comportement
-- identique à la table partners.

-- 4) Bucket Supabase Storage pour les images des services
-- ----------------------------------------------------------------------------
-- Option A — Depuis le dashboard Supabase :
--   Storage > New bucket > id: "services-images" > Public: ON
--
-- Option B — En SQL (décommenter puis exécuter une fois) :
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('services-images', 'services-images', true)
-- ON CONFLICT (id) DO NOTHING;
--
-- Politique de lecture publique pour le bucket (décommenter) :
-- CREATE POLICY "services_images_public_read" ON storage.objects
--     FOR SELECT USING (bucket_id = 'services-images');
-- ----------------------------------------------------------------------------

-- Vérification
SELECT id, title, slug, is_published, is_featured, display_order
FROM services
ORDER BY display_order;

-- ============================================================================
-- Fin du script
-- ============================================================================
