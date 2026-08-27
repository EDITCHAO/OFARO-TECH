# 🔧 ERREUR : Connexion base de données

## ❌ Le problème

Les credentials Supabase dans `.env.local` ne sont plus valides.

---

## ✅ SOLUTION RAPIDE (5 minutes)

### 1️⃣ Aller sur Supabase

👉 https://supabase.com

1. Connectez-vous
2. Ouvrez votre projet OFARO TECH

### 2️⃣ Récupérer les nouveaux credentials

1. Menu gauche → **⚙️ Settings**
2. Cliquez sur **Database**
3. Scrollez jusqu'à **Connection string**
4. Onglet **Connection pooling** (pas "Direct connection")
5. Mode : **Transaction**

Vous verrez :
```
postgresql://postgres.XXXXX:PASSWORD@aws-0-xx.pooler.supabase.com:6543/postgres
```

### 3️⃣ Extraire les informations

De cette ligne, notez :

```
Host:     aws-0-xx-xxxx.pooler.supabase.com
Port:     6543
Database: postgres
User:     postgres.XXXXXXXXXXXXX
Password: VOTRE_MOT_DE_PASSE
```

### 4️⃣ Mettre à jour `.env.local`

Ouvrez le fichier `.env.local` dans votre projet et remplacez :

```env
DB_HOST=NOUVEAU_HOST_ICI
DB_PORT=6543
DB_NAME=postgres
DB_USER=NOUVEAU_USER_ICI
DB_PASSWORD=NOUVEAU_PASSWORD_ICI

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5️⃣ Redémarrer le serveur

Dans votre terminal :
- Appuyez sur **Ctrl+C** pour arrêter
- Puis retapez : `npm run dev`

---

## 🧪 Tester

```powershell
node scripts/test-db-connection.js
```

**Si ça affiche** :
```
✓ Connexion réussie !
✓ Table service_requests : EXISTE
```

**Alors c'est bon ! ✅** Retestez le formulaire sur http://localhost:3000

---

## 📋 Si les tables n'existent pas

Vous verrez :
```
✗ Table service_requests : N'EXISTE PAS
```

**Solution** :

1. Sur Supabase → **🔧 SQL Editor**
2. **+ New query**
3. Ouvrez `database/schema.sql` dans votre projet
4. **Copiez TOUT le contenu**
5. **Collez** dans l'éditeur Supabase
6. Cliquez sur **Run** (ou Ctrl+Enter)
7. Attendez la fin de l'exécution
8. Retestez : `node scripts/test-db-connection.js`

---

## 🎯 Une fois corrigé

1. Le formulaire fonctionnera : http://localhost:3000
2. L'admin affichera les demandes : http://localhost:3000/admin/service-requests

---

## 🆘 Si ça ne marche toujours pas

**Option simple** : Utilisez la connexion directe au lieu du pooler

Sur Supabase, utilisez **Direct connection** au lieu de **Connection pooling** :

```
postgresql://postgres:PASSWORD@db.XXXXX.supabase.co:5432/postgres
```

Mettez à jour `.env.local` :
```env
DB_HOST=db.XXXXX.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=VOTRE_PASSWORD
```

---

**Consultez `CORRECTION-ERREUR-DB.md` pour plus de détails.**
