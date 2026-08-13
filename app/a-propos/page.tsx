import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FaRocket, FaEye, FaHeart, FaCheckCircle } from "react-icons/fa";
import { COMPANY_INFO } from "@/lib/constants";
import Link from "next/link";

export const metadata = {
  title: "À propos - OFARO TECH | Notre histoire et nos valeurs",
  description: "Découvrez OFARO TECH, votre partenaire de confiance pour la transformation digitale au Togo. Notre mission, vision et valeurs.",
};

export default function AboutPage() {
  const values = [
    {
      icon: <FaCheckCircle className="text-4xl" />,
      title: "Excellence et qualité",
      description: "Nous nous engageons à fournir des solutions de la plus haute qualité, en respectant les standards internationaux."
    },
    {
      icon: <FaRocket className="text-4xl" />,
      title: "Innovation continue",
      description: "Nous restons à l'avant-garde des technologies pour offrir les solutions les plus innovantes à nos clients."
    },
    {
      icon: <FaHeart className="text-4xl" />,
      title: "Engagement client",
      description: "La satisfaction de nos clients est au cœur de nos préoccupations. Nous nous engageons à dépasser leurs attentes."
    },
    {
      icon: <FaCheckCircle className="text-4xl" />,
      title: "Intégrité et transparence",
      description: "Nous cultivons la confiance par l'honnêteté, la transparence et le respect de nos engagements."
    },
    {
      icon: <FaRocket className="text-4xl" />,
      title: "Expertise technique",
      description: "Notre équipe d'experts certifiés maîtrise les technologies les plus avancées du marché."
    },
    {
      icon: <FaHeart className="text-4xl" />,
      title: "Travail d'équipe",
      description: "Nous valorisons la collaboration et le partage de connaissances pour atteindre l'excellence collective."
    }
  ];

  const milestones = [
    { year: "2020", title: "Création de l'entreprise", description: "Lancement d'OFARO TECH à Lomé" },
    { year: "2021", title: "50 projets réalisés", description: "Première année de succès avec plus de 50 clients" },
    { year: "2022", title: "Expansion des services", description: "Ajout des services Cloud et Cybersécurité" },
    { year: "2023", title: "200 clients satisfaits", description: "Atteinte du cap des 200 clients" },
    { year: "2024", title: "Certifications internationales", description: "Obtention de certifications AWS et Microsoft" },
    { year: "2026", title: "Leader régional", description: "Reconnaissance comme leader IT en Afrique de l'Ouest" }
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-background-secondary">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                À propos de nous
              </div>
              <h1 className="heading-1 mb-6">
                Nous construisons l'avenir digital de l'Afrique
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed">
                {COMPANY_INFO.description}
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="heading-2 mb-6">Notre histoire</h2>
                <div className="space-y-4 text-body">
                  <p>
                    Fondée en {COMPANY_INFO.foundedYear} à {COMPANY_INFO.city}, {COMPANY_INFO.country}, <strong>OFARO TECH</strong> est née de la volonté de rendre les technologies de l'information accessibles à toutes les entreprises africaines.
                  </p>
                  <p>
                    Avec une équipe passionnée et expérimentée, nous avons rapidement su nous imposer comme un acteur incontournable de la transformation digitale au Togo et dans la sous-région.
                  </p>
                  <p>
                    Aujourd'hui, nous sommes fiers d'avoir accompagné plus de 200 entreprises, administrations et institutions dans leurs projets IT, et d'avoir contribué à la modernisation du secteur technologique en Afrique de l'Ouest.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-32 h-32 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                        <div className="w-24 h-24 bg-primary/30 rounded-full flex items-center justify-center">
                          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl">
                            OT
                          </div>
                        </div>
                      </div>
                      <p className="text-text-secondary">Image de l'équipe</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding bg-background-secondary">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Mission */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-3xl mb-6">
                  <FaRocket />
                </div>
                <h3 className="text-3xl font-bold text-text mb-4">Notre Mission</h3>
                <p className="text-body">
                  {COMPANY_INFO.mission}
                </p>
              </div>

              {/* Vision */}
              <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-3xl mb-6">
                  <FaEye />
                </div>
                <h3 className="text-3xl font-bold mb-4">Notre Vision</h3>
                <p className="text-lg leading-relaxed opacity-90">
                  {COMPANY_INFO.vision}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="heading-2 mb-4">Nos valeurs</h2>
              <p className="text-body">
                Ces valeurs guident chacune de nos actions et décisions au quotidien
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-background-secondary p-8 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="text-primary mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-text mb-3">{value.title}</h3>
                  <p className="text-text-secondary">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding bg-background-secondary">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="heading-2 mb-4">Notre parcours</h2>
              <p className="text-body">
                Les étapes clés de notre développement
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20"></div>

                {/* Timeline Items */}
                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="relative pl-20">
                      {/* Year Badge */}
                      <div className="absolute left-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        {milestone.year}
                      </div>

                      {/* Content */}
                      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                        <h3 className="text-xl font-bold text-text mb-2">{milestone.title}</h3>
                        <p className="text-text-secondary">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="container-custom text-center">
            <h2 className="text-4xl font-bold mb-6">
              Collaborons ensemble
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Prêt à transformer votre entreprise avec les meilleures solutions IT ? Contactez-nous dès aujourd'hui pour discuter de votre projet.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="bg-white text-primary font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                Nous contacter
              </Link>
              <Link href="/devis" className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-primary transition-colors">
                Demander un devis
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
