"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { FaExternalLinkAlt, FaFilter } from "react-icons/fa";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  client_name: string | null;
  duration: string | null;
  year: string;
  image_url: string | null;
  technologies: string[];
  status: string;
}

const PROJECT_CATEGORIES = [
  { id: "all", label: "Tous" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "design", label: "Design" },
  { id: "network", label: "Réseaux" }
];

export default function RealizationsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === "all" || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />
      <main>
        {/* Hero Section avec Filtres intégrés */}
        <section className="pt-32 pb-8 bg-gradient-to-br from-primary/10 via-background to-background-secondary">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center mb-8">
              <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                Nos Réalisations
              </div>
              <h1 className="heading-1 mb-6">
                Portfolio de nos projets réussis
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed mb-8">
                Découvrez quelques-uns des projets que nous avons réalisés avec succès pour nos clients dans différents secteurs d'activité
              </p>

              {/* Filtres compacts en haut */}
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {PROJECT_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                      activeCategory === category.id
                        ? "bg-primary text-white shadow-lg"
                        : "bg-white text-text hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Compteur de résultats */}
              <div className="text-sm text-text-secondary">
                {loading ? "Chargement..." : `${filteredProjects.length} projet${filteredProjects.length > 1 ? "s" : ""}`}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section-padding bg-background-secondary">
          <div className="container-custom">
            {loading ? (
              <div className="text-center py-16">
                <p className="text-text-secondary">Chargement des projets...</p>
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <article
                    key={project.id}
                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Project Image */}
                    <div className="relative h-56 bg-gray-200 overflow-hidden">
                      {project.image_url ? (
                        <img 
                          src={project.image_url} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-gray-400">
                            <p className="text-sm">Aucune image</p>
                          </div>
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold rounded-full shadow-md">
                          {PROJECT_CATEGORIES.find((c) => c.id === project.category)?.label}
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
                      <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {project.title}
                      </h3>

                      <p className="text-text-secondary text-sm mb-4 line-clamp-3 leading-relaxed">
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
                        {project.technologies && project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-background-secondary text-text-secondary text-xs rounded">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Client */}
                      {project.client_name && (
                        <div className="text-xs text-text-secondary border-t border-gray-100 pt-4">
                          Client: <span className="font-semibold text-text">{project.client_name}</span>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className="text-2xl font-bold text-text mb-2">Aucun projet trouvé</h3>
                <p className="text-text-secondary mb-6">
                  Essayez de modifier vos critères de recherche ou de filtrage
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchTerm("");
                  }}
                  className="btn-primary"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-background-secondary rounded-xl">
                <div className="text-5xl font-bold text-primary mb-2">500+</div>
                <div className="text-text-secondary">Projets réalisés</div>
              </div>
              <div className="text-center p-6 bg-background-secondary rounded-xl">
                <div className="text-5xl font-bold text-primary mb-2">200+</div>
                <div className="text-text-secondary">Clients satisfaits</div>
              </div>
              <div className="text-center p-6 bg-background-secondary rounded-xl">
                <div className="text-5xl font-bold text-primary mb-2">98%</div>
                <div className="text-text-secondary">Taux de satisfaction</div>
              </div>
              <div className="text-center p-6 bg-background-secondary rounded-xl">
                <div className="text-5xl font-bold text-primary mb-2">15+</div>
                <div className="text-text-secondary">Secteurs d'activité</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="container-custom text-center">
            <h2 className="text-4xl font-bold mb-6">
              Vous avez un projet en tête ?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Rejoignez nos clients satisfaits et donnez vie à votre projet avec OFARO TECH
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/devis" className="bg-white text-primary font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                Demander un devis
              </Link>
              <Link href="/contact" className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-primary transition-colors">
                Nous contacter
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
