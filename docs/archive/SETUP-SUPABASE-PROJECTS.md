# 🚀 Configuration Supabase pour les Projets

## ÉTAPE 1 : Créer le bucket Storage "projects"

### 📍 Navigation
1. Allez sur https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Menu gauche → Cliquez sur **"Storage"** 📦

### ➕ Création
4. Cliquez sur **"New bucket"** (bouton vert en haut à droite)
5. Remplissez le formulaire :
   - **Name of bucket:** `projects`
   - **☑ Cochez la case "Public bucket"** ← IMPORTANT !
6. Cliquez sur **"Create bucket"**

### ✅ Vérification
Vous devriez voir le bucket "projects" dans la liste avec une icône de cadenas ouvert (public).

---

## ÉTAPE 2 : Créer la table "projects"

### 📍 Navigation
1. Menu gauche → Cliquez sur **"SQL Editor"** 📝
2. Cliquez sur **"+ New query"**

### 📋 Exécution du SQL
3. Ouvrez le fichier `database/reset-and-create-projects.sql` sur votre ordinateur
   (Utilisez ce fichier au lieu de create-projects-table.sql - il gère mieux les erreurs)
4. **Copiez TOUT le contenu** (Ctrl+A puis Ctrl+C)
5. **Collez** dans l'éditeur SQL de Supabase (Ctrl+V)
6. Cliquez sur le bouton **"Run"** (ou appuyez sur Ctrl+Enter)

### ✅ Vérification
Vous devriez voir :
- ✅ "Table "projects" créée avec succès !"
- ✅ "nombre_projets: 6"

---

## ÉTAPE 3 : Vérifier que tout fonctionne

### Vérifier la table
1. Menu gauche → **"Table Editor"**
2. Sélectionnez la table **"projects"**
3. Vous devriez voir 6 lignes (projets de test)

### Vérifier le bucket
1. Menu gauche → **"Storage"**
2. Cliquez sur le bucket **"projects"**
3. Il devrait être vide (normal, on n'a pas encore uploadé d'images)

---

## 🎯 C'est prêt !

Maintenant vous pouvez :
1. Redémarrer votre serveur local : `npm run dev`
2. Aller sur http://localhost:3000/admin
3. Cliquer sur "Réalisations (Portfolio)"
4. Commencer à ajouter des projets !

---

## ❓ Problèmes courants

### "Bucket already exists"
➡️ Le bucket existe déjà, passez à l'ÉTAPE 2

### "Permission denied"
➡️ Vérifiez que vous êtes bien connecté avec le bon compte Supabase

### "Table already exists"
➡️ La table existe déjà, c'est bon ! Testez l'admin

### Le bucket n'est pas public
➡️ Cliquez sur le bucket → Settings → Cochez "Public bucket" → Save

---

## 📸 Captures d'écran (endroits clés)

### Storage - New bucket
```
Supabase Dashboard
├── Storage  ← Cliquez ici
    ├── [New bucket] ← Bouton vert
    └── Modal:
        - Name: projects
        - ☑ Public bucket ← COCHEZ !
```

### SQL Editor - New query
```
Supabase Dashboard
├── SQL Editor  ← Cliquez ici
    ├── [+ New query] ← Bouton
    └── Éditeur:
        - Collez le SQL ici
        - [Run] ← Bouton vert
```

---

## 🔑 Points IMPORTANTS

1. ✅ Le bucket DOIT être **PUBLIC** (pas private)
2. ✅ Le nom du bucket est **exactement** `projects` (pas de majuscules)
3. ✅ Le SQL doit être exécuté en entier (toutes les lignes)
4. ✅ Redémarrez le serveur après avoir créé la table

---

Besoin d'aide ? Vérifiez ces 4 points dans l'ordre !
