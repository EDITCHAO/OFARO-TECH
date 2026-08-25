# 🔐 BACK-OFFICE OFARO TECH

Interface d'administration complète pour le site institutionnel OFARO TECH.

## 📋 Vue d'ensemble

Le back-office permet de :
- ✅ Gérer le contenu du site (pages, articles, réalisations, services)
- ✅ Traiter les demandes commerciales (devis, messages, candidatures)
- ✅ Gérer les utilisateurs et leurs permissions
- ✅ Administrer la médiathèque et les documents
- ✅ Optimiser le SEO de chaque page
- ✅ Consulter les statistiques et logs d'activité

## 🚀 Installation Rapide

### 1. Prérequis

- Node.js 18+ et npm
- PostgreSQL 14+ (ou MySQL 8+)
- Git

### 2. Installation de PostgreSQL

#### Windows
```bash
# Télécharger depuis https://www.postgresql.org/download/windows/
# Installer avec pgAdmin 4
# Noter le mot de passe du superuser postgres
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo -u postgres psql
```

### 3. Créer la base de données

```sql
-- Se connecter à PostgreSQL
psql -U postgres

-- Créer la base
CREATE DATABASE ofaro_tech;

-- Se connecter à la base
\c ofaro_tech

-- Exécuter le schéma
\i database/schema.sql

-- Vérifier
\dt
```

### 4. Installer les dépendances

```bash
npm install
```

### 5. Configurer l'environnement

```bash
# Copier le fichier exemple
cp .env.example .env.local

# Éditer .env.local avec vos informations
# Notamment DB_PASSWORD et JWT_SECRET
```

### 6. Démarrer le serveur

```bash
npm run dev
```

Le site sera accessible sur : `http://localhost:3000`  
Le back-office sera sur : `http://localhost:3000/admin`

## 🔐 Connexion Admin

### Compte par défaut

**⚠️ À CHANGER IMMÉDIATEMENT EN PRODUCTION**

```
Email: admin@ofarotech.com
Mot de passe: Admin@2025
```

## 📦 Packages NPM Requis

### Installation complète

```bash
# Base de données
npm install pg @types/pg

# Authentification
npm install bcryptjs jsonwebtoken
npm install @types/bcryptjs @types/jsonwebtoken

# Upload et images
npm install formidable sharp
npm install @types/formidable

# Éditeur de texte
npm install react-quill @types/react-quill

# Validation
npm install zod

# Utilitaires
npm install date-fns

# Export Excel
npm install xlsx

# 2FA
npm install qrcode speakeasy
npm install @types/qrcode @types/speakeasy
```

## 🏗️ Structure du Projet

```
app/
├── admin/                 # Pages back-office
│   ├── page.tsx          # Dashboard ✅
│   ├── login/            # Authentification ⚠️ À créer
│   ├── devis/            # Gestion devis
│   ├── messages/         # Gestion messages
│   ├── candidatures/     # Gestion candidatures
│   ├── realisations/     # Portfolio
│   ├── articles/         # Blog/Actualités
│   ├── temoignages/      # Témoignages
│   └── ...
├── api/                   # API Routes
│   ├── auth/             # Authentification
│   ├── quotes/           # API devis
│   ├── messages/         # API messages
│   └── ...
components/
├── admin/                 # Composants admin
│   ├── Sidebar.tsx
│   ├── TopBar.tsx
│   └── ...
lib/
├── db.ts                 # Connexion DB ✅
├── auth.ts               # Authentification
└── ...
types/
└── admin.ts              # Types TypeScript ✅
database/
└── schema.sql            # Schéma DB ✅
```

## 👥 Rôles et Permissions

### 4 profils d'accès

| Rôle | Accès |
|------|-------|
| **Administrateur** | Accès complet à tous les modules |
| **Éditeur** | Contenu uniquement (pages, articles, réalisations, médiathèque) |
| **Commercial** | Devis et messages uniquement |
| **RH** | Candidatures uniquement |

## 📊 Modules Disponibles

### ✅ Implémentés (Phase 1)

- [x] Dashboard avec statistiques
- [x] Structure de la base de données
- [x] Types TypeScript
- [x] Configuration DB

### ⚠️ En cours (Phase 2)

- [ ] Authentification et login
- [ ] Protection des routes
- [ ] Système de permissions

### 📋 À développer (Phases 3-5)

**Relation client :**
- [ ] Gestion des devis
- [ ] Gestion des messages
- [ ] Gestion des candidatures

**Contenu :**
- [ ] Réalisations (Portfolio)
- [ ] Articles/Blog
- [ ] Témoignages
- [ ] Services
- [ ] Pages statiques

**Système :**
- [ ] Utilisateurs
- [ ] Médiathèque
- [ ] SEO
- [ ] Clients
- [ ] Équipe
- [ ] Documents

## 🔒 Sécurité

### Fonctionnalités de sécurité

- ✅ Hachage des mots de passe (bcrypt)
- ✅ Protection anti brute-force
- ✅ Logs de connexion
- ✅ 2FA pour administrateurs
- ✅ Journalisation des actions
- ✅ Protection CSRF
- ✅ Rate limiting

### ⚠️ IMPORTANT

**LA PAGE ADMIN EST ACTUELLEMENT PUBLIQUE !**

Avant de déployer en production :
1. Implémenter l'authentification
2. Protéger les routes avec middleware
3. Changer le mot de passe admin par défaut
4. Activer HTTPS
5. Configurer les sauvegardes DB

## 📧 Configuration Email

Pour les notifications :

### Gmail

1. Activer la validation en 2 étapes
2. Générer un mot de passe d'application
3. Configurer dans `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=ofaro.tech@gmail.com
SMTP_PASSWORD=votre_mot_de_passe_app
```

## 🗄️ Base de Données

### Commandes utiles

```bash
# Sauvegarder
pg_dump -U postgres ofaro_tech > backup.sql

# Restaurer
psql -U postgres ofaro_tech < backup.sql

# Se connecter
psql -U postgres -d ofaro_tech

# Lister les tables
\dt

# Voir une table
\d users

# Quitter
\q
```

## 🧪 Tests

### Créer des données de test

```sql
-- Insérer un devis de test
INSERT INTO quote_requests (
  company_name, email, phone, services, project_description,
  contact_first_name, contact_last_name, status
) VALUES (
  'Entreprise Test',
  'test@example.com',
  '+228 XX XX XX XX',
  '["Développement Web","Cybersécurité"]',
  'Description du projet test',
  'Jean',
  'Dupont',
  'nouveau'
);

-- Insérer un message de test
INSERT INTO contact_messages (
  full_name, email, message
) VALUES (
  'Client Test',
  'client@example.com',
  'Message de test'
);
```

## 📚 Documentation

- **Plan d'implémentation** : `BACKOFFICE-IMPLEMENTATION-PLAN.md`
- **Cahier des charges** : `Cahier-des-charges-BackOffice-OFARO-TECH.docx`
- **Schéma DB** : `database/schema.sql`
- **Types** : `types/admin.ts`

## 🆘 Dépannage

### Problème de connexion DB

```bash
# Vérifier que PostgreSQL est démarré
sudo service postgresql status

# Démarrer PostgreSQL
sudo service postgresql start

# Vérifier les logs
tail -f /var/log/postgresql/postgresql-14-main.log
```

### Erreur "relation does not exist"

```bash
# Recréer le schéma
psql -U postgres -d ofaro_tech -f database/schema.sql
```

### Port 3000 déjà utilisé

```bash
# Changer le port dans package.json
"dev": "next dev -p 3001"
```

## 🚀 Déploiement Production

### Checklist

- [ ] Changer mot de passe admin
- [ ] Configurer variables d'environnement production
- [ ] Activer HTTPS (SSL)
- [ ] Configurer sauvegardes automatiques DB
- [ ] Tester tous les rôles
- [ ] Vérifier les logs
- [ ] Activer 2FA pour admins
- [ ] Configurer notifications email
- [ ] Tester l'upload de fichiers
- [ ] Vérifier les permissions

### Hébergement recommandé

- **Front-end** : Vercel, Netlify
- **Base de données** : Railway, Supabase, Heroku Postgres
- **Files** : AWS S3, Cloudinary

## 📞 Support

- **Email** : ofaro.tech@gmail.com
- **WhatsApp** : +228 XX XX XX XX

---

**Version** : 1.0.0 (Phase 1)  
**Dernière mise à jour** : Janvier 2025  
**Statut** : En développement (15% complété)
