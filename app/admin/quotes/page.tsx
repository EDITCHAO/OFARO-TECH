"use client";

import { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaFileExport, FaEye } from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Quote {
  id: number;
  company_name: string;
  activity_field: string;
  email: string;
  phone: string;
  city: string;
  desired_services: string[];
  description: string;
  has_logo: string;
  has_domain_name: string;
  domain_name?: string;
  key_features: string;
  expected_result: string;
  budget: string;
  contact_person_name: string;
  delivery_date?: string;
  status: string;
  created_at: string;
}

export default function QuotesAdminPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from('quote_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuotes(data || []);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredQuotes = quotes.filter(quote => {
    const searchLower = searchTerm.toLowerCase();
    return (
      quote.company_name.toLowerCase().includes(searchLower) ||
      quote.email.toLowerCase().includes(searchLower) ||
      quote.phone.includes(searchTerm) ||
      quote.contact_person_name.toLowerCase().includes(searchLower)
    );
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            📋 Demandes de Devis ({quotes.length})
          </h1>
          
          {/* Recherche */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par entreprise, email, téléphone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Liste des devis */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement...</p>
          </div>
        ) : filteredQuotes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-900">Aucune demande de devis</h3>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredQuotes.map((quote) => (
              <div key={quote.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{quote.company_name}</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {quote.status || 'nouveau'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Contact:</span> {quote.contact_person_name}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span> {quote.email}
                      </div>
                      <div>
                        <span className="font-medium">Téléphone:</span> {quote.phone}
                      </div>
                      <div>
                        <span className="font-medium">Ville:</span> {quote.city}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {quote.desired_services?.map((service, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {service}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">Soumis le {formatDate(quote.created_at)}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedQuote(quote);
                      setShowModal(true);
                    }}
                    className="ml-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
                  >
                    <FaEye /> Voir détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal détails */}
        {showModal && selectedQuote && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* En-tête */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b">
                  <h2 className="text-2xl font-bold text-gray-900">Détails du devis</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Informations entreprise */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">🏢 Informations entreprise</h3>
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-500">Nom de l'entreprise</p>
                      <p className="font-medium text-gray-900">{selectedQuote.company_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Secteur d'activité</p>
                      <p className="font-medium text-gray-900">{selectedQuote.activity_field}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{selectedQuote.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Téléphone</p>
                      <p className="font-medium text-gray-900">{selectedQuote.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ville</p>
                      <p className="font-medium text-gray-900">{selectedQuote.city}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Personne en charge</p>
                      <p className="font-medium text-gray-900">{selectedQuote.contact_person_name}</p>
                    </div>
                  </div>
                </div>

                {/* Services demandés */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">🔧 Services demandés</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedQuote.desired_services?.map((service, idx) => (
                      <span key={idx} className="px-3 py-1 bg-primary text-white rounded-lg">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description du projet */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">💬 Description du projet</h3>
                  <div className="bg-amber-50 border-2 border-amber-200 p-5 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedQuote.description}</p>
                  </div>
                </div>

                {/* Fonctionnalités clés */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">⭐ Fonctionnalités clés</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedQuote.key_features}</p>
                  </div>
                </div>

                {/* Résultat attendu */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">🎯 Résultat attendu</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedQuote.expected_result}</p>
                  </div>
                </div>

                {/* Informations complémentaires */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">ℹ️ Informations complémentaires</h3>
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-500">Logo existant</p>
                      <p className="font-medium text-gray-900">{selectedQuote.has_logo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nom de domaine</p>
                      <p className="font-medium text-gray-900">{selectedQuote.has_domain_name}</p>
                    </div>
                    {selectedQuote.domain_name && (
                      <div>
                        <p className="text-sm text-gray-500">Domaine</p>
                        <p className="font-medium text-gray-900">{selectedQuote.domain_name}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500">Budget</p>
                      <p className="font-medium text-gray-900">{selectedQuote.budget}</p>
                    </div>
                    {selectedQuote.delivery_date && (
                      <div>
                        <p className="text-sm text-gray-500">Date de livraison souhaitée</p>
                        <p className="font-medium text-gray-900">{selectedQuote.delivery_date}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Fermer
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
