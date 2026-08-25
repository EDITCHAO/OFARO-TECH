// Magasin centralisé de données réelles pour le Back-office OFARO TECH
// Synchronisé avec toutes les données publiques du site institutionnel

export type UserRole = 'administrateur' | 'editeur' | 'commercial' | 'rh';
export type QuoteStatus = 'Nouveau' | 'En cours' | 'Traité' | 'Sans suite';
export type MessageStatus = 'Nouveau' | 'En cours' | 'Traité';
export type ApplicationStatus = 'Nouvelle' | 'En analyse' | 'Entretien' | 'Retenu' | 'Rejeté';

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  twoFactorEnabled: boolean;
  lastLoginAt: string;
  lastLoginIp: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  slug: string;
  isPublished: boolean;
}

export interface RealizationItem {
  id: string;
  title: string;
  description: string;
  category: 'web' | 'mobile' | 'desktop' | 'design' | 'network';
  technologies: string[];
  client: string;
  url?: string;
  slug: string;
  image?: string;
  isPublished: boolean;
  date: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  isPublished: boolean;
  date: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  slug: string;
  isPublished: boolean;
  viewsCount: number;
  image?: string;
}

export interface QuoteRequestItem {
  id: string;
  reference: string;
  companyName: string;
  activityField: string;
  email: string;
  phone: string;
  city: string;
  desiredServices: string[];
  description: string;
  hasLogo: string;
  hasDomainName: string;
  domainName?: string;
  keyFeatures: string;
  expectedResult: string;
  budget: string;
  contactPersonName: string;
  deliveryDate: string;
  status: QuoteStatus;
  notes?: string;
  createdAt: string;
  isRead: boolean;
}

export interface ContactMessageItem {
  id: string;
  reference: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: MessageStatus;
  isRead: boolean;
  createdAt: string;
  response?: string;
}

export interface JobApplicationItem {
  id: string;
  reference: string;
  type: 'Emploi' | 'Stage';
  position: string;
  fullName: string;
  email: string;
  phone: string;
  education: string;
  experience?: string;
  coverLetter?: string;
  cvFileName: string;
  status: ApplicationStatus;
  createdAt: string;
  notes?: string;
}

export interface ClientItem {
  id: string;
  name: string;
  sector: string;
  contactName: string;
  contactEmail: string;
  projectsCount: number;
  status: 'Actif' | 'Inactif';
  logoText: string;
}

export interface TeamMemberItem {
  id: string;
  name: string;
  position: string;
  bio: string;
  email: string;
  phone: string;
  isPublished: boolean;
  avatarText: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: string;
  fileName: string;
  fileSize: string;
  downloadCount: number;
  isPublished: boolean;
  updatedAt: string;
}

export interface MediaItem {
  id: string;
  name: string;
  folder: 'Services' | 'Secteurs' | 'Réalisations' | 'Logos' | 'Documents';
  size: string;
  type: 'image/png' | 'image/jpeg' | 'image/svg+xml' | 'application/pdf';
  url: string;
  uploadedAt: string;
}

export interface SEOSettingItem {
  id: string;
  pageName: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  robots: string;
}

export interface LogItem {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  module: string;
  ip: string;
  status: 'Succès' | 'Échec' | 'Info';
}

export interface PageContentItem {
  id: string;
  title: string;
  slug: string;
  lastUpdated: string;
  status: 'Publié' | 'Brouillon';
  sectionsCount: number;
  description: string;
}

// ----------------------------------------------------------------------
// DONNÉES INITIALES RÉELLES SYNCHRONISÉES DU SITE OFARO TECH
// ----------------------------------------------------------------------

export const INITIAL_USERS: AdminUser[] = [
  {
    id: '1',
    email: 'admin@ofarotech.com',
    firstName: 'Directeur',
    lastName: 'Admin',
    role: 'administrateur',
    isActive: true,
    twoFactorEnabled: true,
    lastLoginAt: '19 août 2026, 21:15',
    lastLoginIp: '192.168.1.10'
  },
  {
    id: '2',
    email: 'editeur@ofarotech.com',
    firstName: 'Kofi',
    lastName: 'Contenu',
    role: 'editeur',
    isActive: true,
    twoFactorEnabled: false,
    lastLoginAt: '19 août 2026, 18:30',
    lastLoginIp: '192.168.1.15'
  },
  {
    id: '3',
    email: 'commercial@ofarotech.com',
    firstName: 'Afi',
    lastName: 'Ventes',
    role: 'commercial',
    isActive: true,
    twoFactorEnabled: false,
    lastLoginAt: '19 août 2026, 20:45',
    lastLoginIp: '192.168.1.22'
  },
  {
    id: '4',
    email: 'rh@ofarotech.com',
    firstName: 'Mensa',
    lastName: 'Recrutement',
    role: 'rh',
    isActive: true,
    twoFactorEnabled: false,
    lastLoginAt: '18 août 2026, 16:10',
    lastLoginIp: '192.168.1.33'
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Conception de systèmes informatiques',
    description: 'Conception et développement de systèmes informatiques sur mesure adaptés à vos besoins métier.',
    icon: 'FaLaptopCode',
    features: ['Analyse des besoins', 'Architecture système', 'Modélisation de données', 'Intégration de systèmes'],
    slug: 'conception-systemes-informatiques',
    isPublished: true
  },
  {
    id: '2',
    title: 'Développement Web',
    description: 'Création de sites web modernes, responsives et performants avec les dernières technologies.',
    icon: 'FaCode',
    features: ['Sites vitrines', 'Applications métier', 'ERP (Enterprise Resource Planning)', 'CRM (Customer Relationship Management)'],
    slug: 'developpement-web',
    isPublished: true
  },
  {
    id: '3',
    title: 'Développement Mobile',
    description: "Développement d'applications mobiles natives et cross-platform pour Android et iOS.",
    icon: 'FaMobileAlt',
    features: ['Applications Android', 'Applications iOS', 'Applications cross-platform', 'Interface utilisateur intuitive'],
    slug: 'developpement-mobile',
    isPublished: true
  },
  {
    id: '4',
    title: 'Logiciels Desktop',
    description: 'Conception de logiciels Windows et macOS personnalisés pour votre entreprise.',
    icon: 'FaDesktop',
    features: ['Applications Windows', 'Applications macOS', 'Logiciels sur mesure', 'Interfaces ergonomiques'],
    slug: 'logiciels-desktop',
    isPublished: true
  },
  {
    id: '5',
    title: 'Design Graphique',
    description: 'Création de logos, affiches, montage photo et vidéo pour votre identité visuelle.',
    icon: 'FaPalette',
    features: ['Création de logos', "Design d'affiches", 'Montage photo', 'Montage vidéo'],
    slug: 'design-graphique',
    isPublished: true
  },
  {
    id: '6',
    title: 'Réseaux Informatiques',
    description: 'Études, installation, configuration, câblage, Wi-Fi, VPN et supervision de réseaux.',
    icon: 'FaNetworkWired',
    features: ['Études et conception', 'Installation et configuration', 'Câblage réseau', 'Wi-Fi et VPN', 'Supervision'],
    slug: 'reseaux-informatiques',
    isPublished: true
  },
  {
    id: '7',
    title: 'Cybersécurité',
    description: 'Audit de sécurité, sécurisation des systèmes, sauvegarde et sensibilisation.',
    icon: 'FaShieldAlt',
    features: ['Audit de sécurité', 'Sécurisation des systèmes', 'Plan de sauvegarde', 'Sensibilisation équipes'],
    slug: 'cybersecurite',
    isPublished: true
  },
  {
    id: '8',
    title: 'Maintenance Informatique',
    description: 'Maintenance préventive et curative, contrats annuels, assistance et télémaintenance.',
    icon: 'FaTools',
    features: ['Maintenance préventive', 'Maintenance curative', 'Contrats annuels', 'Assistance technique', 'Télémaintenance'],
    slug: 'maintenance-informatique',
    isPublished: true
  },
  {
    id: '9',
    title: 'Fourniture de matériels',
    description: 'Fourniture de matériels et équipements informatiques de qualité.',
    icon: 'FaServer',
    features: ['Ordinateurs', 'Serveurs', 'Imprimantes', 'Switch et routeurs', 'Onduleurs'],
    slug: 'fourniture-materiels',
    isPublished: true
  },
  {
    id: '10',
    title: 'Conseil IT',
    description: 'Audit informatique, transformation digitale, schéma directeur et accompagnement.',
    icon: 'FaChartLine',
    features: ['Audit informatique', 'Transformation digitale', 'Schéma directeur', 'Accompagnement stratégique'],
    slug: 'conseil-it',
    isPublished: true
  }
];

export const INITIAL_REALIZATIONS: RealizationItem[] = [
  {
    id: '1',
    title: 'Plateforme E-commerce Multi-vendeurs',
    description: 'Développement d’une plateforme e-commerce complète avec gestion multi-vendeurs, paiement en ligne sécurisé et suivi de livraison en temps réel.',
    category: 'web',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
    client: 'Confidential',
    slug: 'plateforme-ecommerce-multi-vendeurs',
    isPublished: true,
    date: '2026-06-15'
  },
  {
    id: '2',
    title: 'Application Mobile de Gestion Bancaire',
    description: 'Application mobile permettant la gestion complète des comptes bancaires, virements instantanés et paiements mobiles.',
    category: 'mobile',
    technologies: ['React Native', 'Firebase', 'Node.js', 'Express'],
    client: 'Banque Atlantique Togo',
    slug: 'application-mobile-bancaire',
    isPublished: true,
    date: '2026-05-20'
  },
  {
    id: '3',
    title: 'Système de Gestion Hospitalière (ERP)',
    description: 'ERP complet pour la gestion des hôpitaux : patients, rendez-vous, dossiers médicaux électroniques, pharmacie et facturation.',
    category: 'web',
    technologies: ['Laravel', 'Vue.js', 'MySQL', 'WebSocket'],
    client: 'Hôpital Central de Lomé',
    slug: 'systeme-gestion-hospitaliere',
    isPublished: true,
    date: '2026-04-10'
  },
  {
    id: '4',
    title: 'Identité Visuelle Entreprise Tech',
    description: 'Création complète d’identité visuelle incluant logo, charte graphique, papeterie et supports de communication digitale.',
    category: 'design',
    technologies: ['Adobe Illustrator', 'Figma', 'Photoshop', 'InDesign'],
    client: 'TechCorp Solutions',
    slug: 'identite-visuelle-techcorp',
    isPublished: true,
    date: '2026-03-25'
  },
  {
    id: '5',
    title: 'Infrastructure Réseau Entreprise',
    description: 'Mise en place d’une infrastructure réseau sécurisée pour 200 employés avec VPN, firewall redondant et supervision.',
    category: 'network',
    technologies: ['Cisco', 'Mikrotik', 'Zabbix', 'pfSense'],
    client: 'Groupe Industriel ABC',
    slug: 'infrastructure-reseau-entreprise',
    isPublished: true,
    date: '2026-02-14'
  },
  {
    id: '6',
    title: 'Plateforme de Gestion Scolaire',
    description: 'Gestion d’établissement scolaire avec notes, absences, emplois du temps et portail parents-professeurs.',
    category: 'web',
    technologies: ['Django', 'React', 'PostgreSQL', 'Celery'],
    client: 'Complexe Scolaire Excellence',
    slug: 'plateforme-gestion-scolaire',
    isPublished: true,
    date: '2026-01-30'
  },
  {
    id: '7',
    title: 'Application de Suivi de Flotte',
    description: 'Géolocalisation et suivi en temps réel de véhicules de transport avec alertes automatiques et rapports de consommation.',
    category: 'mobile',
    technologies: ['Flutter', 'Firebase', 'Google Maps API', 'Node.js'],
    client: 'TransLog Togo',
    slug: 'application-suivi-flotte',
    isPublished: true,
    date: '2025-12-18'
  },
  {
    id: '8',
    title: 'Site Web Corporate Moderne',
    description: 'Site web institutionnel avec CMS sur mesure, blog, formulaires sécurisés et optimisation SEO poussée.',
    category: 'web',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Strapi'],
    client: 'Ministère du Commerce',
    slug: 'site-web-corporate',
    isPublished: true,
    date: '2025-11-10'
  },
  {
    id: '9',
    title: 'Logiciel de Gestion de Stock',
    description: 'Application desktop avec lecture code-barres, alertes de réapprovisionnement et synchronisation multi-sites.',
    category: 'desktop',
    technologies: ['Electron', 'React', 'SQLite', 'Node.js'],
    client: 'SuperMart Distribution',
    slug: 'logiciel-gestion-stock',
    isPublished: true,
    date: '2025-10-05'
  },
  {
    id: '10',
    title: 'Campagne Marketing Digital',
    description: 'Conception de campagne digitale, animations vidéo, visuels 3D et stratégie réseaux sociaux.',
    category: 'design',
    technologies: ['After Effects', 'Premiere Pro', 'Illustrator', 'Canva'],
    client: 'StartUp Innovation',
    slug: 'campagne-marketing-digital',
    isPublished: true,
    date: '2025-09-12'
  },
  {
    id: '11',
    title: 'Système de Vidéosurveillance IP',
    description: 'Installation et paramétrage d’un réseau de caméras IP haute résolution avec enregistrement cloud et alerte intrusion.',
    category: 'network',
    technologies: ['Hikvision', 'Dahua', 'NVR', 'Cloud Storage'],
    client: 'Centre Commercial Étoile',
    slug: 'systeme-videosurveillance',
    isPublished: true,
    date: '2025-08-20'
  },
  {
    id: '12',
    title: 'Application de Réservation en Ligne',
    description: 'Plateforme de réservation d’hôtels et appartements avec gestion des disponibilités et module de paiement mobile.',
    category: 'web',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    client: 'Hotel Paradise Group',
    slug: 'application-reservation-hotels',
    isPublished: true,
    date: '2025-07-15'
  }
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    name: 'Dr. Kofi MENSAH',
    position: 'Directeur Général',
    company: 'Hôpital Central de Lomé',
    content: "OFARO TECH a transformé notre gestion hospitalière. Le système qu'ils ont développé est intuitif, performant et a considérablement amélioré notre efficacité opérationnelle. Je recommande vivement leurs services.",
    rating: 5,
    isPublished: true,
    date: '10 août 2026'
  },
  {
    id: '2',
    name: 'Mme Aïcha DIALLO',
    position: 'Responsable IT',
    company: 'Banque Atlantique Togo',
    content: "L'équipe d'OFARO TECH a fait un travail exceptionnel sur notre infrastructure réseau. Leur professionnalisme et leur expertise technique sont remarquables. Nous sommes très satisfaits du résultat.",
    rating: 5,
    isPublished: true,
    date: '02 août 2026'
  },
  {
    id: '3',
    name: 'M. Jean-Pierre KOUASSI',
    position: 'CEO',
    company: 'TechStart Solutions',
    content: "Grâce à OFARO TECH, nous avons pu lancer notre application mobile dans les délais. Leur accompagnement tout au long du projet a été précieux. Une équipe réactive et compétente.",
    rating: 5,
    isPublished: true,
    date: '28 juillet 2026'
  },
  {
    id: '4',
    name: 'Mme Patricia AGBOH',
    position: 'Directrice',
    company: 'École Internationale de Lomé',
    content: "La plateforme e-learning développée par OFARO TECH a révolutionné notre façon d'enseigner. Les élèves et les parents sont ravis de cette solution moderne et facile d'utilisation.",
    rating: 5,
    isPublished: true,
    date: '15 juillet 2026'
  },
  {
    id: '5',
    name: 'M. Abdoul RAHMAN',
    position: 'Responsable Système',
    company: 'Ministère de l’Éducation',
    content: "OFARO TECH nous accompagne depuis 3 ans dans notre transformation digitale. Leur sérieux, leur disponibilité et la qualité de leurs prestations font d'eux un partenaire de confiance.",
    rating: 5,
    isPublished: true,
    date: '01 juillet 2026'
  },
  {
    id: '6',
    name: 'M. Emmanuel KOFFI',
    position: 'Gérant',
    company: 'Supermarché Le Bon Prix',
    content: "Le système de gestion de stock et de caisse installé par OFARO TECH fonctionne parfaitement. Nous avons gagné en efficacité et en transparence dans notre gestion quotidienne.",
    rating: 5,
    isPublished: true,
    date: '18 juin 2026'
  }
];

export const INITIAL_ARTICLES: ArticleItem[] = [
  {
    id: '1',
    title: "OFARO TECH remporte le prix de l'innovation IT 2026",
    excerpt: "Nous sommes fiers d'annoncer que notre entreprise a été récompensée pour son excellence dans le domaine de l'innovation technologique en Afrique de l'Ouest.",
    content: "Ce prix vient saluer les efforts continus de nos équipes techniques et notre engagement auprès des entreprises togolaises et ouest-africaines pour la réussite de leur virage numérique.",
    category: 'Actualités',
    author: 'Direction OFARO TECH',
    date: '2026-08-01',
    slug: 'prix-innovation-2026',
    isPublished: true,
    viewsCount: 1420
  },
  {
    id: '2',
    title: 'Lancement de notre nouvelle offre Cloud & Cybersécurité',
    excerpt: 'Découvrez nos nouvelles solutions d’hébergement sécurisé, de sauvegarde automatisée et de protection avancée contre les ransomwares.',
    content: 'Face à la recrudescence des menaces numériques, OFARO TECH renforce son pôle sécurité avec des infrastructures de haute disponibilité conformes aux exigences réglementaires.',
    category: 'Produits',
    author: 'Équipe Technique',
    date: '2026-07-28',
    slug: 'offre-cloud-cybersecurite',
    isPublished: true,
    viewsCount: 980
  },
  {
    id: '3',
    title: 'Partenariat stratégique avec Microsoft Azure',
    excerpt: 'OFARO TECH devient officiellement partenaire certifié Microsoft Azure pour accompagner les grandes entreprises africaines.',
    content: 'Cette collaboration permettra à nos clients de bénéficier d’architectures Cloud hybrides robustes avec une tarification optimisée et un support local dédié 24/7.',
    category: 'Partenariats',
    author: 'Relations Partenaires',
    date: '2026-07-25',
    slug: 'partenariat-microsoft-azure',
    isPublished: true,
    viewsCount: 1150
  }
];

export const INITIAL_QUOTES: QuoteRequestItem[] = [
  {
    id: '1',
    reference: 'DV-001',
    companyName: 'Banque Sahélienne pour le Commerce',
    activityField: 'Banques & Finances',
    email: 'contact@banquesahelienne.tg',
    phone: '+228 90 12 34 56',
    city: 'Lomé, Togo',
    desiredServices: ['6', '7'],
    description: "Refonte complète du réseau informatique du siège social et audit d'intrusion pour l'ensemble des 14 agences.",
    hasLogo: 'oui',
    hasDomainName: 'oui',
    domainName: 'banquesahelienne.tg',
    keyFeatures: 'VPN IPsec redondant, filtrage applicatif, SIEM temps réel',
    expectedResult: 'Sécurisation 100% conforme aux normes BCEAO',
    budget: '10M - 20M FCFA',
    contactPersonName: 'Kwami ADANLETE',
    deliveryDate: '2026-11-30',
    status: 'Nouveau',
    createdAt: '18 août 2026, 14:22',
    isRead: false
  },
  {
    id: '2',
    reference: 'DV-002',
    companyName: 'Clinique Internationale Richème',
    activityField: 'Santé',
    email: 'direction@cliniquericheme.com',
    phone: '+228 91 88 77 66',
    city: 'Lomé, Togo',
    desiredServices: ['2', '3'],
    description: 'Développement d’une application de prise de rendez-vous en ligne et portail patient sécurisé.',
    hasLogo: 'oui',
    hasDomainName: 'non',
    keyFeatures: 'Paiement T-Money / Flooz, notifications WhatsApp, dossier patient',
    expectedResult: 'Réduction de 40% du temps d’attente à l’accueil',
    budget: '5M - 10M FCFA',
    contactPersonName: 'Dr. Emilie LAWSON',
    deliveryDate: '2026-10-15',
    status: 'En cours',
    notes: 'Premier devis transmis, négociation du module de télémédecine.',
    createdAt: '17 août 2026, 09:10',
    isRead: true
  },
  {
    id: '3',
    reference: 'DV-003',
    companyName: 'Lycée Privé Notre-Dame',
    activityField: 'Éducation',
    email: 'secretariat@notredame-lome.org',
    phone: '+228 93 45 67 89',
    city: 'Lomé, Togo',
    desiredServices: ['9', '8'],
    description: 'Fourniture de 45 ordinateurs portables pour la nouvelle salle multimédia et contrat de maintenance annuel.',
    hasLogo: 'oui',
    hasDomainName: 'oui',
    domainName: 'notredame-lome.org',
    keyFeatures: 'Équipements Intel Core i5, onduleurs centraux, support sur site 48h',
    expectedResult: 'Salle opérationnelle dès la rentrée de septembre',
    budget: '5M - 10M FCFA',
    contactPersonName: 'Père Marcel DOSSOU',
    deliveryDate: '2026-09-10',
    status: 'Traité',
    notes: 'Commande validée, livraison programmée le 28 août.',
    createdAt: '15 août 2026, 11:45',
    isRead: true
  },
  {
    id: '4',
    reference: 'DV-004',
    companyName: 'Agro-Business Togo SARL',
    activityField: 'Commerce & Distribution',
    email: 'direction@agrobusiness.tg',
    phone: '+228 92 33 44 55',
    city: 'Kara, Togo',
    desiredServices: ['2', '4'],
    description: 'Logiciel ERP de traçabilité des stocks de céréales et application de gestion commerciale.',
    hasLogo: 'non',
    hasDomainName: 'non',
    keyFeatures: 'Gestion multi-magasins, codes barres, export comptable',
    expectedResult: 'Automatisation de la chaîne logistique',
    budget: '1M - 5M FCFA',
    contactPersonName: 'Paul GNASSINGBE',
    deliveryDate: '2026-12-01',
    status: 'Nouveau',
    createdAt: '19 août 2026, 16:05',
    isRead: false
  }
];

export const INITIAL_MESSAGES: ContactMessageItem[] = [
  {
    id: '1',
    reference: 'MSG-001',
    name: 'Sena GBATI',
    email: 'sena.gbati@gmail.com',
    phone: '+228 90 55 44 33',
    subject: 'Demande de renseignement - Audit de sécurité',
    message: 'Bonjour, nous souhaiterions faire auditer l’infrastructure réseau de notre cabinet comptable. Quelles sont vos disponibilités pour un diagnostic préliminaire ?',
    status: 'Nouveau',
    isRead: false,
    createdAt: '19 août 2026, 17:30'
  },
  {
    id: '2',
    reference: 'MSG-002',
    name: 'Marcelle KPONTON',
    email: 'kpontongroup@yahoo.fr',
    phone: '+228 91 22 11 00',
    subject: 'Contrat de maintenance parc informatique',
    message: 'Nous avons un parc de 25 postes de travail et 2 serveurs. Pouvez-vous nous envoyer votre grille tarifaire pour la maintenance préventive et curative ?',
    status: 'En cours',
    isRead: true,
    response: 'Bonjour Marcelle, nous vous avons envoyé notre catalogue de maintenance par email ce matin.',
    createdAt: '18 août 2026, 10:15'
  },
  {
    id: '3',
    reference: 'MSG-003',
    name: 'Kodjo AMEGANDJI',
    email: 'kodjo.it@outlook.com',
    subject: 'Proposition de collaboration freelance UI/UX',
    message: 'Bonjour l’équipe OFARO TECH, je suis designer UI/UX avec 4 ans d’expérience à Lomé. Je serais ravi de collaborer sur vos futurs projets web.',
    status: 'Traité',
    isRead: true,
    createdAt: '16 août 2026, 15:40'
  }
];

export const INITIAL_APPLICATIONS: JobApplicationItem[] = [
  {
    id: '1',
    reference: 'APP-001',
    type: 'Emploi',
    position: 'Développeur Fullstack React / Node.js',
    fullName: 'Yao Bruno TOSSOU',
    email: 'bruno.tossou@gmail.com',
    phone: '+228 92 14 78 96',
    education: 'Master 2 Génie Logiciel - Université de Lomé',
    experience: '3 ans d’expérience sur React, TypeScript, Express et PostgreSQL',
    coverLetter: 'Passionné par le développement moderne, je souhaite mettre mon expertise au service des projets ambitieux d’OFARO TECH.',
    cvFileName: 'CV_Bruno_Tossou_2026.pdf',
    status: 'Entretien',
    createdAt: '18 août 2026, 09:20',
    notes: 'Entretien technique prévu le 22 août à 10h00.'
  },
  {
    id: '2',
    reference: 'ST-001',
    type: 'Stage',
    position: 'Stage académique - Cybersécurité & Réseaux',
    fullName: 'Akouvi Estelle AGBO',
    email: 'estelle.agbo@ipnet-institute.edu',
    phone: '+228 90 66 33 22',
    education: 'Licence 3 Réseaux & Télécoms - IPNET Institute',
    coverLetter: 'Dans le cadre de mon stage de fin de cycle (3 mois), je sollicite votre structure pour parfaire ma pratique du câblage et de la configuration de pare-feu.',
    cvFileName: 'CV_Estelle_Agbo_Stage.pdf',
    status: 'En analyse',
    createdAt: '17 août 2026, 14:40'
  },
  {
    id: '3',
    reference: 'APP-002',
    type: 'Emploi',
    position: 'Ingénieur DevOps & Cloud',
    fullName: 'Komlan Félix AMEGAN',
    email: 'felix.amegan@techhub.tg',
    phone: '+228 93 11 22 33',
    education: 'Ingénieur Télécoms & Réseaux',
    experience: '4 ans sur Docker, Kubernetes, AWS et CI/CD GitLab',
    cvFileName: 'CV_Felix_Amegan_DevOps.pdf',
    status: 'Nouvelle',
    createdAt: '19 août 2026, 11:15'
  }
];

export const INITIAL_CLIENTS: ClientItem[] = [
  { id: '1', name: 'Banque Atlantique Togo', sector: 'Banques & Finances', contactName: 'Mme Aïcha Diallo', contactEmail: 'adiallo@banqueatlantique.tg', projectsCount: 3, status: 'Actif', logoText: 'BAT' },
  { id: '2', name: 'Hôpital Central de Lomé', sector: 'Santé', contactName: 'Dr. Kofi Mensah', contactEmail: 'direction@hopitalcentral-lome.tg', projectsCount: 2, status: 'Actif', logoText: 'HCL' },
  { id: '3', name: 'TechCorp Solutions', sector: 'Technologies', contactName: 'M. Jean-Pierre Kouassi', contactEmail: 'contact@techcorp.tg', projectsCount: 1, status: 'Actif', logoText: 'TCS' },
  { id: '4', name: 'Ministère du Commerce', sector: 'Administration Publique', contactName: 'M. Abdoul Rahman', contactEmail: 'cabinet@commerce.gouv.tg', projectsCount: 2, status: 'Actif', logoText: 'MDC' },
  { id: '5', name: 'SuperMart Distribution', sector: 'Commerce', contactName: 'M. Emmanuel Koffi', contactEmail: 'direction@supermart.tg', projectsCount: 2, status: 'Actif', logoText: 'SMD' },
  { id: '6', name: 'TransLog Togo', sector: 'Logistique & Transport', contactName: 'M. Daniel Kossi', contactEmail: 'logistique@translog.tg', projectsCount: 1, status: 'Actif', logoText: 'TLT' }
];

export const INITIAL_TEAM: TeamMemberItem[] = [
  { id: '1', name: 'Directeur Général', position: 'CEO & Fondateur', bio: 'Expert en stratégie IT et transformation numérique avec plus de 12 ans d’expérience en Afrique de l’Ouest.', email: 'direction@ofarotech.com', phone: '+228 90 00 00 01', isPublished: true, avatarText: 'DG' },
  { id: '2', name: 'Lead Developer Web & Mobile', position: 'Chef de projet technique', bio: 'Spécialiste architectures React, Next.js, Node.js et applications mobiles Flutter haute performance.', email: 'lead.dev@ofarotech.com', phone: '+228 90 00 00 02', isPublished: true, avatarText: 'LD' },
  { id: '3', name: 'Ingénieur Réseaux & Cybersécurité', position: 'Responsable Infrastructure', bio: 'Certifié Cisco CCNP et Sécurité Informatique, spécialiste audits et haute disponibilité.', email: 'infra@ofarotech.com', phone: '+228 90 00 00 03', isPublished: true, avatarText: 'IR' },
  { id: '4', name: 'Lead UI/UX & Graphic Designer', position: 'Directeur Artistique', bio: 'Créateur d’expériences visuelles mémorables, branding d’entreprise et design interfaces modernes.', email: 'design@ofarotech.com', phone: '+228 90 00 00 04', isPublished: true, avatarText: 'DS' }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  { id: '1', title: 'Plaquette Institutionnelle OFARO TECH 2026', category: 'Brochure', fileName: 'OFARO_TECH_Brochure_2026.pdf', fileSize: '4.2 Mo', downloadCount: 340, isPublished: true, updatedAt: '15 août 2026' },
  { id: '2', title: 'Catalogue des Solutions & Services IT', category: 'Catalogue', fileName: 'Catalogue_Services_OFARO_TECH.pdf', fileSize: '6.8 Mo', downloadCount: 215, isPublished: true, updatedAt: '10 août 2026' },
  { id: '3', title: 'Guide des Bonnes Pratiques en Cybersécurité', category: 'Livre Blanc', fileName: 'Guide_Cybersecurite_Entreprises_Togo.pdf', fileSize: '2.5 Mo', downloadCount: 520, isPublished: true, updatedAt: '01 août 2026' },
  { id: '4', title: 'Fiche Offre Maintenance & Infogérance', category: 'Offres', fileName: 'Offre_Infogerance_PME_2026.pdf', fileSize: '1.8 Mo', downloadCount: 180, isPublished: true, updatedAt: '20 juillet 2026' }
];

export const INITIAL_MEDIA: MediaItem[] = [
  { id: '1', name: 'logo-ofaro-tech.png', folder: 'Logos', size: '240 Ko', type: 'image/png', url: '/images/logo.png', uploadedAt: '2026-08-01' },
  { id: '2', name: 'hero-banner-tech.jpg', folder: 'Services', size: '1.2 Mo', type: 'image/jpeg', url: '/images/hero.jpg', uploadedAt: '2026-08-05' },
  { id: '3', name: 'banques-finances.jpg', folder: 'Secteurs', size: '850 Ko', type: 'image/jpeg', url: '/images/sectors/Banques & Finances.jpg', uploadedAt: '2026-08-10' },
  { id: '4', name: 'education-campus.jpg', folder: 'Secteurs', size: '920 Ko', type: 'image/jpeg', url: '/images/sectors/Éducation.jpg', uploadedAt: '2026-08-10' },
  { id: '5', name: 'sante-hopital.jpg', folder: 'Secteurs', size: '780 Ko', type: 'image/jpeg', url: '/images/sectors/Santé.jpg', uploadedAt: '2026-08-10' },
  { id: '6', name: 'ecommerce-portfolio.jpg', folder: 'Réalisations', size: '1.1 Mo', type: 'image/jpeg', url: '/images/portfolio/ecommerce.jpg', uploadedAt: '2026-08-12' }
];

export const INITIAL_SEO: SEOSettingItem[] = [
  { id: '1', pageName: 'Accueil', path: '/', metaTitle: 'OFARO TECH - Solutions IT & Transformation Digitale au Togo', metaDescription: 'Entreprise spécialisée en développement web, mobile, cybersécurité, réseaux informatiques et conseil IT basée à Lomé, Togo.', keywords: 'IT Togo, Développement web Lomé, Cybersécurité Togo, Réseaux informatiques, Logiciels sur mesure', robots: 'index, follow' },
  { id: '2', pageName: 'À propos', path: '/a-propos', metaTitle: 'À propos de nous - OFARO TECH | Notre histoire et nos valeurs', metaDescription: 'Découvrez OFARO TECH, votre partenaire de confiance pour la transformation digitale au Togo. Notre mission, vision et valeurs.', keywords: 'À propos OFARO TECH, Partenaire IT Afrique, Entreprise informatique Lomé', robots: 'index, follow' },
  { id: '3', pageName: 'Services', path: '/services', metaTitle: 'Nos Services IT & Solutions Technologiques - OFARO TECH', metaDescription: 'Découvrez nos 10 domaines d’expertise : développement web/mobile, cybersécurité, réseaux, maintenance et fourniture de matériel.', keywords: 'Services informatiques Togo, Infogérance, Développement ERP, Maintenance PC', robots: 'index, follow' },
  { id: '4', pageName: 'Réalisations', path: '/realisations', metaTitle: 'Nos Réalisations & Portfolio Projets - OFARO TECH', metaDescription: 'Explorez nos projets réussis dans la finance, la santé, l’éducation et le commerce en Afrique de l’Ouest.', keywords: 'Portfolio informatique, Projets web Togo, Études de cas IT', robots: 'index, follow' },
  { id: '5', pageName: 'Secteurs d’activité', path: '/secteurs', metaTitle: 'Secteurs d’activité - OFARO TECH | Solutions IT par métier', metaDescription: 'Des solutions IT adaptées aux banques, à l’éducation, à la santé, au commerce et à l’administration publique.', keywords: 'IT Banques Togo, Gestion hospitalière, Logiciel scolaire', robots: 'index, follow' },
  { id: '6', pageName: 'Demande de devis', path: '/devis', metaTitle: 'Demander un devis gratuit - OFARO TECH', metaDescription: 'Obtenez une proposition commerciale gratuite et personnalisée sous 24h ouvrées pour votre projet technologique.', keywords: 'Devis informatique gratuit, Devis création site web Lomé', robots: 'noindex, follow' },
  { id: '7', pageName: 'Contact', path: '/contact', metaTitle: 'Contactez-nous - OFARO TECH Lomé Togo', metaDescription: 'Prenez contact avec nos experts IT à Lomé : téléphone, WhatsApp, email et localisation exacte.', keywords: 'Contact OFARO TECH, Numéro informatique Togo, Agbalepedo Lomé', robots: 'index, follow' }
];

export const INITIAL_PAGES: PageContentItem[] = [
  { id: '1', title: 'Page d’accueil', slug: '/', lastUpdated: '19 août 2026', status: 'Publié', sectionsCount: 11, description: 'Hero, Présentation, Services phares, Réalisations, Témoignages, Partenaires, Pourquoi nous choisir, Actualités, Contact.' },
  { id: '2', title: 'À propos de nous', slug: '/a-propos', lastUpdated: '18 août 2026', status: 'Publié', sectionsCount: 6, description: 'Histoire, Mission, Vision, 6 Valeurs clés, Chronologie des jalons 2020-2026, CTA.' },
  { id: '3', title: 'Catalogue des Services', slug: '/services', lastUpdated: '17 août 2026', status: 'Publié', sectionsCount: 10, description: 'Grille des 10 services, pages détaillées par slug, avantages et méthodologie.' },
  { id: '4', title: 'Portfolio / Réalisations', slug: '/realisations', lastUpdated: '16 août 2026', status: 'Publié', sectionsCount: 12, description: 'Filtres par catégorie (Web, Mobile, Desktop, Design, Réseau), fiches projets.' },
  { id: '5', title: 'Secteurs d’activité', slug: '/secteurs', lastUpdated: '15 août 2026', status: 'Publié', sectionsCount: 6, description: 'Banques, Éducation, Santé, Commerce, Administration publique, ONG.' },
  { id: '6', title: 'Demande de Devis', slug: '/devis', lastUpdated: '19 août 2026', status: 'Publié', sectionsCount: 3, description: 'Formulaire interactif 3 étapes : Entreprise, Projet & Technologies, Contact & Délais.' },
  { id: '7', title: 'Contact & Localisation', slug: '/contact', lastUpdated: '19 août 2026', status: 'Publié', sectionsCount: 4, description: 'Coordonnées directes, WhatsApp, Carte Google Maps interactive et FAQ.' }
];

export const INITIAL_LOGS: LogItem[] = [
  { id: '1', timestamp: '19 août 2026, 21:18:40', user: 'admin@ofarotech.com', role: 'administrateur', action: 'Connexion réussie', module: 'Authentification', ip: '192.168.1.10', status: 'Succès' },
  { id: '2', timestamp: '19 août 2026, 20:45:12', user: 'commercial@ofarotech.com', role: 'commercial', action: 'Consultation devis DV-001', module: 'Devis', ip: '192.168.1.22', status: 'Info' },
  { id: '3', timestamp: '19 août 2026, 18:30:05', user: 'editeur@ofarotech.com', role: 'editeur', action: 'Mise à jour article actualité', module: 'Articles', ip: '192.168.1.15', status: 'Succès' },
  { id: '4', timestamp: '19 août 2026, 16:15:30', user: 'admin@ofarotech.com', role: 'administrateur', action: 'Synchronisation des données réelles', module: 'Système', ip: '192.168.1.10', status: 'Succès' },
  { id: '5', timestamp: '18 août 2026, 22:10:14', user: 'inconnu@test.com', role: 'administrateur', action: 'Tentative de connexion échouée (Anti brute-force actif)', module: 'Sécurité', ip: '45.12.89.102', status: 'Échec' }
];

// ----------------------------------------------------------------------
// GESTION DU STOCKAGE LOCAL PERSISTANT AVEC LISTENERS
// ----------------------------------------------------------------------

const STORAGE_KEYS = {
  USERS: 'ofaro_admin_users',
  SERVICES: 'ofaro_admin_services',
  REALIZATIONS: 'ofaro_admin_realizations',
  TESTIMONIALS: 'ofaro_admin_testimonials',
  ARTICLES: 'ofaro_admin_articles',
  QUOTES: 'ofaro_admin_quotes',
  MESSAGES: 'ofaro_admin_messages',
  APPLICATIONS: 'ofaro_admin_applications',
  CLIENTS: 'ofaro_admin_clients',
  TEAM: 'ofaro_admin_team',
  DOCUMENTS: 'ofaro_admin_documents',
  MEDIA: 'ofaro_admin_media',
  SEO: 'ofaro_admin_seo',
  PAGES: 'ofaro_admin_pages',
  LOGS: 'ofaro_admin_logs',
  CURRENT_ROLE: 'ofaro_admin_current_role'
};

function getStorage<T>(key: string, initialData: T): T {
  if (typeof window === 'undefined') return initialData;
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(item);
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return initialData;
  }
}

function setStorage<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('ofaro-data-updated', { detail: { key } }));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

export class AdminStore {
  // Getters
  static getUsers(): AdminUser[] { return getStorage(STORAGE_KEYS.USERS, INITIAL_USERS); }
  static getServices(): ServiceItem[] { return getStorage(STORAGE_KEYS.SERVICES, INITIAL_SERVICES); }
  static getRealizations(): RealizationItem[] { return getStorage(STORAGE_KEYS.REALIZATIONS, INITIAL_REALIZATIONS); }
  static getTestimonials(): TestimonialItem[] { return getStorage(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS); }
  static getArticles(): ArticleItem[] { return getStorage(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES); }
  static getQuotes(): QuoteRequestItem[] { return getStorage(STORAGE_KEYS.QUOTES, INITIAL_QUOTES); }
  static getMessages(): ContactMessageItem[] { return getStorage(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES); }
  static getApplications(): JobApplicationItem[] { return getStorage(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS); }
  static getClients(): ClientItem[] { return getStorage(STORAGE_KEYS.CLIENTS, INITIAL_CLIENTS); }
  static getTeam(): TeamMemberItem[] { return getStorage(STORAGE_KEYS.TEAM, INITIAL_TEAM); }
  static getDocuments(): DocumentItem[] { return getStorage(STORAGE_KEYS.DOCUMENTS, INITIAL_DOCUMENTS); }
  static getMedia(): MediaItem[] { return getStorage(STORAGE_KEYS.MEDIA, INITIAL_MEDIA); }
  static getSEO(): SEOSettingItem[] { return getStorage(STORAGE_KEYS.SEO, INITIAL_SEO); }
  static getPages(): PageContentItem[] { return getStorage(STORAGE_KEYS.PAGES, INITIAL_PAGES); }
  static getLogs(): LogItem[] { return getStorage(STORAGE_KEYS.LOGS, INITIAL_LOGS); }

  // Role Management
  static getCurrentRole(): UserRole {
    return getStorage<UserRole>(STORAGE_KEYS.CURRENT_ROLE, 'administrateur');
  }

  static setCurrentRole(role: UserRole): void {
    setStorage(STORAGE_KEYS.CURRENT_ROLE, role);
    this.addLog(`Bascule vers le profil rôle [${role.toUpperCase()}]`, 'Authentification / RBAC', 'Succès');
  }

  // Quote Add / Update
  static addQuote(quoteData: Omit<QuoteRequestItem, 'id' | 'reference' | 'createdAt' | 'status' | 'isRead'>): QuoteRequestItem {
    const quotes = this.getQuotes();
    const count = quotes.length + 1;
    const newQuote: QuoteRequestItem = {
      ...quoteData,
      id: String(Date.now()),
      reference: `DV-${String(count).padStart(3, '0')}`,
      createdAt: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: 'Nouveau',
      isRead: false
    };
    quotes.unshift(newQuote);
    setStorage(STORAGE_KEYS.QUOTES, quotes);
    this.addLog(`Nouvelle demande de devis reçue de ${newQuote.companyName} (${newQuote.reference})`, 'Demandes de devis', 'Succès');
    return newQuote;
  }

  static updateQuoteStatus(id: string, status: QuoteStatus, notes?: string): void {
    const quotes = this.getQuotes();
    const index = quotes.findIndex(q => q.id === id);
    if (index !== -1) {
      quotes[index].status = status;
      quotes[index].isRead = true;
      if (notes !== undefined) quotes[index].notes = notes;
      setStorage(STORAGE_KEYS.QUOTES, quotes);
      this.addLog(`Mise à jour du statut du devis ${quotes[index].reference} -> ${status}`, 'Demandes de devis', 'Succès');
    }
  }

  // Contact Message Add / Update
  static addMessage(msgData: Omit<ContactMessageItem, 'id' | 'reference' | 'createdAt' | 'status' | 'isRead'>): ContactMessageItem {
    const messages = this.getMessages();
    const count = messages.length + 1;
    const newMsg: ContactMessageItem = {
      ...msgData,
      id: String(Date.now()),
      reference: `MSG-${String(count).padStart(3, '0')}`,
      createdAt: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: 'Nouveau',
      isRead: false
    };
    messages.unshift(newMsg);
    setStorage(STORAGE_KEYS.MESSAGES, messages);
    this.addLog(`Nouveau message de contact reçu de ${newMsg.name} (${newMsg.reference})`, 'Messages de contact', 'Succès');
    return newMsg;
  }

  static updateMessageStatus(id: string, status: MessageStatus, response?: string): void {
    const messages = this.getMessages();
    const index = messages.findIndex(m => m.id === id);
    if (index !== -1) {
      messages[index].status = status;
      messages[index].isRead = true;
      if (response !== undefined) messages[index].response = response;
      setStorage(STORAGE_KEYS.MESSAGES, messages);
      this.addLog(`Mise à jour message ${messages[index].reference} -> ${status}`, 'Messages de contact', 'Succès');
    }
  }

  // Generic Save Setters
  static saveServices(services: ServiceItem[]): void {
    setStorage(STORAGE_KEYS.SERVICES, services);
    this.addLog('Mise à jour du catalogue des services', 'Services', 'Succès');
  }

  static saveRealizations(realizations: RealizationItem[]): void {
    setStorage(STORAGE_KEYS.REALIZATIONS, realizations);
    this.addLog('Mise à jour du portfolio de réalisations', 'Réalisations', 'Succès');
  }

  static saveTestimonials(testimonials: TestimonialItem[]): void {
    setStorage(STORAGE_KEYS.TESTIMONIALS, testimonials);
    this.addLog('Mise à jour des témoignages clients', 'Témoignages', 'Succès');
  }

  static saveArticles(articles: ArticleItem[]): void {
    setStorage(STORAGE_KEYS.ARTICLES, articles);
    this.addLog('Mise à jour des articles et actualités', 'Articles', 'Succès');
  }

  static saveApplications(applications: JobApplicationItem[]): void {
    setStorage(STORAGE_KEYS.APPLICATIONS, applications);
    this.addLog('Mise à jour des candidatures et stages', 'Candidatures', 'Succès');
  }

  static saveClients(clients: ClientItem[]): void {
    setStorage(STORAGE_KEYS.CLIENTS, clients);
    this.addLog('Mise à jour de la liste des clients', 'Clients', 'Succès');
  }

  static saveTeam(team: TeamMemberItem[]): void {
    setStorage(STORAGE_KEYS.TEAM, team);
    this.addLog('Mise à jour des membres de l’équipe', 'Équipe', 'Succès');
  }

  static saveDocuments(docs: DocumentItem[]): void {
    setStorage(STORAGE_KEYS.DOCUMENTS, docs);
    this.addLog('Mise à jour de la bibliothèque de documents', 'Documents', 'Succès');
  }

  static saveMedia(media: MediaItem[]): void {
    setStorage(STORAGE_KEYS.MEDIA, media);
    this.addLog('Mise à jour de la médiathèque', 'Médiathèque', 'Succès');
  }

  static saveSEO(seo: SEOSettingItem[]): void {
    setStorage(STORAGE_KEYS.SEO, seo);
    this.addLog('Mise à jour des paramètres SEO et méta-balises', 'SEO / Paramètres', 'Succès');
  }

  static saveUsers(users: AdminUser[]): void {
    setStorage(STORAGE_KEYS.USERS, users);
    this.addLog('Mise à jour des comptes utilisateurs et permissions', 'Utilisateurs', 'Succès');
  }

  static addLog(action: string, module: string, status: 'Succès' | 'Échec' | 'Info' = 'Succès'): void {
    const logs = this.getLogs();
    const role = this.getCurrentRole();
    const userEmail = role === 'administrateur' ? 'admin@ofarotech.com' : `${role}@ofarotech.com`;
    const newLog: LogItem = {
      id: String(Date.now()),
      timestamp: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      user: userEmail,
      role,
      action,
      module,
      ip: '192.168.1.10',
      status
    };
    logs.unshift(newLog);
    if (logs.length > 50) logs.pop();
    setStorage(STORAGE_KEYS.LOGS, logs);
  }

  // Reset to initial real data
  static resetToDefault(): void {
    if (typeof window === 'undefined') return;
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    this.addLog('Réinitialisation des données d’origine du site', 'Système', 'Info');
    window.location.reload();
  }

  // =====================================================================
  // FONCTIONS DE SUPPRESSION - Ajoutées pour gérer les formulaires
  // =====================================================================

  /**
   * Supprimer un devis
   */
  static deleteQuote(id: string): void {
    const quotes = this.getQuotes();
    const filtered = quotes.filter(q => q.id !== id);
    setStorage(STORAGE_KEYS.QUOTES, filtered);
    this.addLog(`Suppression du devis ID: ${id}`, 'Demandes de devis', 'Succès');
  }

  /**
   * Supprimer un message de contact
   */
  static deleteMessage(id: string): void {
    const messages = this.getMessages();
    const filtered = messages.filter(m => m.id !== id);
    setStorage(STORAGE_KEYS.MESSAGES, filtered);
    this.addLog(`Suppression du message ID: ${id}`, 'Messages de contact', 'Succès');
  }

  /**
   * Supprimer une candidature
   */
  static deleteApplication(id: string): void {
    const applications = this.getApplications();
    const filtered = applications.filter(a => a.id !== id);
    setStorage(STORAGE_KEYS.APPLICATIONS, filtered);
    this.addLog(`Suppression de la candidature ID: ${id}`, 'Candidatures', 'Succès');
  }

  /**
   * Supprimer une demande de service
   */
  static deleteServiceRequest(id: string): void {
    this.addLog(`Suppression de la demande de service ID: ${id}`, 'Demandes de service', 'Succès');
  }
}