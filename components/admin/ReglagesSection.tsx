'use client';

import React, { useState, useEffect } from 'react';
import {
  FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock,
  FaMapMarkedAlt, FaSave, FaCheck, FaTimes, FaSpinner
} from 'react-icons/fa';

type Settings = {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  opening_hours: string;
  google_maps_url: string;
};

const EMPTY: Settings = {
  phone: '',
  whatsapp: '',
  email: '',
  address: '',
  opening_hours: '',
  google_maps_url: '',
};

export default function ReglagesSection() {
  const [form, setForm] = useState<Settings>(EMPTY);
  const [original, setOriginal] = useState<Settings>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(json => {
        if (json.settings) {
          const s: Settings = {
            phone:           json.settings.phone           || '',
            whatsapp:        json.settings.whatsapp        || '',
            email:           json.settings.email           || '',
            address:         json.settings.address         || '',
            opening_hours:   json.settings.opening_hours   || '',
            google_maps_url: json.settings.google_maps_url || '',
          };
          setForm(s);
          setOriginal(s);
        }
      })
      .catch(() => showToast('Erreur lors du chargement', 'error'))
      .finally(() => setLoading(false));
  }, []);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleChange = (key: keyof Settings, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setOriginal(form);
      showToast('Coordonnées enregistrées ✓', 'success');
    } catch (err: any) {
      showToast(err.message || 'Erreur lors de la sauvegarde', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setForm(original);
  };

  const isDirty = JSON.stringify(form) !== JSON.stringify(original);

  const fields: {
    key: keyof Settings;
    label: string;
    icon: React.ReactNode;
    placeholder: string;
    type?: string;
    multiline?: boolean;
    hint?: string;
  }[] = [
    {
      key: 'phone',
      label: 'Téléphone',
      icon: <FaPhone className="text-orange-500" />,
      placeholder: '+228 XX XX XX XX',
      hint: 'Numéro affiché dans l\'en-tête et la page contact',
    },
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      icon: <FaWhatsapp className="text-green-500" />,
      placeholder: '+228 XX XX XX XX',
      hint: 'Numéro pour le bouton WhatsApp (avec indicatif, sans espaces)',
    },
    {
      key: 'email',
      label: 'Email',
      icon: <FaEnvelope className="text-blue-500" />,
      placeholder: 'contact@ofaro-tech.com',
      type: 'email',
    },
    {
      key: 'address',
      label: 'Adresse',
      icon: <FaMapMarkerAlt className="text-red-500" />,
      placeholder: 'Agbalepedo, Lomé, Togo',
      multiline: true,
    },
    {
      key: 'opening_hours',
      label: 'Horaires d\'ouverture',
      icon: <FaClock className="text-purple-500" />,
      placeholder: 'Lundi - Vendredi: 8h00 - 18h00 | Samedi: 9h00 - 13h00',
      multiline: true,
      hint: 'Texte affiché dans l\'en-tête et la page contact',
    },
    {
      key: 'google_maps_url',
      label: 'Lien Google Maps (embed)',
      icon: <FaMapMarkedAlt className="text-orange-400" />,
      placeholder: 'https://www.google.com/maps/embed?pb=...',
      multiline: true,
      hint: 'Coller l\'URL d\'intégration depuis Google Maps > Partager > Intégrer une carte > copier src="..."',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <FaSpinner className="animate-spin text-orange-500 text-3xl" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white flex items-center gap-3 ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {toast.type === 'success' ? <FaCheck /> : <FaTimes />}
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <FaMapMarkerAlt className="text-orange-500" />
          Réglages — Coordonnées du site
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Ces informations s'affichent dans l'en-tête, le pied de page et la page Contact.
        </p>
      </div>

      {/* Formulaire */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
        {fields.map(field => (
          <div key={field.key} className="p-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              {field.icon}
              {field.label}
            </label>

            {field.multiline ? (
              <textarea
                value={form[field.key]}
                onChange={e => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={field.key === 'google_maps_url' ? 3 : 2}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none text-sm"
              />
            ) : (
              <input
                type={field.type || 'text'}
                value={form[field.key]}
                onChange={e => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
              />
            )}

            {field.hint && (
              <p className="text-xs text-gray-400 mt-1.5">{field.hint}</p>
            )}
          </div>
        ))}
      </div>

      {/* Aperçu carte Google Maps */}
      {form.google_maps_url && (
        <div className="mt-6">
          <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FaMapMarkedAlt className="text-orange-400" />
            Aperçu de la carte
          </p>
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <iframe
              src={form.google_maps_url}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between mt-6 pt-6">
        <button
          onClick={handleReset}
          disabled={!isDirty || saving}
          className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium"
        >
          Annuler les modifications
        </button>
        <button
          onClick={handleSave}
          disabled={!isDirty || saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium"
        >
          {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
          {saving ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>
    </div>
  );
}
