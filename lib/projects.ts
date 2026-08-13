import { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Plateforme E-commerce Multi-vendeurs",
    description: "Développement d'une plateforme e-commerce complète avec gestion multi-vendeurs, système de paiement en ligne sécurisé, gestion des stocks et suivi de livraison en temps réel.",
    category: "web",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    images: [],
    client: "Confidential",
    url: "",
    slug: "plateforme-ecommerce-multi-vendeurs"
  },
  {
    id: "2",
    title: "Application Mobile de Gestion Bancaire",
    description: "Application mobile permettant la gestion complète des comptes bancaires, virements instantanés, paiements mobiles et consultation des transactions en temps réel.",
    category: "mobile",
    technologies: ["React Native", "Firebase", "Node.js", "Express"],
    images: [],
    client: "Banque Atlantique Togo",
    slug: "application-mobile-bancaire"
  },
  {
    id: "3",
    title: "Système de Gestion Hospitalière (ERP)",
    description: "ERP complet pour la gestion des hôpitaux incluant la gestion des patients, rendez-vous médicaux, dossiers médicaux électroniques, pharmacie, laboratoire et facturation.",
    category: "web",
    technologies: ["Laravel", "Vue.js", "MySQL", "WebSocket"],
    images: [],
    client: "Hôpital Central de Lomé",
    slug: "systeme-gestion-hospitaliere"
  },
  {
    id: "4",
    title: "Identité Visuelle Entreprise Tech",
    description: "Création complète d'identité visuelle incluant logo, charte graphique, carte de visite, en-tête de lettre et supports de communication digitale.",
    category: "design",
    technologies: ["Adobe Illustrator", "Figma", "Photoshop", "InDesign"],
    images: [],
    client: "TechCorp Solutions",
    slug: "identite-visuelle-techcorp"
  },
  {
    id: "5",
    title: "Infrastructure Réseau Entreprise",
    description: "Mise en place d'une infrastructure réseau sécurisée pour une entreprise de 200 employés avec VPN, firewall, serveurs redondants et système de supervision.",
    category: "network",
    technologies: ["Cisco", "Mikrotik", "Zabbix", "pfSense"],
    images: [],
    client: "Groupe Industriel ABC",
    slug: "infrastructure-reseau-entreprise"
  },
  {
    id: "6",
    title: "Plateforme de Gestion Scolaire",
    description: "Plateforme complète de gestion d'établissement scolaire avec gestion des notes, absences, emplois du temps, communication parents-professeurs et paiement en ligne.",
    category: "web",
    technologies: ["Django", "React", "PostgreSQL", "Celery"],
    images: [],
    client: "Complexe Scolaire Excellence",
    slug: "plateforme-gestion-scolaire"
  },
  {
    id: "7",
    title: "Application de Suivi de Flotte",
    description: "Application mobile et web de géolocalisation et suivi en temps réel d'une flotte de véhicules avec rapports d'activité et alertes automatiques.",
    category: "mobile",
    technologies: ["Flutter", "Firebase", "Google Maps API", "Node.js"],
    images: [],
    client: "TransLog Togo",
    slug: "application-suivi-flotte"
  },
  {
    id: "8",
    title: "Site Web Corporate Moderne",
    description: "Création d'un site web institutionnel moderne avec système de gestion de contenu, blog intégré, formulaires de contact et optimisation SEO avancée.",
    category: "web",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Strapi"],
    images: [],
    client: "Ministère du Commerce",
    slug: "site-web-corporate"
  },
  {
    id: "9",
    title: "Logiciel de Gestion de Stock",
    description: "Application desktop de gestion de stock avec codes-barres, alertes de stock minimum, génération de rapports et synchronisation multi-sites.",
    category: "desktop",
    technologies: ["Electron", "React", "SQLite", "Node.js"],
    images: [],
    client: "SuperMart Distribution",
    slug: "logiciel-gestion-stock"
  },
  {
    id: "10",
    title: "Campagne Marketing Digital",
    description: "Conception et réalisation d'une campagne marketing complète incluant créations graphiques, vidéos promotionnelles et animation des réseaux sociaux.",
    category: "design",
    technologies: ["After Effects", "Premiere Pro", "Illustrator", "Canva"],
    images: [],
    client: "StartUp Innovation",
    slug: "campagne-marketing-digital"
  },
  {
    id: "11",
    title: "Système de Vidéosurveillance IP",
    description: "Installation et configuration d'un système de vidéosurveillance IP avec enregistrement cloud, détection de mouvement et accès à distance.",
    category: "network",
    technologies: ["Hikvision", "Dahua", "NVR", "Cloud Storage"],
    images: [],
    client: "Centre Commercial Etoile",
    slug: "systeme-videosurveillance"
  },
  {
    id: "12",
    title: "Application de Réservation en Ligne",
    description: "Plateforme web et mobile de réservation d'hôtels avec système de paiement, gestion des disponibilités et programme de fidélité.",
    category: "web",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    images: [],
    client: "Hotel Paradise Group",
    slug: "application-reservation-hotels"
  }
];

export const PROJECT_CATEGORIES = [
  { id: "all", label: "Tous les projets" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "desktop", label: "Desktop" },
  { id: "design", label: "Design" },
  { id: "network", label: "Réseaux" }
];
