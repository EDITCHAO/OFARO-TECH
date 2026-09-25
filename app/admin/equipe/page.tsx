'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaSearch, 
  FaUsers, FaUpload, FaTimes, FaSave, FaArrowUp, FaArrowDown
} from 'react-icons/fa';
import AdminLayout from '@/components/admin/AdminLayout';

interface TeamMember {
  id: number;
  full_name: string;
  position: string;
  department?: string;
  biography?: string;
  skills?: string;
  experience?: string;
  professional_email?: string;
  phone?: string;
  photo_url?: string;
  display_on_site: boolean;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export default function AdminEquipePage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    full_name: '',
    position: '',
    department: '',
    biography: '',
    skills: '',
    experience: '',
    professional_email: '',
    phone: '',
    display_on_site: true,
    display_order: 0,
    is_active: true
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error('Erreur chargement équipe:', error);
      showToast('Erreur lors du chargement de l\'équipe', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const openModal = (member?: TeamMember) => {
    if (member) {
      setEditingMember(member);
      setFormData(member);
      setPhotoPreview(member.photo_url || null);
    } else {
      setEditingMember(null);
      setFormData({
        full_name: '',
        position: '',
        department: '',
        biography: '',
        skills: '',
        experience: '',
        professional_email: '',
        phone: '',
        display_on_site: true,
        display_order: members.length,
        is_active: true
      });
      setPhotoPreview(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
    setFormData({});
    setPhotoPreview(null);
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Veuillez sélectionner une image valide', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast('L\'image ne doit pas dépasser 5 MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const uploadPhoto = async (file: File, memberId: number): Promise<string | null> => {
    try {
      setUploadingPhoto(true);
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const fileExt = file.name.split('.').pop();
      const fileName = `membre-${memberId}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('team-photos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('team-photos')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Erreur upload photo:', error);
      showToast('Erreur lors de l\'upload de la photo', 'error');
      return null;
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.full_name || !formData.position) {
      showToast('Veuillez remplir les champs obligatoires', 'error');
      return;
    }

    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      let photoUrl = formData.photo_url;

      // Upload photo si nouvelle photo sélectionnée
      if (fileInputRef.current?.files?.[0]) {
        const file = fileInputRef.current.files[0];
        const tempId = editingMember?.id || Date.now();
        const uploadedUrl = await uploadPhoto(file, tempId);
        if (uploadedUrl) {
          photoUrl = uploadedUrl;
        }
      }

      const memberData = {
        ...formData,
        photo_url: photoUrl,
        updated_at: new Date().toISOString()
      };

      if (editingMember) {
        // Mise à jour
        const { error } = await supabase
          .from('team_members')
          .update(memberData)
          .eq('id', editingMember.id);

        if (error) throw error;
        showToast('Membre mis à jour avec succès', 'success');
      } else {
        // Création
        const { data, error } = await supabase
          .from('team_members')
          .insert([memberData])
          .select()
          .single();

        if (error) throw error;

        // Si photo en attente, uploader avec le vrai ID
        if (fileInputRef.current?.files?.[0] && data) {
          const file = fileInputRef.current.files[0];
          const uploadedUrl = await uploadPhoto(file, data.id);
          if (uploadedUrl) {
            await supabase
              .from('team_members')
              .update({ photo_url: uploadedUrl })
              .eq('id', data.id);
          }
        }

        showToast('Membre ajouté avec succès', 'success');
      }

      closeModal();
      fetchMembers();
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      showToast('Erreur lors de la sauvegarde', 'error');
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Voulez-vous vraiment supprimer ${name} ?`)) return;

    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) throw error;

      showToast('Membre supprimé avec succès', 'success');
      fetchMembers();
    } catch (error) {
      console.error('Erreur suppression:', error);
      showToast('Erreur lors de la suppression', 'error');
    }
  };

  const toggleDisplay = async (id: number, currentStatus: boolean) => {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { error } = await supabase
        .from('team_members')
        .update({ display_on_site: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      showToast(`Affichage ${!currentStatus ? 'activé' : 'désactivé'}`, 'success');
      fetchMembers();
    } catch (error) {
      console.error('Erreur toggle:', error);
      showToast('Erreur lors de la mise à jour', 'error');
    }
  };

  const moveOrder = async (id: number, direction: 'up' | 'down') => {
    const index = members.findIndex(m => m.id === id);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === members.length - 1) return;

    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    const member1 = members[index];
    const member2 = members[swapIndex];

    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      await supabase
        .from('team_members')
        .update({ display_order: member2.display_order })
        .eq('id', member1.id);

      await supabase
        .from('team_members')
        .update({ display_order: member1.display_order })
        .eq('id', member2.id);

      fetchMembers();
    } catch (error) {
      console.error('Erreur réorganisation:', error);
      showToast('Erreur lors de la réorganisation', 'error');
    }
  };

  const filteredMembers = members.filter(member =>
    member.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout activeMenu="equipe">
      {/* Toast */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${
          toastType === 'success' ? 'bg-success-500' : 'bg-danger-500'
        } text-white`}>
          {toastMessage}
        </div>
      )}

      {/* Content */}
      <div className="min-h-full bg-neutral-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-3">
                  <FaUsers className="w-6 h-6 text-primary-600" />
                  Gestion de l'équipe OFARO
                </h1>
                <p className="text-sm text-neutral-600 mt-1">
                  {members.length} {members.length > 1 ? 'membres' : 'membre'} au total
                </p>
              </div>

              <button
                onClick={() => openModal()}
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-all font-medium"
              >
                <FaPlus className="w-4 h-4" />
                Ajouter un membre
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un membre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <FaUsers className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Aucun membre trouvé
              </h3>
              <p className="text-neutral-600 mb-6">
                {searchTerm
                  ? 'Aucun membre ne correspond à votre recherche'
                  : 'Commencez par ajouter les membres de votre équipe'}
              </p>
              <button
                onClick={() => openModal()}
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-all font-medium"
              >
                <FaPlus className="w-4 h-4" />
                Ajouter un membre
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-900">Ordre</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-900">Photo</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-900">Membre</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-900">Contact</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-900">Affichage</th>
                    <th className="text-right py-4 px-6 text-sm font-semibold text-neutral-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredMembers.map((member, index) => (
                    <tr key={member.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => moveOrder(member.id, 'up')}
                            disabled={index === 0}
                            className="p-1 text-neutral-400 hover:text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Monter"
                          >
                            <FaArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => moveOrder(member.id, 'down')}
                            disabled={index === filteredMembers.length - 1}
                            className="p-1 text-neutral-400 hover:text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Descendre"
                          >
                            <FaArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-primary-500 to-primary-600">
                          {member.photo_url ? (
                            <Image
                              src={member.photo_url}
                              alt={member.full_name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white text-xl font-bold">
                              {member.full_name.charAt(0)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <h3 className="font-semibold text-neutral-900 mb-1">{member.full_name}</h3>
                          <p className="text-sm text-primary-600">{member.position}</p>
                          {member.department && (
                            <p className="text-xs text-neutral-500 mt-1">{member.department}</p>
                          )}
                          {member.experience && (
                            <p className="text-xs text-neutral-400 mt-1">Exp: {member.experience}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1 text-sm">
                          {member.professional_email && (
                            <p className="text-neutral-600">{member.professional_email}</p>
                          )}
                          {member.phone && (
                            <p className="text-neutral-500">{member.phone}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => toggleDisplay(member.id, member.display_on_site)}
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            member.display_on_site
                              ? 'bg-success-100 text-success-700 hover:bg-success-200'
                              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                          }`}
                        >
                          {member.display_on_site ? (
                            <>
                              <FaEye className="w-3 h-3" />
                              Visible
                            </>
                          ) : (
                            <>
                              <FaEyeSlash className="w-3 h-3" />
                              Masqué
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openModal(member)}
                            className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                            title="Modifier"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(member.id, member.full_name)}
                            className="p-2 text-neutral-600 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-neutral-900">
                {editingMember ? 'Modifier le membre' : 'Ajouter un membre'}
              </h2>
              <button
                onClick={closeModal}
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Photo */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Photo *
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-primary-500 to-primary-600 flex-shrink-0">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                        {formData.full_name?.charAt(0) || '?'}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoSelect}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg cursor-pointer transition-colors"
                    >
                      <FaUpload className="w-4 h-4" />
                      Choisir une photo
                    </label>
                    <p className="text-xs text-neutral-500 mt-2">
                      JPG, PNG ou WebP. Max 5MB.
                    </p>
                  </div>
                </div>
              </div>

              {/* Nom complet */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  required
                  value={formData.full_name || ''}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  placeholder="Ex: Jean-Baptiste KOUAME"
                />
              </div>

              {/* Fonction */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Fonction / Poste *
                </label>
                <input
                  type="text"
                  required
                  value={formData.position || ''}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  placeholder="Ex: Directeur Général & Fondateur"
                />
              </div>

              {/* Département */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Département / Service
                </label>
                <input
                  type="text"
                  value={formData.department || ''}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  placeholder="Ex: Direction, Développement, Design..."
                />
              </div>

              {/* Biographie */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Biographie
                </label>
                <textarea
                  rows={4}
                  value={formData.biography || ''}
                  onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
                  placeholder="Décrivez le parcours et l'expertise du membre..."
                />
              </div>

              {/* Compétences */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Compétences / Spécialités
                </label>
                <input
                  type="text"
                  value={formData.skills || ''}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  placeholder="Ex: Leadership, Stratégie, Innovation (séparées par des virgules)"
                />
              </div>

              {/* Expérience */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Expérience
                </label>
                <input
                  type="text"
                  value={formData.experience || ''}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  placeholder="Ex: 5 ans, 10+ ans"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Email professionnel
                  </label>
                  <input
                    type="email"
                    value={formData.professional_email || ''}
                    onChange={(e) => setFormData({ ...formData, professional_email: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    placeholder="nom@ofaro-tech.com"
                  />
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    placeholder="+228 XX XX XX XX"
                  />
                </div>
              </div>

              {/* Afficher sur le site */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="display_on_site"
                  checked={formData.display_on_site || false}
                  onChange={(e) => setFormData({ ...formData, display_on_site: e.target.checked })}
                  className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-2 focus:ring-primary-500"
                />
                <label htmlFor="display_on_site" className="text-sm font-medium text-neutral-700">
                  Afficher sur le site
                </label>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={uploadingPhoto}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaSave className="w-4 h-4" />
                  {uploadingPhoto ? 'Upload en cours...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
