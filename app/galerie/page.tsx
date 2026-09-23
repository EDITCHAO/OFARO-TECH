'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FaSearch, FaTimes, FaDownload } from 'react-icons/fa';

interface MediaItem {
  id: number;
  file_name: string;
  original_name: string;
  file_url: string;
  file_size: number;
  width: number;
  height: number;
  alt_text: string;
  caption: string;
  category: string;
  created_at: string;
}

const CATEGORIES = [
  { value: 'all', label: 'Toutes' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'blog', label: 'Blog' },
  { value: 'team', label: 'Équipe' },
  { value: 'services', label: 'Services' },
  { value: 'icons', label: 'Icônes' },
  { value: 'banners', label: 'Bannières' },
  { value: 'autres', label: 'Autres' }
];

export default function GalleriePage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);

  // Load media items
  const loadMediaItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('media_library')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMediaItems(data || []);
      setFilteredItems(data || []);
    } catch (error) {
      console.error('Erreur chargement galerie:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMediaItems();
  }, []);

  // Filter items
  useEffect(() => {
    let filtered = [...mediaItems];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Galerie OFARO TECH
          </h1>
          <p className="text-xl text-orange-100">
            Découvrez nos projets, réalisations et créations
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
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
          <div className="mt-4 text-sm text-gray-600">
            {filteredItems.length} image{filteredItems.length > 1 ? 's' : ''} affichée{filteredItems.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Chargement...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Aucune image trouvée</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
              >
                {/* Image */}
                <div className="relative aspect-square bg-gray-100">
                  <img
                    src={item.file_url}
                    alt={item.alt_text || item.original_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-orange-600 text-white text-xs px-2 py-1 rounded">
                    {item.category}
                  </div>
                </div>

                {/* Caption */}
                {item.caption && (
                  <div className="p-4">
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
          >
            <FaTimes className="w-8 h-8" />
          </button>

          <div 
            className="relative max-w-6xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <img
              src={selectedImage.file_url}
              alt={selectedImage.alt_text || selectedImage.original_name}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />

            {/* Info */}
            <div className="bg-white rounded-lg p-6 mt-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {selectedImage.original_name}
              </h3>
              {selectedImage.caption && (
                <p className="text-gray-700 mb-4">{selectedImage.caption}</p>
              )}
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-semibold">Catégorie:</span> {selectedImage.category}
                </div>
                <div>
                  <span className="font-semibold">Dimensions:</span> {selectedImage.width} × {selectedImage.height} px
                </div>
              </div>

              {/* Download button */}
              <a
                href={selectedImage.file_url}
                download={selectedImage.original_name}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                <FaDownload />
                Télécharger
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
