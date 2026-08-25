import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { COMPANY_INFO, NAV_LINKS, SERVICES } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text text-white">
      {/* Main Footer */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* Hexagon Logo */}
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Outer hexagon with golden border */}
                  <path
                    d="M50 5 L90 28 L90 72 L50 95 L10 72 L10 28 Z"
                    fill="black"
                    stroke="#D4AF37"
                    strokeWidth="2"
                  />
                  {/* Inner cube structure */}
                  <g stroke="#D4AF37" strokeWidth="2.5" fill="none">
                    {/* Top face */}
                    <path d="M50 30 L65 40 L50 50 L35 40 Z" />
                    {/* Left face */}
                    <path d="M35 40 L35 60 L50 70 L50 50 Z" />
                    {/* Right face */}
                    <path d="M50 50 L50 70 L65 60 L65 40 Z" />
                  </g>
                </svg>
              </div>
              
              {/* Text Logo */}
              <div className="flex flex-col">
                <div className="font-bold text-lg text-white tracking-wider">
                  OFARO
                </div>
                <div className="text-xs text-gray-400 tracking-widest -mt-1">
                  TECHNOLOGIE
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {COMPANY_INFO.description}
            </p>
            <div className="flex gap-3">
              {COMPANY_INFO.socialMedia.facebook && (
                <a
                  href={COMPANY_INFO.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
              )}
              {COMPANY_INFO.socialMedia.linkedin && (
                <a
                  href={COMPANY_INFO.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
              )}
              {COMPANY_INFO.socialMedia.twitter && (
                <a
                  href={COMPANY_INFO.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
              )}
              {COMPANY_INFO.socialMedia.instagram && (
                <a
                  href={COMPANY_INFO.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {NAV_LINKS.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Nos Services</h3>
            <ul className="space-y-2">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                <span>
                  {COMPANY_INFO.address}, {COMPANY_INFO.city}, {COMPANY_INFO.country}
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FaPhoneAlt className="text-primary flex-shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="text-gray-400 hover:text-primary transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FaWhatsapp className="text-primary flex-shrink-0" />
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\s/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  {COMPANY_INFO.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FaEnvelope className="text-primary flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-gray-400 hover:text-primary transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </li>
            </ul>
            <div className="mt-4 text-sm text-gray-400">
              <p className="font-semibold text-white mb-1">Horaires</p>
              <p>{COMPANY_INFO.openingHours}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              © {currentYear} {COMPANY_INFO.name}. Tous droits réservés.
            </p>
            <div className="flex gap-6 items-center">
              <Link href="/mentions-legales" className="hover:text-primary transition-colors">
                Mentions légales
              </Link>
              <Link href="/confidentialite" className="hover:text-primary transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/cookies" className="hover:text-primary transition-colors">
                Cookies
              </Link>
              {/* Bouton Admin */}
              <Link 
                href="/admin" 
                className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white border border-primary/30 rounded-md text-xs font-semibold transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
