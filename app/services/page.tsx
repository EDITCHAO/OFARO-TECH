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
  FaArrowRight
} from "react-icons/fa";

export const metadata = {
  title: "Nos Services - OFARO TECH | Solutions IT complètes",
  description: "Découvrez notre gamme complète de services IT : développement web et mobile, cybersécurité, réseaux, maintenance et conseil.",
};

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
};

export default function ServicesPage() {
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
              {SERVICES.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group"
                >
                  <div className="bg-background-secondary p-8 rounded-xl h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    {/* Icon */}
                    <div className="w-20 h-20 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-4xl mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                      {iconMap[service.icon] || <FaCode />}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-text mb-4 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {service.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-text-secondary">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Link */}
                    <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                      En savoir plus
                      <FaArrowRight className="text-sm" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section-padding bg-background-secondary">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="heading-2 mb-6">
                  Pourquoi choisir nos services ?
                </h2>
                <div className="space-y-4 text-body">
                  <p>
                    Avec plus de <strong>5 ans d'expérience</strong> et <strong>500+ projets réalisés</strong>, OFARO TECH est votre partenaire de confiance pour tous vos besoins en technologies de l'information.
                  </p>
                  <p>
                    Notre équipe d'experts certifiés utilise les dernières technologies et les meilleures pratiques pour vous garantir des solutions performantes, sécurisées et évolutives.
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
              Contactez-nous dès aujourd'hui pour obtenir un devis personnalisé et gratuit
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
