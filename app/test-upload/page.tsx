'use client';

import { useState } from 'react';

export default function TestUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const testUpload = async () => {
    if (!file) {
      alert('Sélectionnez d\'abord une image');
      return;
    }

    setLoading(true);
    setUploadResult(null);

    try {
      console.log('🔍 Test upload vers Supabase...');
      console.log('Fichier:', file.name, 'Taille:', file.size, 'Type:', file.type);

      // Import du client Supabase
      const { supabase } = await import('@/lib/supabase');
      
      // Vérifier que le client fonctionne
      console.log('✅ Client Supabase chargé');

      // Générer un nom de fichier unique
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const fileName = `test-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `offers/${fileName}`;

      console.log('📤 Upload vers:', filePath);

      // Tenter l'upload
      const { data, error } = await supabase.storage
        .from('job-offers')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('❌ Erreur upload:', error);
        setUploadResult({
          success: false,
          error: error.message,
          details: error
        });
        return;
      }

      console.log('✅ Upload réussi!', data);

      // Récupérer l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from('job-offers')
        .getPublicUrl(filePath);

      console.log('🔗 URL publique:', publicUrl);

      setUploadResult({
        success: true,
        path: data.path,
        publicUrl,
        fileName
      });

    } catch (error: any) {
      console.error('❌ Erreur:', error);
      setUploadResult({
        success: false,
        error: error.message || 'Erreur inconnue',
        details: error
      });
    } finally {
      setLoading(false);
    }
  };

  const checkBucket = async () => {
    try {
      console.log('🔍 Vérification du bucket job-offers...');
      const { supabase } = await import('@/lib/supabase');
      
      const { data, error } = await supabase.storage
        .from('job-offers')
        .list('offers', {
          limit: 10,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) {
        console.error('❌ Erreur:', error);
        alert(`Erreur: ${error.message}`);
        return;
      }

      console.log('✅ Fichiers dans le bucket:', data);
      alert(`Bucket OK! ${data.length} fichier(s) trouvé(s)`);
    } catch (error: any) {
      console.error('❌ Erreur:', error);
      alert(`Erreur: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🧪 Test Upload Image Supabase</h1>

        {/* Sélection fichier */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">1. Sélectionner une image</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          {preview && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Aperçu:</p>
              <img src={preview} alt="Preview" className="max-w-sm rounded border" />
              {file && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>Nom: {file.name}</p>
                  <p>Taille: {(file.size / 1024).toFixed(2)} KB</p>
                  <p>Type: {file.type}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Boutons d'action */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">2. Tester l'upload</h2>
          <div className="flex gap-4">
            <button
              onClick={testUpload}
              disabled={!file || loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Upload en cours...' : '📤 Tester Upload'}
            </button>
            <button
              onClick={checkBucket}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              🔍 Vérifier Bucket
            </button>
          </div>
        </div>

        {/* Résultat */}
        {uploadResult && (
          <div className={`rounded-lg shadow p-6 mb-6 ${
            uploadResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <h2 className="text-xl font-semibold mb-4">
              {uploadResult.success ? '✅ Upload Réussi!' : '❌ Erreur Upload'}
            </h2>

            {uploadResult.success ? (
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-green-700">Fichier uploadé:</p>
                  <p className="text-sm font-mono bg-white p-2 rounded">{uploadResult.fileName}</p>
                </div>
                <div>
                  <p className="font-semibold text-green-700">Chemin Supabase:</p>
                  <p className="text-sm font-mono bg-white p-2 rounded break-all">{uploadResult.path}</p>
                </div>
                <div>
                  <p className="font-semibold text-green-700">URL publique:</p>
                  <a 
                    href={uploadResult.publicUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-mono bg-white p-2 rounded block break-all text-blue-600 hover:underline"
                  >
                    {uploadResult.publicUrl}
                  </a>
                </div>
                <div className="mt-4">
                  <p className="font-semibold text-green-700 mb-2">Image uploadée:</p>
                  <img 
                    src={uploadResult.publicUrl} 
                    alt="Uploaded" 
                    className="max-w-md rounded border"
                    onError={(e) => {
                      e.currentTarget.src = '';
                      e.currentTarget.alt = '❌ Erreur de chargement';
                      e.currentTarget.className = 'p-4 bg-red-100 text-red-700 rounded';
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-red-700 font-semibold">Erreur: {uploadResult.error}</p>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-red-600 hover:text-red-800">
                    Voir les détails
                  </summary>
                  <pre className="mt-2 bg-white p-4 rounded text-xs overflow-auto">
                    {JSON.stringify(uploadResult.details, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold mb-2">📝 Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Sélectionnez une image</li>
            <li>Cliquez sur "Tester Upload"</li>
            <li>Ouvrez la console (F12) pour voir les logs détaillés</li>
            <li>Si succès → L'image s'affiche et vous avez l'URL</li>
            <li>Si erreur → Regardez le message d'erreur</li>
          </ol>

          <div className="mt-4 p-4 bg-white rounded">
            <p className="font-semibold mb-2">Erreurs courantes:</p>
            <ul className="text-sm space-y-1">
              <li>❌ <strong>"Bucket not found"</strong> → Le bucket 'job-offers' n'existe pas</li>
              <li>❌ <strong>"new row violates row-level security"</strong> → Politiques RLS trop restrictives</li>
              <li>❌ <strong>"Not authenticated"</strong> → Problème de clés Supabase</li>
            </ul>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex gap-4">
          <a href="/admin/offres" className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700">
            ← Retour Admin
          </a>
          <a href="/debug-offers" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700">
            🔍 Debug Offres
          </a>
        </div>
      </div>
    </div>
  );
}
