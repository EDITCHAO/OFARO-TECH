# 🔧 FICHIER SQL CORRIGÉ - PRÊT POUR SUPABASE

## ✅ CORRECTIONS APPLIQUÉES

```
✅ Apostrophes échappées correctement ('d'activité' → 'd''activité')
✅ Index corrigés (plus de références à des tables inexistantes)
✅ Syntaxe SQL PostgreSQL validée
```

---

## 📝 COMMENT EXÉCUTER LE SCHEMA DANS SUPABASE

### **Étape 1 : Ouvrir SQL Editor**

1. Aller sur : https://supabase.com/dashboard/project/rfatempjwgpznkacmhvo
2. Menu gauche → **"SQL Editor"** (icône 📝)
3. Cliquer sur **"New query"**

---

### **Étape 2 : Copier le schéma corrigé**

**Fichier source (CORRIGÉ) :**
```
c:\PROJET\OFARO TECH\ofaro-tech-website\database\schema.sql
```

**Comment faire :**
1. Ouvrir le fichier dans VSCode ou Notepad
2. **Sélectionner TOUT** (Ctrl+A)
3. **Copier** (Ctrl+C)

---

### **Étape 3 : Coller et exécuter**

1. Retourner sur Supabase SQL Editor
2. **Coller** le SQL (Ctrl+V)
3. **Cliquer "Run"** (bouton vert en bas à droite) ou **F5**
4. Attendre l'exécution (1-2 minutes)

**Message de succès attendu :**
```
✅ Success. No rows returned
⏱️ Execution time: ~1.5s
```

---

### **Étape 4 : Vérifier les tables créées**

1. Menu gauche → **"Table Editor"**
2. Vous devriez voir **21 tables** :

#### **Tables de gestion**
- ✅ `users` - Utilisateurs back-office (1 admin par défaut)
- ✅ `login_logs` - Historique des connexions
- ✅ `failed_login_attempts` - Sécurité anti-bruteforce

#### **Tables de demandes**
- ✅ `quote_requests` - Demandes de devis
- ✅ `quote_attachments` - Pièces jointes des devis
- ✅ `contact_messages` - Messages de contact
- ✅ `service_requests` - Demandes de services
- ✅ `internship_requests` - Demandes de stage
- ✅ `applications` - Candidatures
- ✅ `job_offers` - Offres d'emploi

#### **Tables de contenu**
- ✅ `realizations` - Portfolio/Réalisations
- ✅ `articles` - Blog/Actualités
- ✅ `testimonials` - Témoignages clients
- ✅ `team_members` - Équipe
- ✅ `clients` - Liste des clients

#### **Tables utilitaires**
- ✅ `media_library` - Médiathèque
- ✅ `downloadable_documents` - Documents téléchargeables
- ✅ `seo_settings` - Paramètres SEO (6 pages par défaut)
- ✅ `contacts` - Contacts centralisés
- ✅ `request_history` - Historique des actions
- ✅ `site_statistics` - Statistiques du site

---

### **Étape 5 : Vérifier les données initiales**

Dans SQL Editor, nouvelle query :

```sql
-- Vérifier l'admin créé
SELECT * FROM users;

-- Vérifier les paramètres SEO
SELECT page_name, meta_title FROM seo_settings;
```

**Résultat attendu :**
- 1 utilisateur admin : `admin@ofarotech.com`
- 6 pages SEO : Accueil, À propos, Services, Réalisations, Secteurs, Contact

---

## 🧪 TESTER LA CONNEXION BACKEND ↔ SUPABASE

Une fois les tables créées, testez le backend :

```powershell
# Test des services (devrait retourner une liste vide)
Invoke-RestMethod -Uri "http://localhost:5000/api/services" -Method Get

# Test des stats
Invoke-RestMethod -Uri "http://localhost:5000/api/quotes/stats" -Method Get

# Test d'une insertion (demande de contact)
$body = @{
    full_name = "Test User"
    email = "test@example.com"
    message = "Test message"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/contact" -Method Post -Body $body -ContentType "application/json"
```

---

## 🌐 APRÈS LA CRÉATION DES TABLES

### **1. Vérifier dans Supabase Table Editor**

Toutes les 21 tables doivent être visibles

### **2. Tester l'API localement**

Le backend local doit pouvoir lire/écrire dans Supabase

### **3. Déployer sur Render**

Une fois que tout fonctionne localement :

```powershell
cd "c:\PROJET\OFARO TECH\ofaro-tech-backend"
git init
git add .
git commit -m "Backend ready with Supabase connection"
git remote add origin [VOTRE_REPO_GITHUB]
git push -u origin main
```

### **4. Configurer Render avec les bonnes variables**

```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://ofarotech.vercel.app
DB_HOST=db.rfatempjwgpznkacmhvo.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=[VOTRE_MOT_DE_PASSE]
JWT_SECRET=a8f5f167f44f4964e6c998dee827110c03ab9e91e4f5f167f44f4964e6c998dee827110c
```

---

## 🔧 SI ERREUR SQL

### **Erreur : "syntax error at or near"**

❌ **Cause :** Apostrophes mal échappées ou caractères spéciaux

✅ **Solution :** Le fichier est maintenant corrigé. Recopiez-le complètement.

---

### **Erreur : "relation does not exist"**

❌ **Cause :** Erreur dans les index (référence à une table inexistante)

✅ **Solution :** Le fichier est corrigé. Les index font maintenant référence aux bonnes tables.

---

### **Erreur : "duplicate key value"**

❌ **Cause :** Vous avez déjà exécuté le script

✅ **Solution :**
```sql
-- Supprimer toutes les tables (ATTENTION : perte de données !)
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- Puis réexécuter le schema.sql
```

---

## ✅ CHECKLIST FINALE

```
✅ Fichier schema.sql corrigé
⏳ Copier schema.sql complet
⏳ Ouvrir Supabase SQL Editor
⏳ Coller et exécuter
⏳ Vérifier 21 tables dans Table Editor
⏳ Tester l'API localement
⏳ Push sur GitHub
⏳ Déployer sur Render
⏳ Configurer variables Render
⏳ Tester l'API en production
```

---

**Le fichier SQL est maintenant prêt ! Exécutez-le dans Supabase et tout va fonctionner ! 🚀**
