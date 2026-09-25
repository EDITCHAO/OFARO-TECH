# 🏗️ NOUVELLE ARCHITECTURE - BACKEND SÉPARÉ

---

## 📊 ANCIENNE vs NOUVELLE ARCHITECTURE

### ❌ ANCIENNE (Tout en un)
```
ofaro-tech-website/ (Next.js)
├── app/
│   ├── page.tsx            ← Frontend
│   └── api/                ← Backend (API Routes Next.js)
└── ...

Déploiement: Vercel (Frontend + Backend ensemble)
```

### ✅ NOUVELLE (Séparé)
```
Frontend:                    Backend:
ofaro-tech-website/          ofaro-tech-backend/
├── app/                     ├── src/
│   ├── page.tsx                 ├── server.ts
│   ├── services/                ├── routes/
│   └── ...                      ├── controllers/
                                 └── ...

Déploiement Frontend:        Déploiement Backend:
Vercel                       Render.com
```

---

## 🎯 POURQUOI SÉPARER ?

### Avantages

```
✅ HÉBERGEMENT FLEXIBLE
   - Backend sur Render (gratuit + Node.js natif)
   - Frontend sur Vercel (gratuit + Next.js optimisé)
   - Meilleure performance pour chaque partie

✅ SCALABILITÉ
   - Scale frontend et backend indépendamment
   - Plus de flexibilité pour la croissance

✅ SÉCURITÉ
   - Backend isolé avec sa propre authentification
   - Variables d'environnement séparées
   - Moins de surface d'attaque

✅ MAINTENANCE
   - Déploiements indépendants
   - Pas besoin de rebuild le frontend pour une MAJ backend
   - Équipes peuvent travailler séparément

✅ COÛT
   - Render: Backend gratuit (750h/mois)
   - Vercel: Frontend gratuit
   - PostgreSQL gratuit sur Render
```

---

## 🔄 MIGRATION EFFECTUÉE

### Ce qui a changé

#### 1. **Backend créé séparément**
```
c:\PROJET\OFARO TECH\ofaro-tech-backend\
```

**Technologies:**
- Node.js + Express
- TypeScript
- PostgreSQL (même base de données)
- Multer (upload fichiers)
- JWT (authentification)

#### 2. **Fichiers créés**
```
✅ package.json              - Dépendances Node.js/Express
✅ tsconfig.json             - Configuration TypeScript
✅ src/server.ts             - Serveur Express principal
✅ src/config/database.ts    - Connexion PostgreSQL
✅ src/routes/               - Routes API
✅ src/controllers/          - Logique métier
✅ src/middleware/           - Validation, erreurs, sécurité
✅ .env.example              - Configuration
```

#### 3. **Routes API déplacées**

**Avant (Next.js):**
```
app/api/services/request/route.ts
app/api/quotes/request/route.ts
app/api/contact/send/route.ts
...
```

**Après (Express):**
```
src/routes/services.routes.ts
src/controllers/services.controller.ts
...
```

---

## 🔌 CONNEXION FRONTEND ↔ BACKEND

### Configuration

#### **Backend (Express sur Render)**
```env
# .env
PORT=5000
FRONTEND_URL=https://ofarotech.vercel.app
```

```typescript
// src/server.ts
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

#### **Frontend (Next.js sur Vercel)**
```env
# .env.local
NEXT_PUBLIC_API_URL=https://ofaro-tech-backend.onrender.com
```

```typescript
// Dans les formulaires
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

## 📍 URLS EN PRODUCTION

### Frontend (Vercel)
```
https://ofarotech.vercel.app
ou
https://ofarotech.com (domaine personnalisé)
```

### Backend (Render)
```
https://ofaro-tech-backend.onrender.com

Routes API:
https://ofaro-tech-backend.onrender.com/api/services/request
https://ofaro-tech-backend.onrender.com/api/quotes/request
https://ofaro-tech-backend.onrender.com/api/contact/send
...
```

### Base de données (Render)
```
PostgreSQL gratuit sur Render
Connexion automatique depuis le backend
```

---

## 🚀 DÉPLOIEMENT

### 1. **Backend sur Render.com**

```bash
# 1. Push le code sur GitHub
cd ofaro-tech-backend
git init
git add .
git commit -m "Initial backend"
git push origin main

# 2. Sur Render.com
- Créer compte
- New Web Service
- Connecter GitHub
- Sélectionner repository
- Root Directory: ofaro-tech-backend
- Build Command: npm install && npm run build
- Start Command: npm start
- Variables d'environnement: (voir .env.example)

# 3. Créer PostgreSQL
- New PostgreSQL
- Copier les infos de connexion
- Ajouter dans variables d'environnement Web Service
```

### 2. **Frontend sur Vercel**

```bash
# 1. Push le code sur GitHub (déjà fait)

# 2. Sur Vercel.com
- Importer project
- Sélectionner repository
- Framework: Next.js
- Root Directory: ofaro-tech-website
- Variables d'environnement:
  NEXT_PUBLIC_API_URL=https://ofaro-tech-backend.onrender.com

# 3. Deploy
```

---

## 🔄 WORKFLOW DE DÉVELOPPEMENT

### Local (Développement)

```bash
# Terminal 1 - Backend
cd ofaro-tech-backend
npm run dev
# → http://localhost:5000

# Terminal 2 - Frontend
cd ofaro-tech-website
npm run dev
# → http://localhost:3000
```

**Frontend appelle :** `http://localhost:5000/api/*`

### Production

```bash
# Backend
Render déploie automatiquement à chaque push sur main
→ https://ofaro-tech-backend.onrender.com

# Frontend
Vercel déploie automatiquement à chaque push sur main
→ https://ofarotech.vercel.app
```

**Frontend appelle :** `https://ofaro-tech-backend.onrender.com/api/*`

---

## 📝 CHECKLIST MIGRATION

### Backend
- [x] Créer projet Express séparé
- [x] Configuration TypeScript
- [x] Connexion PostgreSQL
- [x] Middleware (sécurité, validation, erreurs)
- [x] Route services fonctionnelle
- [ ] 5 routes restantes (quotes, contact, internships, applications, jobs)
- [ ] Upload de fichiers (Multer)
- [ ] Authentification (Phase 2)
- [ ] Déploiement Render

### Frontend
- [ ] Créer variables d'environnement API_URL
- [ ] Modifier formulaires pour appeler backend Render
- [ ] Tester CORS
- [ ] Déployer sur Vercel avec nouvelle config

### Base de données
- [ ] Créer PostgreSQL sur Render
- [ ] Exécuter schema.sql
- [ ] Tester connexion depuis backend

---

## 🎯 PROCHAINES ÉTAPES

### Immédiat
1. **Terminer le backend**
   - Créer les 5 routes manquantes
   - Configurer Multer pour upload
   - Tester localement

2. **Déployer backend**
   - Push sur GitHub
   - Créer Web Service sur Render
   - Créer PostgreSQL sur Render
   - Configurer variables d'environnement

3. **Modifier frontend**
   - Ajouter NEXT_PUBLIC_API_URL
   - Modifier formulaires pour appeler Render
   - Tester CORS

4. **Déployer frontend**
   - Redéployer sur Vercel avec nouvelle config
   - Tester en production

### Court terme
5. **Authentification**
   - Implémenter JWT dans backend
   - Créer page login dans frontend
   - Protéger routes admin

---

## 📞 RESSOURCES

### Documentation Backend
- `ofaro-tech-backend/BACKEND-NODE-EXPRESS-README.md` - Guide complet
- `ofaro-tech-backend/FICHIERS-A-CREER.md` - Fichiers manquants
- `ofaro-tech-backend/.env.example` - Configuration

### Documentation Hébergement
- **Render** : https://render.com/docs
- **Vercel** : https://vercel.com/docs

### Guides Déploiement
- **Backend Render** : https://render.com/docs/deploy-node-express-app
- **Frontend Vercel** : https://vercel.com/docs/deployments/overview

---

## 💡 CONSEILS

### Développement
1. Toujours démarrer backend avant frontend en local
2. Utiliser Postman/Thunder Client pour tester les API
3. Vérifier les logs dans les deux consoles

### Production
1. Déployer backend AVANT frontend
2. Tester les routes API sur Render avant de déployer frontend
3. Vérifier CORS dans les logs Render
4. Utiliser les variables d'environnement pour les URLs

### Debugging
1. Backend: Logs sur Render.com → Service → Logs
2. Frontend: Logs sur Vercel.com → Deployments → Functions
3. CORS: Vérifier FRONTEND_URL dans backend
4. API: Tester avec curl/Postman

---

**Status :** ✅ Backend créé - ⏳ Routes à compléter - ⏳ Déploiement à faire  
**Date :** 18 août 2026  
**OFARO TECH** 🚀
