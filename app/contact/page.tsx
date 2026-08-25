"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock } from "react-icons/fa";
import { COMPANY_INFO } from "@/lib/constants";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender_name: formData.name,
          sender_email: formData.email,
          sender_phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Échec de l\'envoi du message');
      }

      alert(`✅ Votre message (${result.reference}) a été transmis avec succès !\n\nNotre équipe vous répondra sous 24h ouvrées.`);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      console.error("Erreur lors de l'envoi du message:", err);
      alert("❌ Votre message n'a pas pu être envoyé. Veuillez réessayer.");
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
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-background-secondary">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                Contactez-nous
              </div>
              <h1 className="heading-1 mb-6">
                Parlons de votre projet
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed">
                Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans la réalisation de vos projets IT
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="heading-3 mb-6">Envoyez-nous un message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="heading-3 mb-6">Nos coordonnées</h2>
                  <div className="space-y-4">
                    {/* Phone */}
                    <div className="bg-background-secondary p-6 rounded-xl hover:shadow-lg transition-shadow">
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

                    {/* WhatsApp */}
                    <div className="bg-green-50 p-6 rounded-xl hover:shadow-lg transition-shadow">
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

                    {/* Email */}
                    <div className="bg-background-secondary p-6 rounded-xl hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-xl flex-shrink-0">
                          <FaEnvelope />
                        </div>
                        <div>
                          <h4 className="font-bold text-text mb-2">Email</h4>
                          <a
                            href={`mailto:${COMPANY_INFO.email}`}
                            className="text-text-secondary hover:text-primary transition-colors break-all"
                          >
                            {COMPANY_INFO.email}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="bg-background-secondary p-6 rounded-xl hover:shadow-lg transition-shadow">
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

                    {/* Hours */}
                    <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                          <FaClock />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-2">Horaires d'ouverture</h4>
                          <p className="opacity-90">{COMPANY_INFO.openingHours}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="bg-background-secondary p-4 rounded-xl">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <FaMapMarkerAlt className="text-5xl text-primary mx-auto mb-3" />
                      <p className="text-text-secondary">Carte Google Maps</p>
                      <p className="text-xs text-text-secondary mt-2">
                        {COMPANY_INFO.address}, {COMPANY_INFO.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding bg-background-secondary">
          <div className="container-custom max-w-4xl">
            <h2 className="heading-2 text-center mb-12">Questions fréquentes</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Quels sont vos délais de réponse ?",
                  a: "Nous répondons généralement sous 24h ouvrées à toutes les demandes de contact."
                },
                {
                  q: "Proposez-vous des devis gratuits ?",
                  a: "Oui, tous nos devis sont gratuits et sans engagement. Contactez-nous pour en savoir plus."
                },
                {
                  q: "Dans quels secteurs intervenez-vous ?",
                  a: "Nous intervenons dans tous les secteurs : banques, éducation, santé, commerce, administration publique, ONG, etc."
                },
                {
                  q: "Assurez-vous la maintenance après livraison ?",
                  a: "Oui, nous proposons des contrats de maintenance et un support technique pour tous nos projets."
                }
              ].map((faq, index) => (
                <details key={index} className="bg-white p-6 rounded-xl group">
                  <summary className="font-bold text-text cursor-pointer list-none flex items-center justify-between">
                    {faq.q}
                    <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-text-secondary mt-4 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
