"use client";

import { useState } from "react";
import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { COMPANY_INFO } from "@/lib/constants";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/contact/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender_name: formData.name,
          sender_email: formData.email,
          sender_phone: formData.phone,
          subject: formData.subject,
          message: formData.message
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage({
          type: 'success',
          text: data.message || 'Message envoyé avec succès !'
        });
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setSubmitMessage({
          type: 'error',
          text: data.error || 'Erreur lors de l\'envoi du message'
        });
      }
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitMessage({
        type: 'error',
        text: 'Une erreur est survenue. Veuillez réessayer.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="section-padding bg-background-secondary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Contactez-nous
          </div>
          <h2 className="heading-2 mb-4">
            Parlons de votre projet
          </h2>
          <p className="text-body">
            Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans vos projets
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-text mb-6">Envoyez-nous un message</h3>
            
            {submitMessage && (
              <div className={`mb-4 p-4 rounded-lg ${
                submitMessage.type === 'success' 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}>
                {submitMessage.text}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-text mb-2">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="Votre nom complet"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-text mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-text mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="+228 XX XX XX XX"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-text mb-2">
                  Objet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="Objet de votre message"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-text mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                  placeholder="Décrivez votre projet ou votre besoin..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPaperPlane />
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-xl flex-shrink-0">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h4 className="font-bold text-text mb-2">Téléphone</h4>
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-xl flex-shrink-0">
                  <FaWhatsapp />
                </div>
                <div>
                  <h4 className="font-bold text-text mb-2">WhatsApp</h4>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\s/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-green-600 transition-colors"
                  >
                    {COMPANY_INFO.whatsapp}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-xl flex-shrink-0">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="font-bold text-text mb-2">Email</h4>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-xl flex-shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="font-bold text-text mb-2">Adresse</h4>
                  <p className="text-text-secondary">
                    {COMPANY_INFO.address}<br />
                    {COMPANY_INFO.city}, {COMPANY_INFO.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 rounded-xl">
              <h4 className="font-bold text-lg mb-3">Horaires d'ouverture</h4>
              <p className="opacity-90">{COMPANY_INFO.openingHours}</p>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FaMapMarkerAlt className="text-4xl text-primary mx-auto mb-2" />
                  <p className="text-text-secondary text-sm">Carte Google Maps</p>
                  <p className="text-xs text-text-secondary mt-1">À intégrer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
