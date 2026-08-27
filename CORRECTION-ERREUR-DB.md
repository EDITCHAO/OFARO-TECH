# 🔧 CORRECTION : Erreur de connexion à la base de données

## ❌ Erreur détectée

```
error: (ENOTFOUND) tenant/user postgres.rfatempjwgpznkacmhvo not found
```

**Cause** : Les credentials de la base de données Supabase ne sont plus valides ou ont été modifiés.

---

## ✅ SOLUTION : Obtenir les nouveaux credentials Supabase

### Étape 1 : Aller sur Supabase

1. Allez sur https://supabase.com
2. Connectez-vous à votre compte
3. Sélectionnez votre projet OFARO TECH

### Étape 2 : Récupérer les credentials

1. Dans le menu de gauche, cliquez sur **⚙️ Settings** (Paramètres)
2. Cliquez sur **Database**
3. Scrollez jusqu'à **Connection string**
4. Sélectionnez l'onglet **Connection pooling** (Recommandé pour Next.js)
5. Choisissez le mode **Transaction**

Vous verrez quelque chose comme :
```
postgresql://postgres.xxxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-xx-xxxx-x.pooler.supabase.com:6543/postgres
```

### Étape 3 : Décomposer les credentials

De cette chaîne de connexion, extrayez :

```
DB_HOST=aws-0-xx-xxxx-x.pooler.supabase.com
DB_PORT=6543
DB_NAME=postgres
DB_USER=postgres.xxxxxxxxxxxxx
DB_PASSWORD=[YOUR-PASSWORD]
```

**Exemple** :
```
postgresql://postgres.abcdefghijklmnop:MySecretPass123@aws-0-eu-west-1.pooler.supabase.com:6543/postgres
```

Devient :
```
DB_HOST=aws-0-eu-west-1.pooler.supabase.com
DB_PORT=6543
DB_NAME=postgres
DB_USER=postgres.abcdefghijklmnop
DB_PASSWORD=MySecretPass123
```

### Étape 4 : Mettre à jour `.env.local`

Ouvrez le fichier `.env.local` et remplacez les valeurs :

```env
# Configuration de la base de données SUPABASE
DB_HOST=VOTRE_NOUVEAU_HOST
DB_PORT=6543
DB_NAME=postgres
DB_USER=VOTRE_NOUVEAU_USER
DB_PASSWORD=VOTRE_NOUVEAU_PASSWORD

# Frontend URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Étape 5 : Redémarrer le serveur

```powershell
# Arrêter le serveur (Ctrl+C dans le terminal)
# Puis redémarrer
cd "c:\PROJET\OFARO TECH\ofaro-tech-website"
npm run dev
```

---

## 🧪 Tester la nouvelle connexion

```powershell
node scripts/test-db-connection.js
```

**Résultat attendu** :
```
========================================
  TEST DE CONNEXION À LA BASE DE DONNÉES
========================================

✓ Connexion réussie !
✓ Requête réussie !
✓ Table service_requests : EXISTE
```

---

## 📋 Vérifier que les tables existent

Si le test de connexion réussit mais que les tables n'existent pas, vous devez exécuter le schéma SQL :

### Étape 1 : Aller dans SQL Editor

1. Sur Supabase, allez dans **🔧 SQL Editor**
2. Cliquez sur **+ New query**

### Étape 2 : Copier le schéma

1. Ouvrez le fichier `database/schema.sql` dans votre projet
2. Copiez TOUT le contenu
3. Collez-le dans l'éditeur SQL de Supabase

### Étape 3 : Exécuter

1. Cliquez sur **Run** (ou Ctrl+Enter)
2. Attendez que l'exécution se termine
3. Vérifiez qu'il n'y a pas d'erreurs

### Étape 4 : Vérifier les tables

1. Allez dans **📊 Table Editor**
2. Vous devriez voir toutes ces tables :
   - ✅ users
   - ✅ contacts
   - ✅ service_requests ⭐
   - ✅ request_history ⭐
   - ✅ quote_requests
   - ✅ contact_messages
   - ✅ internship_requests
   - ✅ applications
   - ✅ job_offers
   - ✅ realizations
   - ✅ articles
   - Et d'autres...

---

## 🔄 Après la correction

Une fois les credentials mis à jour et le serveur redémarré :

### Test 1 : Soumettre une demande

1. Allez sur http://localhost:3000
2. Scrollez jusqu'au formulaire orange
3. Remplissez et soumettez
4. ✅ Vous devriez voir un message de succès avec SR-001

### Test 2 : Vérifier dans l'admin

1. Allez sur http://localhost:3000/admin/service-requests
2. ✅ Votre demande doit apparaître

---

## 🆘 Si le problème persiste

### Option 1 : Utiliser la connexion directe (sans pooler)

Dans Supabase, sous **Connection string**, au lieu de **Connection pooling**, utilisez **Direct connection**.

Exemple de chaîne :
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
```

Mettez à jour `.env.local` :
```env
DB_HOST=db.xxxxxxxxxxxxx.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=[YOUR-PASSWORD]
```

### Option 2 : Créer un nouveau projet Supabase

Si votre projet Supabase a été supprimé ou n'est plus accessible :

1. Créez un nouveau projet sur https://supabase.com
2. Notez les nouveaux credentials
3. Exécutez le schéma SQL (`database/schema.sql`)
4. Mettez à jour `.env.local`

### Option 3 : Vérifier le mot de passe

Le mot de passe Supabase peut contenir des caractères spéciaux qui nécessitent un encodage.

**Si votre mot de passe contient** : `@`, `#`, `$`, `%`, `&`, etc.

Vous devez les encoder en URL :
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`

Ou plus simplement, **réinitialisez le mot de passe** sur Supabase et choisissez-en un simple (lettres et chiffres seulement).

---

## 📝 Checklist de résolution

- [ ] Aller sur Supabase
- [ ] Récupérer les nouveaux credentials (Connection pooling → Transaction)
- [ ] Mettre à jour `.env.local`
- [ ] Redémarrer le serveur (`npm run dev`)
- [ ] Tester la connexion (`node scripts/test-db-connection.js`)
- [ ] Si tables manquantes, exécuter `database/schema.sql` dans SQL Editor
- [ ] Retester le formulaire sur http://localhost:3000
- [ ] Vérifier dans l'admin : http://localhost:3000/admin/service-requests

---

## 🎯 Résultat attendu

Après correction, vous devriez voir dans les logs du serveur :

```
✓ Connexion à la base de données établie
Query executed { text: 'SELECT COUNT(*) as total FROM service_requests', duration: 123, rows: 1 }
POST /api/service-requests/submit 201 in 456ms
```

Et dans le navigateur :
```
✅ Votre demande a été envoyée avec succès.
Référence : SR-001
```

---

**Une fois corrigé, tout fonctionnera parfaitement ! 🚀**
