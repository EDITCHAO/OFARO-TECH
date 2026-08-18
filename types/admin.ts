// Types pour le back-office OFARO TECH

export type UserRole = 'administrateur' | 'editeur' | 'commercial' | 'rh';

export type QuoteStatus = 'nouveau' | 'en_cours' | 'traite' | 'sans_suite';
export type MessageStatus = 'nouveau' | 'en_cours' | 'traite';
export type ApplicationStatus = 'nouveau' | 'en_cours' | 'retenu' | 'rejete';

// Utilisateur du back-office
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  is_active: boolean;
  two_factor_enabled: boolean;
  last_login_at?: Date;
  last_login_ip?: string;
  created_at: Date;
  updated_at: Date;
}

// Log de connexion
export interface LoginLog {
  id: number;
  user_id?: number;
  email: string;
  ip_address?: string;
  user_agent?: string;
  success: boolean;
  attempt_at: Date;
}

// Demande de devis
export interface QuoteRequest {
  id: number;
  // Demandeur
  company_name: string;
  sector?: string;
  email: string;
  phone: string;
  city?: string;
  // Projet
  services: string[]; // JSON
  project_description: string;
  has_logo: boolean;
  has_domain: boolean;
  key_feature?: string;
  expected_result?: string;
  budget?: string;
  // Contact
  contact_first_name: string;
  contact_last_name: string;
  desired_delivery_date?: Date;
  // Suivi
  status: QuoteStatus;
  assigned_to?: number;
  notes?: string;
  is_read: boolean;
  created_at: Date;
  updated_at: Date;
}

// Pièce jointe de devis
export interface QuoteAttachment {
  id: number;
  quote_request_id: number;
  file_name: string;
  file_path: string;
  file_size?: number;
  mime_type?: string;
  uploaded_at: Date;
}

// Message de contact
export interface ContactMessage {
  id: number;
  full_name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  is_read: boolean;
  status: MessageStatus;
  assigned_to?: number;
  response?: string;
  responded_at?: Date;
  created_at: Date;
  updated_at: Date;
}

// Candidature
export interface JobApplication {
  id: number;
  position: string;
  application_type: 'emploi' | 'stage';
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  cover_letter?: string;
  cv_file_name?: string;
  cv_file_path?: string;
  status: ApplicationStatus;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

// Réalisation (Portfolio)
export interface Realization {
  id: number;
  title: string;
  slug: string;
  client_name?: string;
  client_sector?: string;
  description: string;
  technologies?: string[]; // JSON
  project_url?: string;
  main_image?: string;
  gallery?: string[]; // JSON
  is_published: boolean;
  display_order: number;
  seo_title?: string;
  seo_description?: string;
  created_at: Date;
  updated_at: Date;
  published_at?: Date;
}

// Article
export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  author_id?: number;
  category?: string;
  tags?: string[]; // JSON
  is_published: boolean;
  views_count: number;
  seo_title?: string;
  seo_description?: string;
  created_at: Date;
  updated_at: Date;
  published_at?: Date;
}

// Témoignage
export interface Testimonial {
  id: number;
  client_name: string;
  company?: string;
  position?: string;
  testimonial: string;
  photo?: string;
  rating?: number;
  is_published: boolean;
  display_order: number;
  created_at: Date;
  updated_at: Date;
}

// Client
export interface Client {
  id: number;
  company_name: string;
  sector?: string;
  logo?: string;
  website?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  description?: string;
  projects_count: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

// Membre de l'équipe
export interface TeamMember {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  bio?: string;
  photo?: string;
  email?: string;
  linkedin?: string;
  display_order: number;
  is_published: boolean;
  created_at: Date;
  updated_at: Date;
}

// Médiathèque
export interface Media {
  id: number;
  file_name: string;
  file_path: string;
  file_type?: string;
  mime_type?: string;
  file_size?: number;
  width?: number;
  height?: number;
  alt_text?: string;
  title?: string;
  uploaded_by?: number;
  folder?: string;
  created_at: Date;
}

// Document téléchargeable
export interface DownloadableDocument {
  id: number;
  title: string;
  description?: string;
  file_name: string;
  file_path: string;
  file_size?: number;
  download_count: number;
  is_published: boolean;
  created_at: Date;
  updated_at: Date;
}

// Paramètres SEO
export interface SEOSettings {
  id: number;
  page_name: string;
  page_url: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  canonical_url?: string;
  robots?: string;
  updated_at: Date;
}

// Log d'activité
export interface ActivityLog {
  id: number;
  user_id?: number;
  action: string;
  entity_type: string;
  entity_id?: number;
  details?: any; // JSON
  ip_address?: string;
  user_agent?: string;
  created_at: Date;
}

// Statistiques du site
export interface SiteStatistics {
  id: number;
  date: Date;
  visitors_count: number;
  page_views: number;
  quote_requests_count: number;
  contact_messages_count: number;
  applications_count: number;
  created_at: Date;
}

// Dashboard Stats
export interface DashboardStats {
  pending_quotes: number;
  unread_messages: number;
  published_realizations: number;
  monthly_visitors: number;
  recent_quotes: QuoteRequest[];
}

// Permissions par rôle
export interface RolePermissions {
  dashboard: boolean;
  pages: boolean;
  articles: boolean;
  realizations: boolean;
  services: boolean;
  testimonials: boolean;
  quote_requests: boolean;
  contact_messages: boolean;
  job_applications: boolean;
  clients: boolean;
  team: boolean;
  documents: boolean;
  users: boolean;
  media_library: boolean;
  seo: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  administrateur: {
    dashboard: true,
    pages: true,
    articles: true,
    realizations: true,
    services: true,
    testimonials: true,
    quote_requests: true,
    contact_messages: true,
    job_applications: true,
    clients: true,
    team: true,
    documents: true,
    users: true,
    media_library: true,
    seo: true,
  },
  editeur: {
    dashboard: true,
    pages: true,
    articles: true,
    realizations: true,
    services: false,
    testimonials: true,
    quote_requests: false,
    contact_messages: false,
    job_applications: false,
    clients: false,
    team: false,
    documents: false,
    users: false,
    media_library: true,
    seo: false,
  },
  commercial: {
    dashboard: true,
    pages: false,
    articles: false,
    realizations: false,
    services: false,
    testimonials: false,
    quote_requests: true,
    contact_messages: true,
    job_applications: false,
    clients: false,
    team: false,
    documents: false,
    users: false,
    media_library: false,
    seo: false,
  },
  rh: {
    dashboard: true,
    pages: false,
    articles: false,
    realizations: false,
    services: false,
    testimonials: false,
    quote_requests: false,
    contact_messages: false,
    job_applications: true,
    clients: false,
    team: false,
    documents: false,
    users: false,
    media_library: false,
    seo: false,
  },
};
