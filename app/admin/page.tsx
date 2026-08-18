"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  FaChartBar, 
  FaFileAlt, 
  FaNewspaper, 
  FaProjectDiagram, 
  FaCog,
  FaUsers,
  FaEnvelope,
  FaEye,
  FaUserShield,
  FaDatabase
} from "react-icons/fa";

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  // Données statistiques du tableau de bord
  const stats = {
    devisEnAttente: 5,
    messagesNonLus: 3,
    realisationsPubliees: 18,
    visiteursCeMois: 2140
  };

  // Dernières demandes de devis
  const dernieresDemandesDevis = [
    { entreprise: "Banque Sahélienne", service: "Réseaux et Cybersécurité", date: "16 août", statut: "Nouveau" },
    { entreprise: "Clinique Richème", service: "Développement web", date: "15 août", statut: "Traité" },
    { entreprise: "Lycée Notre-Dame", service: "Fournitures matériel", date: "14 août", statut: "Nouveau" }
  ];

  const menuItems = [
    { id: "dashboard", label: "Tableau de bord", icon: <FaChartBar /> },
    { id: "pages", label: "Pages", icon: <FaFileAlt /> },
    { id: "articles", label: "Articles", icon: <FaNewspaper /> },
    { id: "realisations", label: "Réalisations", icon: <FaProjectDiagram /> },
    { id: "services", label: "Services", icon: <FaCog /> }
  ];

  const gestionItems = [
    { id: "devis", label: "Demandes de devis", icon: <FaFileAlt />, badge: stats.devisEnAttente },
    { id: "messages", label: "Messages", icon: <FaEnvelope />, badge: stats.messagesNonLus },
    { id: "temoignages", label: "Témoignages", icon: <FaUsers /> },
    { id: "candidatures", label: "Candidatures", icon: <FaUserShield /> }
  ];

  const systemeItems = [
    { id: "utilisateurs", label: "Utilisateurs", icon: <FaUsers /> },
    { id: "mediatheque", label: "Médiathèque", icon: <FaDatabase /> },
    { id: "parametres", label: "Paramètres / SEO", icon: <FaCog /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0 min-h-screen">
        {/* Logo */}
        <div className="p-6 bg-black/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">OT</span>
            </div>
            <div>
              <div className="font-bold text-sm">OFARO TECH</div>
              <div className="text-xs text-gray-400">Administration</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="py-4">
          {/* General */}
          <div className="px-4 mb-4">
            <div className="text-xs text-gray-500 uppercase font-semibold mb-2">General</div>
            <div 
              onClick={() => setActiveMenu("dashboard")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                activeMenu === "dashboard" ? "bg-primary text-white" : "hover:bg-gray-800"
              }`}
            >
              <FaChartBar />
              <span className="text-sm">Tableau de bord</span>
            </div>
            
            <div className="mt-2 space-y-1">
              {menuItems.slice(1).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-colors text-sm ${
                    activeMenu === item.id ? "bg-gray-800" : "hover:bg-gray-800"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gestion du site */}
          <div className="px-4 mb-4">
            <div className="text-xs text-gray-500 uppercase font-semibold mb-2">Gestion du site</div>
            {gestionItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer transition-colors text-sm ${
                  activeMenu === item.id ? "bg-gray-800" : "hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 && (
                  <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Système */}
          <div className="px-4">
            <div className="text-xs text-gray-500 uppercase font-semibold mb-2">Système</div>
            {systemeItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-colors text-sm ${
                  activeMenu === item.id ? "bg-gray-800" : "hover:bg-gray-800"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Tableau de bord
            </h1>
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                target="_blank"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary"
              >
                <FaEye />
                <span>Voir le site</span>
              </Link>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold cursor-pointer">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Stats Cards */}
          <div className="mb-8">
            <p className="text-sm text-gray-600 mb-4">Vue d'ensemble de l'activité du site</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-sm text-gray-600 mb-1">Devis en attente</div>
                <div className="text-4xl font-bold text-gray-900">{stats.devisEnAttente}</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-sm text-gray-600 mb-1">Messages non lus</div>
                <div className="text-4xl font-bold text-gray-900">{stats.messagesNonLus}</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-sm text-gray-600 mb-1">Réalisations publiées</div>
                <div className="text-4xl font-bold text-gray-900">{stats.realisationsPubliees}</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-sm text-gray-600 mb-1">Visiteurs ce mois</div>
                <div className="text-4xl font-bold text-gray-900">{stats.visiteursCeMois.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Dernières demandes de devis */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Dernières demandes de devis</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-sm text-gray-600">
                    <th className="px-6 py-3 font-semibold">Entreprise</th>
                    <th className="px-6 py-3 font-semibold">Service demandé</th>
                    <th className="px-6 py-3 font-semibold">Date</th>
                    <th className="px-6 py-3 font-semibold">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {dernieresDemandesDevis.map((demande, index) => (
                    <tr key={index} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{demande.entreprise}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{demande.service}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{demande.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          demande.statut === "Nouveau" 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-green-100 text-green-800"
                        }`}>
                          {demande.statut}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
