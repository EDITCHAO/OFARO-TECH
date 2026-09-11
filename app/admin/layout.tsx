'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaHome, FaFileAlt, FaCog, FaEnvelope, FaGraduationCap, 
  FaBriefcase, FaArchive, FaBars, FaTimes, FaSignOutAlt,
  FaBell, FaUser
} from 'react-icons/fa';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { id: 'dashboard', path: '/admin', label: 'Tableau de bord', icon: <FaHome /> },
    { id: 'devis', path: '/admin/quotes', label: 'Demandes de devis', icon: <FaFileAlt /> },
    { id: 'demandes-service', path: '/admin/service-requests', label: 'Demandes de service', icon: <FaCog /> },
    { id: 'messages', path: '/admin/messages', label: 'Messages de contact', icon: <FaEnvelope /> },
    { id: 'candidatures', path: '/admin/candidatures-offres', label: 'Candidatures / Stages', icon: <FaGraduationCap /> },
    { id: 'offres', path: '/admin/offres', label: 'Gestion des offres', icon: <FaBriefcase /> },
    { id: 'archives', path: '/admin/archives', label: 'Archives', icon: <FaArchive /> }
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Overlay mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          w-64 bg-gray-950 border-r border-gray-800 flex-shrink-0 flex flex-col justify-between overflow-y-auto
          fixed md:relative inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <nav className="p-4 space-y-5">
          {/* Logo */}
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              O
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">OFARO TECH</h2>
              <p className="text-gray-400 text-xs">Admin Panel</p>
            </div>
          </div>

          {/* Menu items */}
          <div className="space-y-1">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${active 
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-all">
            <FaSignOutAlt className="text-lg" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-950 border-b border-gray-800 px-4 md:px-6 py-3 flex items-center justify-between gap-4 sticky top-0 z-50 shadow-md">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </button>

            <div>
              <h1 className="text-white font-bold text-lg">Administration</h1>
              <p className="text-gray-400 text-xs hidden sm:block">Panneau de gestion OFARO TECH</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
              <FaBell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
            </button>
            <button className="flex items-center gap-2 p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
              <FaUser className="w-5 h-5" />
              <span className="hidden sm:inline text-sm">Admin</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
