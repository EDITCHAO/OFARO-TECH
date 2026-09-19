'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaChartBar, FaFileAlt, FaNewspaper, FaProjectDiagram, FaCog, FaStar,
  FaEnvelope, FaUserShield, FaDatabase, FaFolder, FaShieldAlt,
  FaUserTie, FaSync, FaExternalLinkAlt, FaGraduationCap,
  FaCheckCircle, FaExclamationTriangle, FaArchive, FaBriefcase, FaBars, FaLock, FaUsers, FaGlobe
} from 'react-icons/fa';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeMenu?: string;
  onMenuChange?: (menu: string) => void;
}

export default function AdminLayout({ children, activeMenu = 'dashboard', onMenuChange }: AdminLayoutProps) {
  const [currentRole, setCurrentRole] = useState<'administrateur' | 'editeur' | 'commercial' | 'rh'>('administrateur');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRoleChange = (newRole: typeof currentRole) => {
    setCurrentRole(newRole);
    showToast(`Connecté en tant que [${newRole.toUpperCase()}]`);
  };

  const handleMenuClick = (menuId: string) => {
    if (onMenuChange) {
      onMenuChange(menuId);
    } else {
      // Navigation par défaut
      if (menuId === 'offres') {
        window.location.href = '/admin/offres';
      } else if (menuId === 'equipe') {
        window.location.href = '/admin/equipe';
      } else if (menuId === 'mediatheque') {
        window.location.href = '/admin/mediatheque';
      } else {
        window.location.href = '/admin';
      }
    }
    setIsMobileMenuOpen(false);
  };

  const canAccess = (moduleId: string): boolean => {
    if (currentRole === 'administrateur') return true;
    if (currentRole === 'editeur') return ['dashboard','pages','articles','realisations','services','temoignages','mediatheque','documents'].includes(moduleId);
    if (currentRole === 'commercial') return ['dashboard','devis','demandes-service','messages','clients'].includes(moduleId);
    if (currentRole === 'rh') return ['dashboard','candidatures','offres'].includes(moduleId);
    return false;
  };

  const c = {
    bg: 'bg-gray-50',
    sidebar: 'bg-gray-950',
    header: 'bg-gray-950',
    card: 'bg-white',
    border: 'border-gray-200',
    text: 'text-gray-900',
    activeNav: 'bg-orange-500 text-white border border-orange-400 font-semibold',
    inactiveNav: 'text-gray-300 hover:text-white hover:bg-gray-800',
    btnPrimary: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white shadow-sm',
    shadowMd: 'shadow-md',
  };

  return (
    <div className={`min-h-screen ${c.bg} text-gray-900 flex flex-col font-sans`}>
      {/* HEADER */}
      <header className={`${c.header} border-b ${c.border} px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50 ${c.shadowMd}`}>
        <div className="flex items-center gap-3">
          {/* Bouton hamburger mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition"
            aria-label="Toggle menu"
          >
            <FaBars className="text-xl" />
          </button>
          
          <div className="flex items-center gap-3">
            <Image 
              src="/icon-192x192.jpeg" 
              alt="OFARO TECHNOLOGIE" 
              width={64} 
              height={64} 
              className="h-12 w-12 md:h-16 md:w-16 rounded-lg" 
              priority
            />
            <div className="hidden sm:block">
              <div className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                OFARO TECH
                <span className="text-xs px-2 py-0.5 rounded-md bg-orange-500/15 text-orange-300 border border-orange-400/40 font-mono font-semibold">BACK-OFFICE</span>
              </div>
              <div className="text-[11px] text-gray-400">Plateforme d'administration & gouvernance IT</div>
            </div>
          </div>
        </div>

        {/* Role Switcher */}
        <div className="hidden lg:flex items-center gap-1.5 bg-gray-900 p-1 rounded-xl border border-gray-700">
          <span className="text-xs text-gray-300 font-semibold px-2 flex items-center gap-1.5">
            <FaUserShield className="text-orange-400" /> Rôle actif :
          </span>
          {(['administrateur', 'editeur', 'commercial', 'rh'] as const).map(role => (
            <button
              key={role}
              onClick={() => handleRoleChange(role)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all duration-200 ${
                currentRole === role
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm scale-105'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => showToast('Données synchronisées !', 'success')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-gray-900 border border-gray-700 hover:bg-gray-800 text-gray-200 shadow-sm transition"
          >
            <FaSync className="text-orange-400" />
            <span>Sync Données</span>
          </button>
          <Link href="/" target="_blank" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${c.btnPrimary} transition`}>
            <FaExternalLinkAlt /> <span>Voir le site</span>
          </Link>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-xs shadow">
            {currentRole.slice(0, 2).toUpperCase()}
          </div>
        </div>
      </header>

      {/* Toast */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce border ${
          toastType === 'success'
            ? 'bg-white border-emerald-200 text-gray-800'
            : 'bg-white border-rose-200 text-gray-800'
        }`}>
          {toastType === 'success'
            ? <FaCheckCircle className="text-emerald-500 text-lg" />
            : <FaExclamationTriangle className="text-rose-500 text-lg" />}
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Overlay pour mobile */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        
        {/* SIDEBAR */}
        <aside className={`
          w-64 ${c.sidebar} border-r border-gray-800 flex-shrink-0 flex flex-col justify-between overflow-y-auto
          fixed md:relative inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <nav className="p-4 space-y-5">
            {/* Section 1: Général (Contenu) */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 mb-2">1. Général (Contenu)</div>
              <div className="space-y-0.5">
                {[
                  { id: 'dashboard', label: 'Tableau de bord', icon: <FaChartBar /> },
                  { id: 'pages', label: 'Pages statiques', icon: <FaFileAlt /> },
                  { id: 'articles', label: 'Articles / Actualités', icon: <FaNewspaper /> },
                  { id: 'realisations', label: 'Réalisations (Portfolio)', icon: <FaProjectDiagram /> },
                  { id: 'services', label: 'Services (10)', icon: <FaCog /> },
                  { id: 'temoignages', label: 'Témoignages', icon: <FaStar /> }
                ].map(item => {
                  const allowed = canAccess(item.id);
                  return (
                    <button
                      key={item.id}
                      disabled={!allowed}
                      onClick={() => allowed && handleMenuClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${
                        activeMenu === item.id ? c.activeNav : allowed ? c.inactiveNav : 'text-gray-300 cursor-not-allowed'
                      }`}
                    >
                      <span className={`text-base ${activeMenu === item.id ? 'text-white' : 'text-gray-500'}`}>{item.icon}</span>
                      <span>{item.label}</span>
                      {!allowed && <FaLock className="ml-auto text-[10px] text-gray-300" />}
                    </button>
                  );
                })}
                
                {/* Gestion des offres */}
                <button
                  onClick={() => canAccess('offres') && handleMenuClick('offres')}
                  disabled={!canAccess('offres')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all ${
                    activeMenu === 'offres' ? c.activeNav : canAccess('offres') ? c.inactiveNav : 'text-gray-300 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-base ${activeMenu === 'offres' ? 'text-white' : 'text-gray-500'}`}><FaBriefcase /></span>
                    <span>Gestion des offres</span>
                  </div>
                  {!canAccess('offres') && <FaLock className="text-[10px] text-gray-300" />}
                </button>
              </div>
            </div>

            {/* Section 2: Relation Client & Ventes */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 mb-2">2. Relation Client & Ventes</div>
              <div className="space-y-0.5">
                {[
                  { id: 'devis', label: 'Demandes de devis', icon: <FaFileAlt /> },
                  { id: 'demandes-service', label: 'Demandes de service', icon: <FaCog /> },
                  { id: 'messages', label: 'Messages de contact', icon: <FaEnvelope /> },
                  { id: 'candidatures', label: 'Candidatures / Stages', icon: <FaGraduationCap /> },
                  { id: 'archives', label: 'Archives', icon: <FaArchive /> }
                ].map(item => {
                  const allowed = canAccess(item.id);
                  return (
                    <button
                      key={item.id}
                      disabled={!allowed}
                      onClick={() => allowed && handleMenuClick(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all ${
                        activeMenu === item.id ? c.activeNav : allowed ? c.inactiveNav : 'text-gray-300 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-base ${activeMenu === item.id ? 'text-white' : 'text-gray-500'}`}>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {!allowed && <FaLock className="text-[10px] text-gray-300" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Système & Gouvernance */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 mb-2">3. Système & Gouvernance</div>
              <div className="space-y-0.5">
                {[
                  { id: 'equipe', label: 'Équipe OFARO', icon: <FaUsers /> },
                  { id: 'documents', label: 'Documents PDF', icon: <FaFolder /> },
                  { id: 'utilisateurs', label: 'Utilisateurs & Rôles', icon: <FaUserTie /> },
                  { id: 'mediatheque', label: 'Médiathèque', icon: <FaDatabase /> },
                  { id: 'seo', label: 'SEO & Paramètres', icon: <FaGlobe /> },
                  { id: 'logs', label: 'Journal de sécurité', icon: <FaShieldAlt /> }
                ].map(item => {
                  const allowed = canAccess(item.id);
                  return (
                    <button
                      key={item.id}
                      disabled={!allowed}
                      onClick={() => allowed && handleMenuClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${
                        activeMenu === item.id ? c.activeNav : allowed ? c.inactiveNav : 'text-gray-300 cursor-not-allowed'
                      }`}
                    >
                      <span className={`text-base ${activeMenu === item.id ? 'text-white' : 'text-gray-500'}`}>{item.icon}</span>
                      <span>{item.label}</span>
                      {!allowed && <FaLock className="ml-auto text-[10px] text-gray-300" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          <div className="p-4 border-t border-gray-800">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-all">
              <FaExternalLinkAlt className="text-base text-gray-500" />
              <span>Déconnexion</span>
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
