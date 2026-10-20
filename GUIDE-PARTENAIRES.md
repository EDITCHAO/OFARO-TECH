# 🤝 Guide - Section Partenaires

## Problème : Section Partenaires invisible sur la page d'accueil

La section "Nos Partenaires" ne s'affiche **que si** il y a au moins 1 partenaire **publié** dans la base de données Supabase.

---

## ✅ Solution : Ajouter des partenaires

### Option 1 : Via l'Admin (Recommandé)

1. Connectez-vous à l'admin : **http://localhost:3000/admin** ou **https://ofaro-tech.vercel.app/admin**
2. Cliquez sur **"Partenaires"** dans le sidebar
3. Cliquez sur **"Ajouter un partenaire"**
4. Remplissez le formulaire :
   - **Nom** : Ex: "Microsoft"
   - **Logo** : Uploadez une image ou utilisez une URL
   - **Site web** (optionnel)
   - **Ordre d'affichage** : 1, 2, 3...
   - Cochez **"Publié"** ✅
5. Cliquez sur **"Enregistrer"**

### Option 2 : Via Supabase SQL

1. Allez sur **https://supabase.com** → Votre projet `tidencxeznpjvnfebwmw`
2. Menu **"SQL Editor"**
3. Cliquez **"New Query"**
4. Copiez-collez le contenu de `database/insert-initial-partners.sql`
5. Cliquez **"Run"**

---

## 📋 Contenu du fichier SQL

Le fichier `database/insert-initial-partners.sql` contient 5 partenaires par défaut :
- ✅ Microsoft
- ✅ Amazon Web Services (AWS)
- ✅ Google Cloud
- ✅ Oracle
- ✅ Cisco

Tous sont configurés avec `is_published = true` donc ils s'afficheront immédiatement.

---

## 🎨 Personnalisation des logos

### Logos recommandés (format SVG transparent)

Vous pouvez remplacer les URLs par vos propres logos :

```sql
UPDATE partners 
SET logo_url = 'https://votre-cdn.com/logo-partenaire.svg'
WHERE name = 'Microsoft';
```

### Upload depuis l'admin

1. Allez dans **Admin → Partenaires**
2. Cliquez **"Modifier"** sur un partenaire
3. Section **"Logo"** : Cliquez **"Choisir un fichier"**
4. Sélectionnez votre image (PNG, JPG, SVG, WebP - max 5 MB)
5. Le logo est automatiquement uploadé vers Supabase Storage (`partners-logos`)

---

## 🔧 Dépannage

### La section ne s'affiche toujours pas ?

1. **Vérifiez qu'au moins 1 partenaire est publié** :
   ```sql
   SELECT * FROM partners WHERE is_published = true;
   ```

2. **Videz le cache du navigateur** : Ctrl + Shift + R

3. **Vérifiez l'API** : Ouvrez `http://localhost:3000/api/partners`
   - Vous devriez voir : `{ "partners": [...] }`

4. **Vérifiez la console du navigateur** (F12) pour les erreurs

---

## 📦 Bucket Supabase Storage

Si vous uploadez des logos depuis l'admin, assurez-vous que le bucket **`partners-logos`** existe :

1. Supabase → **Storage**
2. Si `partners-logos` n'existe pas : **New bucket**
   - Name: `partners-logos`
   - Public: **YES** ✅
   - File size limit: 5 MB

---

## 🚀 Déploiement

Une fois les partenaires ajoutés :
- **Local** : Visible immédiatement sur http://localhost:3000
- **Production** : Visible immédiatement sur https://ofaro-tech.vercel.app (pas de redéploiement nécessaire, les données viennent de Supabase)
