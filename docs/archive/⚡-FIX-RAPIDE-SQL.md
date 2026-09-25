# ⚡ FIX RAPIDE : Erreur SQL Médiathèque

## ❌ Vous avez eu cette erreur ?

```
ERROR: 42703: column "category" does not exist
```

## ✅ SOLUTION EN 30 SECONDES

### Utilisez le nouveau script SIMPLE

1. **Ouvrez Supabase** → SQL Editor
2. **Copiez** le contenu de : `database/create-media-library-SIMPLE.sql`
3. **Collez** dans SQL Editor
4. **Cliquez "Run"**

✅ **C'est fait !** Vous devriez voir "Success. No rows returned"

---

## 🔍 Vérifier que ça a marché

**Méthode rapide :**
```
Supabase → Table Editor → Chercher "media_library"
```

Vous devez voir la table avec **15 colonnes**.

---

## 🎯 Après le fix

1. ✅ Vérifiez que le bucket `media-library` existe et est **PUBLIC**
2. ✅ Allez sur : `http://localhost:3000/admin/mediatheque`
3. ✅ Cliquez "Uploader des images"
4. ✅ Testez avec une image

---

## 📁 Fichiers SQL disponibles

### Option 1 : `create-media-library-SIMPLE.sql` ⭐ RECOMMANDÉ
- Version sans erreur garantie
- Plus court et clair
- Utilise DROP IF EXISTS pour éviter les conflits

### Option 2 : `create-media-library-table.sql`
- Version avec commentaires détaillés
- Corrigée (plus d'erreur)

**Les deux fonctionnent maintenant !** Mais SIMPLE est plus rapide.

---

## 🐛 Si vous avez d'autres erreurs

### "relation media_library already exists"

**Solution :** Supprimez la table d'abord

```sql
DROP TABLE IF EXISTS media_library CASCADE;
```

Puis relancez le script SIMPLE.

### "bucket not found" lors de l'upload

**Solution :** Créez le bucket

```
Supabase → Storage → New bucket
- Name: media-library
- ✅ Cocher "Public bucket"
- Create
```

---

**✅ UTILISEZ `create-media-library-SIMPLE.sql` et tout fonctionnera !**

*Si besoin de détails : `FIX-SQL-MEDIATHEQUE.md`*
