'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaSearch,
  FaCog, FaTimes, FaSave, FaArrowUp, FaArrowDown, FaStar,
  FaCloudUploadAlt, FaImage, FaCheck, FaLink
} from 'react-icons/fa';
import {
  FaLaptopCode, FaCode, FaMobileAlt, FaDesktop, FaPalette,
  FaNetworkWired, FaShieldAlt, FaTools, FaServer, FaChartLine,
  FaGlobe, FaBullhorn, FaDatabase, FaCloud, FaBolt
} from 'react-icons/fa';
import AdminLayout from '@/components/admin/AdminLayout';

// ————————————————————————————————————————————
// Types
// ————————————————————————————————————————————
interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string | null;
  icon: string;
  image_url: string | null;
  features: string[];
  category: string | null;
  display_order: number;
  is_published: boolean;
  is_featured: boolean;
  color_accent: string | null;
  created_at: string;
  updated_at: string;
}

interface FormState {
  title: string;
  slug: string;
  short_description: string;
  description: string;
  icon: string;
  image_url: string;
  features: string[];
  category: string;
  display_order: number;
  is_published: boolean;
  is_featured: boolean;
  color_accent: string;
}

// ————————————————————————————————————————————
// Icônes disponibles
// ————————————————————————————————————————————
const ICON_OPTIONS = [
  { value: 'FaLaptopCode', label: 'Ordinateur', icon: <FaLaptopCode /> },
  { value: 'FaCode', label: 'Code', icon: <FaCode /> },
  { value: 'FaMobileAlt', label: 'Mobile', icon: <FaMobileAlt /> },
  { value: 'FaDesktop', label: 'Bureau', icon: <FaDesktop /> },
  { value: 'FaPalette', label: 'Design', icon: <FaPalette /> },
  { value: 'FaNetworkWired', label: 'Réseau', icon: <FaNetworkWired /> },
  { value: 'FaShieldAlt', label: 'Sécurité', icon: <FaShieldAlt /> },
  { value: 'FaTools', label: 'Maintenance', icon: <FaTools /> },
  { value: 'FaServer', label: 'Serveur', icon: <FaServer /> },
  { value: 'FaChartLine', label: 'Conseil', icon: <FaChartLine /> },
  { value: 'FaGlobe', label: 'Web', icon: <FaGlobe /> },
  { value: 'FaBullhorn', label: 'Marketing', icon: <FaBullhorn /> },
  { value: 'FaDatabase', label: 'Données', icon: <FaDatabase /> },
  { value: 'FaCloud', label: 'Cloud', icon: <FaCloud /> },
  { value: 'FaBolt', label: 'Énergie', icon: <FaBolt /> },
];

const iconMap: { [key: string]: JSX.Element } = {
  FaLaptopCode: <FaLaptopCode />,
  FaCode: <FaCode />,
  FaMobileAlt: <FaMobileAlt />,
  FaDesktop: <FaDesktop />,
  FaPalette: <FaPalette />,
  FaNetworkWired: <FaNetworkWired />,
  FaShieldAlt: <FaShieldAlt />,
  FaTools: <FaTools />,
  FaServer: <FaServer />,
  FaChartLine: <FaChartLine />,
  FaGlobe: <FaGlobe />,
  FaBullhorn: <FaBullhorn />,
  FaDatabase: <FaDatabase />,
  FaCloud: <FaCloud />,
  FaBolt: <FaBolt />,
};

// ————————————————————————————————————————————
// Helpers
// ————————————————————————————————————————————
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const EMPTY_FORM: FormState = {
  title: '',
  slug: '',
  short_description: '',
  description: '',
  icon: 'FaCode',
  image_url: '',
  features: [],
  category: '',
  display_order: 0,
  is_published: true,
  is_featured: false,
  color_accent: '',
};

// ————————————————————————————————————————————
// Composant principal
// ————————————————————————————————————————————
export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<FormState>(EMPTY_FORM);
  const [featureInput, setFeatureInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [saving, setSaving] = useState(false);

  // Upload d'image
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ————————————————
  // Chargement
  // ————————————————
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/services?admin=true');
      const json = await res.json();
      if (res.ok && Array.isArray(json.services)) {
        setServices(json.services);
      } else {
        showToast(json.error || 'Erreur lors du chargement des services', 'error');
      }
    } catch {
      showToast('Erreur réseau lors du chargement', 'error');
    } finally {
      setLoading(false);
    }
  };

  // ————————————————
  // Toast
  // ————————————————
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // ————————————————
  // Modal
  // ————————————————
  const openModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title,
        slug: service.slug,
        short_description: service.short_description || '',
        description: service.description || '',
        icon: service.icon || 'FaCode',
        image_url: service.image_url || '',
        features: Array.isArray(service.features) ? [...service.features] : [],
        category: service.category || '',
        display_order: service.display_order ?? 0,
        is_published: service.is_published ?? true,
        is_featured: service.is_featured ?? false,
        color_accent: service.color_accent || '',
      });
      setImagePreview(service.image_url || '');
    } else {
      setEditingService(null);
      setFormData({ ...EMPTY_FORM, display_order: services.length + 1 });
      setImagePreview('');
    }
    setUploadFile(null);
    setFeatureInput('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
    setFormData(EMPTY_FORM);
    setFeatureInput('');
    setUploadFile(null);
    setImagePreview('');
  };

  // ————————————————
  // Gestion de l'image
  // ————————————————
  const handleFileSelect = (file: File | undefined) => {
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      showToast("Format non supporté. Utilisez PNG, JPG, SVG ou WebP", 'error');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast("Fichier trop volumineux. Taille maximale : 5 MB", 'error');
      return;
    }

    setUploadFile(file);
    // Aperçu local uniquement — on NE stocke PAS le base64 dans formData.image_url
    // L'URL Supabase réelle sera obtenue lors du submit via /api/services/upload
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setUploadFile(null);
    setImagePreview('');
    // On efface aussi l'URL existante dans le formulaire
    setFormData(f => ({ ...f, image_url: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ————————————————
  // Gestion features
  // ————————————————
  const addFeature = () => {
    const trimmed = featureInput.trim();
    if (trimmed && !formData.features.includes(trimmed)) {
      setFormData(f => ({ ...f, features: [...f.features, trimmed] }));
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(f => ({ ...f, features: f.features.filter((_, i) => i !== index) }));
  };

  // ————————————————
  // Soumettre
  // ————————————————
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      showToast('Titre et description sont requis', 'error');
      return;
    }

    setSaving(true);
    try {
      // L'image_url de départ : celle déjà en base (ne jamais envoyer de base64)
      let finalImageUrl: string | null = formData.image_url.startsWith('data:')
        ? null
        : formData.image_url || null;

      // Si un nouveau fichier a été sélectionné, on l'upload vers Supabase d'abord
      if (uploadFile) {
        setUploadingImage(true);
        const uploadFormData = new FormData();
        uploadFormData.append('file', uploadFile);

        const uploadResponse = await fetch('/api/services/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(uploadData.error || "Erreur lors de l'upload de l'image");
        }

        finalImageUrl = uploadData.image_url;
        setUploadingImage(false);
      }

      const payload = {
        title: formData.title,
        slug: formData.slug || slugify(formData.title),
        description: formData.description,
        short_description: formData.short_description || null,
        icon: formData.icon,
        image_url: finalImageUrl,
        features: formData.features,
        category: formData.category || null,
        display_order: formData.display_order,
        is_published: formData.is_published,
        is_featured: formData.is_featured,
        color_accent: formData.color_accent || null,
      };

      let res: Response;
      if (editingService) {
        res = await fetch(`/api/services/${editingService.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const json = await res.json();
      if (res.ok) {
        showToast(editingService ? 'Service mis à jour ✓' : 'Service créé ✓', 'success');
        closeModal();
        fetchServices();
      } else {
        showToast(json.error || 'Erreur lors de la sauvegarde', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Erreur réseau', 'error');
    } finally {
      setSaving(false);
      setUploadingImage(false);
    }
  };

  // ————————————————
  // Supprimer
  // ————————————————
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Supprimer le service « ${title} » ?\n\nCette action est irréversible.`)) return;

    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (res.ok) {
        showToast('Service supprimé', 'success');
        fetchServices();
      } else {
        showToast(json.error || 'Erreur lors de la suppression', 'error');
      }
    } catch {
      showToast('Erreur réseau', 'error');
    }
  };

  // ————————————————
  // Toggle publié
  // ————————————————
  const togglePublished = async (service: Service) => {
    try {
      const res = await fetch(`/api/services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...service, is_published: !service.is_published }),
      });
      const json = await res.json();
      if (res.ok) {
        showToast(`Service ${!service.is_published ? 'publié' : 'masqué'}`, 'success');
        fetchServices();
      } else {
        showToast(json.error || 'Erreur', 'error');
      }
    } catch {
      showToast('Erreur réseau', 'error');
    }
  };

  // ————————————————
  // Toggle mis en avant
  // ————————————————
  const toggleFeatured = async (service: Service) => {
    try {
      const res = await fetch(`/api/services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...service, is_featured: !service.is_featured }),
      });
      const json = await res.json();
      if (res.ok) {
        showToast(`Service ${!service.is_featured ? 'mis en avant' : 'retiré de la une'}`, 'success');
        fetchServices();
      } else {
        showToast(json.error || 'Erreur', 'error');
      }
    } catch {
      showToast('Erreur réseau', 'error');
    }
  };

  // ————————————————
  // Réordonner
  // ————————————————
  const moveOrder = async (id: string, direction: 'up' | 'down') => {
    const index = services.findIndex(s => s.id === id);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === services.length - 1) return;

    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    const s1 = services[index];
    const s2 = services[swapIndex];

    try {
      await Promise.all([
        fetch(`/api/services/${s1.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...s1, display_order: s2.display_order }),
        }),
        fetch(`/api/services/${s2.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...s2, display_order: s1.display_order }),
        }),
      ]);
      fetchServices();
    } catch {
      showToast('Erreur lors de la réorganisation', 'error');
    }
  };

  // ————————————————
  // Filtre
  // ————————————————
  const filtered = services.filter(s =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCount = services.filter(s => s.is_published).length;
  const inactiveCount = services.length - activeCount;

  // ————————————————
  // Render
  // ————————————————
  return (
    <AdminLayout activeMenu="services">
      {/* Toast */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white flex items-center gap-3 ${
          toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {toastType === 'success' ? <FaCheck /> : <FaTimes />}
          {toastMessage}
        </div>
      )}

      <div className="min-h-full bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <FaCog className="w-6 h-6 text-orange-600" />
                  Gestion des {services.length} Services
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {activeCount} actifs · {inactiveCount} inactifs
                </p>
              </div>
              <button
                onClick={() => openModal()}
                className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-all font-medium shadow-sm"
              >
                <FaPlus className="w-4 h-4" />
                Ajouter un service
              </button>
            </div>

            {/* Recherche */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un service..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Contenu */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <FaCog className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun service trouvé</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm ? 'Aucun service ne correspond à votre recherche' : 'Ajoutez votre premier service'}
              </p>
              <button
                onClick={() => openModal()}
                className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-all font-medium"
              >
                <FaPlus className="w-4 h-4" />
                Ajouter un service
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((service, index) => (
                <div
                  key={service.id}
                  className={`bg-white rounded-xl shadow-sm border-2 transition-all hover:shadow-md ${
                    service.is_published ? 'border-green-100' : 'border-gray-100 opacity-75'
                  }`}
                >
                  {/* Card header avec image de fond */}
                  <div className="relative h-32 overflow-hidden rounded-t-xl bg-gradient-to-br from-orange-100 to-amber-50">
                    {service.image_url ? (
                      <img
                        src={service.image_url}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-orange-200 text-5xl">
                        {iconMap[service.icon] || <FaCode />}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {/* Badge statut */}
                    <span className={`absolute top-3 right-3 flex-shrink-0 text-xs px-2 py-1 rounded-full font-medium ${
                      service.is_published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {service.is_published ? 'Publié' : 'Brouillon'}
                    </span>
                    {/* Badge mis en avant */}
                    {service.is_featured && (
                      <span className="absolute top-3 left-3 text-xs px-2 py-1 rounded-full font-medium bg-amber-400 text-amber-900 flex items-center gap-1">
                        <FaStar className="w-3 h-3" /> À la une
                      </span>
                    )}
                  </div>

                  {/* Titre + slug */}
                  <div className="p-5 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 text-xl flex-shrink-0">
                        {iconMap[service.icon] || <FaCode />}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight truncate">
                          {service.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5 font-mono truncate flex items-center gap-1">
                          <FaLink className="w-2.5 h-2.5" />
                          /services/{service.slug}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="px-5 py-3">
                    <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
                  </div>

                  {/* Features */}
                  {service.features.length > 0 && (
                    <div className="px-5 pb-3">
                      <div className="flex flex-wrap gap-1">
                        {service.features.slice(0, 3).map((f, i) => (
                          <span key={i} className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">
                            {f}
                          </span>
                        ))}
                        {service.features.length > 3 && (
                          <span className="text-xs text-gray-400">+{service.features.length - 3}</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
                    {/* Réordonner */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveOrder(service.id, 'up')}
                        disabled={index === 0}
                        className="p-1.5 text-gray-400 hover:text-orange-600 disabled:opacity-30 disabled:cursor-not-allowed rounded"
                        title="Monter"
                      >
                        <FaArrowUp className="w-3 h-3" />
                      </button>
                      <span className="text-xs text-gray-400 w-5 text-center">{service.display_order}</span>
                      <button
                        onClick={() => moveOrder(service.id, 'down')}
                        disabled={index === filtered.length - 1}
                        className="p-1.5 text-gray-400 hover:text-orange-600 disabled:opacity-30 disabled:cursor-not-allowed rounded"
                        title="Descendre"
                      >
                        <FaArrowDown className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleFeatured(service)}
                        className={`p-2 rounded-lg transition-colors ${
                          service.is_featured
                            ? 'text-amber-500 hover:bg-amber-50'
                            : 'text-gray-300 hover:text-amber-500 hover:bg-amber-50'
                        }`}
                        title={service.is_featured ? 'Retirer de la une' : 'Mettre en avant'}
                      >
                        <FaStar className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => togglePublished(service)}
                        className={`p-2 rounded-lg transition-colors ${
                          service.is_published
                            ? 'text-green-600 hover:bg-green-50'
                            : 'text-gray-400 hover:bg-gray-100'
                        }`}
                        title={service.is_published ? 'Masquer' : 'Publier'}
                      >
                        {service.is_published ? <FaEye className="w-4 h-4" /> : <FaEyeSlash className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => openModal(service)}
                        className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id, service.title)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
        </div>
      </div>

      {/* ——————————————————————————————————————
          MODAL Ajout / Modification
      —————————————————————————————————————— */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FaCog className="text-orange-600" />
                {editingService ? 'Modifier le service' : 'Ajouter un service'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Titre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre du service <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => {
                    const title = e.target.value;
                    setFormData(f => ({
                      ...f,
                      title,
                      slug: editingService ? f.slug : slugify(title),
                    }));
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Ex: Développement Web"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug (URL)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">/services/</span>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={e => setFormData(f => ({ ...f, slug: slugify(e.target.value) }))}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none font-mono text-sm"
                    placeholder="developpement-web"
                  />
                </div>
              </div>

              {/* Icône */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icône
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {ICON_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setFormData(f => ({ ...f, icon: opt.value }))}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all text-xs ${
                        formData.icon === opt.value
                          ? 'border-orange-500 bg-orange-50 text-orange-600'
                          : 'border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                      title={opt.label}
                    >
                      <span className="text-lg">{opt.icon}</span>
                      <span className="truncate w-full text-center">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image de fond
                </label>

                {/* Aperçu */}
                {imagePreview && (
                  <div className="mb-3 relative rounded-lg overflow-hidden border border-gray-200 h-32 bg-gray-50">
                    <img src={imagePreview} alt="Aperçu" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-700 hover:text-red-600 rounded-full p-1.5 shadow"
                      title="Retirer l'image"
                    >
                      <FaTimes className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Champ fichier caché */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
                  className="hidden"
                  onClick={e => e.stopPropagation()}
                  onChange={e => {
                    const file = e.target.files?.[0];
                    e.target.value = "";
                    handleFileSelect(file);
                  }}
                />

                {/* Zone de dépôt */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition ${
                    imagePreview
                      ? 'border-orange-300 bg-orange-50'
                      : 'border-gray-300 bg-gray-50 hover:border-orange-400 hover:bg-orange-50'
                  }`}
                >
                  <FaCloudUploadAlt className="text-3xl text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-700">
                    {imagePreview ? "Cliquer pour changer l'image" : "Cliquer pour sélectionner une image"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, SVG, WebP • Max 5 MB</p>
                </div>

                {uploadFile && (
                  <div className="flex items-center gap-3 p-3 mt-3 bg-gray-50 border border-gray-200 rounded-xl">
                    <FaImage className="text-orange-500 text-lg" />
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-gray-800">{uploadFile.name}</div>
                      <div className="text-[11px] text-gray-400">{(uploadFile.size / 1024).toFixed(1)} KB</div>
                    </div>
                    <button
                      type="button"
                      onClick={clearImage}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTimes />
                    </button>
                  </div>
                )}
              </div>

              {/* Description courte */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description courte
                </label>
                <input
                  type="text"
                  value={formData.short_description}
                  onChange={e => setFormData(f => ({ ...f, short_description: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Résumé court affiché dans les aperçus (optionnel)"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description complète <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData(f => ({ ...f, description: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                  placeholder="Description du service affichée sur le site..."
                />
              </div>

              {/* Fonctionnalités */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fonctionnalités / Points clés
                  <span className="text-gray-400 font-normal ml-1">({formData.features.length})</span>
                </label>

                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={e => setFeatureInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm"
                    placeholder="Ex: Sites vitrines — Appuyez sur Entrée pour ajouter"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors font-medium text-sm"
                  >
                    <FaPlus />
                  </button>
                </div>

                {formData.features.length > 0 && (
                  <div className="space-y-2">
                    {formData.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                        <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                        <span className="flex-1 text-sm text-gray-700">{feature}</span>
                        <button
                          type="button"
                          onClick={() => removeFeature(i)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <FaTimes className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Catégorie + Couleur accent */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={e => setFormData(f => ({ ...f, category: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="Ex: Développement"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Couleur d&apos;accent
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.color_accent || '#f97316'}
                      onChange={e => setFormData(f => ({ ...f, color_accent: e.target.value }))}
                      className="w-10 h-10 border border-gray-300 rounded-lg cursor-pointer p-1"
                      title="Choisir une couleur"
                    />
                    <input
                      type="text"
                      value={formData.color_accent}
                      onChange={e => setFormData(f => ({ ...f, color_accent: e.target.value }))}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none font-mono text-sm"
                      placeholder="#f97316"
                    />
                  </div>
                </div>
              </div>

              {/* Ordre d'affichage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ordre d&apos;affichage
                </label>
                <input
                  type="number"
                  min={0}
                  value={formData.display_order}
                  onChange={e => setFormData(f => ({ ...f, display_order: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">Les services sont affichés par ordre croissant</p>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => setFormData(f => ({ ...f, is_published: !f.is_published }))}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      formData.is_published ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      formData.is_published ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {formData.is_published ? 'Publié (visible)' : 'Brouillon (masqué)'}
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => setFormData(f => ({ ...f, is_featured: !f.is_featured }))}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      formData.is_featured ? 'bg-amber-400' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      formData.is_featured ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <FaStar className="w-3 h-3 text-amber-500" />
                    {formData.is_featured ? 'Mis en avant' : 'Normal'}
                  </span>
                </label>
              </div>

              {/* Boutons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
                >
                  <FaSave className="w-4 h-4" />
                  {saving || uploadingImage ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
