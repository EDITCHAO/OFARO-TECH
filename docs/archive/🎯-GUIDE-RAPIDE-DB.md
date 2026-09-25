# 🎯 GUIDE RAPIDE : Créer la nouvelle base de données

## 📋 LES 10 ÉTAPES (30 minutes)

---

### ✅ ÉTAPE 1 : Créer le projet Supabase (5 min)

1. 👉 Allez sur https://supabase.com
2. Cliquez sur **+ New Project**
3. Remplissez :
   - **Nom** : `OFARO-TECH`
   - **Password** : Choisissez un mot de passe simple (ex: `Ofaro123456`)
   - **Region** : Europe (Frankfurt) ou Europe (London)
   - **Plan** : Free
4. Cliquez **Create new project**
5. ⏳ Attendez 2-3 minutes

---

### ✅ ÉTAPE 2 : Récupérer les credentials (2 min)

1. Une fois créé, allez dans **⚙️ Settings** → **Database**
2. Section **Connection string**
3. Choisissez **Direct connection** (plus simple)
4. Vous verrez :
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.XXXXX.supabase.co:5432/postgres
   ```
5. **NOTEZ CES INFOS** :
   - Host : `db.XXXXX.supabase.co`
   - Port : `5432`
   - User : `postgres`
   - Password : Votre mot de passe
   - Database : `postgres`

---

### ✅ ÉTAPE 3 : Créer les tables (3 min)

1. Menu gauche → **🔧 SQL Editor**
2. Cliquez **+ New query**
3. Sur votre PC, ouvrez :
   ```
   c:\PROJET\OFARO TECH\ofaro-tech-website\database\schema.sql
   ```
4. **Ctrl+A** (tout sélectionner) → **Ctrl+C** (copier)
5. Dans Supabase → **Ctrl+V** (coller)
6. Cliquez **Run** (ou Ctrl+Enter)
7. ⏳ Attendez 10-30 secondes
8. ✅ Vous devez voir "Success"

---

### ✅ ÉTAPE 4 : Vérifier les tables (1 min)

1. Menu gauche → **📊 Table Editor**
2. Vous devez voir ces tables :
   - service_requests ⭐
   - contacts
   - users
   - request_history
   - Et plein d'autres...

---

### ✅ ÉTAPE 5 : Mettre à jour `.env.local` (2 min)

**Je vais le faire pour vous !** 

Donnez-moi juste ces infos de l'étape 2 :
- Le nouveau **Host** (db.XXXXX.supabase.co)
- Le nouveau **Password**

**Format de ce que vous devez me donner** :
```
Host: db.XXXXXXXXXXXXX.supabase.co
Password: VotreMotDePasse
```

---

### ✅ ÉTAPE 6 : Redémarrer le serveur (1 min)

Je le ferai automatiquement après avoir mis à jour `.env.local`

---

### ✅ ÉTAPE 7 : Tester la connexion (1 min)

Je testerai automatiquement avec :
```powershell
node scripts/test-db-connection.js
```

Résultat attendu :
```
✓ Connexion réussie !
✓ Table service_requests : EXISTE
```

---

### ✅ ÉTAPE 8 : Tester le formulaire (2 min)

**Vous** :
1. Allez sur http://localhost:3000
2. Scrollez jusqu'au formulaire orange
3. Remplissez et soumettez

Résultat attendu :
```
✅ Votre demande a été envoyée avec succès.
Référence : SR-001
```

---

### ✅ ÉTAPE 9 : Vérifier dans l'admin (1 min)

**Vous** :
1. Allez sur http://localhost:3000/admin/service-requests
2. Vous devez voir votre demande

---

### ✅ ÉTAPE 10 : Confirmer sur Supabase (1 min)

**Vous** :
1. Sur Supabase → **📊 Table Editor** → **service_requests**
2. Vous devez voir 1 ligne avec votre demande

---

## 🎯 ON COMMENCE !

**Faites les étapes 1 à 4 sur Supabase, puis donnez-moi :**

```
Host: db.XXXXXXXXXXXXX.supabase.co
Password: VotreMotDePasse
```

**Et je m'occupe du reste ! 🚀**

---

## 📝 AIDE-MÉMOIRE

### Où trouver les credentials sur Supabase ?
**Settings** → **Database** → **Connection string** → **Direct connection**

### Quel fichier SQL exécuter ?
`database/schema.sql` (tout le contenu)

### Comment vérifier que ça marche ?
Allez dans **Table Editor**, vous devez voir les tables

---

## 🆘 PROBLÈMES COURANTS

**"Success. No rows returned"** → ✅ C'est NORMAL, les tables sont créées !

**Erreur SQL** → Vérifiez que vous avez copié TOUT le fichier schema.sql

**Tables pas visibles** → Rafraîchissez la page (F5)

---

**Dites-moi quand vous avez fini les étapes 1-4 ! 👍**
