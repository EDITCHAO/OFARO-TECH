'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import AdminLayout from '@/components/admin/AdminLayout';
import Cropper from 'react-easy-crop';
import { getCroppedImg, readFile, blobToFile } from '@/lib/image-crop-utils';
import { 
  FaStar, 
  FaTrash, 
  FaSearch,
  FaPlus,
  FaTimes,
  FaEdit,
  FaCheck,
  FaEye,
  FaEyeSlash,
  FaCrop
} from 'react-icons/fa';

interface Testimonial {
  id: number;
  client_name: string;
  client_position: string;
  client_company: string;
  client_photo_url: string | null;
  testimonial_text: string;
  rating: number;
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function TestimonialsPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Upload form state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  // Image cropping state
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [showCropModal, setShowCropModal] = useState(false);
  
  const [formData, setFormData] = useState({
    client_name: '',
    client_position: '',
    client_company: '',
    client_photo_url: '',
    testimonial_text: '',
    rating: 5,
    is_featured: false,
    is_active: true
  });

  // Load testimonials
  const loadTestimonials = async () => {
    try {
      setLoading(true);
      console.log('🔍 Chargement des témoignages...');
      
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true });

      console.log('📊 Résultat:', { data, error });
      
      if (error) throw error;
      
      console.log(`✅ ${data?.length || 0} témoignage(s) chargé(s)`);
      setTestimonials(data || []);
      setFilteredTestimonials(data || []);
    } catch (error) {
      console.error('❌ Erreur chargement témoignages:', error);
      alert('Erreur lors du chargement des témoignages. Vérifiez la console.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  // Filter testimonials
  useEffect(() => {
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const filtered = testimonials.filter(t => 
        t.client_name.toLowerCase().includes(term) ||
        t.client_company.toLowerCase().includes(term) ||
        t.client_position.toLowerCase().includes(term) ||
        t.testimonial_text.toLowerCase().includes(term)
      );
      setFilteredTestimonials(filtered);
    } else {
      setFilteredTestimonials(testimonials);
    }
  }, [searchTerm, testimonials]);

  // Open modal for add/edit
  const openModal = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingId(testimonial.id);
      setFormData({
        client_name: testimonial.client_name,
        client_position: testimonial.client_position,
        client_company: testimonial.client_company,
        client_photo_url: testimonial.client_photo_url || '',
        testimonial_text: testimonial.testimonial_text,
        rating: testimonial.rating,
        is_featured: testimonial.is_featured,
        is_active: testimonial.is_active
      });
      setUploadPreview(testimonial.client_photo_url);
    } else {
      setEditingId(null);
      setFormData({
        client_name: '',
        client_position: '',
        client_company: '',
        client_photo_url: '',
        testimonial_text: '',
        rating: 5,
        is_featured: false,
        is_active: true
      });
      setUploadPreview(null);
    }
    setUploadFile(null);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setUploadFile(null);
    setUploadPreview(null);
    setFormData({
      client_name: '',
      client_position: '',
      client_company: '',
      client_photo_url: '',
      testimonial_text: '',
      rating: 5,
      is_featured: false,
      is_active: true
    });
  };

  // Handle photo selection
  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image valide (JPG, PNG, etc.)');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La taille de l\'image ne doit pas dépasser 5 MB');
        return;
      }
      
      try {
        const imageDataUrl = await readFile(file);
        setImageToCrop(imageDataUrl);
        setShowCropModal(true);
      } catch (error) {
        console.error('Erreur lecture fichier:', error);
        alert('Erreur lors de la lecture du fichier');
      }
    }
  };

  // Handle crop complete
  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Apply crop and close modal
  const handleApplyCrop = async () => {
    if (!imageToCrop || !croppedAreaPixels) return;

    try {
      const croppedBlob = await getCroppedImg(imageToCrop, croppedAreaPixels, 512);
      const croppedFile = blobToFile(croppedBlob, 'photo-recadree.jpg');
      
      setUploadFile(croppedFile);
      
      // Create preview
      const previewUrl = URL.createObjectURL(croppedBlob);
      setUploadPreview(previewUrl);
      
      // Close crop modal
      setShowCropModal(false);
      setImageToCrop(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    } catch (error) {
      console.error('Erreur recadrage:', error);
      alert('Erreur lors du recadrage de l\'image');
    }
  };

  // Cancel crop
  const handleCancelCrop = () => {
    setShowCropModal(false);
    setImageToCrop(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  // Save testimonial
  const handleSave = async () => {
    if (!formData.client_name.trim() || !formData.client_company.trim() || !formData.testimonial_text.trim()) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      setUploading(true);
      let photoUrl = formData.client_photo_url;

      // Upload photo if a new one is selected
      if (uploadFile) {
        const timestamp = Date.now();
        const fileExt = uploadFile.name.split('.').pop();
        // Nettoyer le nom : supprimer accents et caractères spéciaux
        const cleanName = formData.client_name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
          .replace(/[^a-zA-Z0-9]/g, '-')   // Remplacer caractères spéciaux par -
          .replace(/-+/g, '-')              // Supprimer doubles tirets
          .toLowerCase();
        const fileName = `${timestamp}-${cleanName}.${fileExt}`;

        console.log('📤 Upload vers:', fileName);

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('testimonials-photos')
          .upload(fileName, uploadFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('testimonials-photos')
          .getPublicUrl(fileName);

        photoUrl = publicUrl;

        // Delete old photo if exists and we're editing
        if (editingId && formData.client_photo_url) {
          const oldFileName = formData.client_photo_url.split('/').pop();
          if (oldFileName) {
            await supabase.storage
              .from('testimonials-photos')
              .remove([oldFileName]);
          }
        }
      }

      const dataToSave = {
        ...formData,
        client_photo_url: photoUrl || null
      };

      if (editingId) {
        // Update
        const { error } = await supabase
          .from('testimonials')
          .update(dataToSave)
          .eq('id', editingId);

        if (error) throw error;
        alert('Témoignage modifié avec succès !');
      } else {
        // Insert
        const { error } = await supabase
          .from('testimonials')
          .insert([dataToSave]);

        if (error) throw error;
        alert('Témoignage ajouté avec succès !');
      }

      loadTestimonials();
      closeModal();
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setUploading(false);
    }
  };

  // Delete testimonial
  const handleDelete = async (id: number, clientName: string) => {
    if (!confirm(`Voulez-vous vraiment supprimer le témoignage de ${clientName} ?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      alert('Témoignage supprimé avec succès !');
      loadTestimonials();
    } catch (error) {
      console.error('Erreur suppression:', error);
      alert('Erreur lors de la suppression');
    }
  };

  // Toggle active status
  const toggleActive = async (id: number, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      
      loadTestimonials();
    } catch (error) {
      console.error('Erreur toggle active:', error);
      alert('Erreur lors du changement de statut');
    }
  };

  // Toggle featured status
  const toggleFeatured = async (id: number, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_featured: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      
      loadTestimonials();
    } catch (error) {
      console.error('Erreur toggle featured:', error);
      alert('Erreur lors du changement de statut');
    }
  };

  // Render stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <FaStar 
            key={star}
            className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <AdminLayout activeMenu="temoignages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <FaStar className="w-10 h-10 text-orange-600" />
                Témoignages & Avis Clients
              </h1>
              <p className="text-gray-600 mt-2">
                Gérez les témoignages affichés sur votre site
              </p>
            </div>
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors shadow-lg"
            >
              <FaPlus className="w-5 h-5" />
              Ajouter un témoignage
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <p className="text-gray-600 text-sm">Total</p>
              <p className="text-2xl font-bold text-gray-900">{testimonials.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <p className="text-gray-600 text-sm">Actifs</p>
              <p className="text-2xl font-bold text-green-600">
                {testimonials.filter(t => t.is_active).length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <p className="text-gray-600 text-sm">En avant</p>
              <p className="text-2xl font-bold text-orange-600">
                {testimonials.filter(t => t.is_featured).length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <p className="text-gray-600 text-sm">Note moyenne</p>
              <p className="text-2xl font-bold text-yellow-600">
                {testimonials.length > 0 
                  ? (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)
                  : '0'} / 5
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, entreprise ou contenu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des témoignages...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredTestimonials.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <FaStar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun témoignage trouvé</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Aucun résultat pour votre recherche' : 'Commencez par ajouter votre premier témoignage'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => openModal()}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Ajouter un témoignage
              </button>
            )}
          </div>
        )}

        {/* Testimonials Grid */}
        {!loading && filteredTestimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={`bg-white rounded-lg shadow-md border-2 p-6 transition-all hover:shadow-lg ${
                  testimonial.is_featured 
                    ? 'border-orange-400 bg-orange-50' 
                    : testimonial.is_active
                    ? 'border-gray-200'
                    : 'border-gray-200 opacity-60'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    {/* Photo */}
                    {testimonial.client_photo_url ? (
                      <img 
                        src={testimonial.client_photo_url} 
                        alt={testimonial.client_name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-orange-200"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-lg flex-shrink-0">
                        {testimonial.client_name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-lg truncate">{testimonial.client_name}</h3>
                      <p className="text-sm text-gray-600 truncate">{testimonial.client_position}</p>
                      <p className="text-sm text-orange-600 font-medium truncate">{testimonial.client_company}</p>
                    </div>
                  </div>
                  {testimonial.is_featured && (
                    <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full flex-shrink-0">
                      ⭐ En avant
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 text-sm italic mb-4 line-clamp-4">
                  "{testimonial.testimonial_text}"
                </p>

                {/* Actions */}
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => toggleFeatured(testimonial.id, testimonial.is_featured)}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
                      testimonial.is_featured
                        ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    title={testimonial.is_featured ? 'Retirer de la mise en avant' : 'Mettre en avant'}
                  >
                    <FaStar className="w-4 h-4" />
                    {testimonial.is_featured ? 'En avant' : 'Promouvoir'}
                  </button>
                  <button
                    onClick={() => toggleActive(testimonial.id, testimonial.is_active)}
                    className={`p-2 rounded transition-colors ${
                      testimonial.is_active
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    title={testimonial.is_active ? 'Désactiver' : 'Activer'}
                  >
                    {testimonial.is_active ? <FaEye className="w-4 h-4" /> : <FaEyeSlash className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => openModal(testimonial)}
                    className="p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                    title="Modifier"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id, testimonial.client_name)}
                    className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                    title="Supprimer"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>

                {/* Meta info */}
                <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                  Ajouté le {new Date(testimonial.created_at).toLocaleDateString('fr-FR')}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Add/Edit */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingId ? 'Modifier le témoignage' : 'Ajouter un témoignage'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photo du client (optionnel)
                  </label>
                  <div className="flex items-center gap-4">
                    {/* Preview */}
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      {uploadPreview ? (
                        <img src={uploadPreview} alt="Aperçu" className="w-full h-full object-cover" />
                      ) : formData.client_name ? (
                        <span className="text-2xl font-bold text-orange-600">
                          {formData.client_name.charAt(0).toUpperCase()}
                        </span>
                      ) : (
                        <span className="text-gray-400">?</span>
                      )}
                    </div>
                    {/* Upload Button */}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoSelect}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
                      >
                        <FaPlus className="w-4 h-4" />
                        Choisir une photo
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        JPG, PNG (max 5 MB)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Client Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du client *
                  </label>
                  <input
                    type="text"
                    value={formData.client_name}
                    onChange={(e) => setFormData({...formData, client_name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Dr. Kofi MENSAH"
                  />
                </div>

                {/* Client Position */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Poste/Fonction *
                  </label>
                  <input
                    type="text"
                    value={formData.client_position}
                    onChange={(e) => setFormData({...formData, client_position: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Directeur Général"
                  />
                </div>

                {/* Client Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Entreprise *
                  </label>
                  <input
                    type="text"
                    value={formData.client_company}
                    onChange={(e) => setFormData({...formData, client_company: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Hôpital Central de Lomé"
                  />
                </div>

                {/* Testimonial Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Témoignage *
                  </label>
                  <textarea
                    value={formData.testimonial_text}
                    onChange={(e) => setFormData({...formData, testimonial_text: e.target.value})}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="OFARO TECH a transformé notre gestion..."
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note (sur 5) *
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({...formData, rating: star})}
                        className="focus:outline-none"
                      >
                        <FaStar 
                          className={`w-8 h-8 transition-colors ${
                            star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                      className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">Mettre en avant sur la page d'accueil</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                      className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">Actif</span>
                  </label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
                >
                  <FaCheck className="w-4 h-4" />
                  {editingId ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Crop Modal */}
        {showCropModal && imageToCrop && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8 flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FaCrop className="text-orange-600" />
                  Recadrer la photo
                </h2>
                <button
                  onClick={handleCancelCrop}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              {/* Crop Area */}
              <div className="relative bg-gray-900" style={{ height: '400px' }}>
                <Cropper
                  image={imageToCrop}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>

              {/* Controls */}
              <div className="p-4 border-t border-gray-200 space-y-3">
                {/* Zoom Slider */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zoom
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-800">
                    <strong>Instructions :</strong> Déplacez l'image pour la positionner • Utilisez le zoom • Format carré automatique
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={handleCancelCrop}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleApplyCrop}
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 font-medium"
                  >
                    <FaCheck className="w-4 h-4" />
                    Appliquer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
