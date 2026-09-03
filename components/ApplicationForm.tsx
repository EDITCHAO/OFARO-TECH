'use client';

import { useState, FormEvent } from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import Link from 'next/link';

export default function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier que c'est un PDF
      if (file.type !== 'application/pdf') {
        setMessage({ type: 'error', text: 'Veuillez sélectionner un fichier PDF' });
        e.target.value = '';
        return;
      }
      // Vérifier la taille (5 MB max)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Le fichier ne doit pas dépasser 5 MB' });
        e.target.value = '';
        return;
      }
      setSelectedFile(file);
      setMessage(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Vérifier qu'un fichier est sélectionné
      if (!selectedFile) {
        setMessage({ type: 'error', text: 'Veuillez sélectionner votre CV en PDF' });
        setIsSubmitting(false);
        return;
      }

      // Envoyer le formulaire avec le fichier
      const response = await fetch('/api/careers/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: 'Candidature envoyée avec succès ! Nous vous recontacterons rapidement.' 
        });
        (e.target as HTMLFormElement).reset();
        setSelectedFile(null);
      } else {
        setMessage({ 
          type: 'error', 
          text: data.error || 'Une erreur est survenue. Veuillez réessayer.' 
        });
      }
    } catch (error) {
      console.error('Erreur soumission:', error);
      setMessage({ 
        type: 'error', 
        text: 'Erreur de connexion. Veuillez vérifier votre connexion internet.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
      {message && (
        <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="prenom" className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
            Prénom
          </label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            placeholder="Votre prénom"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            required
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="nom" className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
            Nom
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            placeholder="Votre nom"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="vous@email.com"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            required
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="telephone" className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
            Téléphone
          </label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            placeholder="+228 ..."
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div>
        <label htmlFor="poste" className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
          Poste visé
        </label>
        <select
          id="poste"
          name="poste"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white"
          required
          disabled={isSubmitting}
        >
          <option value="">Candidature spontanée</option>
          <option value="systeme-informatique">Architecte Système Informatique</option>
          <option value="dev-fullstack">Développeur Full-Stack</option>
          <option value="dev-frontend">Développeur Frontend</option>
          <option value="dev-mobile">Développeur Mobile</option>
          <option value="dev-backend">Développeur Backend</option>
          <option value="devops">DevOps Engineer</option>
          <option value="designer">UI/UX Designer</option>
          <option value="chef-projet">Chef de projet</option>
          <option value="reseaux-informatiques">Ingénieur Réseaux Informatiques</option>
          <option value="cybersecurite">Expert Cybersécurité</option>
          <option value="maintenance-informatique">Technicien Maintenance Informatique</option>
          <option value="commercial">Commercial</option>
          <option value="stage">Stage</option>
          <option value="alternance">Alternance</option>
        </select>
      </div>

      <div>
        <label htmlFor="portfolio" className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
          Lien portfolio / LinkedIn (optionnel)
        </label>
        <input
          type="url"
          id="portfolio"
          name="portfolio"
          placeholder="https://..."
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="cv" className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
          Télécharger votre CV (PDF uniquement)
        </label>
        <input
          type="file"
          id="cv"
          name="cv"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className="w-full px-4 py-3 rounded-lg border-2 border-dashed border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          required
          disabled={isSubmitting}
        />
        <p className="text-xs text-gray-500 mt-2">
          📄 Fichier PDF uniquement • Taille maximale: 5 MB
          {selectedFile && <span className="text-green-600 font-semibold"> • {selectedFile.name} ({(selectedFile.size / 1024).toFixed(0)} KB)</span>}
        </p>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
          Message / Motivation
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Présentez-vous en quelques lignes : parcours, motivation, disponibilité..."
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
          required
          disabled={isSubmitting}
        ></textarea>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg text-sm text-gray-600 flex items-start gap-3">
        <FaShieldAlt className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p>
          Vos données et documents sont traités de manière confidentielle, uniquement dans le cadre du recrutement.{' '}
          <Link href="/mentions-legales" className="text-blue-600 hover:underline font-medium">
            En savoir plus
          </Link>
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full group bg-gray-900 text-white py-4 rounded-lg hover:bg-blue-600 transition-all duration-300 font-semibold flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Envoi en cours...
          </>
        ) : (
          <>
            Envoyer ma candidature
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </>
        )}
      </button>
    </form>
  );
}
