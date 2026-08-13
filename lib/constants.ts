import { CompanyInfo, Service } from "@/types";

export const COMPANY_INFO: CompanyInfo = {
  name: "OFARO TECH",
  slogan: "Votre partenaire de confiance pour la transformation digitale",
  description: "OFARO TECH est une société spécialisée dans les technologies de l'information et de la communication, offrant des services complets de développement, maintenance et conseil IT.",
  mission: "Accompagner les entreprises dans leur transformation digitale en proposant des solutions technologiques innovantes et adaptées à leurs besoins spécifiques.",
  vision: "Devenir le partenaire IT de référence en Afrique de l'Ouest, reconnu pour la qualité de nos services et notre engagement envers la satisfaction client.",
  values: [
    "Excellence et qualité",
    "Innovation continue",
    "Engagement client",
    "Intégrité et transparence",
    "Expertise technique"
  ],
  address: "Agbalepedo",
  city: "Lomé",
  country: "Togo",
  phone: "+228 XX XX XX XX",
  whatsapp: "+228 XX XX XX XX",
  email: "contact@ofarotech.com",
  coordinates: {
    lat: 6.1725,
    lng: 1.2314
  },
  socialMedia: {
    facebook: "https://facebook.com/ofarotech",
    linkedin: "https://linkedin.com/company/ofarotech",
    twitter: "https://twitter.com/ofarotech",
    instagram: "https://instagram.com/ofarotech"
  },
  openingHours: "Lundi - Vendredi: 8h00 - 18h00 | Samedi: 9h00 - 13h00",
  foundedYear: 2020
};

export const SERVICES: Service[] = [
  {
    id: "1",
    title: "Conception de systèmes informatiques",
    description: "Conception et développement de systèmes informatiques sur mesure adaptés à vos besoins métier.",
    icon: "FaLaptopCode",
    features: [
      "Analyse des besoins",
      "Architecture système",
      "Modélisation de données",
      "Intégration de systèmes"
    ],
    slug: "conception-systemes-informatiques"
  },
  {
    id: "2",
    title: "Développement Web",
    description: "Création de sites web modernes, responsives et performants avec les dernières technologies.",
    icon: "FaCode",
    features: [
      "Sites vitrines",
      "Applications métier",
      "ERP (Enterprise Resource Planning)",
      "CRM (Customer Relationship Management)"
    ],
    slug: "developpement-web"
  },
  {
    id: "3",
    title: "Développement Mobile",
    description: "Développement d'applications mobiles natives et cross-platform pour Android et iOS.",
    icon: "FaMobileAlt",
    features: [
      "Applications Android",
      "Applications iOS",
      "Applications cross-platform",
      "Interface utilisateur intuitive"
    ],
    slug: "developpement-mobile"
  },
  {
    id: "4",
    title: "Logiciels Desktop",
    description: "Conception de logiciels Windows et macOS personnalisés pour votre entreprise.",
    icon: "FaDesktop",
    features: [
      "Applications Windows",
      "Applications macOS",
      "Logiciels sur mesure",
      "Interfaces ergonomiques"
    ],
    slug: "logiciels-desktop"
  },
  {
    id: "5",
    title: "Design Graphique",
    description: "Création de logos, affiches, montage photo et vidéo pour votre identité visuelle.",
    icon: "FaPalette",
    features: [
      "Création de logos",
      "Design d'affiches",
      "Montage photo",
      "Montage vidéo"
    ],
    slug: "design-graphique"
  },
  {
    id: "6",
    title: "Réseaux Informatiques",
    description: "Études, installation, configuration, câblage, Wi-Fi, VPN et supervision de réseaux.",
    icon: "FaNetworkWired",
    features: [
      "Études et conception",
      "Installation et configuration",
      "Câblage réseau",
      "Wi-Fi et VPN",
      "Supervision"
    ],
    slug: "reseaux-informatiques"
  },
  {
    id: "7",
    title: "Cybersécurité",
    description: "Audit de sécurité, sécurisation des systèmes, sauvegarde et sensibilisation.",
    icon: "FaShieldAlt",
    features: [
      "Audit de sécurité",
      "Sécurisation des systèmes",
      "Plan de sauvegarde",
      "Sensibilisation équipes"
    ],
    slug: "cybersecurite"
  },
  {
    id: "8",
    title: "Maintenance Informatique",
    description: "Maintenance préventive et curative, contrats annuels, assistance et télémaintenance.",
    icon: "FaTools",
    features: [
      "Maintenance préventive",
      "Maintenance curative",
      "Contrats annuels",
      "Assistance technique",
      "Télémaintenance"
    ],
    slug: "maintenance-informatique"
  },
  {
    id: "9",
    title: "Fourniture de matériels",
    description: "Fourniture de matériels et équipements informatiques de qualité.",
    icon: "FaServer",
    features: [
      "Ordinateurs",
      "Serveurs",
      "Imprimantes",
      "Switch et routeurs",
      "Onduleurs"
    ],
    slug: "fourniture-materiels"
  },
  {
    id: "10",
    title: "Conseil IT",
    description: "Audit informatique, transformation digitale, schéma directeur et accompagnement.",
    icon: "FaChartLine",
    features: [
      "Audit informatique",
      "Transformation digitale",
      "Schéma directeur",
      "Accompagnement stratégique"
    ],
    slug: "conseil-it"
  }
];

export const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { 
    label: "Services", 
    href: "/services",
    subMenu: SERVICES.map(s => ({ label: s.title, href: `/services/${s.slug}` }))
  },
  { label: "Réalisations", href: "/realisations" },
  { label: "Secteurs", href: "/secteurs" },
  { label: "Carrières", href: "/carrieres" },
  { label: "Contact", href: "/contact" },
];

export const STATISTICS = [
  { value: "500+", label: "Projets réalisés" },
  { value: "200+", label: "Clients satisfaits" },
  { value: "50+", label: "Experts" },
  { value: "5+", label: "Années d'expérience" }
];
