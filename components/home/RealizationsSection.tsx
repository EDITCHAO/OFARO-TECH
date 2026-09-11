"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image_url: string | null;
  technologies: string[];
  client_name: string | null;
  year: string;
  duration: string;
}

const CATEGORIES = [
  { id: "all", label: "Tous les projets" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "design", label: "Design" },
  { id: "network", label: "Réseaux" }
];

export default function RealizationsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const result = await response.json();
      
      if (result.success) {
        setProjects(result.data);
      }
    } catch (error) {
      console.error('Erreur chargement projets:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter(project => project.category === activeCategory);

  if (loading) {
    return (
      <section className="section-padding bg-background-secondary">
        <div className="container-custom text-center">
          <p className="text-text-secondary">Chargement des projets...</p>
        </div>
      </section>
    );
  }

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
              <div className="relative h-48 overflow-hidden bg-gray-200">
                {project.image_url ? (
                  <img 
                    src={project.image_url} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Aucune image
                  </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold rounded-full shadow-md">
                    {CATEGORIES.find(c => c.id === project.category)?.label}
                  </span>
                </div>

                {/* Bouton "Voir le projet" en bas au hover (ne cache pas l'image) */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/realisations/${project.id}`}
                    className="text-white flex items-center justify-center gap-2 font-semibold hover:scale-105 transition-transform"
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
                  {project.technologies && Array.isArray(project.technologies) && project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-background-secondary text-text-secondary text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies && Array.isArray(project.technologies) && project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-background-secondary text-text-secondary text-xs rounded">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Client (if available) */}
                {project.client_name && (
                  <div className="text-xs text-text-secondary">
                    Client: <span className="font-semibold text-text">{project.client_name}</span>
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
