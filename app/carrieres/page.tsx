import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FaCode,
  FaRocket,
  FaUsers,
  FaAward,
  FaHeart,
  FaChartLine,
  FaBriefcase,
  FaGraduationCap,
  FaGlobe,
  FaShieldAlt,
  FaBullseye,
  FaBolt
} from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Carrières - OFARO TECH | Rejoignez notre équipe',
  description: 'Rejoignez OFARO TECH et construisez l\'avenir du numérique. Découvrez nos opportunités de carrière en développement, design, gestion de projet et plus encore.',
};

export default function CarrieresPage() {
  const advantages = [
    {
      icon: <FaRocket className="w-8 h-8" />,
      title: 'Projets innovants',
      description: 'Applications web, mobiles, solutions IA - des projets qui transforment les entreprises et impactent des milliers d\'utilisateurs.'
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: 'Expertise & mentorat',
      description: 'Progressez aux côtés d\'ingénieurs et développeurs expérimentés, sur des technologies modernes et exigeantes.'
    },
    {
      icon: <FaGlobe className="w-8 h-8" />,
      title: 'Rayonnement international',
      description: 'Des missions en Afrique de l\'Ouest, en France et au-delà. Collaborez avec des clients et équipes multiculturelles.'
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: 'Excellence reconnue',
      description: 'Agence certifiée ISO 9001:2015, engagée dans la qualité, la sécurité et la satisfaction client.'
    }
  ];

  const values = [
    {
      number: '01',
      title: 'Excellence',
      description: 'La qualité technique avant tout, sur chaque ligne de code et chaque pixel designé.'
    },
    {
      number: '02',
      title: 'Innovation',
      description: 'Veille technologique, expérimentation et adoption des meilleures pratiques du marché.'
    },
    {
      number: '03',
      title: 'Esprit d\'équipe',
      description: 'Un réseau pluridisciplinaire de développeurs, designers et chefs de projet qui s\'entraident.'
    },
    {
      number: '04',
      title: 'Impact',
      description: 'Des solutions pensées pour leur environnement, durables et évolutives dans le temps.'
    },
    {
      number: '05',
      title: 'Croissance',
      description: 'Créer de la valeur durable pour nos clients, nos équipes et les territoires que nous servons.'
    }
  ];

  const profiles = [
    {
      category: 'Développement',
      roles: [
        'Architecte Système Informatique',
        'Développeur Full-Stack (React, Node.js)',
        'Développeur Frontend (React, Vue.js, Angular)',
        'Développeur Mobile (React Native, Flutter)',
        'Développeur Backend (Node.js, Python)',
        'DevOps / Cloud Engineer'
      ]
    },
    {
      category: 'Design & UX',
      roles: [
        'UI/UX Designer',
        'Product Designer',
        'Graphiste / Motion Designer'
      ]
    },
    {
      category: 'Infrastructure & Sécurité',
      roles: [
        'Ingénieur Réseaux Informatiques',
        'Expert Cybersécurité',
        'Technicien Maintenance Informatique',
        'Administrateur Systèmes & Réseaux'
      ]
    },
    {
      category: 'Gestion de projet',
      roles: [
        'Chef de projet digital',
        'Product Owner',
        'Business Analyst'
      ]
    },
    {
      category: 'Marketing & Commercial',
      roles: [
        'Chargé de communication digitale',
        'Commercial B2B',
        'Community Manager'
      ]
    }
  ];

  const domains = [
    {
      number: '01',
      title: 'Applications Web & Mobile',
      description: 'Solutions sur mesure, progressive web apps, applications natives et hybrides.'
    },
    {
      number: '02',
      title: 'Transformation Digitale',
      description: 'ERP, CRM, plateformes métiers et systèmes d\'information innovants.'
    },
    {
      number: '03',
      title: 'Intelligence Artificielle',
      description: 'Machine learning, chatbots, analyse prédictive et automatisation intelligente.'
    },
    {
      number: '04',
      title: 'E-commerce & Fintech',
      description: 'Boutiques en ligne, paiements sécurisés, solutions bancaires et portefeuilles électroniques.'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                CARRIÈRE · OFARO TECH
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                Construire l&apos;avenir,{' '}
                <span className="italic text-blue-600">ensemble</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Depuis 2020, <strong className="font-semibold text-gray-900">OFARO TECH</strong> réunit développeurs, 
                designers et experts autour de projets qui transforment le Togo, l&apos;Afrique de l&apos;Ouest et 
                l&apos;espace numérique mondial. Rejoignez une équipe où l&apos;excellence technique rime avec impact concret.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link 
                  href="#candidature"
                  className="group inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium"
                >
                  Déposer ma candidature
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                
                <Link 
                  href="#profils"
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 font-medium"
                >
                  Découvrir les postes
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <FaCode className="w-24 h-24 mx-auto mb-4 opacity-90" />
                    <p className="text-2xl font-bold mb-2">L&apos;équipe OFARO TECH</p>
                    <p className="text-lg opacity-90">Développeurs · Designers · Experts</p>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 bg-gray-900/90 backdrop-blur text-white px-4 py-2 rounded-lg text-sm font-medium">
                  🚀 OFARO TECH · Lomé, Togo
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 mb-2 tracking-wide uppercase">
              01 · Pourquoi nous rejoindre
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Un cadre pour <span className="italic text-blue-600">grandir</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div 
                key={index}
                className="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-100"
              >
                <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                  {advantage.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 mb-2 tracking-wide uppercase">
              02 · Notre culture
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Les valeurs qui nous <span className="italic text-blue-600">rassemblent</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className="group p-6 rounded-xl bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="text-3xl font-bold text-gray-200 group-hover:text-blue-600 transition-colors mb-3">
                  {value.number}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profiles Section */}
      <section id="profils" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Les profils que nous <span className="italic text-blue-600">recherchons</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Profils recherchés */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="inline-block bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-700 mb-6">
                A
              </div>
              <h3 className="text-2xl font-bold mb-3">
                Profils <span className="italic text-blue-600">recherchés</span>
              </h3>
              <p className="text-gray-600 mb-8">
                Différents niveaux d&apos;expertise, adaptés à la nature et aux enjeux de chaque projet.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                  <span className="text-xs text-gray-500">— NIVEAUX</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200">
                    Junior
                  </span>
                  <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200">
                    Confirmé
                  </span>
                  <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200">
                    Senior
                  </span>
                  <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200">
                    Expert
                  </span>
                </div>
              </div>
            </div>

            {/* Domaines */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="inline-block bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-700 mb-6">
                B
              </div>
              <h3 className="text-2xl font-bold mb-3">
                Dans les <span className="italic text-blue-600">domaines</span>
              </h3>
              <p className="text-gray-600 mb-8">
                Quatre champs d&apos;intervention où s&apos;exerce notre savoir-faire pluridisciplinaire.
              </p>

              <div className="space-y-4">
                {domains.map((domain, index) => (
                  <div key={index} className="flex gap-4">
                    <span className="text-sm font-semibold text-gray-400 flex-shrink-0">
                      {domain.number}
                    </span>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{domain.title}</h4>
                      <p className="text-sm text-gray-600">{domain.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Profiles */}
          <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {profiles.map((profile, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaBriefcase className="w-5 h-5 text-blue-600" />
                  {profile.category}
                </h4>
                <ul className="space-y-3">
                  {profile.roles.map((role, roleIndex) => (
                    <li key={roleIndex} className="flex items-start gap-2 text-gray-700">
                      <FaBolt className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>{role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Formation Section */}
          <div className="mt-16 bg-gradient-to-br from-blue-50 to-purple-50 p-8 lg:p-12 rounded-2xl max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-white p-3 rounded-lg">
                <FaGraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-600 mb-2 tracking-wide uppercase">
                  Formation & insertion professionnelle
                </p>
                <h3 className="text-2xl font-bold text-gray-900">
                  Étudiants, jeunes diplômés : un tremplin chez OFARO TECH
                </h3>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-xl">
                <FaBullseye className="w-8 h-8 text-blue-600 mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">Stage</h4>
                <p className="text-sm text-gray-600">
                  3 à 6 mois pour découvrir le métier et contribuer à de vrais projets.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <FaUsers className="w-8 h-8 text-blue-600 mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">Alternance</h4>
                <p className="text-sm text-gray-600">
                  Formation en entreprise, montée en compétences progressive.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <FaAward className="w-8 h-8 text-blue-600 mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">Premier emploi</h4>
                <p className="text-sm text-gray-600">
                  Accompagnement personnalisé et parcours d&apos;intégration structuré.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="candidature" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Left Info */}
              <div className="lg:col-span-2">
                <p className="text-sm font-semibold text-blue-600 mb-4 tracking-wide uppercase">
                  04 · Candidature
                </p>
                <h2 className="text-4xl font-bold mb-6">
                  Soumettez votre <span className="italic text-blue-600">profil</span>
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Quelques informations suffisent. Notre équipe étudie chaque candidature avec attention 
                  et revient vers vous dans les meilleurs délais.
                </p>

                <div className="space-y-4 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">📍 Siège OFARO TECH</p>
                      <p>Lomé, Togo</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">✉️ Email</p>
                      <a href="mailto:rh@ofarotech.com" className="text-blue-600 hover:underline">
                        rh@ofarotech.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">📞 Téléphone</p>
                      <a href="tel:+22892345678" className="text-blue-600 hover:underline">
                        +228 92 34 56 78
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form */}
              <div className="lg:col-span-3">
                <form className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
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
                    />
                  </div>

                  <div>
                    <label htmlFor="cv" className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                      Lien vers votre CV (Google Drive, Dropbox, WeTransfer...)
                    </label>
                    <input
                      type="url"
                      id="cv"
                      name="cv"
                      placeholder="https://drive.google.com/..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Hébergez votre CV en ligne et collez le lien partageable. Pensez à autoriser l&apos;accès en lecture.
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
                    className="w-full group bg-gray-900 text-white py-4 rounded-lg hover:bg-blue-600 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                  >
                    Envoyer ma candidature
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <FaHeart className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Prêt à rejoindre l&apos;aventure ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Que vous soyez développeur passionné, designer créatif ou chef de projet ambitieux, 
            OFARO TECH vous offre un environnement stimulant pour exceller.
          </p>
          <Link 
            href="#candidature"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold"
          >
            Postuler maintenant
            <FaChartLine className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
