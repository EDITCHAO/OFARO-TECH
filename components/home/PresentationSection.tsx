"use client";

import { FaCheckCircle, FaRocket, FaUsers, FaLightbulb } from "react-icons/fa";
import { COMPANY_INFO } from "@/lib/constants";

export default function PresentationSection() {
  const highlights = [
    {
      icon: <FaRocket className="text-3xl" />,
      title: "Innovation",
      description: "Solutions technologiques de pointe"
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Expertise",
      description: "Équipe de professionnels qualifiés"
    },
    {
      icon: <FaLightbulb className="text-3xl" />,
      title: "Sur mesure",
      description: "Solutions adaptées à vos besoins"
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
              À propos de nous
            </div>
            
            <h2 className="heading-2">
              Votre partenaire technologique de confiance
            </h2>
            
            <div className="text-body space-y-4">
              <p>
                <strong className="text-text">{COMPANY_INFO.name}</strong> est une société spécialisée dans les technologies de l'information et de la communication, établie à {COMPANY_INFO.city}, {COMPANY_INFO.country}.
              </p>
              
              <p>
                Nous offrons une gamme complète de services IT incluant le développement d'applications web et mobile, l'administration de systèmes, la mise en place de réseaux informatiques, la cybersécurité, ainsi que le conseil et l'audit informatique.
              </p>
              
              <p>
                Notre mission est d'accompagner les entreprises, administrations publiques et institutions dans leur transformation digitale en leur proposant des solutions innovantes, performantes et adaptées à leurs besoins spécifiques.
              </p>
            </div>

            <div className="space-y-3">
              {[
                "Solutions personnalisées et innovantes",
                "Équipe d'experts certifiés",
                "Support technique 24/7",
                "Garantie de satisfaction client"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <FaCheckCircle className="text-primary flex-shrink-0" />
                  <span className="text-text">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Cards */}
          <div className="grid gap-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-background-secondary p-6 rounded-xl hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text mb-2">{item.title}</h3>
                    <p className="text-text-secondary">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Stats Card */}
            <div className="bg-primary text-white p-6 rounded-xl">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{currentYear - COMPANY_INFO.foundedYear}+</div>
                <div className="text-lg">Années d'expérience</div>
                <p className="text-sm mt-2 opacity-90">
                  Au service de la transformation digitale
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const currentYear = new Date().getFullYear();
