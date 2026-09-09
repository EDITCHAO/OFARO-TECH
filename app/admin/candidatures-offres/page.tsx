'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaBriefcase, FaCalendar, FaDownload, FaEye, FaFileAlt } from 'react-icons/fa';

interface Application {
  id: number;
  application_type: string;
  job_offer_id: number | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  position_sought: string;
  cv_file_name: string | null;
  cv_file_path: string | null;
  portfolio_url: string | null;
  additional_message: string | null;
  status: string;
  submitted_at: string;
  job_offer?: {
    title: string;
    reference: string;
  };
}

export default function CandidaturesOffresPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      
      // Charger les candidatures avec les informations de l'offre
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          job_offer:job_offers(title, reference)
        `)
        .eq('application_type', 'offre')
        .order('submitted_at', { ascending: false });

      if (error) throw error;

      setApplications(data || []);
    } catch (error) {
      console.error('Erreur chargement candidatures:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      // Recharger les données
      loadApplications();
      alert('Statut mis à jour avec succès');
    } catch (error) {
      console.error('Erreur mise à jour:', error);
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const badges: { [key: string]: { bg: string; text: string; label: string } } = {
      'nouvelle': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Nouvelle' },
      'en_analyse': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'En analyse' },
      'preselectionee': { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Présélectionné' },
      'entretien': { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Entretien' },
      'acceptee': { bg: 'bg-green-100', text: 'text-green-800', label: 'Accepté' },
      'refusee': { bg: 'bg-red-100', text: 'text-red-800', label: 'Refusé' },
      'en_attente': { bg: 'bg-gray-100', text: 'text-gray-800', label: 'En attente' }
    };

    const badge = badges[status] || badges['nouvelle'];
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  const filteredApplications = applications.filter(app => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesSearch = searchTerm === '' ||
      app.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.job_offer?.title || '').toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/admin"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Candidatures aux Offres d'Emploi
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Gérez les candidatures reçues pour vos offres d'emploi
              </p>
            </div>
          </div>

          {/* Filtres */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Recherche */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Rechercher par nom, email ou poste..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Filtre par statut */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              <option value="all">Tous les statuts</option>
              <option value="nouvelle">Nouvelle</option>
              <option value="en_analyse">En analyse</option>
              <option value="preselectionee">Présélectionné</option>
              <option value="entretien">Entretien</option>
              <option value="acceptee">Accepté</option>
              <option value="refusee">Refusé</option>
              <option value="en_attente">En attente</option>
            </select>
          </div>

          {/* Stats */}
          <div className="mt-4 flex gap-4 text-sm">
            <span className="text-gray-600">
              <strong className="text-gray-900">{filteredApplications.length}</strong> candidature(s) affichée(s)
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">
              <strong className="text-gray-900">{applications.length}</strong> au total
            </span>
          </div>
        </div>
      </div>

      {/* Liste des candidatures */}
      <div className="container mx-auto px-4 py-8">
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FaBriefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Aucune candidature trouvée</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app) => (
              <div key={app.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <FaUser className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">
                          {app.first_name} {app.last_name}
                        </h3>
                        {app.job_offer && (
                          <p className="text-sm text-gray-600 mt-1">
                            <FaBriefcase className="inline mr-2" />
                            Candidature pour : <strong>{app.job_offer.title}</strong>
                            <span className="text-gray-400 ml-2">({app.job_offer.reference})</span>
                          </p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <FaEnvelope className="text-gray-400" />
                            {app.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaPhone className="text-gray-400" />
                            {app.phone}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      {getStatusBadge(app.status)}
                      <p className="text-xs text-gray-500 mt-2">
                        <FaCalendar className="inline mr-1" />
                        {formatDate(app.submitted_at)}
                      </p>
                    </div>
                  </div>

                  {/* Message de motivation */}
                  {app.additional_message && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-1">Message de motivation :</p>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{app.additional_message}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                    {/* Changer le statut */}
                    <select
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                      className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                    >
                      <option value="nouvelle">Nouvelle</option>
                      <option value="en_analyse">En analyse</option>
                      <option value="preselectionee">Présélectionné</option>
                      <option value="entretien">Entretien</option>
                      <option value="acceptee">Accepté</option>
                      <option value="refusee">Refusé</option>
                      <option value="en_attente">En attente</option>
                    </select>

                    {/* Voir le CV */}
                    {app.cv_file_path && (
                      <a
                        href={app.cv_file_path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FaDownload />
                        Télécharger CV
                      </a>
                    )}

                    {/* Portfolio */}
                    {app.portfolio_url && (
                      <a
                        href={app.portfolio_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <FaEye />
                        Voir Portfolio
                      </a>
                    )}

                    {/* Contacter */}
                    <a
                      href={`mailto:${app.email}`}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <FaEnvelope />
                      Contacter
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
