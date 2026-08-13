import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/projects";
import Link from "next/link";
import { FaArrowLeft, FaExternalLinkAlt, FaUser, FaCode } from "react-icons/fa";

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: "Projet non trouvé - OFARO TECH",
    };
  }

  return {
    title: `${project.title} - Réalisations OFARO TECH`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = PROJECTS
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 3);

  const categoryLabel = PROJECT_CATEGORIES.find((c) => c.id === project.category)?.label || project.category;

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-background-secondary">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/realisations"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-6"
              >
                <FaArrowLeft /> Retour au portfolio
              </Link>

              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                {categoryLabel}
              </div>

              <h1 className="heading-1 mb-6">{project.title}</h1>
              <p className="text-xl text-text-secondary leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Project Image */}
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl overflow-hidden shadow-xl">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-32 h-32 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                        <div className="w-24 h-24 bg-primary/30 rounded-full flex items-center justify-center">
                          <div className="w-16 h-16 bg-primary rounded-full"></div>
                        </div>
                      </div>
                      <p className="text-text-secondary">Images du projet à ajouter</p>
                    </div>
                  </div>
                </div>

                {/* Description détaillée */}
                <div>
                  <h2 className="heading-3 mb-4">À propos du projet</h2>
                  <div className="text-body space-y-4">
                    <p>
                      Ce projet a été réalisé dans le cadre d'une collaboration avec <strong>{project.client}</strong>, 
                      visant à fournir une solution technologique moderne et performante.
                    </p>
                    <p>
                      Notre équipe d'experts a travaillé en étroite collaboration avec le client pour comprendre 
                      ses besoins spécifiques et développer une solution sur mesure qui répond parfaitement à 
                      ses attentes.
                    </p>
                    <p>
                      Le projet a été livré dans les délais convenus avec une grande satisfaction du client, 
                      témoignant de la qualité de notre travail et de notre engagement envers l'excellence.
                    </p>
                  </div>
                </div>

                {/* Défis & Solutions */}
                <div className="bg-background-secondary p-8 rounded-2xl">
                  <h2 className="heading-3 mb-6">Défis et solutions</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-text mb-2 flex items-center gap-2">
                        <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm">!</span>
                        Défi principal
                      </h3>
                      <p className="text-text-secondary ml-10">
                        Développer une solution scalable capable de gérer un volume important d'utilisateurs 
                        tout en garantissant des performances optimales et une expérience utilisateur fluide.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold text-text mb-2 flex items-center gap-2">
                        <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">✓</span>
                        Notre solution
                      </h3>
                      <p className="text-text-secondary ml-10">
                        Mise en place d'une architecture microservices moderne avec cache distribué, 
                        load balancing et optimisation des requêtes base de données pour garantir 
                        des temps de réponse rapides même sous forte charge.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Résultats */}
                <div>
                  <h2 className="heading-3 mb-6">Résultats obtenus</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white border-2 border-primary/20 p-6 rounded-xl">
                      <div className="text-4xl font-bold text-primary mb-2">+150%</div>
                      <div className="text-text-secondary">Amélioration des performances</div>
                    </div>
                    <div className="bg-white border-2 border-primary/20 p-6 rounded-xl">
                      <div className="text-4xl font-bold text-primary mb-2">98%</div>
                      <div className="text-text-secondary">Satisfaction utilisateur</div>
                    </div>
                    <div className="bg-white border-2 border-primary/20 p-6 rounded-xl">
                      <div className="text-4xl font-bold text-primary mb-2">-40%</div>
                      <div className="text-text-secondary">Réduction des coûts</div>
                    </div>
                    <div className="bg-white border-2 border-primary/20 p-6 rounded-xl">
                      <div className="text-4xl font-bold text-primary mb-2">100%</div>
                      <div className="text-text-secondary">Objectifs atteints</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Project Info Card */}
                <div className="bg-background-secondary p-6 rounded-xl">
                  <h3 className="font-bold text-text mb-4">Informations du projet</h3>
                  <div className="space-y-4">
                    {project.client && (
                      <div>
                        <div className="flex items-center gap-2 text-text-secondary text-sm mb-1">
                          <FaUser className="text-primary" />
                          Client
                        </div>
                        <div className="font-semibold text-text">{project.client}</div>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2 text-text-secondary text-sm mb-1">
                        <FaCode className="text-primary" />
                        Catégorie
                      </div>
                      <div className="font-semibold text-text">{categoryLabel}</div>
                    </div>

                    {project.url && (
                      <div>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors font-semibold"
                        >
                          Voir le projet en ligne
                          <FaExternalLinkAlt />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Technologies */}
                <div className="bg-background-secondary p-6 rounded-xl">
                  <h3 className="font-bold text-text mb-4">Technologies utilisées</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-white text-text font-medium text-sm rounded-lg shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-3">Projet similaire ?</h3>
                  <p className="text-sm mb-4 opacity-90">
                    Contactez-nous pour discuter de votre projet
                  </p>
                  <Link
                    href="/devis"
                    className="block w-full bg-white text-primary font-bold py-3 px-4 rounded-lg text-center hover:bg-gray-100 transition-colors"
                  >
                    Demander un devis
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="section-padding bg-background-secondary">
            <div className="container-custom">
              <h2 className="heading-2 mb-8 text-center">Projets similaires</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedProjects.map((relatedProject) => (
                  <Link
                    key={relatedProject.id}
                    href={`/realisations/${relatedProject.slug}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-2"
                  >
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <div className="w-20 h-20 bg-primary/30 rounded-full"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-text mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedProject.title}
                      </h3>
                      <p className="text-text-secondary text-sm line-clamp-2">
                        {relatedProject.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
