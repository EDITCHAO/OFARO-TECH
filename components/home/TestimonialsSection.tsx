"use client";

import { useState } from "react";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TESTIMONIALS = [
  {
    id: "1",
    name: "Dr. Kofi MENSAH",
    position: "Directeur Général",
    company: "Hôpital Central de Lomé",
    content: "OFARO TECH a transformé notre gestion hospitalière. Le système qu'ils ont développé est intuitif, performant et a considérablement amélioré notre efficacité opérationnelle. Je recommande vivement leurs services.",
    rating: 5,
    image: null
  },
  {
    id: "2",
    name: "Mme Aïcha DIALLO",
    position: "Responsable IT",
    company: "Banque Atlantique Togo",
    content: "L'équipe d'OFARO TECH a fait un travail exceptionnel sur notre infrastructure réseau. Leur professionnalisme et leur expertise technique sont remarquables. Nous sommes très satisfaits du résultat.",
    rating: 5,
    image: null
  },
  {
    id: "3",
    name: "M. Jean-Pierre KOUASSI",
    position: "CEO",
    company: "TechStart Solutions",
    content: "Grâce à OFARO TECH, nous avons pu lancer notre application mobile dans les délais. Leur accompagnement tout au long du projet a été précieux. Une équipe réactive et compétente.",
    rating: 5,
    image: null
  },
  {
    id: "4",
    name: "Mme Patricia AGBOH",
    position: "Directrice",
    company: "École Internationale de Lomé",
    content: "La plateforme e-learning développée par OFARO TECH a révolutionné notre façon d'enseigner. Les élèves et les parents sont ravis de cette solution moderne et facile d'utilisation.",
    rating: 5,
    image: null
  },
  {
    id: "5",
    name: "M. Abdoul RAHMAN",
    position: "Responsable Système",
    company: "Ministère de l'Éducation",
    content: "OFARO TECH nous accompagne depuis 3 ans dans notre transformation digitale. Leur sérieux, leur disponibilité et la qualité de leurs prestations font d'eux un partenaire de confiance.",
    rating: 5,
    image: null
  },
  {
    id: "6",
    name: "M. Emmanuel KOFFI",
    position: "Gérant",
    company: "Supermarché Le Bon Prix",
    content: "Le système de gestion de stock et de caisse installé par OFARO TECH fonctionne parfaitement. Nous avons gagné en efficacité et en transparence dans notre gestion quotidienne.",
    rating: 5,
    image: null
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-9xl text-primary">
          <FaQuoteLeft />
        </div>
        <div className="absolute bottom-10 right-10 text-9xl text-primary rotate-180">
          <FaQuoteLeft />
        </div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Témoignages
          </div>
          <h2 className="heading-2 mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-body">
            La satisfaction de nos clients est notre meilleure récompense
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-background-secondary to-white p-8 md:p-12 rounded-2xl shadow-xl">
            {/* Quote Icon */}
            <div className="text-5xl text-primary mb-6">
              <FaQuoteLeft />
            </div>

            {/* Rating */}
            <div className="flex gap-1 mb-6">
              {[...Array(currentTestimonial.rating)].map((_, index) => (
                <FaStar key={index} className="text-yellow-400 text-xl" />
              ))}
            </div>

            {/* Content */}
            <blockquote className="text-xl md:text-2xl text-text leading-relaxed mb-8 italic">
              "{currentTestimonial.content}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold">
                {currentTestimonial.name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-lg text-text">{currentTestimonial.name}</div>
                <div className="text-text-secondary">{currentTestimonial.position}</div>
                <div className="text-primary font-semibold">{currentTestimonial.company}</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              aria-label="Témoignage précédent"
            >
              <FaChevronLeft />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              aria-label="Témoignage suivant"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center p-6 bg-background-secondary rounded-xl">
            <div className="text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-text-secondary">Satisfaction client</div>
          </div>
          <div className="text-center p-6 bg-background-secondary rounded-xl">
            <div className="text-4xl font-bold text-primary mb-2">200+</div>
            <div className="text-text-secondary">Clients satisfaits</div>
          </div>
          <div className="text-center p-6 bg-background-secondary rounded-xl">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-text-secondary">Projets réussis</div>
          </div>
          <div className="text-center p-6 bg-background-secondary rounded-xl">
            <div className="text-4xl font-bold text-primary mb-2">5+</div>
            <div className="text-text-secondary">Années d'expérience</div>
          </div>
        </div>
      </div>
    </section>
  );
}
