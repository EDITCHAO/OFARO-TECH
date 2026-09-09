# Guide : Système d'Images pour les Offres d'Emploi et de Stage

## 📋 Vue d'ensemble

Ce guide explique comment utiliser le nouveau système d'images pour les offres d'emploi et de stage sur le site OFARO TECH.

## 🎨 Design

Le design s'inspire des cartes d'événements modernes avec :
- ✅ Image en haut de chaque carte
- ✅ Badges colorés (type de contrat, mode de travail, urgent)
- ✅ Informations clés avec icônes
- ✅ Effet hover avec animation
- ✅ Compteur de jours restants
- ✅ Design responsive (mobile, tablette, desktop)

## 🗂️ Structure des fichiers créés

### Backend
- `database/schema.sql` - Schéma mis à jour avec champs image
- `database/migrations/add_images_to_offers.sql` - Migration pour ajouter les colonnes
- `src/controllers/jobs.controller.js` - Contrôleur avec support image
- `src/controllers/internships.controller.js` - Contrôleur offres de stage
- `src/routes/jobs.routes.js` - Routes API jobs
- `src/routes/internships.routes.js` - Routes API stages

### Frontend
- `components/offers/OfferCard.tsx` - Composant carte moderne
- `components/offers/OffersGrid.tsx` - Grille responsive
- `app/carrieres/page.tsx` - Page carrières avec filtres
- `app/stages/page.tsx` - Page stages avec filtres
- `public/images/offers/` - Dossier pour les images

## 🚀 Mise en place

### 1. Exécuter la migration SQL

```sql
-- Dans Supabase SQL Editor ou votre outil PostgreSQL
-- Exécuter le fichier : database/migrations/add_images_to_offers.sql
```

Cette migration :
- Ajoute `image_url` et `image_alt` à la table `job_offers`
- Crée la table `internship_offers` avec support image
- Insère des données de test avec images

### 2. Ajouter les images

Placez vos images dans `/public/images/offers/` :

```
public/
  └── images/
      └── offers/
          ├── default-job-offer.jpg
          ├── default-internship-offer.jpg
          ├── fullstack-developer.jpg
          ├── web-development-internship.jpg
          └── ...
```

**Spécifications images :**
- Format : JPG ou PNG
- Dimensions : 800x600px (ratio 4:3)
- Poids : < 500KB
- Optimisées pour le web

### 3. Configuration de l'API

Assurez-vous que `NEXT_PUBLIC_API_URL` est défini dans `.env.local` :

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 📡 Endpoints API

### Offres d'emploi

```
GET /api/jobs/active
- Récupère toutes les offres d'emploi publiées et actives
- Retourne : liste avec image_url, image_alt, etc.

GET /api/jobs/:id
- Récupère une offre d'emploi spécifique
- Retourne : détails complets avec image
```

### Offres de stage

```
GET /api/internships/offers
- Récupère toutes les offres de stage publiées et actives
- Retourne : liste avec image_url, image_alt, etc.

GET /api/internships/offers/:id
- Récupère une offre de stage spécifique
- Retourne : détails complets avec image
```

## 💾 Ajouter une offre avec image

### Dans Supabase (ou votre DB)

**Offre d'emploi :**

```sql
INSERT INTO job_offers (
    reference,
    title,
    department,
    contract_type,
    location,
    work_mode,
    image_url,
    image_alt,
    description,
    missions,
    required_skills,
    profile,
    education_level,
    experience_level,
    publication_date,
    application_deadline,
    status
) VALUES (
    'JOB-2025-002',
    'Développeur Mobile React Native',
    'Département Technique',
    'CDI',
    'Lomé, Togo',
    'Hybride',
    '/images/offers/mobile-developer.jpg',
    'Développeur mobile sur smartphone',
    'Nous recherchons un développeur mobile passionné...',
    '- Développer des applications mobiles cross-platform\n- Intégrer des API REST\n- Optimiser les performances',
    '- React Native, JavaScript/TypeScript\n- Redux, React Navigation\n- Git, Agile',
    'Développeur avec 2+ ans d''expérience en mobile',
    'Licence en Informatique',
    '2-4 ans',
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '30 days',
    'publiee'
);
```

**Offre de stage :**

```sql
INSERT INTO internship_offers (
    reference,
    title,
    department,
    duration,
    location,
    work_mode,
    image_url,
    image_alt,
    description,
    missions,
    required_skills,
    profile,
    education_level,
    benefits,
    publication_date,
    application_deadline,
    start_date,
    status
) VALUES (
    'STAGE-2025-002',
    'Stage en Cybersécurité',
    'Département Sécurité',
    '6 mois',
    'Lomé, Togo',
    'Présentiel',
    '/images/offers/cybersecurity-internship.jpg',
    'Spécialiste en cybersécurité',
    'Stage de découverte de la cybersécurité...',
    '- Tests de pénétration\n- Audits de sécurité\n- Veille technologique',
    '- Bases en réseaux et sécurité\n- Linux, Python\n- Curiosité et rigueur',
    'Étudiant en informatique passionné par la sécurité',
    'Licence 3 ou Master 1',
    '- Formation certifiante\n- Encadrement expert\n- Matériel fourni',
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '45 days',
    CURRENT_DATE + INTERVAL '60 days',
    'publiee'
);
```

## 🎯 Fonctionnalités

### Page Carrières (`/carrieres`)
- Liste de toutes les offres d'emploi
- Filtres : recherche, type de contrat, localisation
- Design avec images
- Badge "Urgent" pour les offres expirant dans 7 jours

### Page Stages (`/stages`)
- Liste de toutes les offres de stage
- Filtres : recherche, durée, localisation
- Section avantages des stages
- Badge "Stage" violet

### Composant OfferCard
- Image responsive avec fallback
- Badges dynamiques
- Informations clés avec icônes
- Effet hover élégant
- Calcul automatique des jours restants
- Support dark overlay sur image

## 📱 Responsive

Le design est entièrement responsive :
- **Mobile** : 1 colonne
- **Tablette** : 2 colonnes
- **Desktop** : 3 colonnes

## 🎨 Personnalisation

### Couleurs par type
- **Emploi** : Orange (#EA580C)
- **Stage** : Violet (#9333EA)
- **CDI** : Bleu (#2563EB)
- **Remote** : Vert (#16A34A)
- **Urgent** : Rouge (#DC2626)

### Modifier les couleurs

Éditez les composants :
- `OfferCard.tsx` : badges et effets
- `page.tsx` : en-têtes et sections

## 🔍 SEO et Accessibilité

✅ Images avec attribut `alt` descriptif
✅ Structure sémantique HTML
✅ Optimisation Next.js Image
✅ Lazy loading automatique
✅ Aria labels sur les filtres

## 📊 Images suggérées

Pour un meilleur rendu, utilisez des images qui représentent :

**Emplois :**
- Personnes travaillant sur ordinateur
- Bureaux modernes
- Équipes en collaboration
- Technologies (code, serveurs, etc.)

**Stages :**
- Étudiants en formation
- Environnement d'apprentissage
- Mentorat
- Travail d'équipe

## 🛠️ Maintenance

### Ajouter une nouvelle image

1. Optimisez l'image (TinyPNG, Squoosh)
2. Placez-la dans `/public/images/offers/`
3. Référencez-la dans la base de données : `/images/offers/nom-fichier.jpg`

### Modifier une offre existante

```sql
UPDATE job_offers 
SET 
    image_url = '/images/offers/nouvelle-image.jpg',
    image_alt = 'Description de la nouvelle image'
WHERE id = 1;
```

## 🐛 Dépannage

### L'image ne s'affiche pas
- Vérifiez le chemin : doit commencer par `/images/offers/`
- Vérifiez que le fichier existe dans `/public/images/offers/`
- Vérifiez les permissions du fichier

### Erreur API
- Vérifiez que le backend tourne sur le bon port
- Vérifiez `NEXT_PUBLIC_API_URL` dans `.env.local`
- Vérifiez les logs backend pour les erreurs SQL

### Migration SQL échoue
- Vérifiez que les tables existent
- Exécutez d'abord le schéma complet si nécessaire
- Vérifiez les permissions PostgreSQL

## 📞 Support

Pour toute question sur ce système, contactez l'équipe technique OFARO TECH.

---

**Version :** 1.0  
**Date :** 2025-02-04  
**Auteur :** OFARO TECH Development Team
