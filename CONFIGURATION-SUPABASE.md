# 🔧 CONFIGURATION SUPABASE - GUIDE RAPIDE

---

## ✅ FICHIER .env DÉJÀ CONFIGURÉ !

Votre fichier `.env` a été mis à jour avec les bonnes valeurs Supabase :

```env
DB_HOST=aws-0-eu-west-1.pooler.supabase.com
DB_PORT=6543
DB_NAME=postgres
DB_USER=postgres.rfatempjwgpznkacmhvo
DB_PASSWORD=VOTRE_MOT_DE_PASSE_SUPABASE_ICI  ← À REMPLACER !
```

---

## 🔑 IL VOUS RESTE 1 SEULE CHOSE À FAIRE

### **Trouver votre mot de passe de base de données Supabase**

#### **Méthode 1 : Réinitialiser le mot de passe (recommandé)**

1. Sur Supabase, vous êtes déjà dans **Database Settings**
2. En haut de la page, cherchez **"Database password"**
3. Cliquez sur **"Reset database password"** ou **"Reset password"**
4. Un nouveau mot de passe sera généré et affiché
5. **⚠️ COPIEZ-LE IMMÉDIATEMENT !**
6. Collez-le dans le fichier `.env` à la place de `VOTRE_MOT_DE_PASSE_SUPABASE_ICI`

#### **Méthode 2 : Si vous l'avez déjà sauvegardé**

Si vous avez noté le mot de passe lors de la création du projet :
1. Ouvrez votre fichier où vous l'avez sauvegardé
2. Copiez le mot de passe
3. Collez-le dans `.env`

---

## 📝 EXEMPLE DE .env FINAL

```env
# Configuration du serveur
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000

# Frontend URL (pour CORS)
FRONTEND_URL=http://localhost:3000

# Base de données SUPABASE
DB_HOST=aws-0-eu-west-1.pooler.supabase.com
DB_PORT=6543
DB_NAME=postgres
DB_USER=postgres.rfatempjwgpznkacmhvo
DB_PASSWORD=monmotdepassesupabase123  ← VOTRE VRAI MOT DE PASSE

# JWT Secret
JWT_SECRET=a8f5f167f44f4964e6c998dee827110c03ab9e91e4f5f167f44f4964e6c998dee827110c
JWT_EXPIRES_IN=24h

# Email SMTP (optionnel pour l'instant)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 🗄️ CRÉER LES TABLES DANS SUPABASE

### **Étape 1 : Aller dans SQL Editor**

1. Dans le menu de gauche de Supabase, cliquer sur **"SQL Editor"** (icône 📝)
2. Cliquer sur **"New query"**

### **Étape 2 : Copier le schéma SQL**

1. Ouvrir le fichier sur votre ordinateur :
   ```
   c:\PROJET\OFARO TECH\ofaro-tech-website\database\schema.sql
   ```
2. **Sélectionner TOUT** (Ctrl+A)
3. **Copier** (Ctrl+C)

### **Étape 3 : Exécuter dans Supabase**

1. **Coller** dans l'éditeur SQL de Supabase (Ctrl+V)
2. Cliquer sur **"Run"** (ou Ctrl+Enter)
3. Attendre que toutes les commandes s'exécutent (1-2 minutes)

### **Étape 4 : Vérifier**

1. Cliquer sur **"Table Editor"** dans le menu de gauche
2. Vous devriez voir toutes vos tables :
   - users
   - contacts
   - service_requests
   - quote_requests
   - contact_messages
   - internship_requests
   - job_offers
   - applications
   - request_history
   - etc.

---

## 🧪 TESTER LOCALEMENT

### **Dans PowerShell :**

```powershell
cd "c:\PROJET\OFARO TECH\ofaro-tech-backend"
npm run dev
```

### **Résultat attendu :**

```
╔═══════════════════════════════════════════════════════════╗
║   🚀 OFARO TECH Backend API Server                       ║
║   📍 Running on: http://localhost:5000                   ║
║   🌍 Environment: development                            ║
╚═══════════════════════════════════════════════════════════╝
✅ Connected to PostgreSQL database
```

### **Tester l'API :**

```powershell
curl http://localhost:5000/health
```

**Ou :**

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/health"
```

---

## 🌐 VARIABLES POUR RENDER

Une fois que ça marche localement, ajouter sur Render :

```
1. NODE_ENV = production
2. PORT = 5000
3. FRONTEND_URL = https://ofarotech.vercel.app
4. DB_HOST = aws-0-eu-west-1.pooler.supabase.com
5. DB_PORT = 6543
6. DB_NAME = postgres
7. DB_USER = postgres.rfatempjwgpznkacmhvo
8. DB_PASSWORD = [votre mot de passe Supabase]
9. JWT_SECRET = a8f5f167f44f4964e6c998dee827110c03ab9e91e4f5f167f44f4964e6c998dee827110c
```

---

## ✅ CHECKLIST

```
⏳ 1. Réinitialiser le mot de passe Supabase
⏳ 2. Copier le mot de passe dans .env
⏳ 3. Exécuter schema.sql dans SQL Editor
⏳ 4. Tester localement : npm run dev
⏳ 5. Configurer les variables sur Render
⏳ 6. Déployer sur Render
```

---

**Vous êtes presque prêt ! Il ne reste que le mot de passe à configurer ! 🚀**
