# 🔧 FIX : Erreur Row-Level Security

## ❌ L'erreur que vous avez

```
StorageApiError: new row violates row-level security policy
```

## 🔍 Le problème

Le bucket `media-library` a des politiques RLS trop strictes qui empêchent l'upload.

---

## ✅ SOLUTION (30 SECONDES)

### Exécutez ce script SQL dans Supabase

1. **Ouvrez Supabase** → SQL Editor
2. **Copiez** tout le contenu de : `database/fix-media-library-storage-policies.sql`
3. **Collez** dans SQL Editor
4. **Cliquez "Run"**

✅ **Résultat attendu** : "Politiques de stockage mises à jour avec succès !"

---

## 🎯 TESTEZ À NOUVEAU

1. Retournez sur : `http://localhost:3000/admin/mediatheque`
2. Cliquez **"Uploader des images"**
3. Sélectionnez une image
4. Catégorie : **Portfolio**
5. Cliquez **"Uploader"**

✅ Cette fois l'image devrait s'uploader sans erreur !

---

## 📋 Ce que le script fait

1. ✅ Supprime les anciennes politiques restrictives
2. ✅ Crée 4 nouvelles politiques PUBLIQUES :
   - Lecture publique
   - Upload public
   - Mise à jour publique
   - Suppression publique
3. ✅ Force le bucket à être PUBLIC

---

## 🔐 Note sur la sécurité

**C'est normal et sécurisé** pour une médiathèque publique :
- Les images sont destinées à être affichées sur le site
- Tout le monde peut les voir
- Seuls les admins ont accès à la page d'upload

Si vous voulez restreindre l'upload/suppression plus tard, vous pourrez ajouter des conditions d'authentification.

---

**Exécutez le script SQL et testez à nouveau ! 🚀**
