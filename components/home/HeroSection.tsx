"use client";

import Link from "next/link";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import { COMPANY_INFO, STATISTICS } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero/nasa-Q1p7bh3SHj8-unsplash.jpg" 
          alt="Global Technology" 
          className="w-full h-full object-cover"
        />
        {/* Dark overlay pour améliorer la lisibilité du texte */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70"></div>
      </div>

      {/* Background Pattern (optionnel, plus subtil maintenant) */}
      <div className="absolute inset-0 opacity-5 z-[1]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-primary/90 text-white rounded-full text-sm font-semibold backdrop-blur-sm">
              🚀 Innovation & Excellence IT
            </div>

            <h1 className="heading-1 leading-tight text-white drop-shadow-lg">
              {COMPANY_INFO.slogan}
            </h1>

            <p className="text-lg text-gray-100 max-w-2xl leading-relaxed drop-shadow">
              Nous accompagnons les entreprises, administrations et institutions dans leur transformation digitale avec des solutions technologiques innovantes et sur mesure.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/devis" className="btn-primary group">
                Demander un devis
                <FaArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/services" className="btn-secondary group">
                Nos services
              </Link>
              <button className="flex items-center gap-3 text-text hover:text-primary transition-colors font-semibold">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <FaPlay className="ml-1" />
                </div>
                <span>Voir la démo</span>
              </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/20">
              {STATISTICS.map((stat, index) => (
                <div key={index} className="text-center md:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-primary drop-shadow-lg mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image supprimée car le background est déjà là */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 space-y-6">
              {/* Floating Cards avec design amélioré */}
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/20 animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-green-500/90 rounded-lg flex items-center justify-center text-white text-2xl">
                    ✓
                  </div>
                  <div>
                    <div className="font-bold text-white text-xl">200+</div>
                    <div className="text-sm text-gray-200">Projets livrés avec succès</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/20 animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/90 rounded-lg flex items-center justify-center text-white text-2xl">
                    ⭐
                  </div>
                  <div>
                    <div className="font-bold text-white text-xl">98%</div>
                    <div className="text-sm text-gray-200">Taux de satisfaction client</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/20 animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-500/90 rounded-lg flex items-center justify-center text-white text-2xl">
                    🌍
                  </div>
                  <div>
                    <div className="font-bold text-white text-xl">24/7</div>
                    <div className="text-sm text-gray-200">Support technique disponible</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full p-1">
          <div className="w-1 h-3 bg-primary rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
