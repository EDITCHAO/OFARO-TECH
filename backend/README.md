# 🚀 OFARO TECH - Backend API

Backend Node.js + Express + TypeScript + PostgreSQL

---

## ✅ STATUT

```
✅ 6 routes API fonctionnelles
✅ Upload de fichiers (CV, lettres)
✅ Gestion centralisée des contacts
✅ Historique complet
✅ Sécurité (Helmet, CORS, Rate Limiting)
✅ Validation des données
✅ Gestion des erreurs
✅ Prêt pour Render.com
```

---

## 📋 ROUTES API DISPONIBLES

| Route | Méthode | Description | Status |
|-------|---------|-------------|--------|
| `/health` | GET | Health check | ✅ |
| `/api/services/request` | POST | Demande de service | ✅ |
| `/api/quotes/request` | POST | Demande de devis | ✅ |
| `/api/contact/send` | POST | Message de contact | ✅ |
| `/api/internships/request` | POST | Demande de stage + upload | ✅ |
| `/api/applications/submit` | POST | Candidature + upload | ✅ |
| `/api/jobs/active` | GET | Liste des offres actives | ✅ |
| `/api/auth/login` | POST | Authentification | ⏳ Phase 2 |

---

## 🛠️ STACK TECHNIQUE

- **Runtime :** Node.js 18+
- **Framework :** Express 4.x
- **Langage :** TypeScript 5.x
- **Base de données :** PostgreSQL
- **Upload :** Multer
- **Validation :** Express Validator
- **Sécurité :** Helmet, CORS, Rate Limiting
- **Logs :** Morgan

---

## 🚀 DÉMARRAGE RAPIDE

### 1. Installation

```bash
npm install
```

### 2. Configuration

```bash
# Copier .env.example
copy .env.example .env

# Éditer .env avec vos valeurs
notepad .env
```

### 3. Démarrage

```bash
# Développement (avec hot reload)
npm run dev

# Production
npm run build
npm start
```

Le serveur démarre sur `http://localhost:5000`

---

## 📚 DOCUMENTATION

### Guides principaux

- **[GUIDE-RENDER-COMPLET.md](GUIDE-RENDER-COMPLET.md)** - Guide complet Render (20 pages)
- **[LANCEMENT-RENDER-RAPIDE.md](LANCEMENT-RENDER-RAPIDE.md)** - Guide rapide (5 min)
- **[BACKEND-NODE-EXPRESS-README.md](BACKEND-NODE-EXPRESS-README.md)** - Documentation technique

### Autres documents

- **[FICHIERS-A-CREER.md](FICHIERS-A-CREER.md)** - Architecture du projet
- `.env.example` - Configuration des variables

---

## 🌐 DÉPLOIEMENT SUR RENDER

### Étapes rapides

1. **Push sur GitHub**
   ```bash
   git init
   git add .
   git commit -m "Backend initial"
   git remote add origin https://github.com/USERNAME/ofaro-tech-backend.git
   git push -u origin main
   ```

2. **Sur Render.com**
   - Créer PostgreSQL (Frankfurt, Free)
   - Créer Web Service (Node, Frankfurt, Free)
   - Configurer variables d'environnement
   - Déployer !

3. **URL finale**
   ```
   https://ofaro-tech-backend.onrender.com
   ```

**Voir [LANCEMENT-RENDER-RAPIDE.md](LANCEMENT-RENDER-RAPIDE.md) pour les détails**

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
    "client_name": "Test",
    "client_email": "test@example.com",
    "client_phone": "+33612345678",
    "service_type": "Test",
    "description": "Test de l API"
  }'
```

---

## 📁 STRUCTURE DU PROJET

```
ofaro-tech-backend/
├── src/
│   ├── server.ts              # Point d'entrée
│   ├── config/
│   │   └── database.ts        # Configuration PostgreSQL
│   ├── controllers/           # Logique métier
│   │   ├── services.controller.ts
│   │   ├── quotes.controller.ts
│   │   ├── contact.controller.ts
│   │   ├── internships.controller.ts
│   │   ├── applications.controller.ts
│   │   └── jobs.controller.ts
│   ├── routes/                # Routes API
│   │   ├── services.routes.ts
│   │   ├── quotes.routes.ts
│   │   ├── contact.routes.ts
│   │   ├── internships.routes.ts
│   │   ├── applications.routes.ts
│   │   ├── jobs.routes.ts
│   │   └── auth.routes.ts
│   ├── middleware/            # Middleware
│   │   ├── error.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── rateLimit.middleware.ts
│   └── utils/
│       └── fileUpload.ts      # Upload de fichiers
├── uploads/                   # Fichiers uploadés
├── dist/                      # Build JavaScript
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

## 🔐 VARIABLES D'ENVIRONNEMENT

### Minimum requis

```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=ofaro_tech
DB_USER=postgres
DB_PASSWORD=votre_password

JWT_SECRET=votre_secret_unique
```

Voir `.env.example` pour toutes les variables.

---

## 🛡️ SÉCURITÉ

### Implémenté

- ✅ Helmet (Headers sécurisés)
- ✅ CORS configuré
- ✅ Rate Limiting (100 req/15min)
- ✅ Validation des données
- ✅ Gestion des erreurs
- ✅ Sanitization des entrées
- ✅ Upload de fichiers sécurisé

### À implémenter (Phase 2)

- ⏳ Authentification JWT
- ⏳ Protection routes admin
- ⏳ 2FA
- ⏳ Logs d'audit

---

## 📊 SCRIPTS NPM

```bash
# Développement
npm run dev          # Démarrer avec hot reload

# Production
npm run build        # Compiler TypeScript → JavaScript
npm start            # Démarrer en production

# Utilitaires
npm install          # Installer les dépendances
```

---

## 🤝 CONNEXION AVEC LE FRONTEND

### Configuration Frontend (Vercel)

```env
NEXT_PUBLIC_API_URL=https://ofaro-tech-backend.onrender.com
```

### Utilisation

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const response = await fetch(`${API_URL}/api/services/request`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
});
```

---

## 📈 PROGRESSION

```
████████████████████░░░░░░░░░░░░░░░░░░░░ 50%

✅ Structure backend         100%
✅ Configuration             100%
✅ 6 routes API              100%
✅ Upload fichiers           100%
✅ Validation                100%
✅ Sécurité de base          100%
⏳ Authentification          0%
⏳ Routes admin              0%
⏳ Déploiement Render        0%
```

---

## 🎯 PROCHAINES ÉTAPES

### Immédiat
1. ✅ Tester localement toutes les routes
2. ⏳ Déployer sur Render.com
3. ⏳ Configurer le frontend

### Phase 2
4. ⏳ Implémenter authentification JWT
5. ⏳ Créer routes admin
6. ⏳ Protection des routes

---

## 💬 SUPPORT

**Questions ?** Consultez :
- [GUIDE-RENDER-COMPLET.md](GUIDE-RENDER-COMPLET.md) - Guide Render
- [BACKEND-NODE-EXPRESS-README.md](BACKEND-NODE-EXPRESS-README.md) - Doc technique

---

## 📝 LICENCE

© 2026 OFARO TECH - Tous droits réservés

---

**Version :** 1.0  
**Date :** 18 août 2026  
**Status :** ✅ Production Ready
