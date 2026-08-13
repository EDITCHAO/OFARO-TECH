"use client";

import { FaUniversity, FaGraduationCap, FaHospital, FaShoppingCart, FaBuilding, FaGlobe } from "react-icons/fa";

export default function SectorsSection() {
  const sectors = [
    {
      icon: <FaUniversity />,
      title: "Banques & Finances",
      description: "Nous accompagnons les banques et institutions financières dans la modernisation de leurs infrastructures IT, la sécurisation de leurs systèmes d'information, la mise en place de réseaux sécurisés et la maintenance de leurs équipements critiques.",
      services: ["Cybersécurité", "Réseaux sécurisés", "Serveurs", "Sauvegarde", "Support 24/7"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <FaGraduationCap />,
      title: "Éducation",
      description: "Solutions numériques pour les écoles, universités et centres de formation. Nous digitalisons l'enseignement avec des plateformes modernes et performantes.",
      services: ["Plateformes e-learning", "Réseaux Wi-Fi", "Maintenance", "Fourniture de matériel"],
      color: "from-green-500 to-green-600"
    },
    {
      icon: <FaHospital />,
      title: "Santé",
      description: "Nous développons et maintenons des solutions informatiques pour les hôpitaux, cliniques, laboratoires et centres de santé, garantissant la sécurité des données médicales.",
      services: ["Réseaux", "Gestion hospitalière", "Maintenance", "Sauvegarde", "Sécurité des données"],
      color: "from-red-500 to-red-600"
    },
    {
      icon: <FaShoppingCart />,
      title: "Commerce & Distribution",
      description: "Solutions pour les magasins et entreprises commerciales, de la gestion de stock à la vidéosurveillance en passant par les systèmes de caisse.",
      services: ["Gestion de stock", "Caisse", "Réseau", "Vidéosurveillance", "Maintenance"],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <FaBuilding />,
      title: "Administration Publique",
      description: "Accompagnement des ministères, mairies, préfectures et établissements publics dans leur transformation numérique avec des solutions adaptées au secteur public.",
      services: ["Transformation digitale", "Réseaux sécurisés", "Formation", "Support"],
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: <FaGlobe />,
      title: "ONG & Organisations Internationales",
      description: "Solutions adaptées aux besoins spécifiques des ONG et organisations internationales opérant en Afrique, avec un focus sur la fiabilité et la sécurité.",
      services: ["Gestion documentaire", "Maintenance", "Réseaux", "Support", "Sécurité informatique"],
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Secteurs d'activité
          </div>
          <h2 className="heading-2 mb-4">
            Nous servons une grande diversité de secteurs
          </h2>
          <p className="text-body">
            Notre expertise s'étend à de nombreux secteurs d'activité avec des solutions adaptées à chaque métier
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((sector, index) => (
            <div
              key={index}
              className="group relative bg-background-secondary rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Gradient Header */}
              <div className={`bg-gradient-to-r ${sector.color} p-6 text-white`}>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {sector.icon}
                </div>
                <h3 className="text-2xl font-bold">{sector.title}</h3>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {sector.description}
                </p>

                {/* Services List */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-text mb-3">Services associés :</p>
                  <div className="flex flex-wrap gap-2">
                    {sector.services.map((service, serviceIndex) => (
                      <span
                        key={serviceIndex}
                        className="px-3 py-1 bg-white text-text-secondary text-xs rounded-full border border-gray-200"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-xl transition-colors pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-text mb-4">
            Votre secteur n'est pas listé ?
          </h3>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Nous adaptons nos solutions à tous les secteurs d'activité. Contactez-nous pour discuter de vos besoins spécifiques.
          </p>
          <a href="/contact" className="btn-primary">
            Discutons de votre projet
          </a>
        </div>
      </div>
    </section>
  );
}
