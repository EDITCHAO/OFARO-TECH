'use client';

import React from 'react';
import OfferCard from './OfferCard';

interface JobOffer {
  id: number;
  reference: string;
  title: string;
  department?: string;
  contract_type?: string;
  location: string;
  work_mode?: string;
  image_url?: string;
  image_alt?: string;
  publication_date: string;
  application_deadline?: string;
  experience_level?: string;
}

interface InternshipOffer {
  id: number;
  reference: string;
  title: string;
  department?: string;
  duration?: string;
  location: string;
  work_mode?: string;
  image_url?: string;
  image_alt?: string;
  publication_date: string;
  application_deadline?: string;
  start_date?: string;
}

interface OffersGridProps {
  offers: (JobOffer | InternshipOffer)[];
  offerType: 'job' | 'internship';
  emptyMessage?: string;
}

const OffersGrid: React.FC<OffersGridProps> = ({ 
  offers, 
  offerType,
  emptyMessage 
}) => {
  if (!offers || offers.length === 0) {
    return (
      <div className="text-center py-16">
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
          {emptyMessage || 'Aucune offre disponible'}
        </h3>
        <p className="text-gray-600">
          {offerType === 'job' 
            ? 'Revenez bientôt pour découvrir nos prochaines opportunités de carrière.' 
            : 'Revenez bientôt pour découvrir nos prochaines opportunités de stage.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {offers.map((offer) => {
        if (offerType === 'job') {
          const jobOffer = offer as JobOffer;
          return (
            <OfferCard
              key={jobOffer.id}
              id={jobOffer.id}
              reference={jobOffer.reference}
              title={jobOffer.title}
              department={jobOffer.department}
              location={jobOffer.location}
              imageUrl={jobOffer.image_url}
              imageAlt={jobOffer.image_alt}
              publicationDate={jobOffer.publication_date}
              applicationDeadline={jobOffer.application_deadline}
              contractType={jobOffer.contract_type}
              workMode={jobOffer.work_mode}
              experienceLevel={jobOffer.experience_level}
              offerType="job"
            />
          );
        } else {
          const internshipOffer = offer as InternshipOffer;
          return (
            <OfferCard
              key={internshipOffer.id}
              id={internshipOffer.id}
              reference={internshipOffer.reference}
              title={internshipOffer.title}
              department={internshipOffer.department}
              location={internshipOffer.location}
              imageUrl={internshipOffer.image_url}
              imageAlt={internshipOffer.image_alt}
              publicationDate={internshipOffer.publication_date}
              applicationDeadline={internshipOffer.application_deadline}
              duration={internshipOffer.duration}
              startDate={internshipOffer.start_date}
              workMode={internshipOffer.work_mode}
              offerType="internship"
            />
          );
        }
      })}
    </div>
  );
};

export default OffersGrid;
