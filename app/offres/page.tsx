import type { Metadata } from 'next';
import Link from 'next/link';
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaArrowLeft, FaFileAlt } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Offres d\'emploi - OFARO TECH',
  description: 'Découvrez toutes nos offres d\'emploi et opportunités de carrière chez OFARO TECH.',
};

// Types pour les offres
type JobOffer = {
  id: string;
  title: string;
  category: string;
  location: string;
  type: string; // CDI, CDD, Stage, Alternance
  experience: string; // Junior, Confirmé, Senior
  description: string;
  missions: string[];
  profile: string[];
  benefits: string[];
  publishedDate: string;
};

// Données des offres d'emploi
const jobOffers: JobOffer[] = [
  {
    id: 'dev-fullstack-react-node',
    title: 'Développeur Full-Stack React/Node.js',
    category: 'Développement',
    location: 'Lomé, Togo',
    type: 'CDI',
    experience: 'Confirmé',
    description: 'Rejoignez notre équipe pour concevoir et développer des applications web modernes et performantes.',
    missions: [
      'Développer des interfaces utilisateur avec React.js',
      'Créer des APIs RESTful avec Node.js et Express',
      'Collaborer avec l\'équipe design pour implémenter les maquettes',
      'Participer aux code reviews et à l\'amélioration continue',
      'Assurer la maintenance et l\'évolution des applications existantes'
    ],
    profile: [
      '3+ ans d\'expérience en développement web',
      'Maîtrise de React.js, Node.js, TypeScript',
      'Connaissance des bases de données (PostgreSQL, MongoDB)',
      'Expérience avec Git et méthodologies agiles',
      'Bon niveau de français, anglais technique apprécié'
    ],
    benefits: [
      'Salaire attractif selon profil',
      'Projets variés et stimulants',
      'Formation continue',
      'Environnement de travail moderne',
      'Équipe internationale'
    ],
    publishedDate: '2026-08-01'
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    category: 'Design & UX',
    location: 'Lomé, Togo',
    type: 'CDI',
    experience: 'Confirmé',
    description: 'Créez des expériences utilisateur exceptionnelles pour nos clients en Afrique et à l\'international.',
    missions: [
      'Concevoir des interfaces web et mobile ergonomiques',
      'Réaliser des wireframes, maquettes et prototypes',
      'Effectuer des recherches utilisateurs et tests d\'usabilité',
      'Créer et maintenir un design system cohérent',
      'Collaborer étroitement avec l\'équipe de développement'
    ],
    profile: [
      '2-4 ans d\'expérience en design UI/UX',
      'Maîtrise de Figma, Adobe XD ou Sketch',
      'Portfolio démontrant vos réalisations',
      'Sens du détail et de l\'esthétique',
      'Capacité à travailler en équipe'
    ],
    benefits: [
      'Projets créatifs variés',
      'Outils et logiciels professionnels',
      'Formation continue',
      'Équipe design collaborative',
      'Impact direct sur les produits'
    ],
    publishedDate: '2026-07-28'
  },
  {
    id: 'chef-projet-digital',
    title: 'Chef de Projet Digital',
    category: 'Gestion de projet',
    location: 'Lomé, Togo',
    type: 'CDI',
    experience: 'Senior',
    description: 'Pilotez des projets digitaux d\'envergure pour des clients prestigieux en Afrique de l\'Ouest.',
    missions: [
      'Définir et suivre le planning, budget et ressources des projets',
      'Coordonner les équipes techniques et créatives',
      'Être l\'interface principale avec les clients',
      'Garantir la qualité et les délais de livraison',
      'Identifier et gérer les risques projet'
    ],
    profile: [
      '5+ ans d\'expérience en gestion de projets digitaux',
      'Certification PMP, Prince2 ou équivalent (apprécié)',
      'Excellente communication et leadership',
      'Maîtrise des outils de gestion de projet (Jira, Trello, etc.)',
      'Capacité à gérer plusieurs projets simultanément'
    ],
    benefits: [
      'Rémunération attractive',
      'Projets stratégiques à fort impact',
      'Autonomie et responsabilités',
      'Clients internationaux',
      'Évolution de carrière'
    ],
    publishedDate: '2026-07-25'
  },
  {
    id: 'dev-mobile-react-native',
    title: 'Développeur Mobile React Native',
    category: 'Développement',
    location: 'Lomé, Togo',
    type: 'CDI',
    experience: 'Confirmé',
    description: 'Développez des applications mobiles innovantes pour iOS et Android avec React Native.',
    missions: [
      'Concevoir et développer des applications mobiles cross-platform',
      'Optimiser les performances et l\'expérience utilisateur',
      'Intégrer des APIs et services tiers',
      'Publier sur App Store et Google Play',
      'Assurer le support et les mises à jour'
    ],
    profile: [
      '2-4 ans d\'expérience en développement mobile',
      'Expertise en React Native, JavaScript/TypeScript',
      'Connaissance de l\'écosystème mobile (push notifications, géolocalisation, etc.)',
      'Expérience avec Redux ou Context API',
      'Portfolio d\'applications publiées (apprécié)'
    ],
    benefits: [
      'Technologies modernes',
      'Projets mobile variés',
      'Formation continue',
      'Équipe technique expérimentée',
      'Flexibilité'
    ],
    publishedDate: '2026-07-20'
  },
  {
    id: 'devops-cloud-engineer',
    title: 'DevOps / Cloud Engineer',
    category: 'Infrastructure & Sécurité',
    location: 'Lomé, Togo',
    type: 'CDI',
    experience: 'Confirmé',
    description: 'Automatisez et optimisez notre infrastructure cloud pour garantir performance et fiabilité.',
    missions: [
      'Gérer et optimiser l\'infrastructure cloud (AWS, Azure, GCP)',
      'Mettre en place des pipelines CI/CD',
      'Automatiser les déploiements avec Docker, Kubernetes',
      'Monitorer les performances et la disponibilité',
      'Assurer la sécurité des systèmes'
    ],
    profile: [
      '3+ ans d\'expérience DevOps/Cloud',
      'Maîtrise d\'AWS, Azure ou Google Cloud',
      'Expérience avec Docker, Kubernetes, Terraform',
      'Connaissance des outils CI/CD (Jenkins, GitLab CI, GitHub Actions)',
      'Scripting (Bash, Python)'
    ],
    benefits: [
      'Infrastructure moderne',
      'Projets cloud stratégiques',
      'Certifications prises en charge',
      'Autonomie technique',
      'Évolution rapide'
    ],
    publishedDate: '2026-07-15'
  },
  {
    id: 'stage-dev-web',
    title: 'Stage Développement Web (6 mois)',
    category: 'Développement',
    location: 'Lomé, Togo',
    type: 'Stage',
    experience: 'Junior',
    description: 'Découvrez le développement web professionnel au sein d\'une équipe passionnée.',
    missions: [
      'Participer au développement de fonctionnalités web',
      'Apprendre les bonnes pratiques de développement',
      'Contribuer aux projets clients sous supervision',
      'Participer aux réunions d\'équipe et code reviews',
      'Documenter votre travail'
    ],
    profile: [
      'Étudiant en informatique (Bac+3 minimum)',
      'Bases en HTML, CSS, JavaScript',
      'Première expérience avec React ou Vue.js (apprécié)',
      'Motivé et curieux d\'apprendre',
      'Disponible 6 mois minimum'
    ],
    benefits: [
      'Mentorat personnalisé',
      'Projets réels',
      'Formation continue',
      'Ambiance startup',
      'Possibilité d\'embauche'
    ],
    publishedDate: '2026-07-10'
  }
];

export default function OffresPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <Link 
            href="/carrieres"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            Retour à Carrières
          </Link>

          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Nos offres d&apos;emploi
          </h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Découvrez toutes nos opportunités de carrière et trouvez le poste qui vous correspond.
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full">
              <strong>{jobOffers.length}</strong> offres disponibles
            </div>
            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full">
              📍 Lomé, Togo
            </div>
          </div>
        </div>
      </section>

      {/* Offers List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-6">
            {jobOffers.map((offer) => (
              <div 
                key={offer.id}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {offer.category}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {offer.type}
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {offer.experience}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {offer.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                        {offer.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className="w-4 h-4 text-gray-400" />
                        Publié le {new Date(offer.publishedDate).toLocaleDateString('fr-FR')}
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6">
                      {offer.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <FaBriefcase className="w-4 h-4 text-blue-600" />
                          Missions principales
                        </h4>
                        <ul className="space-y-2">
                          {offer.missions.slice(0, 3).map((mission, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-blue-600 mt-1">•</span>
                              <span>{mission}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <FaFileAlt className="w-4 h-4 text-blue-600" />
                          Profil recherché
                        </h4>
                        <ul className="space-y-2">
                          {offer.profile.slice(0, 3).map((item, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-blue-600 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 lg:min-w-[180px]">
                    <Link
                      href="/carrieres#candidature"
                      className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium text-center"
                    >
                      Postuler
                    </Link>
                    <button
                      className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 font-medium"
                    >
                      Voir détails
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Vous ne trouvez pas le poste idéal ?
              </h3>
              <p className="text-gray-600 mb-6">
                Envoyez-nous quand même votre candidature spontanée. Nous serons ravis d&apos;étudier votre profil pour de futures opportunités.
              </p>
              <Link
                href="/carrieres#candidature"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium"
              >
                Candidature spontanée
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
