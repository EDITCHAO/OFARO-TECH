'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  FaCamera, 
  FaTrash, 
  FaSearch,
  FaUpload,
  FaTimes,
  FaCopy,
  FaCheck
} from 'react-icons/fa';

interface MediaItem {
  id: number;
  file_name: string;
  original_name: string;
  file_url: string;
  file_size: number;
  mime_type: string;
  width: number;
  height: number;
  alt_text: string;
  caption: string;
  category: string;
  uploaded_by: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const CATEGORIES = [
  { value: 'all', label: 'Toutes catégories' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'blog', label: 'Blog' },
  { value: 'team', label: 'Équipe' },
  { value: 'services', label: 'Services' },
  { value: 'icons', label: 'Icônes' },
  { value: 'banners', label: 'Bannières' },
  { value: 'autres', label: 'Autres' }
];

export default function MediaLibraryPage() {
  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  
  // Upload form state
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadCategory, setUploadCategory] = useState('portfolio');
  const [uploadAltText, setUploadAltText] = useState('');
  const [uploadCaption, setUploadCaption] = useState('');

  // Load media items
  const loadMediaItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('media_library')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMediaItems(data || []);
      setFilteredItems(data || []);
    } catch (error) {
      console.error('Erreur chargement médiathèque:', error);
      alert('Erreur lors du chargement de la médiathèque');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMediaItems();
  }, []);

  // Filter items when search or category changes
  useEffect(() => {
    let filtered = [...mediaItems];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.original_name.toLowerCase().includes(term) ||
        item.alt_text?.toLowerCase().includes(term) ||
        item.caption?.toLowerCase().includes(term)
      );
    }

    setFilteredItems(filtered);
  }, [searchTerm, selectedCategory, mediaItems]);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const imageFiles = files.filter(file => file.type.startsWith('image/'));
      setUploadFiles(imageFiles);
    }
  };

  // Get image dimensions
  const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(file);
    });
  };

  // Upload images
  const handleUpload = async () => {
    if (uploadFiles.length === 0) {
      alert('Veuillez sélectionner au moins une image');
      return;
    }

    if (!uploadCategory) {
      alert('Veuillez sélectionner une catégorie');
      return;
    }

    try {
      setUploading(true);

      for (const file of uploadFiles) {
        // Get image dimensions
        const dimensions = await getImageDimensions(file);

        // Generate unique filename
        const timestamp = Date.now();
        const fileExt = file.name.split('.').pop();
        const fileName = `${uploadCategory}/${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('media-library')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('media-library')
          .getPublicUrl(fileName);

        // Save to database
        const { error: dbError } = await supabase
          .from('media_library')
          .insert({
            file_name: fileName,
            original_name: file.name,
            file_url: publicUrl,
            file_size: file.size,
            mime_type: file.type,
            width: dimensions.width,
            height: dimensions.height,
            alt_text: uploadAltText || file.name,
            caption: uploadCaption,
            category: uploadCategory,
            uploaded_by: 'Admin',
            is_active: true
          });

        if (dbError) throw dbError;
      }

      alert(`${uploadFiles.length} image(s) uploadée(s) avec succès !`);
      
      // Reset form
      setUploadFiles([]);
      setUploadCategory('portfolio');
      setUploadAltText('');
      setUploadCaption('');
      setShowUploadModal(false);
      
      // Reload media items
      loadMediaItems();
    } catch (error) {
      console.error('Erreur upload:', error);
      alert('Erreur lors de l\'upload des images');
    } finally {
      setUploading(false);
    }
  };

  // Delete media item
  const handleDelete = async (item: MediaItem) => {
    if (!confirm(`Supprimer l'image "${item.original_name}" ?`)) return;

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('media-library')
        .remove([item.file_name]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('media_library')
        .delete()
        .eq('id', item.id);

      if (dbError) throw dbError;

      alert('Image supprimée avec succès !');
      loadMediaItems();
    } catch (error) {
      console.error('Erreur suppression:', error);
      alert('Erreur lors de la suppression');
    }
  };

  // Copy URL to clipboard
  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (error) {
      console.error('Erreur copie:', error);
    }
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 flex items-center gap-3">
                <FaCamera className="w-10 h-10 text-primary-600" />
                Médiathèque Centralisée
              </h1>
              <p className="text-neutral-600 mt-2">
                Gérez toutes les images de votre site
              </p>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-lg"
            >
              <FaUpload className="w-5 h-5" />
              Uploader des images
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Rechercher une image..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Category filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Stats */}
            <div className="mt-4 flex gap-4 text-sm text-neutral-600">
              <span>Total: {mediaItems.length} images</span>
              <span>•</span>
              <span>Affichées: {filteredItems.length} images</span>
            </div>
          </div>
        </div>

        {/* Media Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-neutral-600 mt-4">Chargement...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <FaCamera className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-600 text-lg">Aucune image trouvée</p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
            >
              Uploader votre première image
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Image */}
                <div className="relative aspect-square bg-neutral-100">
                  <img
                    src={item.file_url}
                    alt={item.alt_text || item.original_name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                    {item.category}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-neutral-900 truncate" title={item.original_name}>
                    {item.original_name}
                  </h3>
                  
                  <div className="mt-2 space-y-1 text-xs text-neutral-600">
                    <p>📏 {item.width} × {item.height} px</p>
                    <p>💾 {formatFileSize(item.file_size)}</p>
                    <p>📅 {new Date(item.created_at).toLocaleDateString('fr-FR')}</p>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => copyToClipboard(item.file_url)}
                      className="flex-1 flex items-center justify-center gap-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-2 rounded text-sm transition-colors"
                      title="Copier l'URL"
                    >
                      {copiedUrl === item.file_url ? (
                        <>
                          <FaCheck className="w-4 h-4 text-success-600" />
                          <span className="text-success-600">Copié !</span>
                        </>
                      ) : (
                        <>
                          <FaCopy className="w-4 h-4" />
                          Copier URL
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="bg-danger-100 hover:bg-danger-200 text-danger-600 p-2 rounded transition-colors"
                      title="Supprimer"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
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
              <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                <h2 className="text-2xl font-bold text-neutral-900">Uploader des images</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* File Input */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Sélectionner les images *
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="block w-full text-sm text-neutral-900 border border-neutral-300 rounded-lg cursor-pointer bg-neutral-50 focus:outline-none"
                  />
                  {uploadFiles.length > 0 && (
                    <p className="mt-2 text-sm text-neutral-600">
                      {uploadFiles.length} fichier(s) sélectionné(s)
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Catégorie *
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    {CATEGORIES.filter(cat => cat.value !== 'all').map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Alt Text */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Texte alternatif (optionnel)
                  </label>
                  <input
                    type="text"
                    value={uploadAltText}
                    onChange={(e) => setUploadAltText(e.target.value)}
                    placeholder="Description de l'image pour l'accessibilité"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Caption */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Légende (optionnel)
                  </label>
                  <textarea
                    value={uploadCaption}
                    onChange={(e) => setUploadCaption(e.target.value)}
                    placeholder="Légende ou description détaillée"
                    rows={3}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Preview */}
                {uploadFiles.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Aperçu
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {Array.from(uploadFiles).slice(0, 6).map((file, index) => (
                        <div key={index} className="aspect-square bg-neutral-100 rounded-lg overflow-hidden">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    {uploadFiles.length > 6 && (
                      <p className="text-sm text-neutral-600 mt-2">
                        + {uploadFiles.length - 6} autre(s) image(s)
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-neutral-200 bg-neutral-50">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-6 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors"
                  disabled={uploading}
                >
                  Annuler
                </button>
                <button
                  onClick={handleUpload}
                  disabled={uploading || uploadFiles.length === 0}
                  className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Upload en cours...
                    </>
                  ) : (
                    <>
                      <FaUpload className="w-5 h-5" />
                      Uploader {uploadFiles.length > 0 && `(${uploadFiles.length})`}
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
