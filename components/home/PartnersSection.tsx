"use client";

import { useEffect, useState } from 'react';
import { AdminStore, type PartnerItem } from '@/lib/admin-store';
import Image from 'next/image';

export default function PartnersSection() {
  const [partners, setPartners] = useState<PartnerItem[]>([]);

  useEffect(() => {
    // Charger les partenaires publiés depuis le store
    const allPartners = AdminStore.getPartners();
    const published = allPartners
      .filter(p => p.isPublished)
      .sort((a, b) => a.order - b.order);
    setPartners(published);
  }, []);

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
                {partner.logo.startsWith('data:') || partner.logo.startsWith('http') || partner.logo.startsWith('/') ? (
                  // Image uploadée
                  <div className="w-24 h-24 rounded-lg flex items-center justify-center mx-auto mb-3 overflow-hidden">
                    <Image 
                      src={partner.logo} 
                      alt={partner.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  // Logo texte (fallback pour anciens partenaires)
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:from-primary group-hover:to-primary-dark transition-all">
                    <span className="text-2xl font-bold text-primary group-hover:text-white transition-colors">
                      {partner.logo}
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
