"use client";

import { FaAward, FaClock, FaUserTie, FaHeadset, FaShieldAlt, FaRocket } from "react-icons/fa";

export default function WhyChooseUsSection() {
  const reasons = [
    {
      icon: <FaAward />,
      title: "Expertise reconnue",
      description: "Une équipe d'experts certifiés avec plus de 5 ans d'expérience dans les technologies de l'information"
    },
    {
      icon: <FaClock />,
      title: "Respect des délais",
      description: "Nous nous engageons à livrer vos projets dans les délais convenus, sans compromis sur la qualité"
    },
    {
      icon: <FaUserTie />,
      title: "Accompagnement personnalisé",
      description: "Un chef de projet dédié vous accompagne tout au long de votre projet pour garantir votre satisfaction"
    },
    {
      icon: <FaHeadset />,
      title: "Support 24/7",
      description: "Notre équipe de support technique est disponible 24h/24 et 7j/7 pour répondre à vos besoins"
    },
    {
      icon: <FaShieldAlt />,
      title: "Sécurité garantie",
      description: "Nous appliquons les meilleures pratiques de sécurité pour protéger vos données et systèmes"
    },
    {
      icon: <FaRocket />,
      title: "Technologies modernes",
      description: "Nous utilisons les technologies les plus récentes et performantes du marché"
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Pourquoi nous choisir
          </div>
          <h2 className="heading-2 mb-4">
            Les raisons de nous faire confiance
          </h2>
          <p className="text-body">
            Nous mettons notre expertise et notre passion au service de votre réussite digitale
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Card */}
              <div className="bg-background-secondary p-8 rounded-xl h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                {/* Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-3xl mb-6 group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
                  {reason.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
                  {reason.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {reason.description}
                </p>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-xl transition-colors pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-text mb-4">
              Prêt à démarrer votre projet ?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui pour discuter de vos besoins et découvrir comment nous pouvons vous aider à atteindre vos objectifs
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/devis" className="btn-primary">
                Demander un devis gratuit
              </a>
              <a href="/contact" className="btn-secondary">
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
