export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  image?: string;
  slug: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: "web" | "mobile" | "desktop" | "design" | "network";
  technologies: string[];
  images: string[];
  client?: string;
  url?: string;
  slug: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  image?: string;
  rating: number;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  url?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
  slug: string;
}

export interface Sector {
  id: string;
  name: string;
  description: string;
  services: string[];
  icon: string;
  image?: string;
}

export interface Technology {
  id: string;
  name: string;
  category: "frontend" | "backend" | "mobile" | "database" | "devops" | "design";
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface QuoteFormData {
  // Informations entreprise
  companyName: string;
  activityField: string;
  email: string;
  phone: string;
  city: string;
  
  // Informations projet
  desiredServices: string[];
  description: string;
  hasLogo: boolean;
  hasDomainName: boolean;
  domainName?: string;
  keyFeatures: string;
  expectedResult: string;
  budget: string;
  
  // Personne en charge
  contactPersonName: string;
  deliveryDate: string;
  
  // Pièces jointes
  attachments?: File[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CompanyInfo {
  name: string;
  slogan: string;
  description: string;
  mission: string;
  vision: string;
  values: string[];
  address: string;
  city: string;
  country: string;
  phone: string;
  whatsapp: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  socialMedia: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  openingHours: string;
  foundedYear: number;
}
