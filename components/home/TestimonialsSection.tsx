"use client";

import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Testimonial {
  id: number;
  client_name: string;
  client_position: string;
  client_company: string;
  testimonial_text: string;
  rating: number;
  client_photo_url: string | null;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Load testimonials from Supabase
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true);
        console.log('🔍 Chargement des témoignages pour la page d\'accueil...');
        
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('is_active', true)
          .eq('is_featured', true)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('❌ Erreur chargement témoignages:', error);
          throw error;
        }
        
        console.log(`✅ ${data?.length || 0} témoignage(s) chargé(s)`);
        
        if (data && data.length > 0) {
          setTestimonials(data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des témoignages:', error);
        // Keep empty array if error
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  const nextTestimonial = () => {
    if (testimonials.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

  const prevTestimonial = () => {
    if (testimonials.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  // Show loading or empty state
  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des témoignages...</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null; // Don't show section if no testimonials
  }

  const currentTestimonial = testimonials[currentIndex];

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
              "{currentTestimonial.testimonial_text}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              {currentTestimonial.client_photo_url ? (
                <img 
                  src={currentTestimonial.client_photo_url} 
                  alt={currentTestimonial.client_name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                />
              ) : (
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold">
                  {currentTestimonial.client_name.charAt(0)}
                </div>
              )}
              <div>
                <div className="font-bold text-lg text-text">{currentTestimonial.client_name}</div>
                <div className="text-text-secondary">{currentTestimonial.client_position}</div>
                <div className="text-primary font-semibold">{currentTestimonial.client_company}</div>
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
              {testimonials.map((_, index) => (
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
