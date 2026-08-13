"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { FaExternalLinkAlt, FaFilter } from "react-icons/fa";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/projects";

export default function RealizationsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory = activeCategory === "all" || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-background-secondary">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                Nos Réalisations
              </div>
              <h1 className="heading-1 mb-6">
                Portfolio de nos projets réussis
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed">
                Découvrez quelques-uns des projets que nous avons réalisés avec succès pour nos clients dans différents secteurs d'activité
              </p>
            </div>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="py-8 bg-white sticky top-[120px] z-40 shadow-md">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="w-full md:w-96">
                <input
                  type="text"
                  placeholder="Rechercher un projet..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 items-center">
                <FaFilter className="text-text-secondary hidden sm:block" />
                {PROJECT_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                      activeCategory === category.id
                        ? "bg-primary text-white shadow-lg scale-105"
                        : "bg-background-secondary text-text hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-text-secondary">
              {filteredProjects.length} projet{filteredProjects.length > 1 ? "s" : ""} trouvé{filteredProjects.length > 1 ? "s" : ""}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section-padding bg-background-secondary">
          <div className="container-custom">
            {filteredProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <article
                    key={project.id}
                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Project Image */}
                    <div className="relative h-56 bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <div className="w-20 h-20 bg-primary/30 rounded-full flex items-center justify-center">
                              <div className="w-16 h-16 bg-primary rounded-full"></div>
                            </div>
                          </div>
                          <p className="text-sm text-text-secondary">Image du projet</p>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold rounded-full">
                          {PROJECT_CATEGORIES.find((c) => c.id === project.category)?.label}
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
                      <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {project.title}
                      </h3>

                      <p className="text-text-secondary text-sm mb-4 line-clamp-3 leading-relaxed">
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
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-background-secondary text-text-secondary text-xs rounded">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Client */}
                      {project.client && (
                        <div className="text-xs text-text-secondary border-t border-gray-100 pt-4">
                          Client: <span className="font-semibold text-text">{project.client}</span>
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
