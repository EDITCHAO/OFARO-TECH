'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { FaArrowLeft, FaBriefcase, FaMapMarkerAlt, FaClock, FaCalendar, FaFileAlt, FaCheckCircle, FaGraduationCap, FaStar } from 'react-icons/fa';

interface JobOffer {
  id: number;
  reference: string;
  title: string;
  department: string;
  contract_type: string;
  location: string;
  work_mode: string;
  image_url: string | null;
  image_alt: string | null;
  description: string;
  missions: string;
  responsibilities: string;
  required_skills: string;
  profile: string;
  education_level: string;
  experience_level: string;
  publication_date: string;
  application_deadline: string;
  status: string;
}

export default function OffreDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [offer, setOffer] = useState<JobOffer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOffer();
  }, [params.id]);

  const loadOffer = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('job_offers')
        .select('*')
        .eq('id', params.id)
        .in('status', ['publiee', 'suspendue', 'expiree'])
        .single();

      if (error) throw error;
      if (!data) {
        setError('Offre non trouvée ou non disponible');
        return;
      }

      setOffer(data);
    } catch (error: any) {
      console.error('Erreur chargement offre:', error);
      setError('Impossible de charger l\'offre');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const isExpired = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  const parseListItems = (text: string): string[] => {
    if (!text) return [];
    return text.split('\n').filter(line => line.trim() !== '');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-4">
          {error || 'Offre non disponible'}
        </div>
        <button
          onClick={() => router.push('/offres')}
          className="flex items-center gap-2 text-blue-600 hover:underline"
        >
          <FaArrowLeft /> Retour aux offres
        </button>
      </div>
    );
  }

  const expired = offer.application_deadline && isExpired(offer.application_deadline);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section avec Image */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
        {offer.image_url ? (
          <img
            src={offer.image_url}
            alt={offer.image_alt || offer.title}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FaBriefcase className="text-white text-8xl opacity-30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-5xl mx-auto">
            <button
              onClick={() => router.push('/offres')}
              className="flex items-center gap-2 text-white mb-4 hover:underline"
            >
              <FaArrowLeft /> Retour aux offres
            </button>
            <h1 className="text-4xl font-bold text-white mb-2">{offer.title}</h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              <span className="flex items-center gap-2">
                <FaBriefcase /> {offer.contract_type}
              </span>
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt /> {offer.location}
              </span>
              {offer.work_mode && (
                <span className="flex items-center gap-2">
                  <FaClock /> {offer.work_mode}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Badges Statut */}
      <div className="max-w-5xl mx-auto px-4 -mt-6 mb-6">
        <div className="flex flex-wrap gap-2">
          {expired && (
            <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
              ❌ OFFRE EXPIRÉE
            </span>
          )}
          {offer.status === 'suspendue' && (
            <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              ⏸️ SUSPENDUE
            </span>
          )}
        </div>
      </div>

      {/* Contenu Principal */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne Principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FaFileAlt className="text-blue-600" />
                Description du poste
              </h2>
              <p className="text-gray-700 whitespace-pre-line">{offer.description}</p>
            </section>

            {/* Missions */}
            {offer.missions && (
              <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <FaCheckCircle className="text-green-600" />
                  Missions principales
                </h2>
                <ul className="space-y-2">
                  {parseListItems(offer.missions).map((mission, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-gray-700">{mission}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Responsabilités */}
            {offer.responsibilities && (
              <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <FaStar className="text-yellow-600" />
                  Responsabilités
                </h2>
                <ul className="space-y-2">
                  {parseListItems(offer.responsibilities).map((resp, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-yellow-600 mt-1">★</span>
                      <span className="text-gray-700">{resp}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Profil Recherché */}
            <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-md p-6 border border-blue-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-900">
                <FaGraduationCap className="text-blue-600" />
                Profil recherché
              </h2>

              {/* Formation */}
              {offer.education_level && (
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-3 text-blue-800">Formation</h3>
                  <p className="text-gray-700 whitespace-pre-line">{offer.education_level}</p>
                </div>
              )}

              {/* Expérience */}
              {offer.experience_level && (
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-3 text-blue-800">Expérience</h3>
                  <p className="text-gray-700 whitespace-pre-line">{offer.experience_level}</p>
                </div>
              )}

              {/* Compétences techniques */}
              {offer.required_skills && (
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-3 text-blue-800">Compétences techniques</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {parseListItems(offer.required_skills).map((skill, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <span className="text-blue-600">•</span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Qualités personnelles */}
              {offer.profile && (
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-blue-800">Qualités personnelles</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {parseListItems(offer.profile).map((quality, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <span className="text-purple-600">✓</span>
                        {quality}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informations Clés */}
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="font-bold text-lg mb-4">Informations</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Référence</p>
                  <p className="font-semibold">{offer.reference}</p>
                </div>
                {offer.department && (
                  <div>
                    <p className="text-sm text-gray-600">Département</p>
                    <p className="font-semibold">{offer.department}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Publication</p>
                  <p className="font-semibold">{formatDate(offer.publication_date)}</p>
                </div>
                {offer.application_deadline && (
                  <div>
                    <p className="text-sm text-gray-600">Date limite</p>
                    <p className={`font-semibold ${expired ? 'text-red-600' : 'text-green-600'}`}>
                      {formatDate(offer.application_deadline)}
                    </p>
                  </div>
                )}
              </div>

              {/* Bouton Postuler */}
              {!expired && (
                <a
                  href={`/carrieres?offre=${offer.id}&titre=${encodeURIComponent(offer.title)}&ref=${encodeURIComponent(offer.reference)}#candidature`}
                  className="block w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg text-center"
                >
                  Postuler maintenant
                </a>
              )}

              {expired && (
                <div className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
                  Cette offre n'accepte plus de candidatures
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
