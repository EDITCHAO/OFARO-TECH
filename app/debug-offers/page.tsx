'use client';

import { useState, useEffect } from 'react';

export default function DebugOffersPage() {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const { supabase } = await import('@/lib/supabase');
      
      const { data, error } = await supabase
        .from('job_offers')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;

      console.log('Offres chargées:', data);
      setOffers(data || []);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🔍 Debug - Offres en base de données</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Résumé</h2>
          <p><strong>Nombre total d'offres:</strong> {offers.length}</p>
          <p><strong>Offres publiées:</strong> {offers.filter(o => o.status === 'publiee').length}</p>
          <p><strong>Offres avec image:</strong> {offers.filter(o => o.image_url).length}</p>
        </div>

        <div className="space-y-4">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-lg shadow p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Colonne gauche - Info */}
                <div>
                  <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>ID:</strong> {offer.id}</p>
                    <p><strong>Référence:</strong> {offer.reference}</p>
                    <p><strong>Statut:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded ${
                        offer.status === 'publiee' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {offer.status}
                      </span>
                    </p>
                    <p><strong>Département:</strong> {offer.department || 'N/A'}</p>
                    <p><strong>Localisation:</strong> {offer.location}</p>
                    <p><strong>Date publication:</strong> {offer.publication_date}</p>
                  </div>
                </div>

                {/* Colonne droite - Image */}
                <div>
                  <h4 className="font-semibold mb-2">Image:</h4>
                  {offer.image_url ? (
                    <div className="space-y-2">
                      <div className="bg-gray-100 p-2 rounded">
                        <p className="text-xs font-mono break-all">{offer.image_url}</p>
                      </div>
                      <div className="border rounded overflow-hidden">
                        <img 
                          src={offer.image_url} 
                          alt={offer.image_alt || offer.title}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/images/placeholder.jpg';
                            e.currentTarget.className = 'w-full h-48 object-cover opacity-30';
                          }}
                        />
                      </div>
                      <div className="flex gap-2">
                        <a 
                          href={offer.image_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline"
                        >
                          🔗 Ouvrir l'image dans un nouvel onglet
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-50 border border-red-200 rounded p-4 text-sm text-red-700">
                      ❌ Aucune image (image_url est NULL)
                    </div>
                  )}
                </div>
              </div>

              {/* JSON complet */}
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900">
                  Voir JSON complet
                </summary>
                <pre className="mt-2 bg-gray-100 p-3 rounded text-xs overflow-auto">
                  {JSON.stringify(offer, null, 2)}
                </pre>
              </details>
            </div>
          ))}
        </div>

        {offers.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded p-6 text-center">
            <p className="text-yellow-800">Aucune offre trouvée en base de données</p>
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <button
            onClick={fetchOffers}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            🔄 Rafraîchir
          </button>
          <a
            href="/admin/offres"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
          >
            ← Admin
          </a>
          <a
            href="/carrieres"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Voir Carrières →
          </a>
        </div>
      </div>
    </div>
  );
}
