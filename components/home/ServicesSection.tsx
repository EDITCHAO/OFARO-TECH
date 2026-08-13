"use client";

import Link from "next/link";
import { useState } from "react";
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
import { SERVICES } from "@/lib/constants";

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

export default function ServicesSection() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <section className="section-padding bg-background-secondary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Nos Services
          </div>
          <h2 className="heading-2 mb-4">
            Des solutions complètes pour tous vos besoins IT
          </h2>
          <p className="text-body">
            Nous offrons une gamme complète de services pour accompagner votre transformation digitale, de la conception à la maintenance.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SERVICES.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group"
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="bg-white p-6 rounded-xl h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-3xl mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  {iconMap[service.icon] || <FaCode />}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-4">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-text-secondary">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                  En savoir plus
                  <FaArrowRight className="text-xs" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Service Request Form Section */}
        <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-8 md:p-12 rounded-2xl">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">
                Besoin d'un service spécifique ?
              </h3>
              <p className="text-lg opacity-90">
                Remplissez ce formulaire pour demander un service et nous vous recontacterons rapidement
              </p>
            </div>

            <form className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nom complet"
                className="px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <input
                type="tel"
                placeholder="Téléphone"
                className="px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <select
                className="px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              >
                <option value="" className="text-text">Sélectionner un service</option>
                {SERVICES.map((service) => (
                  <option key={service.id} value={service.slug} className="text-text">
                    {service.title}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Message / Description de votre besoin"
                rows={4}
                className="md:col-span-2 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                required
              ></textarea>
              <button
                type="submit"
                className="md:col-span-2 bg-white text-primary font-bold py-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Envoyer la demande
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
