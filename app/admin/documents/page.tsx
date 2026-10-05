'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  FaFolder,
  FaTrash, 
  FaSearch,
  FaUpload,
  FaTimes,
  FaDownload,
  FaFilePdf,
  FaFileExcel,
  FaFileWord,
  FaFile,
  FaEye
} from 'react-icons/fa';

interface DocumentItem {
  id: number;
  file_name: string;
  original_name: string;
  file_url: string;
  file_size: number;
  file_type: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  download_count: number;
  uploaded_by: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const CATEGORIES = [
  { value: 'all', label: 'Toutes catégories' },
  { value: 'brochures', label: 'Brochures' },
  { value: 'guides', label: 'Guides' },
  { value: 'cahiers-charges', label: 'Cahiers de charges' },
  { value: 'devis', label: 'Devis' },
  { value: 'contrats', label: 'Contrats' },
  { value: 'factures', label: 'Factures' },
  { value: 'offres', label: 'Offres commerciales' },
  { value: 'rapports', label: 'Rapports' },
  { value: 'presentations', label: 'Présentations' },
  { value: 'autres', label: 'Autres' }
];

export default function DocumentsLibraryPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // Upload form state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadCategory, setUploadCategory] = useState('brochures');
  const [uploadTags, setUploadTags] = useState('');

  // Load documents
  const loadDocuments = async () => {
    try {
      setLoading(true);
      console.log('🔍 Chargement des documents...');
      
      const { data, error } = await supabase
        .from('documents_library')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('📊 Résultat de la requête:', { data, error });
      
      if (error) {
        console.error('❌ Erreur SQL:', error);
        throw error;
      }
      
      console.log(`✅ ${data?.length || 0} document(s) chargé(s)`);
      setDocuments(data || []);
      setFilteredDocs(data || []);
    } catch (error) {
      console.error('❌ Erreur chargement documents:', error);
      alert('Erreur lors du chargement des documents. Vérifiez la console.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  // Filter documents
  useEffect(() => {
    let filtered = [...documents];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(doc => doc.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(term) ||
        doc.description?.toLowerCase().includes(term) ||
        doc.original_name.toLowerCase().includes(term) ||
        doc.tags?.some(tag => tag.toLowerCase().includes(term))
      );
    }

    setFilteredDocs(filtered);
  }, [searchTerm, selectedCategory, documents]);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Accepter PDF, Excel, Word
      const allowedTypes = [
        'application/pdf',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (allowedTypes.includes(file.type)) {
        setUploadFile(file);
        // Auto-remplir le titre avec le nom du fichier
        if (!uploadTitle) {
          setUploadTitle(file.name.replace(/\.[^/.]+$/, ""));
        }
      } else {
        alert('Type de fichier non supporté. Veuillez uploader un PDF, Excel ou Word.');
      }
    }
  };

  // Upload document
  const handleUpload = async () => {
    if (!uploadFile) {
      alert('Veuillez sélectionner un fichier');
      return;
    }

    if (!uploadTitle.trim()) {
      alert('Veuillez saisir un titre');
      return;
    }

    try {
      setUploading(true);

      // Generate unique filename
      const timestamp = Date.now();
      const fileExt = uploadFile.name.split('.').pop();
      const fileName = `${uploadCategory}/${timestamp}-${uploadFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents-library')
        .upload(fileName, uploadFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents-library')
        .getPublicUrl(fileName);

      // Parse tags
      const tagsArray = uploadTags.split(',').map(tag => tag.trim()).filter(tag => tag);

      // Save to database
      const { error: dbError } = await supabase
        .from('documents_library')
        .insert({
          file_name: fileName,
          original_name: uploadFile.name,
          file_url: publicUrl,
          file_size: uploadFile.size,
          file_type: uploadFile.type,
          title: uploadTitle,
          description: uploadDescription,
          category: uploadCategory,
          tags: tagsArray,
          uploaded_by: 'Admin',
          download_count: 0,
          is_active: true
        });

      if (dbError) throw dbError;

      alert('Document uploadé avec succès !');
      
      // Reset form
      setUploadFile(null);
      setUploadTitle('');
      setUploadDescription('');
      setUploadCategory('brochures');
      setUploadTags('');
      setShowUploadModal(false);
      
      // Reload documents
      loadDocuments();
    } catch (error) {
      console.error('Erreur upload:', error);
      alert('Erreur lors de l\'upload du document');
    } finally {
      setUploading(false);
    }
  };

  // Delete document
  const handleDelete = async (doc: DocumentItem) => {
    if (!confirm(`Supprimer définitivement "${doc.title}" ?`)) return;

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('documents-library')
        .remove([doc.file_name]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('documents_library')
        .delete()
        .eq('id', doc.id);

      if (dbError) throw dbError;

      alert('Document supprimé avec succès !');
      loadDocuments();
    } catch (error) {
      console.error('Erreur suppression:', error);
      alert('Erreur lors de la suppression');
    }
  };

  // Increment download count
  const handleDownload = async (doc: DocumentItem) => {
    try {
      // Increment counter
      await supabase
        .from('documents_library')
        .update({ download_count: doc.download_count + 1 })
        .eq('id', doc.id);

      // Télécharger le fichier (au lieu de l'ouvrir)
      const response = await fetch(doc.file_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = doc.original_name; // Nom original du fichier
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // Reload to update count
      loadDocuments();
    } catch (error) {
      console.error('Erreur téléchargement:', error);
      alert('Erreur lors du téléchargement');
    }
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Get file icon
  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return <FaFilePdf className="text-red-600" />;
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return <FaFileExcel className="text-green-600" />;
    if (fileType.includes('word') || fileType.includes('document')) return <FaFileWord className="text-blue-600" />;
    return <FaFile className="text-gray-600" />;
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <FaFolder className="w-10 h-10 text-orange-600" />
                Bibliothèque de documents
              </h1>
              <p className="text-gray-600 mt-2">
                Gérez vos documents PDF, Excel, Word
              </p>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors shadow-lg"
            >
              <FaUpload className="w-5 h-5" />
              Uploader un document
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un document..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Category filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Stats */}
            <div className="mt-4 flex gap-4 text-sm text-gray-600">
              <span>Total: {documents.length} documents</span>
              <span>•</span>
              <span>Affichés: {filteredDocs.length} documents</span>
            </div>
          </div>
        </div>

        {/* Documents List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Chargement...</p>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <FaFolder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Aucun document trouvé</p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="mt-4 text-orange-600 hover:text-orange-700 font-medium"
            >
              Uploader votre premier document
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">
                    {getFileIcon(doc.file_type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {doc.original_name}
                    </p>
                    {doc.description && (
                      <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                        {doc.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Tags */}
                {doc.tags && doc.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {doc.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Info */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-gray-600">
                  <div>
                    <span className="font-semibold">Taille:</span><br/>
                    {formatFileSize(doc.file_size)}
                  </div>
                  <div>
                    <span className="font-semibold">Catégorie:</span><br/>
                    {doc.category}
                  </div>
                  <div>
                    <span className="font-semibold">Téléchargements:</span><br/>
                    {doc.download_count}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownload(doc)}
                    className="flex-1 flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded text-sm transition-colors"
                  >
                    <FaDownload className="w-4 h-4" />
                    Télécharger
                  </button>
                  <button
                    onClick={() => window.open(doc.file_url, '_blank')}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded transition-colors"
                    title="Voir"
                  >
                    <FaEye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(doc)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded transition-colors"
                    title="Supprimer"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-gray-500 mt-3">
                  Ajouté le {new Date(doc.created_at).toLocaleDateString('fr-FR')}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Uploader un document</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* File Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sélectionner le fichier * (PDF, Excel, Word)
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.xlsx,.xls,.docx,.doc"
                    onChange={handleFileSelect}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  />
                  {uploadFile && (
                    <p className="mt-2 text-sm text-gray-600">
                      Fichier sélectionné: {uploadFile.name} ({formatFileSize(uploadFile.size)})
                    </p>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre du document *
                  </label>
                  <input
                    type="text"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="Ex: Plaquette Institutionnelle OFARO TECH 2026"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie *
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  >
                    {CATEGORIES.filter(cat => cat.value !== 'all').map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (optionnel)
                  </label>
                  <textarea
                    value={uploadDescription}
                    onChange={(e) => setUploadDescription(e.target.value)}
                    placeholder="Description du document"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (optionnel, séparés par des virgules)
                  </label>
                  <input
                    type="text"
                    value={uploadTags}
                    onChange={(e) => setUploadTags(e.target.value)}
                    placeholder="Ex: présentation, services, 2026"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  disabled={uploading}
                >
                  Annuler
                </button>
                <button
                  onClick={handleUpload}
                  disabled={uploading || !uploadFile || !uploadTitle.trim()}
                  className="flex items-center gap-2 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Upload en cours...
                    </>
                  ) : (
                    <>
                      <FaUpload className="w-5 h-5" />
                      Uploader
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
