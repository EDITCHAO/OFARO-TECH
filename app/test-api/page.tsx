'use client';

import { useState, useEffect } from 'react';

export default function TestAPIPage() {
  const [backendData, setBackendData] = useState<any>(null);
  const [supabaseData, setSupabaseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Test 1: Backend API
      console.log('🔍 Test Backend API...');
      const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/active`);
      const backendJson = await backendResponse.json();
      setBackendData(backendJson);
      console.log('Backend response:', backendJson);

      // Test 2: Supabase Direct
      console.log('🔍 Test Supabase Direct...');
      const { supabase } = await import('@/lib/supabase');
      const { data, error } = await supabase
        .from('job_offers')
        .select('*')
        .eq('status', 'publiee')
        .order('publication_date', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        setSupabaseData({ error: error.message });
      } else {
        console.log('Supabase data:', data);
        setSupabaseData({ data });
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧪 Test API - Offres d'emploi</h1>

        {/* Backend API */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            🔌 Backend API (via Express)
            <span className="text-sm text-gray-500">GET /api/jobs/active</span>
          </h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(backendData, null, 2)}
          </pre>
          {backendData && (
            <div className="mt-4 p-4 bg-blue-50 rounded">
              <p className="font-semibold">Résumé:</p>
              <p>Nombre d'offres: {backendData.count || 0}</p>
              <p>Success: {backendData.success ? '✅' : '❌'}</p>
            </div>
          )}
        </div>

        {/* Supabase Direct */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            🗄️ Supabase Direct (via client JS)
            <span className="text-sm text-gray-500">SELECT * WHERE status='publiee'</span>
          </h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(supabaseData, null, 2)}
          </pre>
          {supabaseData?.data && (
            <div className="mt-4 p-4 bg-green-50 rounded">
              <p className="font-semibold">Résumé:</p>
              <p>Nombre d'offres: {supabaseData.data.length}</p>
              {supabaseData.data.map((job: any) => (
                <div key={job.id} className="mt-2 p-2 bg-white rounded border">
                  <p className="font-semibold">{job.title}</p>
                  <p className="text-sm text-gray-600">Statut: {job.status}</p>
                  <p className="text-sm text-gray-600">Image: {job.image_url || 'Aucune'}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold mb-2">📝 Diagnostic:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Si Backend API retourne des données → Backend fonctionne ✅</li>
            <li>Si Supabase Direct retourne des données → RLS configuré ✅</li>
            <li>Si les deux sont vides → Vérifier le statut des offres en BDD</li>
            <li>Si Image=null → Upload d'image pas implémenté (normal)</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={fetchData}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            🔄 Rafraîchir
          </button>
          <a
            href="/admin/offres"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
          >
            ← Retour Admin
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
