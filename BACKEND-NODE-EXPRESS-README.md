# 🚀 BACKEND NODE.JS + EXPRESS - OFARO TECH

Backend API indépendant pour hébergement sur **Render.com**

---

## 📋 STACK TECHNIQUE

```
✅ Node.js 18+          - Runtime JavaScript
✅ Express 4.x          - Framework web
✅ TypeScript 5.x       - Langage typé
✅ PostgreSQL           - Base de données
✅ JWT                  - Authentification
✅ Multer               - Upload de fichiers
✅ Helmet               - Sécurité HTTP
✅ CORS                 - Cross-Origin
✅ Rate Limiting        - Protection DDoS
```

---

## 📁 STRUCTURE DU PROJET

```
ofaro-tech-backend/
├── src/
│   ├── server.ts                 # Point d'entrée
│   ├── config/
│   │   └── database.ts           # Configuration PostgreSQL
│   ├── controllers/
│   │   ├── services.controller.ts
│   │   ├── quotes.controller.ts
│   │   ├── contact.controller.ts
│   │   ├── internships.controller.ts
│   │   ├── applications.controller.ts
│   │   ├── jobs.controller.ts
│   │   └── auth.controller.ts
│   ├── routes/
│   │   ├── services.routes.ts
│   │   ├── quotes.routes.ts
│   │   ├── contact.routes.ts
│   │   ├── internships.routes.ts
│   │   ├── applications.routes.ts
│   │   ├── jobs.routes.ts
│   │   └── auth.routes.ts
│   ├── middleware/
│   │   ├── error.middleware.ts
│   │   ├── validation.middleware.ts
│   │   ├── rateLimit.middleware.ts
│   │   └── auth.middleware.ts
│   ├── utils/
│   │   ├── generateReference.ts
│   │   └── fileUpload.ts
│   └── types/
│       └── index.ts
├── uploads/                      # Fichiers uploadés
├── dist/                         # Build JavaScript
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md
```

---

## 🚀 INSTALLATION

### 1. **Installer les dépendances**

```bash
cd ofaro-tech-backend
npm install
```

### 2. **Configurer les variables d'environnement**

```bash
# Copier le fichier d'exemple
copy .env.example .env

# Éditer .env avec vos valeurs
```

### 3. **Configuration .env**

```env
# Serveur
NODE_ENV=development
PORT=5000

# Frontend (pour CORS)
FRONTEND_URL=http://localhost:3000

# Base de données
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ofaro_tech
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe

# JWT
JWT_SECRET=changez_ceci_en_production
JWT_EXPIRES_IN=24h

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre_email@gmail.com
SMTP_PASS=votre_app_password
```

### 4. **Créer la base de données**

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Créer la base de données
CREATE DATABASE ofaro_tech;

# Se connecter à la base
\c ofaro_tech

# Exécuter le schéma SQL
\i ../ofaro-tech-website/database/schema.sql
```

---

## 💻 DÉMARRAGE EN DÉVELOPPEMENT

```bash
# Démarrer en mode développement (avec hot reload)
npm run dev
```

Le serveur démarre sur : `http://localhost:5000`

---

## 🏗️ BUILD POUR PRODUCTION

```bash
# Compiler TypeScript → JavaScript
npm run build

# Démarrer le serveur en production
npm start
```

---

## 📡 ROUTES API DISPONIBLES

### **Routes Publiques**

| Route | Méthode | Description |
|-------|---------|-------------|
| `/health` | GET | Health check |
| `/api/services/request` | POST | Demande de service |
| `/api/quotes/request` | POST | Demande de devis |
| `/api/contact/send` | POST | Message de contact |
| `/api/internships/request` | POST | Demande de stage |
| `/api/applications/submit` | POST | Candidature |
| `/api/jobs/active` | GET | Liste des offres |

### **Routes Authentifiées** (À implémenter)

| Route | Méthode | Description |
|-------|---------|-------------|
| `/api/auth/login` | POST | Connexion admin |
| `/api/auth/logout` | POST | Déconnexion |
| `/api/admin/*` | * | Routes administratives |

---

## 🧪 TESTER L'API

### Health Check
```bash
curl http://localhost:5000/health
```

### Demande de service
```bash
curl -X POST http://localhost:5000/api/services/request \
  -H "Content-Type: application/json" \
  -d '{
    "client_name": "Test Client",
    "client_email": "test@example.com",
    "client_phone": "+33612345678",
    "service_type": "Développement Web",
    "description": "Ceci est un test"
  }'
```

---

## 🌍 DÉPLOIEMENT SUR RENDER.COM

### 1. **Préparer le projet**

```bash
# S'assurer que le build fonctionne
npm run build

# Vérifier que dist/ est créé
ls dist/
```

### 2. **Créer un compte Render**

1. Aller sur [render.com](https://render.com)
2. Créer un compte gratuit
3. Connecter votre repository GitHub

### 3. **Créer un Web Service**

1. Cliquer sur "New +" → "Web Service"
2. Sélectionner votre repository
3. Configurer :

```
Name: ofaro-tech-backend
Region: Frankfurt (Europe)
Branch: main
Root Directory: ofaro-tech-backend
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm start
```

### 4. **Ajouter les variables d'environnement**

Dans Render, aller dans "Environment" et ajouter :

```
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://votre-site.vercel.app
DB_HOST=votre-db-host.render.com
DB_PORT=5432
DB_NAME=ofaro_tech
DB_USER=ofaro_tech_user
DB_PASSWORD=***
JWT_SECRET=***
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=***
SMTP_PASS=***
```

### 5. **Créer une base PostgreSQL sur Render**

1. Cliquer sur "New +" → "PostgreSQL"
2. Name: ofaro-tech-db
3. Region: Frankfurt
4. Plan: Free
5. Créer la base
6. Copier les informations de connexion
7. Les ajouter dans les variables d'environnement du Web Service

### 6. **Déployer**

1. Cliquer sur "Create Web Service"
2. Render va automatiquement :
   - Cloner le repository
   - Installer les dépendances
   - Builder le projet
   - Démarrer le serveur

### 7. **URL de votre API**

Après déploiement :
```
https://ofaro-tech-backend.onrender.com
```

---

## 🔧 CONFIGURATION CORS

Pour que le frontend puisse communiquer avec le backend :

### **Backend (Render)**
```typescript
// src/server.ts
app.use(cors({
  origin: 'https://votre-site.vercel.app',
  credentials: true
}));
```

### **Frontend (Next.js/Vercel)**
```typescript
// Remplacer les URLs API
const API_URL = 'https://ofaro-tech-backend.onrender.com';

// Exemple
fetch(`${API_URL}/api/services/request`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
});
```

---

## 📊 MONITORING

### Health Check
Render vérifie automatiquement `/health` toutes les 5 minutes.

### Logs
```bash
# Sur Render.com
1. Aller dans votre service
2. Onglet "Logs"
3. Voir les logs en temps réel
```

### Métriques
```bash
# Sur Render.com
1. Onglet "Metrics"
2. Voir CPU, RAM, Requêtes
```

---

## 🔐 SÉCURITÉ

### ✅ Implémenté
- Helmet (Headers sécurisés)
- CORS configuré
- Rate Limiting (100 req/15min)
- Validation des données
- Gestion des erreurs

### ⚠️ À implémenter
- Authentification JWT
- Middleware auth pour routes admin
- 2FA pour administrateurs
- Logs d'audit

---

## 🐛 TROUBLESHOOTING

### Le serveur ne démarre pas
```bash
# Vérifier Node.js
node --version  # Doit être >= 18

# Vérifier les dépendances
npm install

# Vérifier le fichier .env
cat .env
```

### Erreur de connexion à la base de données
```bash
# Tester la connexion PostgreSQL
psql -h DB_HOST -p DB_PORT -U DB_USER -d DB_NAME

# Vérifier les variables d'environnement
echo $DB_HOST
echo $DB_PORT
```

### Erreur CORS
```bash
# Vérifier FRONTEND_URL dans .env
# Doit correspondre à l'URL exacte du frontend
FRONTEND_URL=https://votre-site.vercel.app
```

---

## 📝 PROCHAINES ÉTAPES

### Phase 2 : Authentification
- [ ] Créer POST /api/auth/login
- [ ] Créer POST /api/auth/logout
- [ ] Middleware authentification JWT
- [ ] Protection routes /api/admin/*

### Phase 3 : Routes Admin
- [ ] GET /api/admin/services - Liste des demandes
- [ ] PUT /api/admin/services/:id/status - Changer statut
- [ ] POST /api/admin/services/:id/notes - Ajouter note
- [ ] ... (voir documentation complète)

---

## 📚 RESSOURCES

- **Documentation Express** : https://expressjs.com/
- **Documentation TypeScript** : https://www.typescriptlang.org/
- **Documentation Render** : https://render.com/docs
- **Documentation PostgreSQL** : https://www.postgresql.org/docs/

---

## 🆘 SUPPORT

**Questions ?** Consultez :
- `CAHIER-DES-CHARGES-BACKEND-COMPLET.md` - Spécifications
- `API-ROUTES-DOCUMENTATION.md` - Documentation API
- `BACKOFFICE-IMPLEMENTATION-PLAN.md` - Plan de développement

---

**Version :** 1.0  
**Date :** 18 août 2026  
**OFARO TECH** 🚀
