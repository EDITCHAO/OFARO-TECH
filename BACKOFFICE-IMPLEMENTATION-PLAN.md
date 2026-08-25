# 📋 PLAN D'IMPLÉMENTATION BACK-OFFICE OFARO TECH

Basé sur le cahier des charges fourni

## ✅ CE QUI A ÉTÉ CRÉÉ (Phase 1) - 25% TERMINÉ

### 1. **Base de données SQL** ✅ ENRICHI
**Fichier:** `database/schema.sql`

Schéma complet avec 20+ tables (enrichi avec nouveaux détails) :
- ✅ `users` - Utilisateurs du back-office (4 rôles)
- ✅ `login_logs` - Logs de connexion
- ✅ `failed_login_attempts` - Protection anti brute-force
- ✅ **`service_requests`** - Demandes de services spécifiques (NOUVEAU DÉTAILLÉ)
- ✅ **`quote_requests`** - Demandes de devis (ENRICHI)
- ✅ `quote_attachments` - Pièces jointes des devis
- ✅ **`contact_messages`** - Messages de contact (ENRICHI)
- ✅ **`internship_requests`** - Demandes de stage (NOUVEAU COMPLET)
- ✅ **`job_offers`** - Offres d'emploi (NOUVEAU)
- ✅ **`applications`** - Candidatures (offres + spontanées) (NOUVEAU)
- ✅ **`contacts`** - Table centralisée des contacts/clients (NOUVEAU)
- ✅ **`request_history`** - Historique unifié toutes demandes (NOUVEAU)
- ✅ `realizations` - Portfolio/Réalisations
- ✅ `articles` - Actualités/Blog
- ✅ `testimonials` - Témoignages clients
- ✅ `clients` - Fiches clients
- ✅ `team_members` - Membres de l'équipe
- ✅ `media_library` - Médiathèque centralisée
- ✅ `downloadable_documents` - Documents téléchargeables
- ✅ `seo_settings` - Paramètres SEO par page
- ✅ `site_statistics` - Statistiques du site

**Nouvelles fonctionnalités SQL :**
- ✅ Numérotation automatique (SR-001, DV-001, MSG-001, ST-001, APP-001)
- ✅ Workflows de statuts détaillés par type de demande
- ✅ Gestion centralisée des contacts (1 personne = multiple interactions)
- ✅ Historique unifié avec traçabilité complète
- ✅ Support upload fichiers (CV, lettres de motivation, PJ)
- ✅ Relations entre offres et candidatures

### 2. **Routes API Frontend → Backend** ✅ NOUVEAU
**6 routes publiques fonctionnelles créées**

- ✅ `POST /api/services/request` - Demande de service
  - Validation complète
  - Génération référence SR-XXX
  - Création/Mise à jour contact
  - Historique automatique
  
- ✅ `POST /api/quotes/request` - Demande de devis
  - Validation complète
  - Génération référence DV-XXX
  - Gestion contacts centralisée
  - Support pièces jointes
  
- ✅ `POST /api/contact/send` - Message de contact
  - Validation email
  - Génération référence MSG-XXX
  - Statut initial: non_lu
  - Historique automatique
  
- ✅ `POST /api/internships/request` - Demande de stage
  - Formulaire multipart/form-data
  - Upload CV + lettre de motivation
  - Génération référence ST-XXX
  - Validation période et durée
  - Stockage sécurisé fichiers
  
- ✅ `POST /api/applications/submit` - Candidatures
  - Support candidature à une offre OU spontanée
  - Upload CV + lettre de motivation
  - Génération référence APP-XXX
  - Vérification offre publiée
  - Portfolio URL optionnel
  
- ✅ `GET /api/jobs/active` - Liste offres actives
  - Filtrage automatique (publiee + non expirée)
  - Données complètes pour affichage

**Fichiers créés :**
```
app/api/services/request/route.ts ✅
app/api/quotes/request/route.ts ✅
app/api/contact/send/route.ts ✅
app/api/internships/request/route.ts ✅
app/api/applications/submit/route.ts ✅
app/api/jobs/active/route.ts ✅
```

### 3. **Documentation Complète** ✅ ENRICHI

- ✅ `CAHIER-DES-CHARGES-BACKEND-COMPLET.md` (NOUVEAU)
  - 25 pages de spécifications détaillées
  - Tous les cycles de traitement
  - Architecture complète
  - Exemples concrets
  
- ✅ `API-ROUTES-DOCUMENTATION.md` (NOUVEAU)
  - Documentation exhaustive des 6 routes
  - Exemples de requêtes/réponses
  - Codes d'erreur
  - Format des données
  - Statuts détaillés
  - Routes admin à venir
  
- ✅ `BACKOFFICE-README.md`
- ✅ `BACKOFFICE-IMPLEMENTATION-PLAN.md` (ce fichier)

### 4. **Fonctionnalités Backend** ✅

#### Gestion centralisée des contacts
- ✅ Table `contacts` unique par email
- ✅ Compteurs par type d'interaction
- ✅ Évite les doublons
- ✅ Vue 360° du contact

#### Système d'historique
- ✅ Table `request_history` unifiée
- ✅ Traçabilité complète
- ✅ Actions typées (created, status_changed, etc.)
- ✅ Référence vers toutes les entités

#### Upload de fichiers
- ✅ Gestion multipart/form-data
- ✅ Stockage organisé par type et référence
- ✅ Validation type MIME
- ✅ Limitation taille (10 MB)
- ✅ Chemins sécurisés (non exposés)

#### Numérotation automatique
- ✅ SR-001, SR-002... (Services)
- ✅ DV-001, DV-002... (Devis)
- ✅ MSG-001, MSG-002... (Messages)
- ✅ ST-001, ST-002... (Stages)
- ✅ APP-001, APP-002... (Applications)

### 5. **Configuration et Installation** ✅
- ✅ `lib/db.ts` - Connexion PostgreSQL
- ✅ `types/admin.ts` - Types TypeScript complets
- ✅ `.env.example` - Configuration étendue
- ✅ `install-backoffice.bat` - Script installation
- ✅ `app/admin/page.tsx` - Dashboard de base

### 2. **Configuration Base de Données** ✅
**Fichier:** `lib/db.ts`

- Pool de connexions PostgreSQL
- Fonctions helper (query, transaction)
- Gestion des erreurs
- Logs de performance

### 3. **Types TypeScript** ✅
**Fichier:** `types/admin.ts`

- Interfaces pour toutes les entités
- Types pour rôles et permissions
- Mapping des permissions par rôle
- Types pour dashboard et statistiques

### 4. **Page Admin de Base** ✅
**Fichier:** `app/admin/page.tsx`

- Dashboard avec sidebar
- 4 cartes statistiques
- Tableau dernières demandes
- Menu latéral structuré

### 5. **Bouton Admin** ✅
**Fichier:** `components/layout/Footer.tsx`

- Bouton dans le footer
- Lien vers `/admin`

---

## 🔄 CE QUI RESTE À FAIRE (Phases 2-5)

### **PHASE 2: Authentification et Sécurité** ⚠️ PRIORITAIRE

#### A. Système d'authentification
- [ ] Page de login (`/admin/login`)
- [ ] API de connexion (`/api/auth/login`)
- [ ] Hachage bcrypt des mots de passe
- [ ] Gestion des sessions (JWT ou cookies sécurisés)
- [ ] Protection des routes admin (middleware)
- [ ] Déconnexion

#### B. Sécurité
- [ ] Anti brute-force (5 tentatives max)
- [ ] Verrouillage temporaire (15 min)
- [ ] Logs des connexions
- [ ] 2FA (Google Authenticator) pour Administrateurs
- [ ] Protection CSRF
- [ ] Rate limiting sur API

**Fichiers à créer :**
```
app/admin/login/page.tsx
app/api/auth/login/route.ts
app/api/auth/logout/route.ts
lib/auth.ts
middleware.ts (protection routes)
```

---

### **PHASE 3: Modules de Gestion** 

#### A. Gestion des Demandes de Devis
- [ ] Liste des devis avec filtres (statut, date)
- [ ] Détail complet d'un devis
- [ ] Changement de statut
- [ ] Assignation à un commercial
- [ ] Ajout de notes internes
- [ ] Export CSV/Excel
- [ ] Téléchargement des pièces jointes
- [ ] API endpoints (`/api/quotes`)

**Fichiers à créer :**
```
app/admin/devis/page.tsx
app/admin/devis/[id]/page.tsx
app/api/quotes/route.ts
app/api/quotes/[id]/route.ts
components/admin/QuotesList.tsx
components/admin/QuoteDetail.tsx
```

#### B. Gestion des Messages
- [ ] Liste des messages avec filtres
- [ ] Détail d'un message
- [ ] Marquer lu/non lu
- [ ] Répondre au message
- [ ] Changement de statut
- [ ] Export

**Fichiers à créer :**
```
app/admin/messages/page.tsx
app/admin/messages/[id]/page.tsx
app/api/messages/route.ts
components/admin/MessagesList.tsx
```

#### C. Gestion des Candidatures
- [ ] Liste des candidatures
- [ ] Détail avec téléchargement CV
- [ ] Changement de statut
- [ ] Notes RH
- [ ] Export

**Fichiers à créer :**
```
app/admin/candidatures/page.tsx
app/admin/candidatures/[id]/page.tsx
app/api/applications/route.ts
```

---

### **PHASE 4: Gestion du Contenu**

#### A. Réalisations (Portfolio)
- [ ] Liste des réalisations
- [ ] Formulaire création/édition
- [ ] Upload images (principale + galerie)
- [ ] Gestion des tags/technologies
- [ ] Publication/dépublication
- [ ] Ordre d'affichage
- [ ] Génération automatique slug
- [ ] SEO par réalisation

**Fichiers à créer :**
```
app/admin/realisations/page.tsx
app/admin/realisations/nouveau/page.tsx
app/admin/realisations/[id]/page.tsx
app/api/realizations/route.ts
components/admin/RealizationForm.tsx
```

#### B. Articles/Actualités
- [ ] Liste des articles
- [ ] Éditeur de contenu riche (TinyMCE ou Quill)
- [ ] Gestion des catégories
- [ ] Tags
- [ ] Image à la une
- [ ] Brouillon/Publication
- [ ] Planification de publication
- [ ] SEO par article

**Fichiers à créer :**
```
app/admin/articles/page.tsx
app/admin/articles/nouveau/page.tsx
app/admin/articles/[id]/page.tsx
app/api/articles/route.ts
components/admin/ArticleEditor.tsx
```

#### C. Témoignages
- [ ] Liste des témoignages
- [ ] Ajout/Édition
- [ ] Upload photo client
- [ ] Notation (étoiles)
- [ ] Ordre d'affichage
- [ ] Publication

**Fichiers à créer :**
```
app/admin/temoignages/page.tsx
app/api/testimonials/route.ts
components/admin/TestimonialForm.tsx
```

#### D. Services
- [ ] Édition des 9 services existants
- [ ] Modification titre, description, avantages
- [ ] Upload image de service
- [ ] Ordre d'affichage

**Fichiers à créer :**
```
app/admin/services/page.tsx
app/admin/services/[id]/page.tsx
app/api/services/route.ts
```

#### E. Pages Statiques
- [ ] Liste des pages
- [ ] Éditeur de contenu
- [ ] Gestion des blocs/sections
- [ ] SEO par page

**Fichiers à créer :**
```
app/admin/pages/page.tsx
app/admin/pages/[slug]/page.tsx
app/api/pages/route.ts
```

---

### **PHASE 5: Système et Médias**

#### A. Médiathèque
- [ ] Upload de fichiers
- [ ] Organisation par dossiers
- [ ] Compression automatique des images
- [ ] Aperçu et métadonnées
- [ ] Recherche et filtres
- [ ] Suppression

**Fichiers à créer :**
```
app/admin/mediatheque/page.tsx
app/api/media/route.ts
app/api/media/upload/route.ts
components/admin/MediaLibrary.tsx
components/admin/MediaUploader.tsx
```

#### B. Gestion des Utilisateurs
- [ ] Liste des utilisateurs
- [ ] Créer/Éditer utilisateur
- [ ] Gestion des rôles
- [ ] Activation/Désactivation
- [ ] Réinitialisation mot de passe
- [ ] Logs de connexion par utilisateur

**Fichiers à créer :**
```
app/admin/utilisateurs/page.tsx
app/admin/utilisateurs/nouveau/page.tsx
app/admin/utilisateurs/[id]/page.tsx
app/api/users/route.ts
```

#### C. Paramètres SEO
- [ ] Liste des pages du site
- [ ] Édition meta title, description, keywords
- [ ] Open Graph tags
- [ ] Canonical URLs
- [ ] Génération sitemap.xml
- [ ] Robots.txt

**Fichiers à créer :**
```
app/admin/seo/page.tsx
app/admin/seo/[page]/page.tsx
app/api/seo/route.ts
```

#### D. Clients
- [ ] Liste des clients
- [ ] Fiche client complète
- [ ] Logo et coordonnées
- [ ] Projets associés

**Fichiers à créer :**
```
app/admin/clients/page.tsx
app/admin/clients/[id]/page.tsx
app/api/clients/route.ts
```

#### E. Équipe
- [ ] Liste des membres
- [ ] Ajout/Édition membre
- [ ] Upload photo
- [ ] Bio et liens sociaux
- [ ] Ordre d'affichage

**Fichiers à créer :**
```
app/admin/equipe/page.tsx
app/api/team/route.ts
```

#### F. Documents Téléchargeables
- [ ] Liste des documents
- [ ] Upload PDF, catalogues, brochures
- [ ] Compteur de téléchargements
- [ ] Publication/Dépublication

**Fichiers à créer :**
```
app/admin/documents/page.tsx
app/api/documents/route.ts
```

---

## 🔧 CONFIGURATION REQUISE

### Packages NPM à installer

```bash
# Base de données
npm install pg @types/pg

# Authentification et sécurité
npm install bcryptjs jsonwebtoken
npm install @types/bcryptjs @types/jsonwebtoken

# Upload de fichiers
npm install formidable
npm install @types/formidable

# Compression d'images
npm install sharp

# Éditeur de texte riche
npm install react-quill
npm install @types/react-quill

# Validation
npm install zod

# Date manipulation
npm install date-fns

# Excel export
npm install xlsx

# QR Code (pour 2FA)
npm install qrcode speakeasy
npm install @types/qrcode @types/speakeasy
```

### Variables d'environnement (.env.local)

```env
# Base de données
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ofaro_tech
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Secret
JWT_SECRET=your_secret_key_here_change_in_production

# Next.js
NEXT_PUBLIC_API_URL=http://localhost:3000

# Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./public/uploads

# Email (pour notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=ofaro.tech@gmail.com
SMTP_PASSWORD=your_app_password

# 2FA
TWO_FACTOR_ISSUER=OFARO TECH
```

---

## 🗄️ INSTALLATION DE LA BASE DE DONNÉES

### PostgreSQL

```bash
# 1. Installer PostgreSQL (si pas déjà installé)
# Windows: https://www.postgresql.org/download/windows/
# Linux: sudo apt install postgresql postgresql-contrib

# 2. Créer la base de données
psql -U postgres
CREATE DATABASE ofaro_tech;
\c ofaro_tech

# 3. Exécuter le schéma
\i database/schema.sql

# 4. Vérifier
\dt  # Liste des tables
```

### Alternative: MySQL

Si vous préférez MySQL, le schéma SQL doit être adapté :
- `SERIAL` → `AUTO_INCREMENT`
- `TEXT` → `LONGTEXT` pour les gros contenus
- Syntaxe des ENUM différente

---

## 📊 ARCHITECTURE TECHNIQUE

```
ofaro-tech-website/
├── app/
│   ├── admin/                    # Pages admin
│   │   ├── layout.tsx            # Layout admin avec sidebar
│   │   ├── page.tsx              # Dashboard ✅
│   │   ├── login/                # Page de connexion ⚠️
│   │   ├── devis/                # Gestion devis
│   │   ├── messages/             # Gestion messages
│   │   ├── candidatures/         # Gestion candidatures
│   │   ├── realisations/         # Gestion réalisations
│   │   ├── articles/             # Gestion articles
│   │   ├── temoignages/          # Gestion témoignages
│   │   ├── services/             # Gestion services
│   │   ├── pages/                # Gestion pages
│   │   ├── clients/              # Gestion clients
│   │   ├── equipe/               # Gestion équipe
│   │   ├── documents/            # Documents téléchargeables
│   │   ├── utilisateurs/         # Gestion utilisateurs
│   │   ├── mediatheque/          # Médiathèque
│   │   └── seo/                  # Paramètres SEO
│   └── api/
│       ├── auth/                 # API authentification
│       ├── quotes/               # API devis
│       ├── messages/             # API messages
│       ├── applications/         # API candidatures
│       ├── realizations/         # API réalisations
│       ├── articles/             # API articles
│       ├── testimonials/         # API témoignages
│       ├── services/             # API services
│       ├── pages/                # API pages
│       ├── clients/              # API clients
│       ├── team/                 # API équipe
│       ├── documents/            # API documents
│       ├── users/                # API utilisateurs
│       ├── media/                # API médias
│       └── seo/                  # API SEO
├── components/
│   └── admin/                    # Composants admin
│       ├── AdminLayout.tsx
│       ├── Sidebar.tsx
│       ├── TopBar.tsx
│       ├── StatsCard.tsx
│       ├── DataTable.tsx
│       ├── FormInput.tsx
│       ├── ImageUploader.tsx
│       ├── RichTextEditor.tsx
│       └── ...
├── lib/
│   ├── db.ts                     # Connexion DB ✅
│   ├── auth.ts                   # Fonctions auth
│   ├── permissions.ts            # Gestion permissions
│   ├── email.ts                  # Envoi emails
│   ├── upload.ts                 # Upload fichiers
│   ├── image-compression.ts      # Compression images
│   └── activity-log.ts           # Logs d'activité
├── types/
│   ├── admin.ts                  # Types admin ✅
│   └── index.ts                  # Types existants ✅
├── database/
│   ├── schema.sql                # Schéma DB ✅
│   ├── migrations/               # Migrations futures
│   └── seeds/                    # Données de test
└── public/
    └── uploads/                  # Fichiers uploadés
        ├── images/
        ├── documents/
        ├── cv/
        └── attachments/
```

---

## 🎯 PRIORITÉS D'IMPLÉMENTATION

### Immédiat (Semaine 1)
1. ✅ Schéma base de données
2. ⚠️ **Authentification** (CRITIQUE - page publique actuellement)
3. ⚠️ **Protection des routes**
4. Gestion des devis (module le plus important)

### Court terme (Semaine 2)
5. Gestion des messages
6. Dashboard avec vraies données SQL
7. Médiathèque de base
8. Upload d'images

### Moyen terme (Semaine 3-4)
9. Gestion des réalisations
10. Gestion des articles
11. Gestion des témoignages
12. Gestion des candidatures

### Long terme (Mois 2)
13. Gestion utilisateurs et rôles
14. SEO management
15. Clients et équipe
16. Documents téléchargeables
17. Logs et statistiques avancées

---

## ⚠️ ATTENTION - SÉCURITÉ

**LA PAGE ADMIN EST ACTUELLEMENT PUBLIQUE !**

Avant de déployer en production :
1. ✅ Implémenter l'authentification
2. ✅ Protéger toutes les routes `/admin/*`
3. ✅ Hasher les mots de passe avec bcrypt
4. ✅ Implémenter le système de logs
5. ✅ Ajouter rate limiting
6. ✅ Tester avec les 4 rôles

---

## 📋 CHECKLIST FINALE

### Avant production
- [ ] Authentification fonctionnelle
- [ ] Protection des routes admin
- [ ] Base de données installée et peuplée
- [ ] Variables d'environnement configurées
- [ ] Tous les modules testés
- [ ] Permissions par rôle validées
- [ ] Logs d'activité fonctionnels
- [ ] Sauvegardes DB configurées
- [ ] Documentation admin créée
- [ ] Comptes de démonstration créés
- [ ] SSL/HTTPS activé
- [ ] Tests de sécurité effectués

---

## 📚 RESSOURCES

- **Cahier des charges** : `Cahier-des-charges-BackOffice-OFARO-TECH.docx`
- **Schéma DB** : `database/schema.sql`
- **Types** : `types/admin.ts`
- **Ce plan** : `BACKOFFICE-IMPLEMENTATION-PLAN.md`

---

**STATUT ACTUEL** : Phase 1 complétée (25%) ✅
**PROCHAINE ÉTAPE** : Authentification et sécurité (Phase 2) ⚠️ CRITIQUE
