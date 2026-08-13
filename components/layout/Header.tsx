"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FaBars, FaTimes, FaPhoneAlt, FaEnvelope, FaChevronDown } from "react-icons/fa";
import { COMPANY_INFO, NAV_LINKS } from "@/lib/constants";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white shadow-lg py-2" : "bg-white/95 backdrop-blur-sm py-4"
    }`}>
      {/* Top Bar */}
      <div className="bg-text text-white py-2 hidden md:block">
        <div className="container-custom">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <FaPhoneAlt className="text-primary" />
                {COMPANY_INFO.phone}
              </a>
              <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <FaEnvelope className="text-primary" />
                {COMPANY_INFO.email}
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span>{COMPANY_INFO.openingHours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container-custom">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg sm:text-xl group-hover:scale-110 transition-transform">
              OT
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-xl text-text">{COMPANY_INFO.name}</div>
              <div className="text-xs text-text-secondary">Transformation Digitale</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <div
                key={link.href}
                className="relative group"
                onMouseEnter={() => link.subMenu && setActiveDropdown(link.href)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="text-text hover:text-primary transition-colors font-medium flex items-center gap-1"
                >
                  {link.label}
                  {link.subMenu && <FaChevronDown className="text-xs" />}
                </Link>

                {/* Dropdown Menu */}
                {link.subMenu && activeDropdown === link.href && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl rounded-lg py-2 animate-slide-down">
                    {link.subMenu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-text hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/devis" className="btn-primary">
              Demander un devis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-text text-2xl p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 animate-slide-down">
            <div className="container-custom flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text hover:text-primary transition-colors font-medium block py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.subMenu && (
                    <div className="pl-4 flex flex-col gap-2 mt-2">
                      {link.subMenu.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-sm text-text-secondary hover:text-primary transition-colors py-1"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/devis"
                className="btn-primary text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Demander un devis
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
