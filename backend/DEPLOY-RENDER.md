# 🚀 DÉPLOYER LE BACKEND SUR RENDER

---

## 📌 INFORMATIONS

**Repo GitHub :** https://github.com/EDITCHAO/OFARO-TECH
**Backend local :** `c:\PROJET\OFARO TECH\ofaro-tech-backend\`

---

## 🎯 DEUX OPTIONS

### **Option 1 : Backend dans un dossier séparé du repo (RECOMMANDÉ)**

Créer un nouveau repo uniquement pour le backend :
- ✅ Plus propre
- ✅ Déploiement Render plus simple
- ✅ Repos séparés = préoccupations séparées

### **Option 2 : Backend dans le même repo (Monorepo)**

Mettre frontend et backend dans le même repo :
- ⚠️ Plus complexe à déployer
- ⚠️ Render devra naviguer dans un sous-dossier

---

## 🚀 SOLUTION : OPTION 1 - REPO SÉPARÉ

### **ÉTAPE 1 : Créer un nouveau repo sur GitHub**

1. **Aller sur :** https://github.com/EDITCHAO
2. **Cliquer** "New repository" (bouton vert)
3. **Repository name :** `ofaro-tech-backend`
4. **Description :** "Backend API Node.js/Express pour OFARO TECH"
5. **Public** ou **Private** (votre choix)
6. **NE PAS** cocher "Add a README file"
7. **NE PAS** ajouter .gitignore ni licence
8. **Cliquer** "Create repository"

---

### **ÉTAPE 2 : Pousser le backend**

**Dans PowerShell :**

```powershell
cd "c:\PROJET\OFARO TECH\ofaro-tech-backend"

# Vérifier que git est initialisé
git status

# Si pas initialisé :
# git init

# Configurer le remote vers le NOUVEAU repo
git remote remove origin
git remote add origin https://github.com/EDITCHAO/ofaro-tech-backend.git

# Renommer la branche en main
git branch -M main

# Pousser
git push -u origin main
```

---

### **ÉTAPE 3 : Vérifier sur GitHub**

1. Aller sur : https://github.com/EDITCHAO/ofaro-tech-backend
2. Vérifier que tous les fichiers sont présents
3. **NE PAS** voir le fichier `.env` (c'est normal, il est ignoré)

---

## 🎯 ENSUITE : DÉPLOYER SUR RENDER

### **ÉTAPE 1 : Créer le Web Service**

1. **Aller sur :** https://dashboard.render.com
2. **Cliquer** "New +" → "Web Service"
3. **Connecter GitHub** (si pas fait)
4. **Chercher** le repo `ofaro-tech-backend`
5. **Cliquer** "Connect"

---

### **ÉTAPE 2 : Configuration**

| Paramètre | Valeur |
|-----------|--------|
| **Name** | `ofaro-tech-backend` |
| **Region** | `Frankfurt (EU Central)` |
| **Branch** | `main` |
| **Root Directory** | *(vide)* |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` (ou `Starter` pour prod) |

---

### **ÉTAPE 3 : Variables d'environnement**

Cliquer sur **"Advanced"** → **"Add Environment Variable"**

**Ajouter ces 9 variables :**

```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://ofarotech.vercel.app

DB_HOST=aws-0-eu-west-1.pooler.supabase.com
DB_PORT=6543
DB_NAME=postgres
DB_USER=postgres.rfatempjwgpznkacmhvo
DB_PASSWORD=zNAlL6eAwO7pUX5q

JWT_SECRET=a8f5f167f44f4964e6c998dee827110c03ab9e91e4f5f167f44f4964e6c998dee827110c
```

**⚠️ IMPORTANT :**
- Utiliser le **Connection Pooler** (port 6543)
- User : `postgres.rfatempjwgpznkacmhvo` (avec project ID)

---

### **ÉTAPE 4 : Créer le service**

1. **Cliquer** "Create Web Service"
2. **Attendre** le build (3-5 minutes)

---

### **ÉTAPE 5 : Vérifier les logs**

Dans l'onglet **"Logs"**, vérifier :

```
✅ ==> Installing dependencies...
✅ npm install

✅ ==> Building...
✅ npm run build
✅ > tsc

✅ ==> Starting server...
✅ npm start

✅ 🚀 OFARO TECH Backend API Server
✅ Running on: http://localhost:5000
✅ Environment: production

✅ Connected to PostgreSQL database
```

Si vous voyez **"Connected to PostgreSQL database"**, c'est **GAGNÉ** ! 🎉

---

### **ÉTAPE 6 : Tester l'API en production**

Votre API sera accessible à :
```
https://ofaro-tech-backend.onrender.com
```

**Tests PowerShell :**

```powershell
# Health Check
Invoke-RestMethod -Uri "https://ofaro-tech-backend.onrender.com/health"

# Test insertion
$body = @{
    sender_name = "Test Production"
    sender_email = "prod@test.com"
    sender_phone = "+228 90 00 00 00"
    subject = "Test Render"
    message = "Test depuis Render vers Supabase"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://ofaro-tech-backend.onrender.com/api/contact/send" `
    -Method Post `
    -Body $body `
    -ContentType "application/json"
```

**Résultat attendu :**
```json
{
  "success": true,
  "message": "Votre message a été envoyé avec succès",
  "data": {
    "id": 1,
    "full_name": "Test Production",
    ...
  }
}
```

---

### **ÉTAPE 7 : Vérifier dans Supabase**

1. **Aller sur :** https://supabase.com/dashboard/project/rfatempjwgpznkacmhvo
2. **Table Editor** → **contact_messages**
3. **Chercher** "Test Production"
4. ✅ **Si visible** = Backend → Supabase **FONCTIONNE !**

---

## 📊 ARCHITECTURE FINALE

```
Frontend (Vercel)
https://ofarotech.vercel.app
        ↓
Backend (Render)
https://ofaro-tech-backend.onrender.com
        ↓
Supabase (PostgreSQL)
Tables: 21 tables
```

---

## 🎯 CHECKLIST COMPLÈTE

### **GitHub**
```
⏳ Créer nouveau repo : ofaro-tech-backend
⏳ Push backend vers ce repo
⏳ Vérifier fichiers sur GitHub
```

### **Render**
```
⏳ Créer Web Service
⏳ Connecter repo ofaro-tech-backend
⏳ Configurer build/start commands
⏳ Ajouter 9 variables d'environnement
⏳ Utiliser Connection Pooler (port 6543)
⏳ Créer le service
⏳ Attendre le build
⏳ Vérifier logs
⏳ Voir "Connected to PostgreSQL database"
```

### **Tests**
```
⏳ Tester /health
⏳ Tester POST /api/contact/send
⏳ Vérifier données dans Supabase
```

---

## 🆘 EN CAS DE PROBLÈME

### **Build échoue sur Render**

**Erreur :** `npm ERR!`

**Solution :**
- Vérifier que `package.json` est bien poussé
- Vérifier les scripts : `"build": "tsc"`, `"start": "node dist/server.js"`

### **"Connected to PostgreSQL database" n'apparaît pas**

**Cause :** Erreur de connexion

**Solution :**
1. Vérifier les 9 variables d'environnement sur Render
2. S'assurer d'utiliser le Connection Pooler (port 6543)
3. Vérifier le mot de passe : `zNAlL6eAwO7pUX5q`

### **API retourne 404**

**Cause :** Routes mal configurées

**Solution :**
- Vérifier que le build s'est bien terminé
- Redémarrer le service : "Manual Deploy" → "Deploy latest commit"

---

## ✅ APRÈS LE DÉPLOIEMENT

Une fois que le backend Render fonctionne :

### **1. Connecter le frontend**

Ajouter dans le frontend : `.env.local`
```env
NEXT_PUBLIC_API_URL=https://ofaro-tech-backend.onrender.com
```

### **2. Modifier les formulaires**

Créer `lib/api.ts` et utiliser `NEXT_PUBLIC_API_URL`

### **3. Redéployer le frontend**

```powershell
cd "c:\PROJET\OFARO TECH\ofaro-tech-website"
git add .
git commit -m "Connect forms to backend API"
git push origin main
```

Vercel redéploiera automatiquement.

---

**Commencez par créer le repo GitHub `ofaro-tech-backend` ! 🚀**
