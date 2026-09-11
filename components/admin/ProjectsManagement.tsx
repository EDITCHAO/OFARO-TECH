"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaPlus, FaEdit, FaTrash, FaImage, FaUpload, FaTimes, FaSave,
  FaMobileAlt, FaLaptopCode, FaPalette, FaNetworkWired, FaEye, FaEyeSlash
} from "react-icons/fa";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  client_name: string | null;
  duration: string | null;
  year: string;
  image_url: string | null;
  technologies: string[];
  status: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const CATEGORIES = [
  { id: "web", label: "Web", icon: FaLaptopCode },
  { id: "mobile", label: "Mobile", icon: FaMobileAlt },
  { id: "design", label: "Design", icon: FaPalette },
  { id: "network", label: "Réseaux", icon: FaNetworkWired }
];

export default function ProjectsManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "web",
    description: "",
    client_name: "",
    duration: "",
    year: new Date().getFullYear().toString(),
    image_url: "",
    technologies: [] as string[],
    status: "active",
    display_order: 0
  });

  const [newTech, setNewTech] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const result = await response.json();
      
      if (result.success) {
        setProjects(result.data);
      }
    } catch (error) {
      console.error('Erreur chargement projets:', error);
      showToast('Erreur lors du chargement des projets', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        category: project.category,
        description: project.description,
        client_name: project.client_name || "",
        duration: project.duration || "",
        year: project.year,
        image_url: project.image_url || "",
        technologies: project.technologies || [],
        status: project.status,
        display_order: project.display_order
      });
      setPreviewImage(project.image_url);
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        category: "web",
        description: "",
        client_name: "",
        duration: "",
        year: new Date().getFullYear().toString(),
        image_url: "",
        technologies: [],
        status: "active",
        display_order: 0
      });
      setPreviewImage(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setPreviewImage(null);
    setNewTech("");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      showToast('Image trop volumineuse (max 5MB)', 'error');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      showToast('Format non supporté. Utilisez JPG, PNG ou WEBP', 'error');
      return;
    }

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/projects/upload', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        setFormData(prev => ({ ...prev, image_url: result.fileUrl }));
        setPreviewImage(result.fileUrl);
        showToast('Image uploadée avec succès', 'success');
      } else {
        showToast(result.error || 'Erreur upload', 'error');
      }
    } catch (error) {
      console.error('Erreur upload:', error);
      showToast('Erreur lors de l\'upload', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddTechnology = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()]
      }));
      setNewTech("");
    }
  };

  const handleRemoveTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      showToast('Titre et description sont obligatoires', 'error');
      return;
    }

    try {
      const url = editingProject 
        ? `/api/projects/${editingProject.id}`
        : '/api/projects';
      
      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        showToast(
          editingProject ? 'Projet modifié avec succès' : 'Projet créé avec succès',
          'success'
        );
        handleCloseModal();
        fetchProjects();
      } else {
        showToast(result.error || 'Erreur', 'error');
      }
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      showToast('Erreur lors de la sauvegarde', 'error');
    }
  };

  const handleDelete = async (projectId: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (result.success) {
        showToast('Projet supprimé avec succès', 'success');
        fetchProjects();
      } else {
        showToast(result.error || 'Erreur', 'error');
      }
    } catch (error) {
      console.error('Erreur suppression:', error);
      showToast('Erreur lors de la suppression', 'error');
    }
  };

  const handleToggleStatus = async (project: Project) => {
    const newStatus = project.status === 'active' ? 'draft' : 'active';

    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      const result = await response.json();

      if (result.success) {
        showToast(`Projet ${newStatus === 'active' ? 'publié' : 'mis en brouillon'}`, 'success');
        fetchProjects();
      }
    } catch (error) {
      console.error('Erreur changement statut:', error);
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    // Implémenter votre système de toast ici
    alert(message);
  };

  const getCategoryIcon = (category: string) => {
    const cat = CATEGORIES.find(c => c.id === category);
    return cat ? cat.icon : FaLaptopCode;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Chargement des projets...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Réalisations (Portfolio)</h2>
          <p className="text-gray-600 mt-1">{projects.length} projet(s)</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
        >
          <FaPlus /> Ajouter un projet
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const CategoryIcon = getCategoryIcon(project.category);
          
          return (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-200">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <FaImage size={48} />
                  </div>
                )}
                
                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status === 'active' ? 'Publié' : 'Brouillon'}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 bg-orange-500 text-white rounded-full text-xs font-semibold flex items-center gap-1">
                    <CategoryIcon size={12} />
                    {CATEGORIES.find(c => c.id === project.category)?.label}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Client */}
                {project.client_name && (
                  <p className="text-xs text-gray-500 mb-3">
                    Client: <span className="font-semibold text-gray-700">{project.client_name}</span>
                  </p>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleStatus(project)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm"
                  >
                    {project.status === 'active' ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                    {project.status === 'active' ? 'Masquer' : 'Publier'}
                  </button>
                  <button
                    onClick={() => handleOpenModal(project)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
                  >
                    <FaEdit size={14} /> Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">
                {editingProject ? 'Modifier le projet' : 'Nouveau projet'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image du projet
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  {previewImage ? (
                    <div className="relative">
                      <img
                        src={previewImage}
                        alt="Aperçu"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(null);
                          setFormData(prev => ({ ...prev, image_url: "" }));
                        }}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer text-center py-8"
                    >
                      <FaUpload className="mx-auto text-gray-400 mb-2" size={32} />
                      <p className="text-sm text-gray-600">
                        {uploadingImage ? 'Upload en cours...' : 'Cliquez pour uploader une image'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG ou WEBP (max 5MB)</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Titre du projet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Ex: Application de Suivi de Flotte"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Catégorie <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, category: cat.id }))}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition ${
                          formData.category === cat.id
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <Icon />
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Décrivez le projet en détail..."
                  required
                />
              </div>

              {/* Client Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom du client / Entreprise
                </label>
                <input
                  type="text"
                  value={formData.client_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Ex: TransLog Togo"
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Technologies utilisées
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTechnology();
                      }
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Ex: Flutter, Firebase, etc."
                  />
                  <button
                    type="button"
                    onClick={handleAddTechnology}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    <FaPlus />
                  </button>
                </div>
                {formData.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => handleRemoveTechnology(tech)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTimes size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Duration & Year */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Durée
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Ex: 6 mois"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Année
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="2025"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center justify-center gap-2"
                >
                  <FaSave />
                  {editingProject ? 'Mettre à jour' : 'Créer le projet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
