import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import PresentationSection from "@/components/home/PresentationSection";
import ServicesSection from "@/components/home/ServicesSection";

// Lazy loading des sections non critiques (below the fold)
const WhyChooseUsSection = dynamic(() => import("@/components/home/WhyChooseUsSection"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
});
const RealizationsSection = dynamic(() => import("@/components/home/RealizationsSection"), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
});
const SectorsSection = dynamic(() => import("@/components/home/SectorsSection"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
});
const TechnologiesSection = dynamic(() => import("@/components/home/TechnologiesSection"), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
});
const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
});
const PartnersSection = dynamic(() => import("@/components/home/PartnersSection"), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
});
const NewsSection = dynamic(() => import("@/components/home/NewsSection"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
});
const ContactSection = dynamic(() => import("@/components/home/ContactSection"), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
});

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PresentationSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <RealizationsSection />
        <SectorsSection />
        <TechnologiesSection />
        <TestimonialsSection />
        <PartnersSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
