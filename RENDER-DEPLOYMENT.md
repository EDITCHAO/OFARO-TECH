# 🌐 DÉPLOIEMENT SUR RENDER.COM

---

## 🎯 CONFIGURATION COMPLÈTE RENDER

### **1. Créer le Web Service**

1. Aller sur : **https://dashboard.render.com**
2. Cliquer **"New +"** → **"Web Service"**
3. Connecter GitHub et sélectionner : **ofaro-tech-backend**

---

### **2. Configuration de base**

| Paramètre | Valeur |
|-----------|--------|
| **Name** | `ofaro-tech-backend` |
| **Region** | `Frankfurt (EU Central)` |
| **Branch** | `main` |
| **Root Directory** | *(vide)* |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Plan** | `Free` (ou `Starter` pour production) |

---

### **3. Variables d'environnement (9 variables)**

Dans **"Advanced"** → **"Environment Variables"** :

#### **Serveur**
```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://ofarotech.vercel.app
```

#### **Base de données Supabase**
```env
DB_HOST=db.rfatempjwgpznkacmhvo.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=[VOTRE_MOT_DE_PASSE_SUPABASE]
```

#### **Sécurité**
```env
JWT_SECRET=a8f5f167f44f4964e6c998dee827110c03ab9e91e4f5f167f44f4964e6c998dee827110c
```

---

### **4. Paramètres avancés (optionnels)**

#### **Auto-Deploy**
✅ Activé : Déploiement automatique à chaque push sur `main`

#### **Health Check Path**
```
/health
```

#### **Notifications**
✅ Notifications par email en cas d'échec

---

## 📋 VARIABLES D'ENVIRONNEMENT DÉTAILLÉES

### **NODE_ENV**
```
production
```
Active le mode production (logs réduits, optimisations)

---

### **PORT**
```
5000
```
Port du serveur (Render utilise ce port)

---

### **FRONTEND_URL**
```
https://ofarotech.vercel.app
```
URL du frontend pour CORS (remplacer par votre URL Vercel)

---

### **DB_HOST**
```
db.rfatempjwgpznkacmhvo.supabase.co
```
Hôte de la base de données Supabase

**⚠️ NOTE :** Pour plus de connexions simultanées, utilisez le **Connection Pooler** :
```
aws-0-eu-west-1.pooler.supabase.com
```

---

### **DB_PORT**
```
5432
```
Port PostgreSQL standard

**⚠️ Si vous utilisez le Connection Pooler :**
```
6543
```

---

### **DB_NAME**
```
postgres
```
Nom de la base de données (par défaut sur Supabase)

---

### **DB_USER**
```
postgres
```
Utilisateur de la base de données

**⚠️ Si vous utilisez le Connection Pooler :**
```
postgres.rfatempjwgpznkacmhvo
```

---

### **DB_PASSWORD**
```
[VOTRE_MOT_DE_PASSE_SUPABASE]
```
Le mot de passe que vous avez généré/réinitialisé sur Supabase

**Comment l'obtenir :**
1. Supabase → Database Settings
2. "Reset database password"
3. Copier le mot de passe généré

---

### **JWT_SECRET**
```
a8f5f167f44f4964e6c998dee827110c03ab9e91e4f5f167f44f4964e6c998dee827110c
```
Secret pour signer les tokens JWT (authentification)

**⚠️ IMPORTANT :** Gardez ce secret confidentiel !

---

## 🚀 PROCESSUS DE DÉPLOIEMENT

### **Étape 1 : Push sur GitHub**

```powershell
cd "c:\PROJET\OFARO TECH\ofaro-tech-backend"

git add .
git commit -m "Backend ready for Render deployment"
git push origin main
```

---

### **Étape 2 : Render Build**

Render va automatiquement :

1. **Clone** le repo GitHub
2. **Install** : `npm install`
3. **Build** : `npm run build` (compile TypeScript → JavaScript)
4. **Start** : `npm start` (lance le serveur)

**Durée :** 3-5 minutes

---

### **Étape 3 : Vérification**

#### **Logs à vérifier :**

```
==> Installing dependencies...
npm install
...
==> Building...
npm run build
> ofaro-tech-backend@1.0.0 build
> tsc
...
==> Starting server...
npm start

╔═══════════════════════════════════════════════════════════╗
║   🚀 OFARO TECH Backend API Server                       ║
║   📍 Running on: http://localhost:5000                   ║
║   🌍 Environment: production                             ║
╚═══════════════════════════════════════════════════════════╝

✅ Connected to PostgreSQL database: postgres
[INFO] Server listening on port 5000
```

---

### **Étape 4 : Tester l'API**

URL de votre API : `https://ofaro-tech-backend.onrender.com`

**Tests :**

```powershell
# Health check
Invoke-RestMethod -Uri "https://ofaro-tech-backend.onrender.com/health"

# Liste des services
Invoke-RestMethod -Uri "https://ofaro-tech-backend.onrender.com/api/services"

# Stats des demandes
Invoke-RestMethod -Uri "https://ofaro-tech-backend.onrender.com/api/quotes/stats"
```

**Résultat attendu :**
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2025-08-18T15:30:00.000Z"
}
```

---

## 🔧 DÉPANNAGE

### **❌ Build Failed**

**Erreur :** `npm ERR! code ELIFECYCLE`

**Solutions :**
1. Vérifier que `package.json` contient les scripts :
   ```json
   "scripts": {
     "build": "tsc",
     "start": "node dist/server.js"
   }
   ```
2. Vérifier que `tsconfig.json` existe
3. Rebuild en local pour tester

---

### **❌ Database Connection Error**

**Erreur :** `password authentication failed` ou `ECONNREFUSED`

**Solutions :**
1. Vérifier que `DB_PASSWORD` est correct sur Render
2. Réinitialiser le mot de passe sur Supabase
3. Vérifier `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`
4. Vérifier les Network Restrictions sur Supabase (autoriser toutes les IPs)

---

### **❌ CORS Error**

**Erreur :** `Access-Control-Allow-Origin`

**Solutions :**
1. Vérifier que `FRONTEND_URL` est correct sur Render
2. Vérifier dans `src/server.ts` que CORS est configuré :
   ```typescript
   app.use(cors({
     origin: process.env.FRONTEND_URL || '*',
     credentials: true
   }));
   ```

---

### **❌ 502 Bad Gateway**

**Erreur :** Le service ne répond pas

**Solutions :**
1. Vérifier les logs Render
2. Vérifier que `PORT=5000` est défini
3. Redémarrer le service : **"Manual Deploy"** → **"Clear build cache & deploy"**

---

## 📊 MONITORING

### **Logs en temps réel**

Sur Render :
1. Onglet **"Logs"**
2. Filtre **"All logs"**
3. Chercher :
   - `✅ Connected to PostgreSQL database`
   - `[INFO] Server listening on port 5000`
   - Erreurs : `[ERROR]`

---

### **Métriques**

Sur Render (plan Starter uniquement) :
- CPU usage
- Memory usage
- Request count
- Response time

---

## 🔄 MISES À JOUR

### **Déploiement automatique**

Chaque `git push origin main` déclenche automatiquement :
1. Build
2. Tests (si configurés)
3. Déploiement

### **Déploiement manuel**

Sur Render :
1. Onglet **"Manual Deploy"**
2. Cliquer **"Deploy latest commit"**
3. Ou **"Clear build cache & deploy"** si problème

---

## 🌐 URL DE L'API

Votre API sera accessible à :
```
https://ofaro-tech-backend.onrender.com
```

### **Endpoints disponibles :**

```
GET  /health                    - Health check
GET  /api/services              - Liste des services
POST /api/quotes                - Créer une demande de devis
POST /api/contact               - Envoyer un message
POST /api/applications          - Soumettre une candidature
POST /api/internships           - Demander un stage
GET  /api/jobs                  - Liste des offres d'emploi
GET  /api/quotes/stats          - Statistiques des demandes
```

---

## 🔐 SÉCURITÉ

### **Variables sensibles**

✅ **À protéger :**
- `DB_PASSWORD`
- `JWT_SECRET`
- `SMTP_PASS` (si configuré)

❌ **Ne JAMAIS commit dans Git :**
- Fichier `.env`
- Mots de passe en clair

### **Recommandations**

1. ✅ Utiliser des mots de passe forts
2. ✅ Régénérer `JWT_SECRET` régulièrement
3. ✅ Activer 2FA sur Render et Supabase
4. ✅ Surveiller les logs pour détecter les accès suspects

---

## 📚 RESSOURCES

- **Documentation Render :** https://render.com/docs
- **Documentation Supabase :** https://supabase.com/docs
- **Support Render :** https://render.com/support

---

## ✅ CHECKLIST FINALE

```
⏳ Créer Web Service sur Render
⏳ Configurer les 9 variables d'environnement
⏳ Connecter le repo GitHub
⏳ Vérifier Build Command et Start Command
⏳ Déployer
⏳ Vérifier les logs
⏳ Tester /health
⏳ Tester les endpoints API
⏳ Configurer le frontend avec l'URL Render
⏳ Tester l'intégration frontend-backend
```

---

**Votre backend est prêt pour la production ! 🚀**
