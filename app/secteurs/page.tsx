import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { FaUniversity, FaGraduationCap, FaHospital, FaShoppingCart, FaBuilding, FaGlobe, FaCheckCircle } from "react-icons/fa";

export const metadata = {
  title: "Secteurs d'activité - OFARO TECH | Solutions IT par secteur",
  description: "Découvrez nos solutions IT adaptées à votre secteur : banques, éducation, santé, commerce, administration publique et ONG.",
};

export default function SectorsPage() {
  const sectors = [
    {
      icon: <FaUniversity />,
      title: "Banques & Finances",
      description: "Nous accompagnons les banques et institutions financières dans la modernisation de leurs infrastructures IT, la sécurisation de leurs systèmes d'information, la mise en place de réseaux sécurisés et la maintenance de leurs équipements critiques.",
      services: [
        "Cybersécurité bancaire",
        "Réseaux sécurisés",
        "Infrastructure serveurs",
        "Plan de sauvegarde",
        "Support technique 24/7",
        "Conformité réglementaire"
      ],
      challenges: "Garantir la sécurité des transactions et des données sensibles tout en assurant une disponibilité maximale des services.",
      solutions: "Architecture haute disponibilité, chiffrement des données, authentification forte et surveillance continue.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <FaGraduationCap />,
      title: "Éducation",
      description: "Solutions numériques complètes pour les écoles, universités et centres de formation. Nous digitalisons l'enseignement avec des plateformes modernes et performantes adaptées aux besoins pédagogiques.",
      services: [
        "Plateformes e-learning",
        "Gestion scolaire (notes, absences)",
        "Réseaux Wi-Fi campus",
        "Salles informatiques",
        "Maintenance et support",
        "Formation du personnel"
      ],
      challenges: "Créer un environnement numérique accessible et intuitif pour étudiants et enseignants.",
      solutions: "Plateformes intuitives, infrastructure réseau robuste et formation continue du personnel.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <FaHospital />,
      title: "Santé",
      description: "Nous développons et maintenons des solutions informatiques pour les hôpitaux, cliniques, laboratoires et centres de santé, garantissant la sécurité et la confidentialité des données médicales.",
      services: [
        "Dossiers médicaux électroniques",
        "Gestion hospitalière (ERP)",
        "Réseaux sécurisés",
        "Sauvegarde des données",
        "Sécurité et conformité",
        "Télémédecine"
      ],
      challenges: "Assurer la confidentialité des données patients et la conformité aux normes de santé.",
      solutions: "Systèmes sécurisés conformes aux réglementations, sauvegardes automatiques et accès contrôlé.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: <FaShoppingCart />,
      title: "Commerce & Distribution",
      description: "Solutions complètes pour les magasins et entreprises commerciales, de la gestion de stock à la vidéosurveillance en passant par les systèmes de caisse modernes.",
      services: [
        "Logiciels de gestion de stock",
        "Systèmes de caisse (POS)",
        "E-commerce",
        "Réseau et infrastructure",
        "Vidéosurveillance",
        "Maintenance"
      ],
      challenges: "Optimiser la gestion des stocks et améliorer l'expérience client.",
      solutions: "Systèmes intégrés de gestion, automatisation des processus et analytics en temps réel.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <FaBuilding />,
      title: "Administration Publique",
      description: "Accompagnement des ministères, mairies, préfectures et établissements publics dans leur transformation numérique avec des solutions adaptées au secteur public.",
      services: [
        "E-administration",
        "Gestion documentaire",
        "Réseaux sécurisés",
        "Formation du personnel",
        "Support technique",
        "Archivage électronique"
      ],
      challenges: "Moderniser les services publics tout en garantissant la sécurité et l'accessibilité.",
      solutions: "Solutions évolutives, formation continue et accompagnement dans la conduite du changement.",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: <FaGlobe />,
      title: "ONG & Organisations Internationales",
      description: "Solutions adaptées aux besoins spécifiques des ONG et organisations internationales opérant en Afrique, avec un focus sur la fiabilité et la sécurité.",
      services: [
        "Gestion de projets",
        "Collaboration à distance",
        "Réseaux et VPN",
        "Support technique",
        "Sécurité informatique",
        "Formation"
      ],
      challenges: "Assurer la continuité des opérations dans des environnements variés et parfois instables.",
      solutions: "Solutions cloud, systèmes de sauvegarde robustes et support technique réactif.",
      color: "from-orange-500 to-orange-600"
    }
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
                Secteurs d'activité
              </div>
              <h1 className="heading-1 mb-6">
                Des solutions IT adaptées à votre secteur
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed">
                Notre expertise s'étend à de nombreux secteurs d'activité avec des solutions sur mesure pour chaque métier
              </p>
            </div>
          </div>
        </section>

        {/* Sectors Detail */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="space-y-16">
              {sectors.map((sector, index) => (
                <div
                  key={index}
                  className={`grid lg:grid-cols-2 gap-12 items-start ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className={`inline-flex items-center gap-3 bg-gradient-to-r ${sector.color} text-white px-6 py-3 rounded-full mb-6`}>
                      <div className="text-3xl">{sector.icon}</div>
                      <h2 className="text-2xl font-bold">{sector.title}</h2>
                    </div>

                    <p className="text-body mb-6">
                      {sector.description}
                    </p>

                    {/* Services List */}
                    <div className="mb-6">
                      <h3 className="font-bold text-text mb-4 flex items-center gap-2">
                        <FaCheckCircle className="text-primary" />
                        Services proposés
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {sector.services.map((service, serviceIndex) => (
                          <div
                            key={serviceIndex}
                            className="flex items-center gap-2 text-text-secondary text-sm"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                            {service}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Challenges & Solutions */}
                    <div className="space-y-4">
                      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                        <h4 className="font-bold text-text mb-2">🎯 Défis du secteur</h4>
                        <p className="text-text-secondary text-sm">{sector.challenges}</p>
                      </div>

                      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                        <h4 className="font-bold text-text mb-2">✅ Nos solutions</h4>
                        <p className="text-text-secondary text-sm">{sector.solutions}</p>
                      </div>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className={`bg-gradient-to-br ${sector.color} p-12 rounded-2xl shadow-xl`}>
                      <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-8xl mb-4 opacity-50">{sector.icon}</div>
                          <p className="text-lg font-semibold opacity-90">{sector.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="section-padding bg-background-secondary">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-4">Notre impact par secteur</h2>
              <p className="text-body max-w-2xl mx-auto">
                Des chiffres qui témoignent de notre expertise et de la confiance de nos clients
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
                <div className="text-5xl font-bold text-primary mb-2">50+</div>
                <div className="text-text-secondary">Établissements financiers</div>
              </div>
              <div className="bg-white p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
                <div className="text-5xl font-bold text-primary mb-2">30+</div>
                <div className="text-text-secondary">Écoles et universités</div>
              </div>
              <div className="bg-white p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
                <div className="text-5xl font-bold text-primary mb-2">20+</div>
                <div className="text-text-secondary">Centres de santé</div>
              </div>
              <div className="bg-white p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
                <div className="text-5xl font-bold text-primary mb-2">100+</div>
                <div className="text-text-secondary">Entreprises commerciales</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="container-custom text-center">
            <h2 className="text-4xl font-bold mb-6">
              Votre secteur n'est pas listé ?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Nous adaptons nos solutions à tous les secteurs d'activité. Contactez-nous pour discuter de vos besoins spécifiques.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="bg-white text-primary font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                Discutons de votre projet
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
