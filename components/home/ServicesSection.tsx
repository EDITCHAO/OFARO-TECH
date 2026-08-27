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

// Mapping des images de fond pour chaque service (SVG pour performance)
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
              <div className="relative bg-white rounded-xl h-full overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Image de fond avec lazy loading */}
                <div className="absolute inset-0">
                  <img 
                    src={serviceImages[service.slug] || "/images/nos services/Développement Web.jpg"} 
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    style={{ contentVisibility: 'auto' }}
                  />
                  {/* Overlay sombre pour la lisibilité */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/65 to-black/80"></div>
                </div>

                {/* Contenu par-dessus l'image */}
                <div className="relative z-10 p-6">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-primary/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-white text-3xl mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                    {iconMap[service.icon] || <FaCode />}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-light transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/90 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-4">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-white/80">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Link */}
                  <div className="flex items-center gap-2 text-primary-light font-semibold text-sm group-hover:gap-3 transition-all">
                    En savoir plus
                    <FaArrowRight className="text-xs" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Service Request Form Section */}
        <ServiceRequestForm />
      </div>
    </section>
  );
}

// Composant séparé pour le formulaire de demande de service
function ServiceRequestForm() {
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    service_type: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/service-requests/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: `Votre demande a été envoyée avec succès ! Référence : ${data.reference}`
        });
        // Réinitialiser le formulaire
        setFormData({
          client_name: '',
          client_email: '',
          client_phone: '',
          service_type: '',
          description: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Une erreur est survenue'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Impossible de soumettre la demande. Veuillez réessayer.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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

        {submitStatus && (
          <div className={`mb-6 p-4 rounded-lg ${
            submitStatus.type === 'success' 
              ? 'bg-green-500/20 border border-green-500/50 text-white' 
              : 'bg-red-500/20 border border-red-500/50 text-white'
          }`}>
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nom complet"
            value={formData.client_name}
            onChange={(e) => setFormData({...formData, client_name: e.target.value})}
            className="px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            required
            disabled={isSubmitting}
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.client_email}
            onChange={(e) => setFormData({...formData, client_email: e.target.value})}
            className="px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            required
            disabled={isSubmitting}
          />
          <input
            type="tel"
            placeholder="Téléphone"
            value={formData.client_phone}
            onChange={(e) => setFormData({...formData, client_phone: e.target.value})}
            className="px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            required
            disabled={isSubmitting}
          />
          <select
            value={formData.service_type}
            onChange={(e) => setFormData({...formData, service_type: e.target.value})}
            className="px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            required
            disabled={isSubmitting}
          >
            <option value="" className="text-text">Sélectionner un service</option>
            {SERVICES.map((service) => (
              <option key={service.id} value={service.title} className="text-text">
                {service.title}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Message / Description de votre besoin"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="md:col-span-2 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
            required
            disabled={isSubmitting}
          ></textarea>
          <button
            type="submit"
            disabled={isSubmitting}
            className="md:col-span-2 bg-white text-primary font-bold py-4 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
          </button>
        </form>
      </div>
    </div>
  );
}
