"use client";

import { useEffect, useState } from 'react';

interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website?: string;
  display_order: number;
  is_published: boolean;
}

export default function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (partnerId: string) => {
    setImageErrors(prev => ({ ...prev, [partnerId]: true }));
  };

  useEffect(() => {
    // Charger les partenaires depuis l'API Supabase
    const fetchPartners = async () => {
      try {
        const response = await fetch('/api/partners');
        const data = await response.json();
        
        if (data.partners) {
          // Filtrer seulement les partenaires publiés
          const published = data.partners.filter((p: Partner) => p.is_published);
          setPartners(published);
        }
      } catch (error) {
        console.error('Erreur chargement partenaires:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (loading) {
    return (
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              Nos Partenaires
            </div>
            <div className="animate-pulse">Chargement...</div>
          </div>
        </div>
      </section>
    );
  }

  if (partners.length === 0) {
    return null; // Ne pas afficher la section si aucun partenaire
  }

  return (
    <section className="section-padding bg-background-secondary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Nos Partenaires
          </div>
          <h2 className="heading-2 mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-body">
            Nous travaillons avec les plus grandes marques technologiques pour vous offrir les meilleures solutions
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="group bg-white p-8 rounded-xl flex items-center justify-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="text-center">
                {(partner.logo_url.startsWith('data:') || partner.logo_url.startsWith('http') || partner.logo_url.startsWith('/')) && !imageErrors[partner.id] ? (
                  // Image uploadée (balise img brute : évite l'échec de l'optimiseur Next sur certains hébergeurs)
                  <div className="w-24 h-24 rounded-lg flex items-center justify-center mx-auto mb-3 overflow-hidden">
                    <img
                      src={partner.logo_url}
                      alt={partner.name}
                      width={96}
                      height={96}
                      loading="lazy"
                      className="w-full h-full object-contain"
                      onError={() => handleImageError(partner.id)}
                    />
                  </div>
                ) : (
                  // Logo texte (fallback pour anciens partenaires ou images cassées)
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:from-primary group-hover:to-primary-dark transition-all">
                    <span className="text-2xl font-bold text-primary group-hover:text-white transition-colors">
                      {partner.logo_url.length > 3 ? partner.name.substring(0, 2).toUpperCase() : partner.logo_url}
                    </span>
                  </div>
                )}
                <div className="font-semibold text-text group-hover:text-primary transition-colors">
                  {partner.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-text-secondary">
            Et bien d'autres partenaires technologiques de premier plan
          </p>
        </div>
      </div>
    </section>
  );
}
