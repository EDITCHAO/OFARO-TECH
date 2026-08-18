# 🌐 GUIDE COMPLET - DÉPLOIEMENT SUR RENDER.COM

---

## 📋 TABLE DES MATIÈRES

1. [Prérequis](#1-prérequis)
2. [Créer un compte Render](#2-créer-un-compte-render)
3. [Push le code sur GitHub](#3-push-le-code-sur-github)
4. [Créer la base de données PostgreSQL](#4-créer-la-base-de-données-postgresql)
5. [Créer le Web Service](#5-créer-le-web-service)
6. [Configurer les variables d'environnement](#6-configurer-les-variables-denvironnement)
7. [Déployer](#7-déployer)
8. [Tester l'API](#8-tester-lapi)
9. [Configurer le frontend](#9-configurer-le-frontend)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. PRÉREQUIS

### ✅ Vérifier que tout est prêt

```bash
# 1. Node.js installé
node --version
# Doit afficher v18.x ou v20.x

# 2. Git installé
git --version

# 3. Backend build sans erreurs
cd c:\PROJET\OFARO TECH\ofaro-tech-backend
npm install
npm run build
# Doit créer le dossier dist/
```

---

## 2. CRÉER UN COMPTE RENDER

### Étape 1 : Aller sur Render

1. Ouvrir le navigateur
2. Aller sur **https://render.com**
3. Cliquer sur **"Get Started"** ou **"Sign Up"**

### Étape 2 : S'inscrire

**Option A : Avec GitHub (recommandé)**
1. Cliquer sur **"Sign up with GitHub"**
2. Autoriser Render à accéder à votre compte GitHub
3. ✅ Plus rapide pour connecter les repositories

**Option B : Avec email**
1. Entrer votre email
2. Créer un mot de passe
3. Vérifier l'email

### Étape 3 : Dashboard

Une fois connecté, vous verrez le dashboard Render :
```
┌──────────────────────────────────────┐
│  Dashboard                           │
│  ├── Web Services                    │
│  ├── Databases                       │
│  ├── Cron Jobs                       │
│  └── ...                             │
└──────────────────────────────────────┘
```

---

## 3. PUSH LE CODE SUR GITHUB

### Étape 1 : Initialiser Git (si pas déjà fait)

```bash
cd c:\PROJET\OFARO TECH\ofaro-tech-backend

# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Backend Node.js/Express initial - OFARO TECH"
```

### Étape 2 : Créer un repository sur GitHub

1. Aller sur **https://github.com**
2. Cliquer sur **"+"** en haut à droite → **"New repository"**
3. Remplir :
   ```
   Repository name: ofaro-tech-backend
   Description: Backend API pour OFARO TECH
   Visibility: Public (ou Private si vous avez un compte payant)
   ✅ Ne pas cocher "Add a README"
   ```
4. Cliquer sur **"Create repository"**

### Étape 3 : Connecter et push

GitHub vous affiche les commandes. Copier et exécuter :

```bash
# Ajouter l'origine remote (remplacer USERNAME par votre username GitHub)
git remote add origin https://github.com/USERNAME/ofaro-tech-backend.git

# Renommer la branche en main
git branch -M main

# Push
git push -u origin main
```

✅ Votre code est maintenant sur GitHub !

---

## 4. CRÉER LA BASE DE DONNÉES POSTGRESQL

### Étape 1 : Sur Render Dashboard

1. Cliquer sur **"New +"** en haut à droite
2. Sélectionner **"PostgreSQL"**

### Étape 2 : Configuration

Remplir le formulaire :

```
┌─────────────────────────────────────────────┐
│ Name: ofaro-tech-db                         │
│                                             │
│ Database: ofaro_tech                        │
│                                             │
│ User: ofaro_tech_user                       │
│                                             │
│ Region: Frankfurt (EU Central)              │
│                                             │
│ PostgreSQL Version: 16                      │
│                                             │
│ Plan: Free                                  │
│ ✅ 90 days free                             │
│ ✅ 1 GB storage                             │
│ ✅ Shared CPU                               │
└─────────────────────────────────────────────┘
```

**IMPORTANT :** Choisir **Frankfurt** pour avoir la base en Europe (plus proche de vos utilisateurs).

### Étape 3 : Créer

1. Cliquer sur **"Create Database"**
2. Render va créer la base (prend 1-2 minutes)
3. Vous verrez l'état : `Creating...` puis `Available`

### Étape 4 : Noter les informations de connexion

Une fois créée, aller dans l'onglet **"Connect"** et copier :

```
┌─────────────────────────────────────────────┐
│ INTERNAL DATABASE URL:                      │
│ postgresql://user:password@host:5432/dbname │
│                                             │
│ EXTERNAL DATABASE URL:                      │
│ postgresql://user:password@host:5432/dbname │
│                                             │
│ Host: dpg-xxxxx-a.frankfurt-postgres.render.com
│ Port: 5432                                  │
│ Database: ofaro_tech                        │
│ Username: ofaro_tech_user                   │
│ Password: ************                      │
└─────────────────────────────────────────────┘
```

**⚠️ IMPORTANT :** Copier toutes ces informations dans un fichier texte temporaire. Vous en aurez besoin pour :
1. Exécuter le schéma SQL
2. Configurer le Web Service

### Étape 5 : Exécuter le schéma SQL

**Option A : Avec psql (depuis votre ordinateur)**

```bash
# Utiliser l'EXTERNAL DATABASE URL
psql "postgresql://user:password@host:5432/dbname"

# Une fois connecté, exécuter le schéma
\i c:/PROJET/OFARO TECH/ofaro-tech-website/database/schema.sql

# Vérifier que les tables sont créées
\dt

# Quitter
\q
```

**Option B : Avec l'interface Render (plus simple)**

1. Dans le dashboard de votre base, aller dans **"Shell"**
2. Copier TOUT le contenu de `database/schema.sql`
3. Coller dans le shell et appuyer sur Entrée
4. Attendre que toutes les commandes s'exécutent

✅ Base de données créée et schéma appliqué !

---

## 5. CRÉER LE WEB SERVICE

### Étape 1 : Sur Render Dashboard

1. Cliquer sur **"New +"** en haut à droite
2. Sélectionner **"Web Service"**

### Étape 2 : Connecter GitHub

1. Cliquer sur **"Connect account"** si ce n'est pas déjà fait
2. Autoriser Render à accéder à vos repositories
3. Sélectionner le repository **"ofaro-tech-backend"**
4. Cliquer sur **"Connect"**

### Étape 3 : Configuration du Service

Remplir le formulaire :

```
┌──────────────────────────────────────────────────────────┐
│ Name: ofaro-tech-backend                                 │
│                                                          │
│ Region: Frankfurt (EU Central)                           │
│                                                          │
│ Branch: main                                             │
│                                                          │
│ Root Directory: (laisser vide)                           │
│                                                          │
│ Runtime: Node                                            │
│                                                          │
│ Build Command: npm install && npm run build              │
│                                                          │
│ Start Command: npm start                                 │
│                                                          │
│ Plan: Free                                               │
│ ✅ 750 hours/month free                                  │
│ ✅ Auto-deploy on push                                   │
│ ✅ Custom domain support                                 │
└──────────────────────────────────────────────────────────┘
```

**IMPORTANT :**
- ✅ Build Command : `npm install && npm run build`
- ✅ Start Command : `npm start`
- ✅ Choisir **Frankfurt** (même région que la base de données)

### Étape 4 : NE PAS ENCORE CRÉER !

**⚠️ ATTENTION :** Ne cliquez PAS encore sur "Create Web Service".

**Pourquoi ?** Il faut d'abord ajouter les variables d'environnement, sinon le déploiement échouera.

---

## 6. CONFIGURER LES VARIABLES D'ENVIRONNEMENT

### Avant de créer le service

Sur la même page, **descendre** jusqu'à la section **"Environment Variables"**.

### Ajouter les variables une par une

Cliquer sur **"Add Environment Variable"** et ajouter :

#### **1. NODE_ENV**
```
Key:   NODE_ENV
Value: production
```

#### **2. PORT**
```
Key:   PORT
Value: 5000
```

#### **3. FRONTEND_URL**
```
Key:   FRONTEND_URL
Value: https://ofarotech.vercel.app
```
*(Remplacer par l'URL de votre frontend Vercel)*

#### **4. DB_HOST**
```
Key:   DB_HOST
Value: dpg-xxxxx-a.frankfurt-postgres.render.com
```
*(Copier depuis les infos de connexion PostgreSQL)*

#### **5. DB_PORT**
```
Key:   DB_PORT
Value: 5432
```

#### **6. DB_NAME**
```
Key:   DB_NAME
Value: ofaro_tech
```

#### **7. DB_USER**
```
Key:   DB_USER
Value: ofaro_tech_user
```

#### **8. DB_PASSWORD**
```
Key:   DB_PASSWORD
Value: *********************
```
*(Copier le mot de passe depuis les infos PostgreSQL)*

#### **9. JWT_SECRET**
```
Key:   JWT_SECRET
Value: votre_secret_jwt_tres_fort_et_unique_123456789
```
*(Générer un secret fort et unique - ne PAS utiliser celui de l'exemple)*

**Comment générer un secret fort :**
```bash
# Option 1 : Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Option 2 : PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

#### **10. SMTP_HOST** (optionnel - pour emails)
```
Key:   SMTP_HOST
Value: smtp.gmail.com
```

#### **11. SMTP_PORT** (optionnel)
```
Key:   SMTP_PORT
Value: 587
```

#### **12. SMTP_USER** (optionnel)
```
Key:   SMTP_USER
Value: votre_email@gmail.com
```

#### **13. SMTP_PASS** (optionnel)
```
Key:   SMTP_PASS
Value: votre_app_password
```

### Récapitulatif des variables

Vous devriez avoir **au minimum** ces 9 variables :

```
✅ NODE_ENV = production
✅ PORT = 5000
✅ FRONTEND_URL = https://ofarotech.vercel.app
✅ DB_HOST = dpg-xxxxx-a.frankfurt-postgres.render.com
✅ DB_PORT = 5432
✅ DB_NAME = ofaro_tech
✅ DB_USER = ofaro_tech_user
✅ DB_PASSWORD = ***************
✅ JWT_SECRET = *************************
```

---

## 7. DÉPLOYER

### Étape 1 : Créer le service

Maintenant que tout est configuré, cliquer sur **"Create Web Service"** en bas de la page.

### Étape 2 : Déploiement automatique

Render va automatiquement :

1. **Cloner** votre repository GitHub
   ```
   ⏳ Cloning repository...
   ```

2. **Installer** les dépendances
   ```
   ⏳ Running: npm install
   ```

3. **Builder** le projet TypeScript
   ```
   ⏳ Running: npm run build
   ⏳ Compiling TypeScript...
   ```

4. **Démarrer** le serveur
   ```
   ⏳ Running: npm start
   ```

### Étape 3 : Suivre les logs

Vous verrez les logs en temps réel :

```
┌──────────────────────────────────────────────┐
│ Logs                                         │
├──────────────────────────────────────────────┤
│ Installing dependencies...                   │
│ npm install                                  │
│ ✓ Dependencies installed                     │
│                                              │
│ Building...                                  │
│ npm run build                                │
│ ✓ Compiled successfully                      │
│                                              │
│ Starting...                                  │
│ npm start                                    │
│ ✓ Server running on port 5000               │
│ ✓ Connected to PostgreSQL database          │
│                                              │
│ 🚀 Deploy successful!                        │
└──────────────────────────────────────────────┘
```

### Étape 4 : État du déploiement

En haut, vous verrez :
- 🟡 **Building** : En cours de déploiement
- 🟢 **Live** : Déploiement réussi !
- 🔴 **Failed** : Échec (voir section Troubleshooting)

### Étape 5 : URL de votre API

Une fois **Live**, Render vous donne l'URL :

```
https://ofaro-tech-backend.onrender.com
```

**C'est l'URL que vous utiliserez dans le frontend !**

---

## 8. TESTER L'API

### Test 1 : Health Check

```bash
curl https://ofaro-tech-backend.onrender.com/health
```

**Réponse attendue :**
```json
{
  "status": "OK",
  "timestamp": "2026-08-18T12:00:00.000Z",
  "uptime": 123.456,
  "environment": "production"
}
```

### Test 2 : Demande de service

```bash
curl -X POST https://ofaro-tech-backend.onrender.com/api/services/request \
  -H "Content-Type: application/json" \
  -d '{
    "client_name": "Test Render",
    "client_email": "test@example.com",
    "client_phone": "+33612345678",
    "service_type": "Test",
    "description": "Test depuis Render"
  }'
```

**Réponse attendue :**
```json
{
  "success": true,
  "message": "Votre demande a été envoyée avec succès",
  "reference": "SR-001",
  "data": {...}
}
```

### Test 3 : Liste des offres

```bash
curl https://ofaro-tech-backend.onrender.com/api/jobs/active
```

---

## 9. CONFIGURER LE FRONTEND

### Sur Vercel

1. Aller sur **https://vercel.com**
2. Sélectionner votre projet `ofaro-tech-website`
3. Aller dans **Settings** → **Environment Variables**
4. Ajouter :

```
Key:   NEXT_PUBLIC_API_URL
Value: https://ofaro-tech-backend.onrender.com
```

5. **Redéployer** le projet :
   - Aller dans **Deployments**
   - Cliquer sur **"..."** → **"Redeploy"**

### Dans le code

Les formulaires doivent utiliser l'API Render :

```typescript
// Avant
fetch('/api/services/request', ...)

// Après
const API_URL = process.env.NEXT_PUBLIC_API_URL;
fetch(`${API_URL}/api/services/request`, ...)
```

---

## 10. TROUBLESHOOTING

### ❌ Déploiement échoue : "Build failed"

**Cause :** Erreurs TypeScript ou dépendances manquantes

**Solution :**
```bash
# Tester localement
cd ofaro-tech-backend
npm install
npm run build

# Si des erreurs, les corriger
# Puis push
git add .
git commit -m "Fix build errors"
git push origin main
```

Render redéploiera automatiquement.

### ❌ Erreur : "Database connection failed"

**Cause :** Mauvaises variables d'environnement DB

**Solution :**
1. Sur Render, aller dans **Environment**
2. Vérifier `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
3. Comparer avec les infos de connexion PostgreSQL
4. Corriger si nécessaire
5. Cliquer sur **"Save Changes"**
6. Render redéploie automatiquement

### ❌ Erreur CORS depuis le frontend

**Cause :** `FRONTEND_URL` incorrecte

**Solution :**
1. Vérifier que `FRONTEND_URL` correspond EXACTEMENT à l'URL Vercel
2. Ne pas mettre de `/` à la fin
3. Exemple correct : `https://ofarotech.vercel.app`
4. Exemple incorrect : `https://ofarotech.vercel.app/`

### ❌ Le service s'arrête après quelques minutes

**Cause :** Plan gratuit - Le service se met en veille après 15 min d'inactivité

**Solution :**
- **Normal sur le plan gratuit**
- Le service redémarre automatiquement à la prochaine requête (prend 30-60 secondes)
- Pour éviter : Upgrade vers plan payant (7$/mois)

### ❌ "This site can't be reached"

**Cause :** Service pas encore démarré ou URL incorrecte

**Solution :**
1. Vérifier l'URL sur le dashboard Render
2. Attendre que le statut soit 🟢 Live
3. Réessayer

---

## 📊 MONITORING

### Logs

**Sur Render Dashboard → ofaro-tech-backend → Logs**

Vous verrez en temps réel :
- Toutes les requêtes HTTP
- Les connexions à la base de données
- Les erreurs
- Les logs de votre application

### Metrics

**Sur Render Dashboard → ofaro-tech-backend → Metrics**

Vous verrez :
- CPU usage
- Memory usage
- Request count
- Response time

### Alertes

Render vous envoie un email automatiquement si :
- Le déploiement échoue
- Le service crash
- La base de données a un problème

---

## 🔄 MISES À JOUR

### Déploiement automatique

Render redéploie **automatiquement** à chaque push sur GitHub :

```bash
cd ofaro-tech-backend

# Modifier le code
# ...

# Commit et push
git add .
git commit -m "Update: nouvelle fonctionnalité"
git push origin main
```

Render détecte le push et redéploie automatiquement ! 🚀

### Déploiement manuel

Si vous voulez forcer un redéploiement :

1. Sur Render Dashboard → ofaro-tech-backend
2. Cliquer sur **"Manual Deploy"**
3. Sélectionner la branche `main`
4. Cliquer sur **"Deploy"**

---

## 💰 PLAN GRATUIT - LIMITES

### Ce qui est inclus GRATUITEMENT

```
✅ 750 heures/mois (suffisant pour 1 projet)
✅ Auto-deploy sur push GitHub
✅ HTTPS automatique
✅ Logs et métriques
✅ Variables d'environnement
✅ Custom domain
```

### Limitations du plan gratuit

```
⚠️ Service se met en veille après 15 min d'inactivité
⚠️ Redémarrage lent (30-60 secondes) après veille
⚠️ PostgreSQL gratuit pendant 90 jours seulement
⚠️ CPU et RAM partagés
```

### Si vous voulez upgrader

**Plan Starter : 7$/mois**
- Pas de veille
- Démarrage instantané
- PostgreSQL illimité
- Plus de CPU/RAM

---

## ✅ CHECKLIST FINALE

```
✅ Compte Render créé
✅ Code pushé sur GitHub
✅ PostgreSQL créé et schéma appliqué
✅ Web Service créé
✅ Variables d'environnement configurées
✅ Déploiement réussi (🟢 Live)
✅ Health check fonctionne
✅ Test API services fonctionne
✅ Frontend configuré avec API_URL
✅ CORS testé et fonctionnel
```

---

## 🎉 FÉLICITATIONS !

Votre backend Node.js/Express est maintenant **EN LIGNE** sur Render ! 🚀

**URL de votre API :**
```
https://ofaro-tech-backend.onrender.com
```

**Prochaines étapes :**
1. Tester toutes les routes depuis le frontend
2. Implémenter l'authentification (Phase 2)
3. Créer les interfaces d'administration

---

**Besoin d'aide ?** Consultez :
- Dashboard Render : https://dashboard.render.com
- Documentation Render : https://render.com/docs
- Logs en temps réel sur votre dashboard

**Bon déploiement ! 🚀**
