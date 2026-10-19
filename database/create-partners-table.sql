-- =====================================================
-- TABLE: partners (Partenaires)
-- =====================================================
-- Stockage des logos et informations des partenaires technologiques
-- affichés sur la page d'accueil du site

CREATE TABLE IF NOT EXISTS public.partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    logo_url TEXT NOT NULL, -- URL Supabase Storage: /partners/logo-microsoft.png
    website VARCHAR(255),
    display_order INTEGER NOT NULL DEFAULT 1,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour optimiser le tri par ordre d'affichage
CREATE INDEX idx_partners_order ON public.partners(display_order);
CREATE INDEX idx_partners_published ON public.partners(is_published);

-- RLS (Row Level Security)
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Politique : Tout le monde peut lire les partenaires publiés
CREATE POLICY "Public partners are viewable by everyone"
    ON public.partners
    FOR SELECT
    USING (is_published = true);

-- Politique : Seuls les admins peuvent modifier
CREATE POLICY "Admins can manage partners"
    ON public.partners
    FOR ALL
    USING (
        auth.role() = 'authenticated'
        AND EXISTS (
            SELECT 1 FROM public.admin_users
            WHERE user_id = auth.uid()
            AND role IN ('administrateur', 'editeur')
        )
    );

-- Données initiales (partenaires actuels)
INSERT INTO public.partners (name, logo_url, website, display_order, is_published)
VALUES
    ('Microsoft', 'MS', 'https://www.microsoft.com', 1, true),
    ('AWS', 'AWS', 'https://aws.amazon.com', 2, true),
    ('Google Cloud', 'GC', 'https://cloud.google.com', 3, true),
    ('Oracle', 'OR', 'https://www.oracle.com', 4, true),
    ('Cisco', 'CS', 'https://www.cisco.com', 5, true)
ON CONFLICT DO NOTHING;

-- Fonction de mise à jour automatique du timestamp
CREATE OR REPLACE FUNCTION public.update_partners_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_partners_timestamp
    BEFORE UPDATE ON public.partners
    FOR EACH ROW
    EXECUTE FUNCTION public.update_partners_updated_at();

COMMENT ON TABLE public.partners IS 'Partenaires technologiques affichés sur le site';
COMMENT ON COLUMN public.partners.logo_url IS 'URL du logo dans Supabase Storage ou texte court (MS, AWS, etc.)';
COMMENT ON COLUMN public.partners.display_order IS 'Ordre d affichage croissant sur la page d accueil';
