'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Clock, Briefcase, GraduationCap } from 'lucide-react';

interface OfferCardProps {
  id: number;
  reference: string;
  title: string;
  department?: string;
  location: string;
  imageUrl?: string;
  imageAlt?: string;
  publicationDate: string;
  applicationDeadline?: string;
  // Pour les emplois
  contractType?: string;
  workMode?: string;
  experienceLevel?: string;
  // Pour les stages
  duration?: string;
  startDate?: string;
  // Type d'offre
  offerType: 'job' | 'internship';
}

const OfferCard: React.FC<OfferCardProps> = ({
  id,
  reference,
  title,
  department,
  location,
  imageUrl,
  imageAlt,
  publicationDate,
  applicationDeadline,
  contractType,
  workMode,
  experienceLevel,
  duration,
  startDate,
  offerType
}) => {
  // Image par défaut si aucune image n'est fournie
  const defaultImage = offerType === 'job' 
    ? '/images/default-job-offer.jpg' 
    : '/images/default-internship-offer.jpg';

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
    return diffDays > 0 ? diffDays : 0;
  };

  const daysRemaining = getDaysRemaining(applicationDeadline);
  const isUrgent = daysRemaining !== null && daysRemaining <= 7;

  const linkHref = offerType === 'job' 
    ? `/carrieres/${id}` 
    : `/stages/${id}`;

  return (
    <Link href={linkHref}>
      <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer h-full">
        {/* Badge Urgent */}
        {isUrgent && daysRemaining !== null && daysRemaining > 0 && (
          <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            🔥 Urgent
          </div>
        )}

        {/* Badge Type */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          {offerType === 'job' && contractType && (
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              {contractType}
            </span>
          )}
          {offerType === 'internship' && (
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              Stage
            </span>
          )}
          {workMode && (
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              {workMode}
            </span>
          )}
        </div>

        {/* Image */}
        <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600">
          {imageUrl || defaultImage ? (
            <Image
              src={imageUrl || defaultImage}
              alt={imageAlt || title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {offerType === 'job' ? (
                <Briefcase className="w-20 h-20 text-white opacity-50" />
              ) : (
                <GraduationCap className="w-20 h-20 text-white opacity-50" />
              )}
            </div>
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Contenu */}
        <div className="p-6">
          {/* Date et Référence */}
          <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(publicationDate)}</span>
            </div>
            <span className="font-mono bg-gray-100 px-2 py-1 rounded">
              {reference}
            </span>
          </div>

          {/* Titre */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Département */}
          {department && (
            <p className="text-sm text-gray-600 mb-3">
              {department}
            </p>
          )}

          {/* Informations clés */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span>{location}</span>
            </div>

            {duration && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Clock className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>{duration}</span>
              </div>
            )}

            {experienceLevel && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Briefcase className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>{experienceLevel}</span>
              </div>
            )}

            {startDate && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Calendar className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>Début: {formatDate(startDate)}</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-100">
            {daysRemaining !== null && daysRemaining > 0 ? (
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${isUrgent ? 'text-red-600' : 'text-gray-600'}`}>
                  {daysRemaining} jour{daysRemaining > 1 ? 's' : ''} restant{daysRemaining > 1 ? 's' : ''}
                </span>
                <span className="text-orange-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Postuler
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            ) : (
              <div className="text-center">
                <span className="text-orange-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Voir les détails
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OfferCard;
