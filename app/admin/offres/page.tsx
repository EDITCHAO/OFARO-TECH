'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter, 
  FaBriefcase, FaArrowLeft, FaCheckCircle, FaClock 
} from 'react-icons/fa';

interface JobOffer {
  id: number;
  reference: string;
  title: string;
  department?: string;
  contract_type?: string;
  location: string;
  work_mode?: string;
  image_url?: string;
  description: string;
  status: string;
  publication_date: string;
  application_deadline?: string;
  experience_level?: string;
  created_at: string;
}

export default function AdminOffresPage() {
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  // Charger les offres
  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      
      // Créer le client Supabase
      const { supabase } = await import('@/lib/supabase');

      const { data, error } = await supabase
        .from('job_offers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setOffers(data || []);
    } catch (error) {
      console.error('Erreur chargement offres:', error);
      showToast('Erreur lors du chargement des offres', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Voulez-vous vraiment supprimer l'offre "${title}" ?`)) {
      return;
    }

    try {
      const { supabase } = await import('@/lib/supabase');

      const { error } = await supabase
        .from('job_offers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      showToast('Offre supprimée avec succès', 'success');
      fetchOffers();
    } catch (error) {
      console.error('Erreur suppression:', error);
      showToast('Erreur lors de la suppression', 'error');
    }
  };

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const { supabase } = await import('@/lib/supabase');

      const { error } = await supabase
        .from('job_offers')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      showToast('Statut mis à jour', 'success');
      fetchOffers();
    } catch (error) {
      console.error('Erreur mise à jour:', error);
      showToast('Erreur lors de la mise à jour', 'error');
    }
  };

  // Filtrer les offres
  const filteredOffers = offers.filter(offer => {
    const matchSearch = 
      offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus = statusFilter === 'all' || offer.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig: { [key: string]: { label: string; color: string } } = {
      'brouillon': { label: 'Brouillon', color: 'bg-gray-100 text-gray-700' },
      'publiee': { label: 'Publiée', color: 'bg-green-100 text-green-700' },
      'suspendue': { label: 'Suspendue', color: 'bg-yellow-100 text-yellow-700' },
      'expiree': { label: 'Expirée', color: 'bg-red-100 text-red-700' },
      'archivee': { label: 'Archivée', color: 'bg-gray-100 text-gray-500' }
    };

    const config = statusConfig[status] || { label: status, color: 'bg-gray-100 text-gray-700' };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${
          toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FaArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <FaBriefcase className="w-6 h-6 text-blue-600" />
                  Gestion des offres d'emploi
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {offers.length} {offers.length > 1 ? 'offres' : 'offre'} au total
                </p>
              </div>
            </div>

            <Link
              href="/admin/offres/nouvelle"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-medium"
            >
              <FaPlus className="w-4 h-4" />
              Nouvelle offre
            </Link>
          </div>

          {/* Filtres */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher une offre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white cursor-pointer min-w-[180px]"
              >
                <option value="all">Tous les statuts</option>
                <option value="brouillon">Brouillon</option>
                <option value="publiee">Publiée</option>
                <option value="suspendue">Suspendue</option>
                <option value="expiree">Expirée</option>
                <option value="archivee">Archivée</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredOffers.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FaBriefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucune offre trouvée
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'Aucune offre ne correspond à vos critères de recherche'
                : 'Commencez par créer votre première offre d\'emploi'}
            </p>
            <Link
              href="/admin/offres/nouvelle"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-medium"
            >
              <FaPlus className="w-4 h-4" />
              Créer une offre
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Image</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Offre</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Type / Lieu</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Statut</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Dates</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOffers.map((offer) => (
                  <tr key={offer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                        {offer.image_url ? (
                          <Image
                            src={offer.image_url}
                            alt={offer.title}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FaBriefcase className="w-6 h-6 text-white opacity-50" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{offer.title}</h3>
                        <p className="text-sm text-gray-500">{offer.reference}</p>
                        {offer.department && (
                          <p className="text-xs text-gray-400 mt-1">{offer.department}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        {offer.contract_type && (
                          <span className="block text-sm text-gray-700">{offer.contract_type}</span>
                        )}
                        <span className="block text-sm text-gray-500">{offer.location}</span>
                        {offer.work_mode && (
                          <span className="block text-xs text-gray-400">{offer.work_mode}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={offer.status}
                        onChange={(e) => handleUpdateStatus(offer.id, e.target.value)}
                        className="px-3 py-1 rounded-full text-xs font-medium border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="brouillon">Brouillon</option>
                        <option value="publiee">Publiée</option>
                        <option value="suspendue">Suspendue</option>
                        <option value="expiree">Expirée</option>
                        <option value="archivee">Archivée</option>
                      </select>
                      <div className="mt-1">{getStatusBadge(offer.status)}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaClock className="w-3 h-3" />
                          <span>{formatDate(offer.publication_date)}</span>
                        </div>
                        {offer.application_deadline && (
                          <div className="flex items-center gap-2 text-gray-500">
                            <FaCheckCircle className="w-3 h-3" />
                            <span className="text-xs">Jusqu'au {formatDate(offer.application_deadline)}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/offres/${offer.id}`}
                          target="_blank"
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Voir l'offre"
                        >
                          <FaEye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/offres/${offer.id}/modifier`}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <FaEdit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(offer.id, offer.title)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
