"use client";

import { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaFileExport, FaEye, FaEdit, FaTrash, FaClock, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';

interface ServiceRequest {
  id: number;
  client_name: string;
  client_email: string;
  client_phone: string;
  service_type: string;
  description: string;
  status: string;
  reference_number: string;
  submitted_at: string;
  assigned_user_first_name?: string;
  assigned_user_last_name?: string;
}

export default function ServiceRequestsPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('tous');
  const [total, setTotal] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Récupérer les demandes depuis l'API
  useEffect(() => {
    fetchRequests();
  }, [filterStatus]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterStatus !== 'tous') {
        params.append('status', filterStatus);
      }
      
      const response = await fetch(`/api/service-requests?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setRequests(data.data);
        setTotal(data.pagination.total);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des demandes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les demandes selon la recherche
  const filteredRequests = requests.filter(request => {
    const searchLower = searchTerm.toLowerCase();
    return (
      request.client_name.toLowerCase().includes(searchLower) ||
      request.client_email.toLowerCase().includes(searchLower) ||
      request.client_phone.includes(searchTerm) ||
      request.service_type.toLowerCase().includes(searchLower) ||
      request.reference_number.toLowerCase().includes(searchLower)
    );
  });

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Fonction pour obtenir le badge de statut
  const getStatusBadge = (status: string) => {
    const statusConfig: { [key: string]: { label: string; class: string; icon: JSX.Element } } = {
      'nouvelle': {
        label: 'Nouvelle',
        class: 'bg-info-100 text-info-800',
        icon: <FaClock className="mr-1" />
      },
      'en_analyse': {
        label: 'En analyse',
        class: 'bg-warning-100 text-warning-800',
        icon: <FaHourglassHalf className="mr-1" />
      },
      'en_cours': {
        label: 'En cours',
        class: 'bg-primary-100 text-primary-800',
        icon: <FaHourglassHalf className="mr-1" />
      },
      'terminee': {
        label: 'Terminée',
        class: 'bg-success-100 text-success-800',
        icon: <FaCheckCircle className="mr-1" />
      },
      'en_attente': {
        label: 'En attente',
        class: 'bg-primary-100 text-primary-800',
        icon: <FaClock className="mr-1" />
      },
      'rejetee': {
        label: 'Rejetée',
        class: 'bg-danger-100 text-danger-800',
        icon: <FaTrash className="mr-1" />
      },
      'archivee': {
        label: 'Archivée',
        class: 'bg-neutral-100 text-neutral-800',
        icon: <FaTrash className="mr-1" />
      }
    };

    const config = statusConfig[status] || statusConfig['nouvelle'];

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.class}`}>
        {config.icon}
        {config.label}
      </span>
    );
  };

  // Exporter en CSV
  const exportToCSV = () => {
    const headers = ['Référence', 'Date', 'Nom', 'Email', 'Téléphone', 'Service', 'Statut'];
    const rows = filteredRequests.map(req => [
      req.reference_number,
      formatDate(req.submitted_at),
      req.client_name,
      req.client_email,
      req.client_phone,
      req.service_type,
      req.status
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `demandes-service-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 flex items-center gap-2">
                <span className="text-primary">🔧</span>
                Demandes de Service ({total})
              </h1>
              <p className="text-neutral-600 mt-1">
                Demandes spécifiques de services soumises depuis le formulaire du site public
              </p>
            </div>
            <button
              onClick={exportToCSV}
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <FaFileExport className="mr-2" />
              Exporter CSV
            </button>
          </div>

          {/* Barre de recherche et filtres */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, email, téléphone ou service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaFilter className="text-neutral-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="tous">Tous les statuts</option>
                <option value="nouvelle">Nouvelle</option>
                <option value="en_analyse">En analyse</option>
                <option value="en_cours">En cours</option>
                <option value="terminee">Terminée</option>
                <option value="en_attente">En attente</option>
                <option value="rejetee">Rejetée</option>
                <option value="archivee">Archivée</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tableau des demandes */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-neutral-600">Chargement des demandes...</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Aucune demande de service pour le moment</h3>
            <p className="text-neutral-600">
              Les demandes soumises via le formulaire "Besoin d'un service spécifique ?" apparaîtront ici
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Nom
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {filteredRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                        <div>
                          <div className="font-medium">{request.reference_number}</div>
                          <div className="text-neutral-500 text-xs">{formatDate(request.submitted_at)}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-neutral-900">{request.client_name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-neutral-900">{request.client_email}</div>
                        <div className="text-sm text-neutral-500">{request.client_phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-neutral-900 max-w-xs truncate">
                          {request.service_type}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-neutral-700 max-w-md">
                          {request.description.length > 100 
                            ? request.description.substring(0, 100) + '...' 
                            : request.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(request.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowModal(true);
                          }}
                          className="text-primary hover:text-primary-dark mr-3"
                          title="Voir les détails"
                        >
                          <FaEye />
                        </button>
                        <button
                          className="text-info-600 hover:text-info-900 mr-3"
                          title="Modifier"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-danger-600 hover:text-danger-900"
                          title="Supprimer"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Informations additionnelles */}
        {!loading && filteredRequests.length > 0 && (
          <div className="mt-4 text-center text-sm text-neutral-600">
            Affichage de {filteredRequests.length} demande(s) sur {total} au total
          </div>
        )}

        {/* Modal des détails */}
        {showModal && selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* En-tête */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b">
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900">
                      Détails de la demande
                    </h2>
                    <p className="text-sm text-neutral-500 mt-1">
                      Référence : {selectedRequest.reference_number}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-neutral-400 hover:text-neutral-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Informations client */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
                    👤 Informations du client
                  </h3>
                  <div className="grid grid-cols-2 gap-4 bg-neutral-50 p-4 rounded-lg">
                    <div>
                      <p className="text-sm text-neutral-500">Nom complet</p>
                      <p className="font-medium text-neutral-900">{selectedRequest.client_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">Email</p>
                      <p className="font-medium text-neutral-900">{selectedRequest.client_email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">Téléphone</p>
                      <p className="font-medium text-neutral-900">{selectedRequest.client_phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">Date de soumission</p>
                      <p className="font-medium text-neutral-900">{formatDate(selectedRequest.submitted_at)}</p>
                    </div>
                  </div>
                </div>

                {/* Détails de la demande */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
                    🔧 Détails de la demande
                  </h3>
                  <div className="bg-neutral-50 p-4 rounded-lg space-y-4">
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Service demandé</p>
                      <p className="font-medium text-neutral-900 text-lg">{selectedRequest.service_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Statut</p>
                      <div>{getStatusBadge(selectedRequest.status)}</div>
                    </div>
                  </div>
                </div>

                {/* MESSAGE DU CLIENT */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
                    💬 Message du client
                  </h3>
                  <div className="bg-warning-50 border-2 border-warning-200 p-5 rounded-lg">
                    <p className="text-neutral-900 text-base leading-relaxed whitespace-pre-wrap">
                      {selectedRequest.description || "Aucune description fournie"}
                    </p>
                  </div>
                </div>

                {/* Recommandations */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
                    💡 Recommandations
                  </h3>
                  <div className="bg-info-50 p-4 rounded-lg">
                    <ul className="space-y-2 text-sm text-neutral-700">
                      <li>• Contactez le client sous 24h pour confirmer la réception</li>
                      <li>• Proposez un échange téléphonique pour préciser les besoins</li>
                      <li>• Si pertinent, envoyez un lien vers le formulaire de devis complet</li>
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                  >
                    Fermer
                  </button>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                    Modifier le statut
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
