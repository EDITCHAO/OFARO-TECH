# 🆕 GUIDE : Créer une nouvelle base de données Supabase

## 📋 ÉTAPES À SUIVRE

### Étape 1 : Supprimer l'ancien projet (si nécessaire)

1. Allez sur https://supabase.com
2. Connectez-vous à votre compte
3. Trouvez votre ancien projet OFARO TECH
4. Cliquez sur **Settings** (⚙️) → **General**
5. Scrollez tout en bas
6. Section **Danger Zone** → **Delete project**
7. Confirmez la suppression

---

### Étape 2 : Créer un nouveau projet

1. Sur le dashboard Supabase, cliquez sur **+ New Project**
2. Remplissez les informations :
   
   **Nom du projet** : `OFARO-TECH` (ou `ofaro-tech-website`)
   
   **Database Password** : Choisissez un mot de passe SIMPLE
   - Exemple : `OfaroTech2024!` ou `Ofaro123456`
   - ⚠️ **NOTEZ-LE BIEN**, vous en aurez besoin !
   
   **Region** : Choisissez la plus proche
   - Recommandé : **Europe (Frankfurt)** ou **Europe (London)**
   
   **Plan** : **Free** (gratuit)

3. Cliquez sur **Create new project**
4. ⏳ **Attendez 2-3 minutes** que le projet soit créé

---

### Étape 3 : Récupérer les credentials de connexion

Une fois le projet créé :

1. Menu gauche → **⚙️ Settings**
2. Cliquez sur **Database**
3. Section **Connection string**
4. Sélectionnez l'onglet **Connection pooling** (recommandé)
5. Mode : **Transaction**

Vous verrez quelque chose comme :
```
postgresql://postgres.XXXXXXXXXXXXX:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

**OU utilisez Direct connection** (plus simple) :
```
postgresql://postgres:[YOUR-PASSWORD]@db.XXXXXXXXXXXXX.supabase.co:5432/postgres
```

**Notez ces informations** :
- Host : `db.XXXXXXXXXXXXX.supabase.co` (ou avec pooler)
- Port : `5432` (ou `6543` avec pooler)
- User : `postgres` (ou `postgres.XXXXX` avec pooler)
- Password : Celui que vous avez choisi
- Database : `postgres`

---

### Étape 4 : Créer les tables

1. Menu gauche → **🔧 SQL Editor**
2. Cliquez sur **+ New query**
3. Sur votre ordinateur, ouvrez le fichier :
   ```
   c:\PROJET\OFARO TECH\ofaro-tech-website\database\schema.sql
   ```
4. **Sélectionnez TOUT le contenu** (Ctrl+A)
5. **Copiez** (Ctrl+C)
6. **Collez** dans l'éditeur SQL de Supabase (Ctrl+V)
7. Cliquez sur **Run** (ou Ctrl+Enter)
8. ⏳ Attendez la fin de l'exécution (10-30 secondes)
9. ✅ Vous devriez voir : **Success. No rows returned**

---

### Étape 5 : Vérifier que les tables sont créées

1. Menu gauche → **📊 Table Editor**
2. Vous devriez voir toutes ces tables :
   - ✅ users
   - ✅ contacts
   - ✅ service_requests ⭐ (importante pour le formulaire)
   - ✅ request_history
   - ✅ quote_requests
   - ✅ contact_messages
   - ✅ internship_requests
   - ✅ applications
   - ✅ job_offers
   - ✅ realizations
   - ✅ articles
   - Et d'autres...

3. Cliquez sur **service_requests** pour voir la structure
4. Elle devrait être vide (0 rows) mais la structure doit exister

---

### Étape 6 : Mettre à jour `.env.local`

Sur votre ordinateur, ouvrez le fichier :
```
c:\PROJET\OFARO TECH\ofaro-tech-website\.env.local
```

Remplacez avec vos NOUVELLES valeurs :

**Option 1 - Direct connection (recommandé pour débuter)** :
```env
# Configuration de la base de données SUPABASE
DB_HOST=db.XXXXXXXXXXXXX.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=VOTRE_MOT_DE_PASSE

# Frontend URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Option 2 - Connection pooling (pour production)** :
```env
# Configuration de la base de données SUPABASE
DB_HOST=aws-0-xx-xxxx-x.pooler.supabase.com
DB_PORT=6543
DB_NAME=postgres
DB_USER=postgres.XXXXXXXXXXXXX
DB_PASSWORD=VOTRE_MOT_DE_PASSE

# Frontend URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Remplacez** :
- `XXXXXXXXXXXXX` → L'identifiant de votre projet
- `VOTRE_MOT_DE_PASSE` → Le mot de passe que vous avez choisi

---

### Étape 7 : Redémarrer le serveur

Dans votre terminal PowerShell :

1. Arrêtez le serveur actuel :
   - Appuyez sur **Ctrl+C**

2. Redémarrez le serveur :
   ```powershell
   cd "c:\PROJET\OFARO TECH\ofaro-tech-website"
   npm run dev
   ```

3. Attendez que le serveur démarre (5-10 secondes)

---

### Étape 8 : Tester la connexion

Ouvrez un nouveau terminal PowerShell et exécutez :

```powershell
cd "c:\PROJET\OFARO TECH\ofaro-tech-website"
node scripts/test-db-connection.js
```

**Résultat attendu** :
```
========================================
  TEST DE CONNEXION À LA BASE DE DONNÉES
========================================

Configuration :
  Host: db.XXXXX.supabase.co
  Port: 5432
  Database: postgres
  User: postgres

Tentative de connexion...
✓ Connexion réussie !

Test de requête...
✓ Requête réussie !

Informations PostgreSQL :
  Heure serveur: 2026-08-08 XX:XX:XX
  Version: PostgreSQL 15.X

✓ Table service_requests : EXISTE
  Nombre de demandes : 0

Vérification des tables :
  ✓ contacts
  ✓ request_history
  ✓ users

========================================
  TEST TERMINÉ AVEC SUCCÈS !
========================================
```

✅ **Si vous voyez ce message, tout fonctionne parfaitement !**

---

### Étape 9 : Tester le formulaire

1. Ouvrez votre navigateur
2. Allez sur http://localhost:3000
3. Scrollez jusqu'à la section orange **"Besoin d'un service spécifique ?"**
4. Remplissez le formulaire :
   ```
   Nom: Test OFARO Nouvelle DB
   Email: test@ofarotech.com
   Téléphone: +228 90 12 34 56
   Service: Développement Web
   Description: Test de la nouvelle base de données
   ```
5. Cliquez sur **"Envoyer la demande"**

**Résultat attendu** :
✅ Message vert de succès avec la référence **SR-001**

---

### Étape 10 : Vérifier dans l'admin

1. Allez sur http://localhost:3000/admin/service-requests
2. ✅ Votre demande de test doit apparaître dans le tableau
3. Testez la **recherche** : tapez "Test"
4. Testez le **filtrage** : sélectionnez "Nouvelle"
5. Testez l'**export CSV**

---

### Étape 11 : Vérifier sur Supabase (optionnel)

1. Retournez sur https://supabase.com
2. Ouvrez votre projet
3. **📊 Table Editor** → **service_requests**
4. ✅ Vous devriez voir votre demande de test (1 row)

---

## ✅ CHECKLIST COMPLÈTE

Cochez au fur et à mesure :

- [ ] Ancien projet Supabase supprimé (si nécessaire)
- [ ] Nouveau projet Supabase créé
- [ ] Mot de passe noté quelque part
- [ ] Credentials de connexion récupérés
- [ ] Schéma SQL exécuté dans Supabase
- [ ] Tables visibles dans Table Editor
- [ ] Fichier `.env.local` mis à jour
- [ ] Serveur Next.js redémarré
- [ ] Test de connexion DB réussi (`node scripts/test-db-connection.js`)
- [ ] Formulaire soumis avec succès
- [ ] Demande visible dans l'admin
- [ ] Demande visible dans Supabase Table Editor

---

## 🎯 RÉSULTAT FINAL

Après toutes ces étapes :

✅ **Base de données Supabase** créée et configurée  
✅ **Toutes les tables** créées  
✅ **Connexion** fonctionnelle  
✅ **Formulaire** connecté et opérationnel  
✅ **Page admin** affichant les demandes  

---

## 🆘 EN CAS DE PROBLÈME

### Problème 1 : "Connection refused" ou "ECONNREFUSED"

**Causes possibles** :
- Mauvais credentials dans `.env.local`
- Projet Supabase pas complètement créé (attendre 2-3 min)
- Pare-feu bloquant la connexion

**Solutions** :
1. Vérifiez que vous avez bien copié les credentials
2. Attendez quelques minutes et réessayez
3. Utilisez Direct connection au lieu de Connection pooling

### Problème 2 : "relation does not exist"

**Cause** : Les tables n'ont pas été créées

**Solution** :
1. Retournez sur Supabase → SQL Editor
2. Ré-exécutez le contenu de `database/schema.sql`

### Problème 3 : "password authentication failed"

**Cause** : Mauvais mot de passe dans `.env.local`

**Solution** :
1. Sur Supabase → Settings → Database
2. Section "Database password" → Reset password
3. Notez le nouveau mot de passe
4. Mettez-le dans `.env.local`
5. Redémarrez le serveur

---

## 📞 AIDE SUPPLÉMENTAIRE

Si vous êtes bloqué à une étape :
1. Notez l'étape où vous êtes bloqué
2. Notez le message d'erreur exact
3. Prenez une capture d'écran
4. Demandez de l'aide en précisant ces informations

---

**Bon courage ! Vous allez y arriver ! 🚀**
