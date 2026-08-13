import { MetadataRoute } from 'next';
import { SERVICES } from '@/lib/constants';
import { PROJECTS } from '@/lib/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ofarotech.com';
  
  // Static pages
  const staticPages = [
    '',
    '/a-propos',
    '/services',
    '/realisations',
    '/secteurs',
    '/contact',
    '/devis',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Service pages
  const servicePages = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Project pages
  const projectPages = PROJECTS.map((project) => ({
    url: `${baseUrl}/realisations/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...projectPages];
}
