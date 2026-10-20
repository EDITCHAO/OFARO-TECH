-- =====================================================
-- CONFIGURATION COMPLÈTE : PARTENAIRES + STORAGE
-- =====================================================
-- À exécuter dans Supabase SQL Editor
-- Dashboard : https://supabase.com/dashboard/project/tidencxeznpjvnfebwmw

-- =====================================================
-- ÉTAPE 1 : CRÉER LA TABLE PARTNERS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    logo_url TEXT NOT NULL,
    website VARCHAR(255),
    display_order INTEGER NOT NULL DEFAULT 1,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_partners_order ON public.partners(display_order);
CREATE INDEX IF NOT EXISTS idx_partners_published ON public.partners(is_published);

-- =====================================================
-- ÉTAPE 2 : ACTIVER ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Supprimer les anciennes policies si elles existent
DROP POLICY IF EXISTS "Public partners are viewable by everyone" ON public.partners;
DROP POLICY IF EXISTS "Admins can manage partners" ON public.partners;

-- Politique : Tout le monde peut lire les partenaires publiés
CREATE POLICY "Public partners are viewable by everyone"
    ON public.partners
    FOR SELECT
    USING (is_published = true);

-- Politique : Utilisateurs authentifiés peuvent tout gérer
CREATE POLICY "Admins can manage partners"
    ON public.partners
    FOR ALL
    USING (auth.role() = 'authenticated');

-- =====================================================
-- ÉTAPE 3 : CRÉER TRIGGER POUR UPDATED_AT
-- =====================================================

CREATE OR REPLACE FUNCTION public.update_partners_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_partners_timestamp ON public.partners;

CREATE TRIGGER trigger_update_partners_timestamp
    BEFORE UPDATE ON public.partners
    FOR EACH ROW
    EXECUTE FUNCTION public.update_partners_updated_at();

-- =====================================================
-- ÉTAPE 4 : INSÉRER DONNÉES INITIALES
-- =====================================================

INSERT INTO public.partners (name, logo_url, website, display_order, is_published)
VALUES
    ('Microsoft', 'MS', 'https://www.microsoft.com', 1, true),
    ('AWS', 'AWS', 'https://aws.amazon.com', 2, true),
    ('Google Cloud', 'GC', 'https://cloud.google.com', 3, true),
    ('Oracle', 'OR', 'https://www.oracle.com', 4, true),
    ('Cisco', 'CS', 'https://www.cisco.com', 5, true)
ON CONFLICT DO NOTHING;

-- =====================================================
-- ÉTAPE 5 : VÉRIFIER L'INSTALLATION
-- =====================================================

SELECT * FROM public.partners ORDER BY display_order;

-- Vous devriez voir 5 partenaires avec leurs infos

-- =====================================================
-- COMMENTAIRES POUR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE public.partners IS 'Partenaires technologiques affichés sur le site';
COMMENT ON COLUMN public.partners.logo_url IS 'URL du logo dans Supabase Storage ou texte court (MS, AWS, etc.)';
COMMENT ON COLUMN public.partners.display_order IS 'Ordre d affichage croissant sur la page d accueil';

-- =====================================================
-- ÉTAPES MANUELLES (À FAIRE DANS L'INTERFACE)
-- =====================================================

/*

ÉTAPE 6 : CRÉER LE BUCKET STORAGE (Interface Supabase)
------------------------------------------------------
1. Allez dans : Storage > New Bucket
2. Nom : partners-logos
3. Public : OUI ✅
4. Create

ÉTAPE 7 : CONFIGURER LES POLICIES DU BUCKET
--------------------------------------------
Allez dans : Storage > partners-logos > Policies

Policy 1 - Lecture publique :
    - Policy name : Public Access
    - Operation : SELECT
    - Policy definition : (bucket_id = 'partners-logos')

Policy 2 - Upload authentifié :
    - Policy name : Authenticated Upload
    - Operation : INSERT
    - Policy definition : (bucket_id = 'partners-logos' AND auth.role() = 'authenticated')

Policy 3 - Suppression authentifiée :
    - Policy name : Authenticated Delete
    - Operation : DELETE
    - Policy definition : (bucket_id = 'partners-logos' AND auth.role() = 'authenticated')

ÉTAPE 8 : TESTER L'UPLOAD
--------------------------
1. Uploadez un logo test dans le bucket partners-logos
2. Vérifiez que l'URL est accessible :
   https://tidencxeznpjvnfebwmw.supabase.co/storage/v1/object/public/partners-logos/test.png

*/

-- =====================================================
-- FIN DE LA CONFIGURATION
-- =====================================================
-- Tout est prêt ! Vous pouvez maintenant :
-- - Uploader des logos via l'API /api/partners/upload
-- - Gérer les partenaires via le back-office
-- - Afficher les partenaires sur le site
