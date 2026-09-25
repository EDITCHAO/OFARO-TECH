'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

interface TeamMember {
  id: number;
  full_name: string;
  position: string;
  photo_url?: string;
  display_order: number;
}

export default function TeamSection() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase
        .from('team_members')
        .select('id, full_name, position, photo_url, display_order')
        .eq('display_on_site', true)
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setTeam(data || []);
    } catch (error) {
      console.error('Erreur chargement équipe:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (team.length === 0) {
    return null; // Ne rien afficher si pas d'équipe
  }

  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Notre <span className="text-primary-500">Équipe</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Des experts passionnés qui transforment vos idées en solutions digitales innovantes
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="group relative rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 h-80"
            >
              {/* Photo qui prend tout le carré */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600">
                {member.photo_url ? (
                  <Image
                    src={member.photo_url}
                    alt={member.full_name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-8xl font-bold text-white opacity-80">
                      {member.full_name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Overlay gradient pour lisibilité */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Texte en overlay sur l'image */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2 drop-shadow-lg">
                  {member.full_name}
                </h3>
                <p className="text-sm font-medium text-primary-300 drop-shadow-md">
                  {member.position}
                </p>
              </div>

              {/* Decorative element */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Call to Action (optional) */}
        {team.length > 0 && (
          <div className="text-center mt-16">
            <a
              href="/a-propos"
              className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Voir plus
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
