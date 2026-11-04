-- ============================================================================
-- OFARO TECH - Données initiales des services
-- ============================================================================
-- À exécuter après database/create-services-table.sql.
-- Reproduit les services codés en dur dans lib/constants.ts (SERVICES).
-- Les images pointent vers les SVG statiques existants (public/images/nos services).
-- ----------------------------------------------------------------------------

INSERT INTO services
  (title, slug, description, short_description, icon, image_url, features, category, display_order, is_published, is_featured, color_accent)
VALUES
  (
    'Conception de systèmes informatiques',
    'conception-systemes-informatiques',
    'Conception et développement de systèmes informatiques sur mesure adaptés à vos besoins métier.',
    NULL,
    'FaLaptopCode',
    '/images/nos services/Conception de systèmes informatiques.svg',
    $$["Analyse des besoins","Architecture système","Modélisation de données","Intégration de systèmes"]$$::jsonb,
    NULL, 1, true, false, NULL
  ),
  (
    'Développement Web',
    'developpement-web',
    'Création de sites web modernes, responsives et performants avec les dernières technologies.',
    NULL,
    'FaCode',
    '/images/nos services/Développement Web.svg',
    $$["Sites vitrines","Applications métier","ERP (Enterprise Resource Planning)","CRM (Customer Relationship Management)"]$$::jsonb,
    NULL, 2, true, false, NULL
  ),
  (
    'Développement Mobile',
    'developpement-mobile',
    'Développement d''applications mobiles natives et cross-platform pour Android et iOS.',
    NULL,
    'FaMobileAlt',
    '/images/nos services/Développement Mobile.svg',
    $$["Applications Android","Applications iOS","Applications cross-platform","Interface utilisateur intuitive"]$$::jsonb,
    NULL, 3, true, false, NULL
  ),
  (
    'Logiciels Desktop',
    'logiciels-desktop',
    'Conception de logiciels Windows et macOS personnalisés pour votre entreprise.',
    NULL,
    'FaDesktop',
    '/images/nos services/Logiciels Desktop.svg',
    $$["Applications Windows","Applications macOS","Logiciels sur mesure","Interfaces ergonomiques"]$$::jsonb,
    NULL, 4, true, false, NULL
  ),
  (
    'Design Graphique',
    'design-graphique',
    'Création de logos, affiches, montage photo et vidéo pour votre identité visuelle.',
    NULL,
    'FaPalette',
    '/images/nos services/Design Graphique.svg',
    $$["Création de logos","Design d'affiches","Montage photo","Montage vidéo"]$$::jsonb,
    NULL, 5, true, false, NULL
  ),
  (
    'Réseaux Informatiques',
    'reseaux-informatiques',
    'Études, installation, configuration, câblage, Wi-Fi, VPN et supervision de réseaux.',
    NULL,
    'FaNetworkWired',
    '/images/nos services/Réseaux Informatiques.svg',
    $$["Études et conception","Installation et configuration","Câblage réseau","Wi-Fi et VPN","Supervision"]$$::jsonb,
    NULL, 6, true, false, NULL
  ),
  (
    'Cybersécurité',
    'cybersecurite',
    'Audit de sécurité, sécurisation des systèmes, sauvegarde et sensibilisation.',
    NULL,
    'FaShieldAlt',
    '/images/nos services/Cybersécurité.svg',
    $$["Audit de sécurité","Sécurisation des systèmes","Plan de sauvegarde","Sensibilisation équipes"]$$::jsonb,
    NULL, 7, true, false, NULL
  ),
  (
    'Maintenance Informatique',
    'maintenance-informatique',
    'Maintenance préventive et curative, contrats annuels, assistance et télémaintenance.',
    NULL,
    'FaTools',
    '/images/nos services/Maintenance Informatique.svg',
    $$["Maintenance préventive","Maintenance curative","Contrats annuels","Assistance technique","Télémaintenance"]$$::jsonb,
    NULL, 8, true, false, NULL
  ),
  (
    'Fourniture de matériels',
    'fourniture-materiels',
    'Fourniture de matériels et équipements informatiques de qualité.',
    NULL,
    'FaServer',
    '/images/nos services/Fourniture de matériels et accesoires informatiques.svg',
    $$["Ordinateurs","Serveurs","Imprimantes","Switch et routeurs","Onduleurs"]$$::jsonb,
    NULL, 9, true, false, NULL
  ),
  (
    'Conseil IT',
    'conseil-it',
    'Audit informatique, transformation digitale, schéma directeur et accompagnement.',
    NULL,
    'FaChartLine',
    '/images/nos services/conseil it.svg',
    $$["Audit informatique","Transformation digitale","Schéma directeur","Accompagnement stratégique"]$$::jsonb,
    NULL, 10, true, false, NULL
  )
ON CONFLICT (slug) DO NOTHING;

-- Vérification
SELECT id, title, slug, is_published, is_featured, display_order
FROM services
ORDER BY display_order;

-- ============================================================================
-- Fin du script
-- ============================================================================
