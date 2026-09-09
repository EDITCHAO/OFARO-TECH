'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaSave, FaImage, FaTimes } from 'react-icons/fa';

export default function ModifierOffrePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const [formData, setFormData] = useState({
    title: '',
    reference: '',
    department: '',
    contract_type: 'CDI',
    location: 'Lomé, Togo',
    work_mode: 'Hybride',
    image_url: '',
    image_alt: '',
    description: '',
    missions: '',
    responsibilities: '',
    required_skills: '',
    profile: '',
    education_level: '',
    experience_level: '',
    publication_date: new Date().toISOString().split('T')[0],
    application_deadline: '',
    status: 'brouillon'
  });

  useEffect(() => {
    fetchOffer();
  }, [id]);

  const fetchOffer = async () => {
    try {
      setLoadingData(true);
      const { supabase } = await import('@/lib/supabase');

      const { data, error } = await supabase
        .from('job_offers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          title: data.title || '',
          reference: data.reference || '',
          department: data.department || '',
          contract_type: data.contract_type || 'CDI',
          location: data.location || 'Lomé, Togo',
          work_mode: data.work_mode || 'Hybride',
          image_url: data.image_url || '',
          image_alt: data.image_alt || '',
          description: data.description || '',
          missions: data.missions || '',
          responsibilities: data.responsibilities || '',
          required_skills: data.required_skills || '',
          profile: data.profile || '',
          education_level: data.education_level || '',
          experience_level: data.experience_level || '',
          publication_date: data.publication_date || new Date().toISOString().split('T')[0],
          application_deadline: data.application_deadline || '',
          status: data.status || 'brouillon'
        });

        if (data.image_url) {
          setImagePreview(data.image_url);
        }
      }
    } catch (error) {
      console.error('Erreur chargement:', error);
      showToast('Erreur lors du chargement de l\'offre', 'error');
    } finally {
      setLoadingData(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Validation: date limite ne peut pas être avant la date de publication
    if (name === 'application_deadline' && value) {
      const publicationDate = formData.publication_date;
      if (publicationDate && value < publicationDate) {
        showToast('La date limite doit être postérieure à la date de publication', 'error');
        return;
      }
    }
    
    // Validation: si on change la date de publication, vérifier la date limite
    if (name === 'publication_date' && value) {
      const deadline = formData.application_deadline;
      if (deadline && deadline < value) {
        showToast('La date de publication ne peut pas être après la date limite', 'error');
        return;
      }
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('L\'image ne doit pas dépasser 5 Mo', 'error');
        return;
      }

      // Accepter tous les formats d'image courants
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        showToast('Format non supporté. Utilisez JPG, PNG, GIF, WebP ou SVG', 'error');
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData(prev => ({ ...prev, image_url: '' }));
  };

  const uploadImage = async (file: File): Promise<string> => {
    try {
      // Import du client Supabase
      const { supabase } = await import('@/lib/supabase');
      
      // Générer un nom de fichier unique
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `offers/${fileName}`;

      console.log('📤 Upload image vers Supabase...', filePath);

      // Upload vers Supabase Storage
      const { data, error } = await supabase.storage
        .from('job-offers')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('❌ Erreur upload Supabase:', error);
        throw error;
      }

      // Récupérer l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from('job-offers')
        .getPublicUrl(filePath);

      console.log('✅ Image uploadée:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('Erreur upload image:', error);
      // Fallback sur un chemin fictif si l'upload échoue
      const timestamp = Date.now();
      const filename = `job-${timestamp}-${file.name.replace(/[^a-zA-Z0-9.]/g, '-')}`;
      return `/images/offers/${filename}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      showToast('Veuillez remplir tous les champs obligatoires', 'error');
      return;
    }

    setLoading(true);

    try {
      let imageUrl = formData.image_url;
      
      // Upload de la nouvelle image si présente
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const { supabase } = await import('@/lib/supabase');

      const { error } = await supabase
        .from('job_offers')
        .update({
          ...formData,
          image_url: imageUrl || null,
          updated_at: new Date().toISOString(),
          published_at: formData.status === 'publiee' ? new Date().toISOString() : null
        })
        .eq('id', id);

      if (error) throw error;

      showToast('Offre mise à jour avec succès', 'success');
      
      setTimeout(() => {
        router.push('/admin/offres');
      }, 1500);
    } catch (error) {
      console.error('Erreur mise à jour:', error);
      showToast('Erreur lors de la mise à jour de l\'offre', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${
          toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/offres"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Modifier l'offre d'emploi
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {formData.reference} - {formData.title}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
            {/* Informations de base */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Informations de base
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre du poste *
                  </label>
                  <select
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                  >
                    <option value="">-- Sélectionnez un poste --</option>
                    <option value="Offre d'emploi Candidature spontanée">Offre d'emploi Candidature spontanée</option>
                    <option value="Offre d'emploi Architecte Système Informatique">Offre d'emploi Architecte Système Informatique</option>
                    <option value="Offre d'emploi Développeur Full-Stack">Offre d'emploi Développeur Full-Stack</option>
                    <option value="Offre d'emploi Développeur Frontend">Offre d'emploi Développeur Frontend</option>
                    <option value="Offre d'emploi Développeur Mobile">Offre d'emploi Développeur Mobile</option>
                    <option value="Offre d'emploi Développeur Backend">Offre d'emploi Développeur Backend</option>
                    <option value="Offre d'emploi DevOps Engineer">Offre d'emploi DevOps Engineer</option>
                    <option value="Offre d'emploi UI/UX Designer">Offre d'emploi UI/UX Designer</option>
                    <option value="Offre d'emploi Chef de projet">Offre d'emploi Chef de projet</option>
                    <option value="Offre d'emploi Ingénieur Réseaux Informatiques">Offre d'emploi Ingénieur Réseaux Informatiques</option>
                    <option value="Offre d'emploi Expert Cybersécurité">Offre d'emploi Expert Cybersécurité</option>
                    <option value="Offre d'emploi Technicien Maintenance Informatique">Offre d'emploi Technicien Maintenance Informatique</option>
                    <option value="Offre d'emploi Commercial">Offre d'emploi Commercial</option>
                    <option value="Offre d'emploi Stage">Offre d'emploi Stage</option>
                    <option value="Offre d'emploi Alternance">Offre d'emploi Alternance</option>
                    <option value="custom">✏️ Autre (saisir un titre personnalisé)</option>
                  </select>
                  {formData.title === 'custom' && (
                    <input
                      type="text"
                      placeholder="Saisissez un titre personnalisé"
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none mt-2"
                      autoFocus
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Référence
                  </label>
                  <input
                    type="text"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Département
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Ex: Développement"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de contrat *
                  </label>
                  <select
                    name="contract_type"
                    value={formData.contract_type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="Stage">Stage</option>
                    <option value="Alternance">Alternance</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Localisation *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Ex: Lomé, Togo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mode de travail
                  </label>
                  <select
                    name="work_mode"
                    value={formData.work_mode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="Présentiel">Présentiel</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybride">Hybride</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Image */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Image de l'offre
              </h2>
              <div className="space-y-4">
                {imagePreview ? (
                  <div className="relative w-full h-64 rounded-lg overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt={formData.image_alt || formData.title || 'Image de l\'offre'}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <FaImage className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="text-sm text-gray-600 mb-1">
                      Cliquez pour ajouter une image
                    </p>
                    <p className="text-xs text-gray-500">
                      JPG, PNG, GIF, WebP, SVG (max 5 Mo) - Recommandé: 800x600px
                    </p>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Texte alternatif de l'image
                  </label>
                  <input
                    type="text"
                    name="image_alt"
                    value={formData.image_alt}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Description de l'image pour l'accessibilité"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Description du poste
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description générale *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    placeholder="Décrivez brièvement le poste..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Missions principales
                  </label>
                  <textarea
                    name="missions"
                    value={formData.missions}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    placeholder="- Mission 1&#10;- Mission 2&#10;- Mission 3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Responsabilités
                  </label>
                  <textarea
                    name="responsibilities"
                    value={formData.responsibilities}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    placeholder="- Responsabilité 1&#10;- Responsabilité 2&#10;- Responsabilité 3"
                  />
                </div>

              </div>
            </div>

            {/* NOUVEAU: Profil Recherché */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-blue-900 mb-1 flex items-center gap-2">
                🎓 Profil recherché
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Ces informations seront affichées dans une section dédiée sur la page de l'offre
              </p>
              
              <div className="space-y-6">
                {/* Formation */}
                <div>
                  <label className="block text-sm font-semibold text-blue-800 mb-2">
                    📚 Formation
                  </label>
                  <textarea
                    name="education_level"
                    value={formData.education_level}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none bg-white"
                    placeholder="Ex: Bac+3 / Bac+5 en informatique, génie logiciel ou domaine similaire"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Décrivez le niveau et domaine d'études requis
                  </p>
                </div>

                {/* Expérience */}
                <div>
                  <label className="block text-sm font-semibold text-blue-800 mb-2">
                    💼 Expérience
                  </label>
                  <textarea
                    name="experience_level"
                    value={formData.experience_level}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none bg-white"
                    placeholder="Ex: 2 ans minimum en développement web"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Nombre d'années et type d'expérience requise
                  </p>
                </div>

                {/* Compétences techniques */}
                <div>
                  <label className="block text-sm font-semibold text-blue-800 mb-2">
                    🛠️ Compétences techniques
                  </label>
                  <textarea
                    name="required_skills"
                    value={formData.required_skills}
                    onChange={handleChange}
                    rows={8}
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none bg-white font-mono text-sm"
                    placeholder="JavaScript / TypeScript&#10;Node.js&#10;React / Vue.js&#10;PostgreSQL&#10;Git&#10;API REST"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Une compétence par ligne - elles seront affichées sous forme de liste à puces
                  </p>
                </div>

                {/* Qualités personnelles */}
                <div>
                  <label className="block text-sm font-semibold text-blue-800 mb-2">
                    ✨ Qualités personnelles
                  </label>
                  <textarea
                    name="profile"
                    value={formData.profile}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none bg-white font-mono text-sm"
                    placeholder="Esprit d'équipe&#10;Autonomie&#10;Esprit d'analyse&#10;Rigueur&#10;Capacité à résoudre des problèmes"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Une qualité par ligne - elles seront affichées sous forme de liste à puces
                  </p>
                </div>
              </div>
            </div>

            {/* Dates et publication */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Publication
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de publication *
                  </label>
                  <input
                    type="date"
                    name="publication_date"
                    value={formData.publication_date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date limite de candidature
                  </label>
                  <input
                    type="date"
                    name="application_deadline"
                    value={formData.application_deadline}
                    onChange={handleChange}
                    min={formData.publication_date}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="brouillon">Brouillon</option>
                    <option value="publiee">Publiée</option>
                    <option value="suspendue">Suspendue</option>
                    <option value="expiree">Expirée</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
              <Link
                href="/admin/offres"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Annuler
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <FaSave className="w-4 h-4" />
                    Enregistrer les modifications
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
