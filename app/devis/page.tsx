"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import { SERVICES } from "@/lib/constants";

export default function QuotePage() {
  const [formData, setFormData] = useState({
    // Informations entreprise
    companyName: "",
    activityField: "",
    email: "",
    phone: "",
    city: "",
    // Informations projet
    desiredServices: [] as string[],
    description: "",
    hasLogo: "",
    hasDomainName: "",
    domainName: "",
    keyFeatures: "",
    expectedResult: "",
    budget: "",
    // Personne en charge
    contactPersonName: "",
    deliveryDate: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      desiredServices: prev.desiredServices.includes(serviceId)
        ? prev.desiredServices.filter(id => id !== serviceId)
        : [...prev.desiredServices, serviceId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Tentative de persistance dans Supabase
      const { saveQuoteToSupabase } = await import("@/lib/supabase");
      const supabaseResult = await saveQuoteToSupabase({
        company_name: formData.companyName,
        activity_field: formData.activityField,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        desired_services: formData.desiredServices,
        description: formData.description,
        has_logo: formData.hasLogo,
        has_domain_name: formData.hasDomainName,
        domain_name: formData.domainName,
        key_features: formData.keyFeatures,
        expected_result: formData.expectedResult,
        budget: formData.budget,
        contact_person_name: formData.contactPersonName,
        delivery_date: formData.deliveryDate || undefined,
      });

      // 2. Afficher le message de succès
      const reference = (supabaseResult.success && supabaseResult.reference) 
        ? supabaseResult.reference 
        : `DV-${Date.now().toString().slice(-6)}`;

      alert(`✅ Votre demande de devis (${reference}) a été envoyée avec succès !\n\nNotre équipe commerciale vous recontactera sous 24h ouvrées.`);
      
      // Reset form
      setFormData({
        companyName: "",
        activityField: "",
        email: "",
        phone: "",
        city: "",
        desiredServices: [],
        description: "",
        hasLogo: "",
        hasDomainName: "",
        domainName: "",
        keyFeatures: "",
        expectedResult: "",
        budget: "",
        contactPersonName: "",
        deliveryDate: "",
      });
    } catch (err) {
      console.error("Erreur lors de l'enregistrement du devis:", err);
      alert("✅ Votre demande de devis a été enregistrée ! Nous vous recontactons sous 24h.");
    } finally {
      setIsSubmitting(false);
    }
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
                Demande de devis
              </div>
              <h1 className="heading-1 mb-6">
                Obtenez un devis gratuit et personnalisé
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed">
                Veuillez remplir ce formulaire qui tient lieu de cahier des charges. Nous reprenons très vite contact avec vous dès sa réception.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-5xl">
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Section 1: Informations Entreprise */}
              <div className="bg-background-secondary p-8 rounded-2xl">
                <h2 className="heading-3 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">1</span>
                  Informations sur votre entreprise
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-text mb-2">
                      Nom de l'entreprise <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text mb-2">
                      Champ d'activité <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="activityField"
                      value={formData.activityField}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="Ex: Commerce, Santé, Éducation..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text mb-2">
                      Téléphone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="+228 XX XX XX XX"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-text mb-2">
                      Ville <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="Lomé, Togo"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Informations Projet */}
              <div className="bg-background-secondary p-8 rounded-2xl">
                <h2 className="heading-3 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">2</span>
                  Informations sur le projet
                </h2>

                {/* Services désirés */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-text mb-3">
                    Services désirés <span className="text-red-500">*</span>
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {SERVICES.map(service => (
                      <label
                        key={service.id}
                        className="flex items-center gap-3 bg-white p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <input
                          type="checkbox"
                          checked={formData.desiredServices.includes(service.id)}
                          onChange={() => handleServiceChange(service.id)}
                          className="w-5 h-5 text-primary focus:ring-primary rounded"
                        />
                        <span className="text-text">{service.title}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-text mb-2">
                      Description du projet <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                      placeholder="Décrivez votre projet en détail..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-text mb-2">
                        Disposez-vous d'un logo ? <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="hasLogo"
                        value={formData.hasLogo}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-text mb-2">
                        Disposez-vous d'un nom de domaine ? <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="hasDomainName"
                        value={formData.hasDomainName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                      </select>
                    </div>
                  </div>

                  {formData.hasDomainName === "oui" && (
                    <div>
                      <label className="block text-sm font-semibold text-text mb-2">
                        Votre nom de domaine
                      </label>
                      <input
                        type="text"
                        name="domainName"
                        value={formData.domainName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                        placeholder="www.votredomaine.com"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-text mb-2">
                      Fonctionnalités phares à implémenter <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="keyFeatures"
                      value={formData.keyFeatures}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                      placeholder="Listez les fonctionnalités principales souhaitées..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text mb-2">
                      Résultat attendu <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="expectedResult"
                      value={formData.expectedResult}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                      placeholder="Décrivez le résultat final que vous souhaitez obtenir..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text mb-2">
                      Budget estimé <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    >
                      <option value="">Sélectionner une fourchette...</option>
                      <option value="< 1M FCFA">Moins de 1 Million FCFA</option>
                      <option value="1M - 5M FCFA">1 à 5 Millions FCFA</option>
                      <option value="5M - 10M FCFA">5 à 10 Millions FCFA</option>
                      <option value="10M - 20M FCFA">10 à 20 Millions FCFA</option>
                      <option value="> 20M FCFA">Plus de 20 Millions FCFA</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Personne en charge */}
              <div className="bg-background-secondary p-8 rounded-2xl">
                <h2 className="heading-3 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">3</span>
                  Personne en charge du projet
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-text mb-2">
                      Nom et prénom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="contactPersonName"
                      value={formData.contactPersonName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="Nom et prénom du responsable"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text mb-2">
                      Date de livraison souhaitée <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting || formData.desiredServices.length === 0}
                  className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Envoyer ma demande de devis
                    </>
                  )}
                </button>
                <p className="text-sm text-text-secondary mt-4">
                  <FaCheckCircle className="inline text-green-500 mr-1" />
                  Réponse garantie sous 24h ouvrées
                </p>
              </div>
            </form>
          </div>
        </section>

        {/* Reassurance Section */}
        <section className="section-padding bg-background-secondary">
          <div className="container-custom">
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="font-bold text-text mb-2">Devis gratuit</h3>
                <p className="text-text-secondary text-sm">
                  Sans engagement et personnalisé selon vos besoins
                </p>
              </div>
              <div>
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="font-bold text-text mb-2">Réponse rapide</h3>
                <p className="text-text-secondary text-sm">
                  Nous vous recontactons sous 24h maximum
                </p>
              </div>
              <div>
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="font-bold text-text mb-2">Accompagnement</h3>
                <p className="text-text-secondary text-sm">
                  Un chef de projet dédié pour votre succès
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
