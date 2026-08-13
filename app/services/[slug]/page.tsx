import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SERVICES } from "@/lib/constants";
import Link from "next/link";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";

// Generate static paths for all services
export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

// Generate metadata for each service page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);

  if (!service) {
    return {
      title: "Service non trouvé - OFARO TECH",
    };
  }

  return {
    title: `${service.title} - OFARO TECH`,
    description: service.description,
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  // Get related services (exclude current service)
  const relatedServices = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-background-secondary">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-6"
              >
                ← Retour aux services
              </Link>
              <h1 className="heading-1 mb-6">{service.title}</h1>
              <p className="text-xl text-text-secondary leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Presentation */}
                <div>
                  <h2 className="heading-3 mb-4">Présentation du service</h2>
                  <div className="text-body space-y-4">
                    <p>
                      Notre service de <strong>{service.title}</strong> est conçu pour répondre aux besoins spécifiques de votre entreprise en matière de technologies de l'information.
                    </p>
                    <p>
                      Avec une équipe d'experts certifiés et une expérience de plus de 5 ans, nous garantissons des solutions de qualité, performantes et adaptées à vos objectifs business.
                    </p>
                    <p>
                      Nous utilisons les dernières technologies et les meilleures pratiques du secteur pour vous assurer un résultat optimal et pérenne.
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h2 className="heading-3 mb-6">Ce que nous proposons</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 bg-background-secondary p-4 rounded-lg"
                      >
                        <FaCheckCircle className="text-primary text-xl flex-shrink-0 mt-1" />
                        <span className="text-text font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advantages */}
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-2xl">
                  <h2 className="heading-3 mb-6">Les avantages de notre service</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h3 className="font-bold text-text mb-1">Expertise reconnue</h3>
                        <p className="text-text-secondary">
                          Notre équipe possède les certifications et l'expérience nécessaires pour garantir la qualité de nos prestations.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h3 className="font-bold text-text mb-1">Solutions sur mesure</h3>
                        <p className="text-text-secondary">
                          Nous adaptons nos services à vos besoins spécifiques et à votre budget.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h3 className="font-bold text-text mb-1">Support continu</h3>
                        <p className="text-text-secondary">
                          Nous assurons un suivi régulier et un support technique réactif après la livraison.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h3 className="font-bold text-text mb-1">Technologies modernes</h3>
                        <p className="text-text-secondary">
                          Nous utilisons les outils et technologies les plus performants du marché.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Process */}
                <div>
                  <h2 className="heading-3 mb-6">Notre processus</h2>
                  <div className="space-y-4">
                    {[
                      { step: "1", title: "Analyse des besoins", description: "Nous commençons par comprendre vos objectifs et contraintes" },
                      { step: "2", title: "Proposition de solution", description: "Nous vous présentons une solution adaptée avec devis détaillé" },
                      { step: "3", title: "Développement", description: "Notre équipe réalise le projet selon les délais convenus" },
                      { step: "4", title: "Tests et validation", description: "Nous testons rigoureusement la solution avant livraison" },
                      { step: "5", title: "Déploiement", description: "Mise en production et formation de vos équipes" },
                      { step: "6", title: "Support", description: "Accompagnement continu et maintenance" }
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 bg-white p-4 rounded-lg border-l-4 border-primary"
                      >
                        <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <h3 className="font-bold text-text mb-1">{item.title}</h3>
                          <p className="text-text-secondary text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* CTA Card */}
                <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 rounded-xl sticky top-24">
                  <h3 className="text-2xl font-bold mb-4">
                    Intéressé par ce service ?
                  </h3>
                  <p className="mb-6 opacity-90">
                    Contactez-nous pour obtenir un devis personnalisé et gratuit
                  </p>
                  <div className="space-y-3">
                    <Link
                      href="/devis"
                      className="block w-full bg-white text-primary font-bold py-3 px-6 rounded-lg text-center hover:bg-gray-100 transition-colors"
                    >
                      Demander un devis
                    </Link>
                    <Link
                      href="/contact"
                      className="block w-full bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg text-center hover:bg-white hover:text-primary transition-colors"
                    >
                      Nous contacter
                    </Link>
                  </div>
                </div>

                {/* Related Services */}
                <div className="bg-background-secondary p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-text mb-4">Services connexes</h3>
                  <div className="space-y-3">
                    {relatedServices.map((relatedService) => (
                      <Link
                        key={relatedService.id}
                        href={`/services/${relatedService.slug}`}
                        className="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
                      >
                        <h4 className="font-semibold text-text group-hover:text-primary transition-colors text-sm mb-1">
                          {relatedService.title}
                        </h4>
                        <p className="text-xs text-text-secondary line-clamp-2">
                          {relatedService.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/services"
                    className="mt-4 flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
                  >
                    Voir tous les services
                    <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
