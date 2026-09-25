# 🔧 Fix SQL Médiathèque

## ❌ Erreur rencontrée

```
ERROR: 42703: column "category" does not exist
```

## ✅ SOLUTION

### Option 1 : Utiliser le script SIMPLE (recommandé)

1. Allez dans **SQL Editor** de Supabase
2. Ouvrez le fichier : `database/create-media-library-SIMPLE.sql`
3. **Copiez TOUT** le contenu
4. **Collez** dans SQL Editor
5. Cliquez **"Run"**

✅ **Confirmation attendue** : "Success. No rows returned" OU message "Table media_library créée avec succès !"

---

### Option 2 : Utiliser le script modifié

J'ai corrigé le script original `create-media-library-table.sql` :
- ✅ Changement de la requête de vérification finale
- ✅ Plus d'erreur sur la colonne "category"

Même procédure :
1. SQL Editor
2. Copier `database/create-media-library-table.sql`
3. Coller et Run

---

## 🔍 Vérifier que ça a marché

### Méthode 1 : Via Supabase UI

```
Supabase Dashboard → Table Editor → Chercher "media_library"
```

Vous devriez voir la table avec 15 colonnes.

### Méthode 2 : Via SQL

Exécutez cette requête dans SQL Editor :

```sql
-- Vérifier la structure de la table
SELECT column_name, data_type 
FROM information_schema.columns
WHERE table_name = 'media_library'
ORDER BY ordinal_position;
```

✅ **Résultat attendu** : Liste de 15 colonnes
```
id                  | integer
file_name          | character varying
original_name      | character varying
file_url           | text
file_size          | integer
mime_type          | character varying
width              | integer
height             | integer
alt_text           | character varying
caption            | text
category           | character varying
uploaded_by        | character varying
is_active          | boolean
created_at         | timestamp with time zone
updated_at         | timestamp with time zone
```

---

## 🗑️ Si la table existe déjà (erreur "already exists")

### Option 1 : Supprimer et recréer

```sql
DROP TABLE IF EXISTS media_library CASCADE;
```

Puis exécutez le script `create-media-library-SIMPLE.sql`

### Option 2 : Vérifier si la colonne existe

```sql
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'media_library' 
AND column_name = 'category';
```

Si vide, ajoutez la colonne manuellement :

```sql
ALTER TABLE media_library 
ADD COLUMN IF NOT EXISTS category VARCHAR(100);

CREATE INDEX IF NOT EXISTS idx_media_category ON media_library(category);
```

---

## 🎯 Après le fix

Une fois la table créée :

1. ✅ Vérifiez que le bucket `media-library` existe et est PUBLIC
2. ✅ Testez l'upload : `http://localhost:3000/admin/mediatheque`
3. ✅ Uploadez une image de test

---

## 📋 Checklist

- [ ] Script SQL exécuté sans erreur
- [ ] Table `media_library` visible dans Table Editor
- [ ] 15 colonnes présentes (dont `category`)
- [ ] Bucket `media-library` existe et est PUBLIC
- [ ] Page `/admin/mediatheque` s'affiche
- [ ] Upload test fonctionne

---

## 🐛 Autres erreurs possibles

### "relation media_library already exists"
→ La table existe déjà. Utilisez `DROP TABLE` ou vérifiez sa structure.

### "bucket not found"
→ Le bucket `media-library` n'existe pas. Créez-le dans Storage.

### "bucket not public"
→ Le bucket n'est pas PUBLIC. Éditez-le et cochez "Public bucket".

### "permission denied"
→ Problème RLS. Le script SIMPLE inclut les bonnes policies.

---

**✅ UTILISEZ `create-media-library-SIMPLE.sql` pour éviter toute erreur !**
