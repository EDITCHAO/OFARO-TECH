import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { 
  FaLaptopCode, 
  FaCode, 
  FaMobileAlt, 
  FaDesktop, 
  FaPalette, 
  FaNetworkWired,
  FaShieldAlt,
  FaTools,
  FaServer,
  FaChartLine,
  FaGlobe,
  FaBullhorn,
  FaDatabase,
  FaCloud,
  FaBolt,
  FaArrowRight
} from "react-icons/fa";

export const metadata = {
  title: "Nos Services - OFARO TECH | Solutions IT complètes",
  description: "Découvrez notre gamme complète de services IT : développement web et mobile, cybersécurité, réseaux, maintenance et conseil.",
};

// Map icône string → composant JSX
const iconMap: { [key: string]: JSX.Element } = {
  FaLaptopCode: <FaLaptopCode />,
  FaCode: <FaCode />,
  FaMobileAlt: <FaMobileAlt />,
  FaDesktop: <FaDesktop />,
  FaPalette: <FaPalette />,
  FaNetworkWired: <FaNetworkWired />,
  FaShieldAlt: <FaShieldAlt />,
  FaTools: <FaTools />,
  FaServer: <FaServer />,
  FaChartLine: <FaChartLine />,
  FaGlobe: <FaGlobe />,
  FaBullhorn: <FaBullhorn />,
  FaDatabase: <FaDatabase />,
  FaCloud: <FaCloud />,
  FaBolt: <FaBolt />,
};

// Images de fond par slug (statiques, conservées même pour les services dynamiques)
const serviceImages: { [key: string]: string } = {
  "conception-systemes-informatiques": "/images/nos services/Conception de systèmes informatiques.svg",
  "developpement-web": "/images/nos services/Développement Web.svg",
  "developpement-mobile": "/images/nos services/Développement Mobile.svg",
  "logiciels-desktop": "/images/nos services/Logiciels Desktop.svg",
  "design-graphique": "/images/nos services/Design Graphique.svg",
  "reseaux-informatiques": "/images/nos services/Réseaux Informatiques.svg",
  "cybersecurite": "/images/nos services/Cybersécurité.svg",
  "maintenance-informatique": "/images/nos services/Maintenance Informatique.svg",
  "fourniture-materiels": "/images/nos services/Fourniture de matériels et accesoires informatiques.svg",
  "conseil-it": "/images/nos services/conseil it.svg",
};

// Format commun utilisé pour le rendu (depuis la DB ou les constantes)
type ServiceView = {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
  image: string;
};

// Récupérer les services depuis l'API côté serveur (avec cache)
// Fallback vers les données statiques (SERVICES) si la DB est vide ou indisponible.
async function getServicesFromDB() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/services`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error('Réponse API services non OK:', res.status);
      return null;
    }

    const json = await res.json();
    if (Array.isArray(json.services) && json.services.length > 0) {
      return json.services;
    }
    // DB vide : on renvoie null pour déclencher le fallback statique
    return null;
  } catch (err) {
    console.error('Services indisponibles via API:', err);
    return null;
  }
}

export default async function ServicesPage() {
  // Essayer de charger depuis Supabase, fallback sur les constantes
  const dbServices = await getServicesFromDB();

  // Normaliser le format : Supabase ou constantes → structure commune
  const servicesList: ServiceView[] = dbServices
    ? dbServices.map((s: any): ServiceView => ({
        id: String(s.id),
        title: s.title,
        slug: s.slug,
        description: s.description,
        icon: s.icon || 'FaCode',
        features: Array.isArray(s.features) ? s.features : [],
        image: s.image_url || serviceImages[s.slug] || '',
      }))
    : SERVICES.map((s): ServiceView => ({
        id: s.id,
        title: s.title,
        slug: s.slug,
        description: s.description,
        icon: s.icon,
        features: s.features,
        image: serviceImages[s.slug] || '',
      }));

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-background-secondary">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                Nos Services
              </div>
              <h1 className="heading-1 mb-6">
                Des solutions IT complètes pour votre entreprise
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed">
                Nous offrons une gamme complète de services pour accompagner votre transformation digitale, de la conception à la maintenance.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesList.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group"
                >
                  <div className="relative bg-background-secondary rounded-xl h-full overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    {/* Image de fond */}
                    <div className="absolute inset-0">
                      <img 
                        src={service.image || serviceImages[service.slug] || "/images/nos services/Développement Web.svg"} 
                        alt={service.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay sombre */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
                    </div>

                    {/* Contenu */}
                    <div className="relative z-10 p-8">
                      {/* Icône */}
                      <div className="w-20 h-20 bg-primary/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-white text-4xl mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                        {iconMap[service.icon] || <FaCode />}
                      </div>

                      {/* Titre */}
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-light transition-colors">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/90 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features */}
                      {service.features.length > 0 && (
                        <ul className="space-y-2 mb-6">
                          {service.features.slice(0, 4).map((feature: string, index: number) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-white/80">
                              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Lien */}
                      <div className="flex items-center gap-2 text-primary-light font-semibold group-hover:gap-3 transition-all">
                        En savoir plus
                        <FaArrowRight className="text-sm" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Pourquoi nous choisir */}
        <section className="section-padding bg-background-secondary">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="heading-2 mb-6">
                  Pourquoi choisir nos services ?
                </h2>
                <div className="space-y-4 text-body">
                  <p>
                    Avec plus de <strong>5 ans d&apos;expérience</strong> et <strong>500+ projets réalisés</strong>, OFARO TECH est votre partenaire de confiance pour tous vos besoins en technologies de l&apos;information.
                  </p>
                  <p>
                    Notre équipe d&apos;experts certifiés utilise les dernières technologies et les meilleures pratiques pour vous garantir des solutions performantes, sécurisées et évolutives.
                  </p>
                  <p>
                    Nous nous engageons à respecter les délais, à rester dans le budget convenu et à assurer un support technique réactif après la livraison.
                  </p>
                </div>
                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-xl">
                    <div className="text-4xl font-bold text-primary mb-2">98%</div>
                    <div className="text-text-secondary">Satisfaction client</div>
                  </div>
                  <div className="bg-white p-6 rounded-xl">
                    <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-text-secondary">Support technique</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Expertise technique", description: "Équipe d'experts certifiés et formés aux dernières technologies" },
                  { title: "Solutions sur mesure", description: "Chaque projet est unique et mérite une approche personnalisée" },
                  { title: "Respect des délais", description: "Nous nous engageons à livrer vos projets dans les temps" },
                  { title: "Support continu", description: "Accompagnement et maintenance après la livraison" }
                ].map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="font-bold text-text mb-2">{item.title}</h3>
                    <p className="text-text-secondary text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="container-custom text-center">
            <h2 className="text-4xl font-bold mb-6">
              Prêt à démarrer votre projet ?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Contactez-nous dès aujourd&apos;hui pour obtenir un devis personnalisé et gratuit
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
