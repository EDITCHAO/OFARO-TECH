'use client';

import React, { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FaArrowLeft, FaSearch, FaFilter } from 'react-icons/fa';
import JobOfferCard from '@/components/jobs/JobOfferCard';

// Types pour les offres
type JobOffer = {
  id: number;
  reference: string;
  title: string;
  department?: string;
  contract_type?: string;
  location: string;
  work_mode?: string;
  image_url?: string;
  image_alt?: string;
  description: string;
  publication_date: string;
  application_deadline?: string;
  experience_level?: string;
  status?: string;
};

export default function OffresPage() {
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContractType, setSelectedContractType] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  // Récupérer les offres depuis Supabase directement
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        
        // Utiliser Supabase directement
        const { supabase } = await import('@/lib/supabase');
        
        const { data, error: supabaseError } = await supabase
          .from('job_offers')
          .select('*')
          .in('status', ['publiee', 'suspendue', 'expiree']) // Charger publiee, suspendue et expiree (pas brouillon)
          .order('publication_date', { ascending: false });

        if (supabaseError) {
          console.error('❌ Erreur Supabase:', supabaseError);
          throw supabaseError;
        }

        console.log('✅ Offres chargées depuis Supabase:', data);

        // Mapper les données
        const mappedJobs = (data || []).map((job: any) => ({
          id: job.id,
          reference: job.reference,
          title: job.title,
          department: job.department,
          contract_type: job.contract_type,
          location: job.location,
          work_mode: job.work_mode,
          image_url: job.image_url,
          image_alt: job.image_alt,
          description: job.description,
          publication_date: job.publication_date,
          application_deadline: job.application_deadline,
          experience_level: job.experience_level,
          status: job.status // Inclure le statut
        }));

        setJobOffers(mappedJobs);
        setFilteredOffers(mappedJobs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        console.error('Erreur:', err);
        setJobOffers([]);
        setFilteredOffers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filtrer les offres
  useEffect(() => {
    let filtered = [...jobOffers];

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par type de contrat
    if (selectedContractType !== 'all') {
      filtered = filtered.filter(job => job.contract_type === selectedContractType);
    }

    // Filtre par localisation
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(job => job.location === selectedLocation);
    }

    setFilteredOffers(filtered);
  }, [searchTerm, selectedContractType, selectedLocation, jobOffers]);

  // Extraire les types de contrat uniques
  const contractTypes = Array.from(new Set(jobOffers.map(job => job.contract_type).filter(Boolean)));
  
  // Extraire les localisations uniques
  const locations = Array.from(new Set(jobOffers.map(job => job.location).filter(Boolean)));

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <Link 
            href="/carrieres"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            Retour à Carrières
          </Link>

          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Nos offres d&apos;emploi
          </h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Découvrez toutes nos opportunités de carrière et trouvez le poste qui vous correspond.
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full">
              <strong>{jobOffers.length}</strong> offres disponibles
            </div>
            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full">
              📍 Lomé, Togo
            </div>
          </div>
        </div>
      </section>

      {/* Filtres et Recherche */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Barre de recherche */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un poste, un département..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Filtre type de contrat */}
            {contractTypes.length > 0 && (
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedContractType}
                  onChange={(e) => setSelectedContractType(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none appearance-none bg-white cursor-pointer min-w-[180px]"
                >
                  <option value="all">Tous les contrats</option>
                  {contractTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Filtre localisation */}
            {locations.length > 0 && (
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none appearance-none bg-white cursor-pointer min-w-[180px]"
                >
                  <option value="all">Toutes les villes</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Compteur de résultats filtrés */}
          {(searchTerm || selectedContractType !== 'all' || selectedLocation !== 'all') && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {filteredOffers.length} {filteredOffers.length > 1 ? 'offres trouvées' : 'offre trouvée'}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedContractType('all');
                  setSelectedLocation('all');
                }}
                className="text-sm text-orange-500 hover:text-orange-600 font-medium"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Liste des offres */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Erreur de chargement</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Réessayer
              </button>
            </div>
          ) : filteredOffers.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                <svg 
                  className="w-10 h-10 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm || selectedContractType !== 'all' || selectedLocation !== 'all'
                  ? 'Aucune offre ne correspond à vos critères'
                  : 'Aucune offre disponible'}
              </h3>
              <p className="text-gray-600">
                {searchTerm || selectedContractType !== 'all' || selectedLocation !== 'all'
                  ? 'Essayez de modifier vos filtres de recherche'
                  : 'Revenez bientôt pour découvrir nos prochaines opportunités de carrière.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredOffers.map((job) => (
                <JobOfferCard
                  key={job.id}
                  id={job.id}
                  reference={job.reference}
                  title={job.title}
                  department={job.department}
                  location={job.location}
                  contractType={job.contract_type}
                  workMode={job.work_mode}
                  imageUrl={job.image_url}
                  imageAlt={job.image_alt}
                  publicationDate={job.publication_date}
                  applicationDeadline={job.application_deadline}
                  experienceLevel={job.experience_level}
                  description={job.description}
                  status={job.status}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Vous ne trouvez pas le poste idéal ?
            </h3>
            <p className="text-gray-600 mb-6">
              Envoyez-nous quand même votre candidature spontanée. Nous serons ravis d&apos;étudier votre profil pour de futures opportunités.
            </p>
            <Link
              href="/carrieres#candidature"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-orange-500 transition-all duration-300 font-medium"
            >
              Candidature spontanée
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// Données statiques pour fallback (à garder temporairement)
const staticJobOffers: JobOffer[] = [];
