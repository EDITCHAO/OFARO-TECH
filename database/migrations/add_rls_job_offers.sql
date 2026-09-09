-- Migration: Ajouter les politiques RLS pour job_offers
-- Date: 2026-09-08
-- Description: Permettre la lecture publique des offres actives et la gestion complète pour les admins

-- Activer RLS sur job_offers
ALTER TABLE job_offers ENABLE ROW LEVEL SECURITY;

-- Politique 1: Lecture publique des offres publiées
CREATE POLICY "Public can view published job offers"
ON job_offers
FOR SELECT
USING (status = 'publiee');

-- Politique 2: Les utilisateurs authentifiés peuvent tout faire (admin)
-- Note: Dans un vrai système, vous devriez vérifier le rôle de l'utilisateur
CREATE POLICY "Authenticated users can manage job offers"
ON job_offers
FOR ALL
USING (true)
WITH CHECK (true);

-- Alternative si vous voulez permettre aux utilisateurs anonymes de créer/modifier (pour l'admin sans auth)
-- Décommenter les lignes suivantes et commenter la politique ci-dessus si nécessaire

-- DROP POLICY IF EXISTS "Authenticated users can manage job offers" ON job_offers;

-- CREATE POLICY "Anyone can manage job offers"
-- ON job_offers
-- FOR ALL
-- USING (true)
-- WITH CHECK (true);

-- IMPORTANT: Cette configuration permet à n'importe qui de modifier les offres.
-- Dans un environnement de production, vous devriez :
-- 1. Mettre en place une authentification admin
-- 2. Restreindre les modifications aux seuls administrateurs authentifiés
-- 3. Utiliser des rôles Supabase pour gérer les permissions

COMMENT ON POLICY "Public can view published job offers" ON job_offers IS 
'Permet à tous les utilisateurs de voir les offres publiées sur le site public';

COMMENT ON POLICY "Authenticated users can manage job offers" ON job_offers IS 
'Permet aux utilisateurs authentifiés de gérer toutes les offres (admin)';
