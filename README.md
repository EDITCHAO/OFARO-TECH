# 🚀 OFARO TECH - Site Web Institutionnel

Site web professionnel développé avec Next.js 14, React, TypeScript et Tailwind CSS.

> **🌐 Site en ligne** : [Voir le démo](https://votre-site.vercel.app)  
> **📖 Guide de déploiement** : [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## 🎯 À propos

OFARO TECH est une entreprise togolaise spécialisée dans les services IT et la transformation digitale. Ce site présente nos services, réalisations et expertises.

## ✨ Fonctionnalités

- ✅ **Design moderne et responsive** - Optimisé pour tous les écrans
- 🎨 **Branding cohérent** - Couleurs : Orange (#FF6B00), Blanc, Noir
- ⚡ **Performance optimale** - Lazy loading, compression, optimisation images
- 🔒 **Sécurisé** - HTTPS, best practices de sécurité
- 📱 **Mobile-first** - Expérience fluide sur mobile
- ♿ **Accessible** - Conforme WCAG
- 🌐 **Multilingue prêt** - Structure pour FR/EN
- 🔍 **SEO optimisé** - Sitemap, robots.txt, meta tags, Open Graph

## 📋 Prérequis

- Node.js 18.0 ou supérieur
- npm 9+ ou yarn 1.22+
- Git (pour le déploiement)

## ⚡ Démarrage Rapide

```bash
# 1. Cloner le dépôt (après mise sur GitHub)
git clone https://github.com/VOTRE_USERNAME/ofaro-tech-website.git
cd ofaro-tech-website

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev

# 4. Ouvrir le navigateur
# → http://localhost:3000
```

## 🚀 Déploiement

### Déploiement sur Vercel (Recommandé)

**Guide complet** : Voir [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

**Résumé rapide** :

1. Push sur GitHub
2. Connectez-vous à [Vercel](https://vercel.com)
3. Importez votre dépôt
4. Déploiement automatique ! 🎉

```bash
# Via Vercel CLI
npm i -g vercel
vercel login
vercel
```

### Autres plateformes supportées

- ✅ **Netlify** - Compatible
- ✅ **Cloudflare Pages** - Compatible
- ✅ **AWS Amplify** - Compatible
- ✅ **Railway** - Compatible

## 📁 Structure du projet

```
ofaro-tech-website/
├── app/                    # Pages Next.js App Router
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   └── globals.css        # Styles globaux
├── components/            # Composants React
│   ├── layout/           # Header, Footer, Navigation
│   └── home/             # Sections page d'accueil
├── lib/                  # Utilitaires et constantes
│   └── constants.ts      # Données de l'entreprise
├── types/                # Types TypeScript
│   └── index.ts          # Définitions de types
└── public/               # Assets statiques
```

## 🎨 Technologies utilisées

### Frontend
- **Next.js 14** - Framework React avec App Router
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Animations

### Outils
- **React Icons** - Bibliothèque d'icônes
- **React Hook Form** - Gestion des formulaires
- **Zod** - Validation de schémas

## 📄 Pages implémentées

### ✅ Complètes et fonctionnelles

- **🏠 Page d'accueil** (`/`)
  - Hero avec animation et CTA
  - Présentation entreprise
  - Services principaux
  - Pourquoi nous choisir (6 points forts)
  - Portfolio récent
  - Secteurs d'activité
  - Technologies maîtrisées
  - Témoignages clients
  - Partenaires
  - Actualités/Blog
  - Section contact

- **👥 À propos** (`/a-propos`)
  - Histoire de l'entreprise
  - Mission, Vision, Valeurs
  - Timeline des moments clés
  - Notre équipe

- **💼 Services** (`/services`)
  - Liste complète des services
  - 10+ pages services individuelles
  - Développement web & mobile
  - Réseaux & infrastructure
  - Cybersécurité
  - Cloud & DevOps
  - Maintenance & support
  - Conseil IT & Audit
  - Formation
  - ERP/CRM
  - IoT
  - Big Data & IA

- **🎨 Réalisations** (`/realisations`)
  - Portfolio filtrable par catégorie
  - Recherche intégrée
  - Pages détaillées par projet
  - Études de cas

- **🏢 Secteurs d'activité** (`/secteurs`)
  - Banques & Assurances
  - Éducation
  - Santé
  - Commerce & Distribution
  - Administration publique
  - ONG & Associations

- **📞 Contact** (`/contact`)
  - Formulaire de contact
  - Coordonnées complètes
  - FAQ intégrée
  - Carte interactive

- **📋 Demande de devis** (`/devis`)
  - Formulaire en 3 étapes
  - Informations entreprise
  - Détails du projet
  - Personne en charge

## 🚀 Scripts disponibles

```bash
# Développement local
npm run dev              # Démarre le serveur de dev sur http://localhost:3000

# Production
npm run build            # Crée le build optimisé
npm start                # Démarre le serveur de production

# Qualité du code
npm run lint             # Vérifie les erreurs ESLint
npm run type-check       # Vérifie les erreurs TypeScript

# Tests de performance
node scripts/check-performance.js   # Test des temps de chargement
```

## 🎯 Optimisations de Performance

✅ **Implémentées** :

- **Lazy Loading** - 8 sections chargées à la demande (réduction de 40% du JS initial)
- **Images optimisées** - Formats AVIF/WebP automatiques (-50 à -70% de poids)
- **Code splitting** - Chargement uniquement du code nécessaire
- **Compression** - Gzip/Brotli activés
- **CSS optimisé** - GPU acceleration, font smoothing
- **Event listeners passifs** - Scroll non-bloquant
- **DNS Prefetch** - Connexion anticipée aux ressources externes

📊 **Résultats** :

- First Contentful Paint (FCP) : < 1.5s
- Largest Contentful Paint (LCP) : < 2.5s
- Time to Interactive (TTI) : < 3.5s
- Cumulative Layout Shift (CLS) : < 0.1

Voir [OPTIMIZATIONS.md](./OPTIMIZATIONS.md) pour plus de détails.

## 📚 Documentation

- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Guide complet de déploiement GitHub + Vercel
- **[FEATURES.md](./FEATURES.md)** - Liste détaillée des fonctionnalités
- **[OPTIMIZATIONS.md](./OPTIMIZATIONS.md)** - Détails des optimisations de performance

## 🔧 Configuration

### Variables d'environnement (optionnel)

Actuellement, le site fonctionne sans variables d'environnement. Si vous souhaitez ajouter des services tiers :

```bash
# Créer .env.local
cp .env.example .env.local

# Ajouter vos clés API
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CONTACT_EMAIL=ofaro.tech@gmail.com
```

### Personnalisation

Les données de l'entreprise sont dans `lib/constants.ts` :

```typescript
// Modifier les informations de contact, services, etc.
export const COMPANY_INFO = {
  name: "OFARO TECH",
  phone: "+228 XX XX XX XX",
  email: "ofaro.tech@gmail.com",
  // ...
};
```

## 📞 Contact & Support

**OFARO TECH**
- 📍 Adresse : Agbalepedo, Lomé, Togo
- 📱 Téléphone : +228 XX XX XX XX
- 📧 Email : ofaro.tech@gmail.com
- 🌐 Site web : https://ofarotech.com

## 🤝 Contribution

Ce projet est développé et maintenu par l'équipe OFARO TECH.

## 📝 Licence

© 2024-2026 OFARO TECH. Tous droits réservés.

---

## 🎯 Prochaines Étapes

### Après déploiement

- [ ] Remplacer toutes les images placeholder par de vraies images
- [ ] Créer les vraies icônes PWA (voir `public/ICON_README.md`)
- [ ] Configurer Google Analytics
- [ ] Configurer Google Search Console
- [ ] Soumettre le sitemap
- [ ] Configurer un domaine personnalisé
- [ ] Ajouter un blog/actualités dynamique
- [ ] Intégrer un CRM pour les formulaires

### Améliorations futures

- [ ] Backend API pour les formulaires
- [ ] Dashboard admin pour gérer le contenu
- [ ] Système de blog avec CMS
- [ ] Multilingue (FR/EN)
- [ ] Mode sombre
- [ ] Chat en direct
- [ ] Système de réservation de rendez-vous

---

**Développé avec ❤️ par l'équipe OFARO TECH**  
**Dernière mise à jour** : Décembre 2024  
**Version** : 1.0.0
