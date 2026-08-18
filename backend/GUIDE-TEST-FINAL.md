# 🎯 GUIDE DE TEST FINAL - BACKEND + SUPABASE

## ✅ CE QUI EST FAIT

```
✅ Backend Node.js/Express créé
✅ npm install terminé (234 packages)
✅ Fichier .env configuré
✅ Mot de passe Supabase mis à jour : zNAlL6eAwO7pUX5q
✅ Fichier schema.sql corrigé (apostrophes)
✅ Serveur démarre correctement
✅ Health check fonctionne
```

---

## 🔧 PROBLÈME ACTUEL

**Erreur :** `password authentication failed for user "postgres"`

**Cause possible :** Le serveur Node.js garde l'ancien mot de passe en cache malgré le redémarrage.

---

## 🚀 SOLUTIONS À ESSAYER

### **Solution 1 : Redémarrage Manuel Complet (RECOMMANDÉ)**

1. **Fermez TOUS les terminaux** backend qui tournent
2. **Ouvrez un NOUVEAU PowerShell**
3. **Lancez :**
   ```powershell
   cd "c:\PROJET\OFARO TECH\ofaro-tech-backend"
   npm run dev
   ```

4. **Attendez** le message :
   ```
   🚀 OFARO TECH Backend API Server
   ✅ Connected to PostgreSQL database
   ```

5. **Testez** :
   ```powershell
   # Dans un autre PowerShell
   Invoke-RestMethod -Uri "http://localhost:5000/health"
   ```

---

### **Solution 2 : Vérifier que le SQL a été exécuté**

Avant de tester l'API, assurez-vous que les tables existent dans Supabase :

1. **Aller sur** : https://supabase.com/dashboard/project/rfatempjwgpznkacmhvo
2. **SQL Editor** → **New query**
3. **Copier tout** `c:\PROJET\OFARO TECH\ofaro-tech-website\database\schema.sql`
4. **Coller et Run**
5. **Vérifier** dans **Table Editor** : 21 tables doivent être visibles

---

### **Solution 3 : Tester la connexion directement**

```powershell
cd "c:\PROJET\OFARO TECH\ofaro-tech-backend"
node test-db-connection.js
```

**Résultat attendu :**
```
🔧 Configuration:
  Host: db.rfatempjwgpznkacmhvo.supabase.co
  Port: 5432
  Database: postgres
  User: postgres
  Password: zNA***

⏳ Connexion en cours...
✅ Connexion réussie!
PostgreSQL version: PostgreSQL 15.x...
Database: postgres
```

**Si ça fonctionne**, le mot de passe est correct et c'est juste un problème de cache.

---

## 🧪 TESTS COMPLETS APRÈS CONNEXION RÉUSSIE

Une fois que la connexion fonctionne :

### **1. Test Health Check**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/health"
```

### **2. Test Contact (avec base de données)**
```powershell
$body = @{
    sender_name = "Test User"
    sender_email = "test@example.com"
    sender_phone = "+228 90 12 34 56"
    subject = "Test Supabase"
    message = "Test de connexion Backend → Supabase"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/contact/send" -Method Post -Body $body -ContentType "application/json"
```

**Résultat attendu :**
```json
{
  "success": true,
  "message": "Votre message a été envoyé avec succès",
  "data": {
    "id": 1,
    "full_name": "Test User",
    ...
  }
}
```

### **3. Test Demande de Service**
```powershell
$body = @{
    client_name = "Marie Martin"
    client_email = "marie.martin@example.com"
    client_phone = "+228 91 23 45 67"
    company_name = "ACME Corp"
    service_type = "Développement Web"
    description = "Nous avons besoin d'un site web vitrine"
    urgency = "normale"
    budget_range = "500000-1000000 FCFA"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/services/request" -Method Post -Body $body -ContentType "application/json"
```

### **4. Test Statistiques**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/quotes/stats"
```

---

## 📊 VÉRIFIER DANS SUPABASE

Après avoir testé l'API :

1. **Aller sur** : https://supabase.com/dashboard/project/rfatempjwgpznkacmhvo
2. **Table Editor**
3. **Ouvrir la table `contact_messages`**
4. **Vous devriez voir** la ligne "Test User"

---

## 🌐 APRÈS TESTS LOCAUX RÉUSSIS

### **Étape 1 : Push sur GitHub**

```powershell
cd "c:\PROJET\OFARO TECH\ofaro-tech-backend"

# Si pas encore initialisé
git init
git add .
git commit -m "Backend Node.js/Express avec connexion Supabase"

# Créer repo sur GitHub, puis :
git remote add origin https://github.com/VOTRE-USERNAME/ofaro-tech-backend.git
git branch -M main
git push -u origin main
```

---

### **Étape 2 : Créer Web Service sur Render**

1. Aller sur : **https://dashboard.render.com**
2. **New +** → **Web Service**
3. Connecter le repo **ofaro-tech-backend**

**Configuration :**
```
Name: ofaro-tech-backend
Region: Frankfurt (EU Central)
Branch: main
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm start
```

---

### **Étape 3 : Variables d'environnement Render**

```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://ofarotech.vercel.app

DB_HOST=db.rfatempjwgpznkacmhvo.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=zNAlL6eAwO7pUX5q

JWT_SECRET=a8f5f167f44f4964e6c998dee827110c03ab9e91e4f5f167f44f4964e6c998dee827110c
```

---

### **Étape 4 : Déployer et Tester**

Une fois déployé sur Render :

```powershell
# Remplacer par votre URL Render
$renderUrl = "https://ofaro-tech-backend.onrender.com"

# Test Health
Invoke-RestMethod -Uri "$renderUrl/health"

# Test API
$body = @{
    sender_name = "Test Production"
    sender_email = "test@example.com"
    sender_phone = "+228 90 12 34 56"
    subject = "Test"
    message = "Test from production"
} | ConvertTo-Json

Invoke-RestMethod -Uri "$renderUrl/api/contact/send" -Method Post -Body $body -ContentType "application/json"
```

---

## ✅ CHECKLIST COMPLÈTE

```
⏳ Fermer tous les terminaux backend
⏳ Ouvrir un nouveau PowerShell
⏳ Lancer npm run dev
⏳ Vérifier "Connected to PostgreSQL database"
⏳ Tester node test-db-connection.js
⏳ Exécuter schema.sql dans Supabase (si pas fait)
⏳ Vérifier 21 tables dans Table Editor
⏳ Tester /health
⏳ Tester /api/contact/send
⏳ Vérifier les données dans Supabase
⏳ Push sur GitHub
⏳ Créer Web Service sur Render
⏳ Ajouter les 9 variables d'environnement
⏳ Déployer
⏳ Tester l'API en production
```

---

## 🆘 SI PROBLÈMES PERSISTENT

### **Erreur d'authentification malgré tout**

1. **Réinitialiser** le mot de passe Supabase une NOUVELLE fois
2. **Mettre à jour** `.env` avec le nouveau mot de passe
3. **Redémarrer** le serveur dans un terminal COMPLÈTEMENT NOUVEAU

### **Tables n'existent pas**

1. Exécuter `schema.sql` dans Supabase SQL Editor
2. Vérifier dans Table Editor que les 21 tables sont créées

### **Render ne se connecte pas**

1. Vérifier que les 9 variables sont correctement définies
2. Vérifier les logs Render pour voir l'erreur exacte
3. S'assurer que le mot de passe Render est le même que le mot de passe local qui fonctionne

---

**Vous êtes presque au but ! Une fois la connexion locale qui fonctionne, le déploiement Render sera rapide ! 🚀**
