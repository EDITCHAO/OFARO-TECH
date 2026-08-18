# 🚀 GUIDE DE DÉMARRAGE RAPIDE

---

## ✅ CHECKLIST COMPLÈTE

```
ÉTAPE 1 : Configurer le mot de passe Supabase
  ⏳ 1.1. Aller sur Supabase → Database Settings
  ⏳ 1.2. Cliquer "Reset database password"
  ⏳ 1.3. Copier le mot de passe généré
  ⏳ 1.4. Ouvrir .env et remplacer [YOUR-PASSWORD]

ÉTAPE 2 : Créer les tables dans Supabase
  ⏳ 2.1. Menu gauche → SQL Editor
  ⏳ 2.2. Cliquer "New query"
  ⏳ 2.3. Copier tout le contenu de schema.sql
  ⏳ 2.4. Coller dans l'éditeur SQL
  ⏳ 2.5. Cliquer "Run" (ou F5)
  ⏳ 2.6. Vérifier dans Table Editor

ÉTAPE 3 : Tester localement
  ⏳ 3.1. Ouvrir PowerShell
  ⏳ 3.2. cd "c:\PROJET\OFARO TECH\ofaro-tech-backend"
  ⏳ 3.3. npm run dev
  ⏳ 3.4. Vérifier http://localhost:5000/health

ÉTAPE 4 : Configurer Render
  ⏳ 4.1. Créer un Web Service sur Render
  ⏳ 4.2. Connecter le repo GitHub
  ⏳ 4.3. Ajouter les 9 variables d'environnement
  ⏳ 4.4. Déployer

ÉTAPE 5 : Vérifier le déploiement
  ⏳ 5.1. Attendre le build
  ⏳ 5.2. Tester l'URL Render
  ⏳ 5.3. Vérifier les logs
```

---

## 📝 ÉTAPE 1 : CONFIGURER LE MOT DE PASSE

### **1.1. Sur Supabase**

1. Aller sur : https://supabase.com/dashboard/project/rfatempjwgpznkacmhvo/settings/database
2. Chercher **"Database password"** en haut de la page
3. Cliquer sur **"Reset database password"**
4. **⚠️ COPIER IMMÉDIATEMENT** le mot de passe généré

### **1.2. Dans le fichier `.env`**

Ouvrir : `c:\PROJET\OFARO TECH\ofaro-tech-backend\.env`

Ligne à modifier (ligne 13) :
```env
DB_PASSWORD=[YOUR-PASSWORD]  ← Remplacer par le vrai mot de passe
```

**Exemple :**
```env
DB_PASSWORD=monMotDePasseSecret123!
```

**⚠️ IMPORTANT :** Pas d'espaces, pas de guillemets !

---

## 🗄️ ÉTAPE 2 : CRÉER LES TABLES SUPABASE

### **2.1. Ouvrir SQL Editor**

1. Menu gauche Supabase → **"SQL Editor"** (icône 📝)
2. Cliquer sur **"New query"**

### **2.2. Copier le schéma SQL**

**Fichier source :**
```
c:\PROJET\OFARO TECH\ofaro-tech-website\database\schema.sql
```

**Comment faire :**
1. Ouvrir le fichier `schema.sql` dans VSCode
2. **Ctrl+A** (tout sélectionner)
3. **Ctrl+C** (copier)

### **2.3. Exécuter dans Supabase**

1. Dans l'éditeur SQL Supabase :
   - **Ctrl+V** (coller)
   - Cliquer **"Run"** en bas à droite (ou **F5**)
2. Attendre l'exécution (1-2 minutes)
3. Vérifier qu'il n'y a pas d'erreurs

### **2.4. Vérifier les tables créées**

1. Menu gauche → **"Table Editor"**
2. Vous devriez voir **toutes ces tables** :

```
✅ users                    - Utilisateurs back-office
✅ login_logs               - Logs de connexion
✅ failed_login_attempts    - Tentatives échouées
✅ quote_requests           - Demandes de devis
✅ quote_attachments        - Pièces jointes devis
✅ contact_messages         - Messages de contact
✅ service_requests         - Demandes de services
✅ internship_requests      - Demandes de stage
✅ job_offers               - Offres d'emploi
✅ applications             - Candidatures
✅ realizations             - Réalisations/Portfolio
✅ articles                 - Articles/Actualités
✅ testimonials             - Témoignages
✅ clients                  - Clients
✅ team_members             - Membres de l'équipe
✅ media_library            - Médiathèque
✅ downloadable_documents   - Documents téléchargeables
✅ seo_settings             - Paramètres SEO
✅ contacts                 - Contacts centralisés
✅ request_history          - Historique des demandes
✅ site_statistics          - Statistiques du site
```

**Total : 21 tables**

---

## 🧪 ÉTAPE 3 : TESTER LOCALEMENT

### **3.1. Ouvrir PowerShell**

```powershell
cd "c:\PROJET\OFARO TECH\ofaro-tech-backend"
```

### **3.2. Lancer le serveur**

```powershell
npm run dev
```

### **3.3. Résultat attendu**

```
╔═══════════════════════════════════════════════════════════╗
║   🚀 OFARO TECH Backend API Server                       ║
║   📍 Running on: http://localhost:5000                   ║
║   🌍 Environment: development                            ║
╚═══════════════════════════════════════════════════════════╝

[INFO] Connecting to PostgreSQL...
✅ Connected to PostgreSQL database: postgres
[INFO] Server listening on port 5000
```

### **3.4. Tester l'API**

**Dans un autre PowerShell :**

```powershell
# Test 1 : Health check
Invoke-RestMethod -Uri "http://localhost:5000/health"

# Test 2 : Liste des services
Invoke-RestMethod -Uri "http://localhost:5000/api/services"

# Test 3 : Stats (devrait retourner 0 pour toutes les demandes)
Invoke-RestMethod -Uri "http://localhost:5000/api/quotes/stats"
```

**Si tout fonctionne :** vous verrez des réponses JSON ! ✅

**Si erreur de connexion :** vérifiez le mot de passe dans `.env`

---

## 🌐 ÉTAPE 4 : CONFIGURER RENDER

### **4.1. Créer un Web Service**

1. Aller sur : https://dashboard.render.com
2. Cliquer **"New +"** → **"Web Service"**
3. Connecter votre compte GitHub
4. Sélectionner le repo : **ofaro-tech-backend**

### **4.2. Configuration de base**

```
Name: ofaro-tech-backend
Region: Frankfurt (EU Central)
Branch: main
Root Directory: (vide)
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm start
```

### **4.3. Variables d'environnement (9 variables)**

Cliquer sur **"Advanced"** → **"Add Environment Variable"**

```env
1. NODE_ENV = production
2. PORT = 5000
3. FRONTEND_URL = https://ofarotech.vercel.app

4. DB_HOST = db.rfatempjwgpznkacmhvo.supabase.co
5. DB_PORT = 5432
6. DB_NAME = postgres
7. DB_USER = postgres
8. DB_PASSWORD = [votre mot de passe Supabase]

9. JWT_SECRET = a8f5f167f44f4964e6c998dee827110c03ab9e91e4f5f167f44f4964e6c998dee827110c
```

**⚠️ IMPORTANT :**
- `DB_PASSWORD` : utilisez le MÊME mot de passe que dans `.env`
- `FRONTEND_URL` : URL de votre site Vercel

### **4.4. Plan**

- **Free** (gratuit) : OK pour commencer
- **Starter** (7$/mois) : recommandé pour production

### **4.5. Déployer**

1. Cliquer **"Create Web Service"**
2. Attendre le build (3-5 minutes)
3. Vérifier les logs

---

## ✅ ÉTAPE 5 : VÉRIFIER LE DÉPLOIEMENT

### **5.1. URL de l'API**

Une fois déployé, vous aurez une URL comme :
```
https://ofaro-tech-backend.onrender.com
```

### **5.2. Tester l'API en production**

```powershell
# Test health check
Invoke-RestMethod -Uri "https://ofaro-tech-backend.onrender.com/health"

# Test API services
Invoke-RestMethod -Uri "https://ofaro-tech-backend.onrender.com/api/services"
```

### **5.3. Vérifier les logs**

Sur Render :
1. Onglet **"Logs"**
2. Chercher :
   ```
   ✅ Connected to PostgreSQL database
   [INFO] Server listening on port 5000
   ```

---

## 🔧 DÉPANNAGE

### **Erreur : "password authentication failed"**

❌ **Problème :** Mot de passe incorrect dans `.env` ou sur Render

✅ **Solution :**
1. Réinitialiser le mot de passe sur Supabase
2. Mettre à jour `.env` ET les variables Render
3. Redéployer

---

### **Erreur : "relation does not exist"**

❌ **Problème :** Les tables n'ont pas été créées dans Supabase

✅ **Solution :**
1. Aller dans SQL Editor
2. Exécuter `schema.sql`
3. Vérifier dans Table Editor

---

### **Erreur : "ECONNREFUSED"**

❌ **Problème :** Impossible de se connecter à Supabase

✅ **Solution :**
1. Vérifier `DB_HOST` dans `.env`
2. Vérifier que le projet Supabase est actif
3. Vérifier les restrictions réseau dans Supabase

---

### **Le serveur local ne démarre pas**

❌ **Problème :** Port 5000 déjà utilisé ou erreur TypeScript

✅ **Solution :**
```powershell
# Tuer le processus sur le port 5000
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force

# Rebuild
npm run build
npm run dev
```

---

## 📚 FICHIERS IMPORTANTS

```
c:\PROJET\OFARO TECH\ofaro-tech-backend\
├── .env                          ← Configuration locale
├── src/
│   ├── server.ts                 ← Point d'entrée
│   ├── config/database.ts        ← Connexion PostgreSQL
│   ├── routes/*.routes.ts        ← Routes API
│   └── controllers/*.controller.ts
├── package.json                  ← Dépendances
└── tsconfig.json                 ← Config TypeScript

c:\PROJET\OFARO TECH\ofaro-tech-website\
└── database/schema.sql           ← Schéma à exécuter sur Supabase
```

---

## 🆘 BESOIN D'AIDE ?

1. Vérifier les logs : `npm run dev` en local
2. Vérifier les logs Render : Onglet "Logs"
3. Tester la connexion Supabase dans SQL Editor
4. Vérifier que toutes les variables d'environnement sont définies

---

**Vous êtes prêt ! Suivez les étapes une par une et tout va fonctionner ! 🚀**
