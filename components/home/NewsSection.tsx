"use client";

import Link from "next/link";
import { FaCalendar, FaUser, FaArrowRight } from "react-icons/fa";

const NEWS = [
  {
    id: "1",
    title: "OFARO TECH remporte le prix de l'innovation IT 2026",
    excerpt: "Nous sommes fiers d'annoncer que notre entreprise a été récompensée pour son excellence dans le domaine de l'innovation technologique.",
    image: "/images/news/award.jpg",
    date: "2026-08-01",
    author: "Direction OFARO TECH",
    category: "Actualités",
    slug: "prix-innovation-2026"
  },
  {
    id: "2",
    title: "Lancement de notre nouvelle plateforme Cloud",
    excerpt: "Découvrez notre nouvelle solution cloud qui permet aux entreprises de gérer leurs infrastructures IT de manière simplifiée et sécurisée.",
    image: "/images/news/cloud.jpg",
    date: "2026-07-28",
    author: "Équipe Technique",
    category: "Produits",
    slug: "plateforme-cloud"
  },
  {
    id: "3",
    title: "Partenariat stratégique avec Microsoft Azure",
    excerpt: "OFARO TECH renforce son expertise cloud en devenant partenaire certifié Microsoft Azure pour accompagner les entreprises africaines.",
    image: "/images/news/partnership.jpg",
    date: "2026-07-25",
    author: "Relations Partenaires",
    category: "Partenariats",
    slug: "partenariat-microsoft-azure"
  }
];

export default function NewsSection() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Actualités
          </div>
          <h2 className="heading-2 mb-4">
            Dernières actualités
          </h2>
          <p className="text-body">
            Restez informés de nos dernières innovations, projets et partenariats
          </p>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {NEWS.map((article) => (
            <article
              key={article.id}
              className="group bg-background-secondary rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center">
                        <div className="w-12 h-12 bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary">Image de l'article</p>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-text-secondary mb-3">
                  <div className="flex items-center gap-1">
                    <FaCalendar className="text-primary" />
                    <span>{formatDate(article.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUser className="text-primary" />
                    <span>{article.author}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Link */}
                <Link
                  href={`/actualites/${article.slug}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
                >
                  Lire la suite
                  <FaArrowRight />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 btn-primary group"
          >
            Voir toutes les actualités
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
