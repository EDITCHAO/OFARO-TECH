"use client";

import { useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";

const PROJECTS = [
  {
    id: "1",
    title: "Plateforme E-commerce Multi-vendeurs",
    category: "web",
    description: "Développement d'une plateforme e-commerce complète avec gestion multi-vendeurs, paiement en ligne et système de livraison",
    image: "/images/projects/ecommerce.png",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    client: "Confidential",
    slug: "plateforme-ecommerce"
  },
  {
    id: "2",
    title: "Application Mobile de Gestion Bancaire",
    category: "mobile",
    description: "Application mobile permettant la gestion complète des comptes bancaires, virements et paiements mobiles",
    image: "/images/projects/banking-app.png",
    technologies: ["React Native", "Firebase", "Node.js"],
    client: "Banque XYZ",
    slug: "app-mobile-bancaire"
  },
  {
    id: "3",
    title: "Système de Gestion Hospitalière",
    category: "web",
    description: "ERP complet pour la gestion des hôpitaux incluant patients, rendez-vous, pharmacie et facturation",
    image: "/images/projects/hospital.png",
    technologies: ["Laravel", "Vue.js", "MySQL"],
    client: "Hôpital Central",
    slug: "systeme-gestion-hopital"
  },
  {
    id: "4",
    title: "Identité Visuelle Entreprise Tech",
    category: "design",
    description: "Création complète d'identité visuelle incluant logo, charte graphique et supports de communication",
    image: "/images/projects/branding.png",
    technologies: ["Adobe Illustrator", "Figma", "Photoshop"],
    client: "TechCorp Inc.",
    slug: "identite-visuelle"
  },
  {
    id: "5",
    title: "Infrastructure Réseau Entreprise",
    category: "network",
    description: "Mise en place d'une infrastructure réseau sécurisée avec VPN, firewall et supervision",
    image: "/images/projects/network.png",
    technologies: ["Cisco", "Mikrotik", "Zabbix"],
    client: "Groupe Industriel ABC",
    slug: "infrastructure-reseau"
  },
  {
    id: "6",
    title: "Application de Gestion Scolaire",
    category: "web",
    description: "Plateforme complète de gestion d'établissement scolaire avec notes, absences et communication parents",
    image: "/images/projects/school.png",
    technologies: ["Django", "React", "PostgreSQL"],
    client: "Complexe Scolaire",
    slug: "gestion-scolaire"
  }
];

const CATEGORIES = [
  { id: "all", label: "Tous les projets" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "design", label: "Design" },
  { id: "network", label: "Réseaux" }
];

export default function RealizationsSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = activeCategory === "all"
    ? PROJECTS
    : PROJECTS.filter(project => project.category === activeCategory);

  return (
    <section className="section-padding bg-background-secondary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Nos Réalisations
          </div>
          <h2 className="heading-2 mb-4">
            Quelques-uns de nos projets réussis
          </h2>
          <p className="text-body">
            Découvrez notre portfolio de projets réalisés avec succès pour nos clients dans différents secteurs
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeCategory === category.id
                  ? "bg-primary text-white shadow-lg scale-105"
                  : "bg-white text-text hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold rounded-full">
                    {CATEGORIES.find(c => c.id === project.category)?.label}
                  </span>
                </div>

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link
                    href={`/realisations/${project.slug}`}
                    className="text-white flex items-center gap-2 font-semibold hover:scale-110 transition-transform"
                  >
                    Voir le projet <FaExternalLinkAlt />
                  </Link>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-background-secondary text-text-secondary text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Client (if available) */}
                {project.client && (
                  <div className="text-xs text-text-secondary">
                    Client: <span className="font-semibold text-text">{project.client}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 btn-primary group"
          >
            Voir tous nos projets
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
