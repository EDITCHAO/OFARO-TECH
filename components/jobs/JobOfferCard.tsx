'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Clock, Briefcase, TrendingUp } from 'lucide-react';

interface JobOfferCardProps {
  id: number;
  reference: string;
  title: string;
  department?: string;
  location: string;
  contractType?: string;
  workMode?: string;
  imageUrl?: string;
  imageAlt?: string;
  publicationDate: string;
  applicationDeadline?: string;
  experienceLevel?: string;
  description?: string;
  status?: string; // Ajout du statut
}

const JobOfferCard: React.FC<JobOfferCardProps> = ({
  id,
  reference,
  title,
  department,
  location,
  contractType,
  workMode,
  imageUrl,
  imageAlt,
  publicationDate,
  applicationDeadline,
  experienceLevel,
  description,
  status
}) => {
  // Image par défaut si aucune image n'est fournie
  const defaultImage = '/images/offers/default-job-offer.jpg';

  // Formater les dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Calculer les jours restants
  const getDaysRemaining = (deadline?: string) => {
    if (!deadline) return null;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining(applicationDeadline);
  
  // Vérifier si l'offre est expirée
  const isExpired = status === 'expiree' || (daysRemaining !== null && daysRemaining < 0);
  const isSuspended = status === 'suspendue';
  const isUrgent = daysRemaining !== null && daysRemaining <= 7 && daysRemaining > 0;

  // Formater l'heure depuis la date
  const getTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      {/* Badges en haut à gauche et droite */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {/* Badge EXPIRÉ - priorité maximale */}
        {isExpired && (
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1 animate-pulse">
            ❌ EXPIRÉ
          </span>
        )}
        
        {/* Badge SUSPENDUE */}
        {isSuspended && !isExpired && (
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
            ⏸️ SUSPENDUE
          </span>
        )}
        
        {/* Badge urgent (7 jours ou moins) */}
        {isUrgent && !isExpired && !isSuspended && (
          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
            ⚠️ Expire bientôt
          </span>
        )}
        
        {/* Badge type de contrat */}
        {contractType && (
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            {contractType}
          </span>
        )}
      </div>

      {/* Badge mode de travail en haut à droite */}
      {workMode && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
            🟣 {workMode}
          </span>
        </div>
      )}

      {/* Image */}
      <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={imageAlt || title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              // Si l'image ne charge pas, afficher le placeholder
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center">
                    <svg class="w-20 h-20 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                `;
              }
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Briefcase className="w-20 h-20 text-white opacity-50" />
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Département en bas de l'image */}
        {department && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur text-gray-900 px-3 py-1 rounded-lg text-xs font-semibold">
            {department}
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="p-6">
        {/* Date et heure */}
        <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(publicationDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{getTime(publicationDate)}</span>
          </div>
        </div>

        {/* Titre */}
        <Link href={`/offres/${id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer">
            {title}
          </h3>
        </Link>

        {/* Description courte */}
        {description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* Informations clés */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span>{location}</span>
          </div>

          {experienceLevel && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <TrendingUp className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span>{experienceLevel}</span>
            </div>
          )}

          {/* Date d'expiration */}
          {applicationDeadline && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span className={`font-medium ${
                isExpired ? 'text-red-600' : 
                isUrgent ? 'text-orange-600' : 
                'text-gray-700'
              }`}>
                {isExpired ? 'Expiré le' : 'Expire le'} {formatDate(applicationDeadline)}
                {daysRemaining !== null && daysRemaining > 0 && (
                  <span className="ml-1 text-xs text-gray-500">
                    ({daysRemaining} jour{daysRemaining > 1 ? 's' : ''} restant{daysRemaining > 1 ? 's' : ''})
                  </span>
                )}
              </span>
            </div>
          )}
        </div>

        {/* Footer avec référence et bouton */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-mono">
              {reference}
            </span>
            <Link
              href={`/offres/${id}`}
              className="text-blue-600 font-semibold text-sm hover:text-blue-700 group-hover:translate-x-1 transition-all inline-flex items-center gap-1"
            >
              Voir détails
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOfferCard;
