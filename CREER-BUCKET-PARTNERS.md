# 📦 Créer le bucket pour les logos des partenaires

## 🎯 Étapes à suivre (5 minutes)

### Étape 1 : Aller sur Supabase Dashboard

1. Ouvre ce lien : https://supabase.com/dashboard/project/tidencxeznpjvnfebwmw
2. Connecte-toi si nécessaire
3. Tu devrais voir ton projet "ofaro-tech"

---

### Étape 2 : Ouvrir Storage

1. Dans le menu de gauche, clique sur **Storage** (icône dossier)
2. Tu verras la liste des buckets existants
3. Clique sur le bouton vert **"New bucket"** en haut à droite

---

### Étape 3 : Configurer le bucket

Une fenêtre s'ouvre. Remplis les champs :

**Name (Nom)**
```
partners-logos
```

**Public bucket (Bucket public)**
✅ **COCHE CETTE CASE** ← TRÈS IMPORTANT !

Les logos doivent être accessibles publiquement pour s'afficher sur le site.

**File size limit (Taille max)**
```
5
```
(5 MB maximum par fichier)

**Allowed MIME types (Types de fichiers autorisés)**
Laisse vide (ou copie ça si tu veux être précis) :
```
image/png,image/jpeg,image/jpg,image/svg+xml,image/webp
```

Puis clique sur **"Create bucket"**

---

### Étape 4 : Vérifier que le bucket est créé

1. Tu devrais voir `partners-logos` dans la liste des buckets
2. Il doit avoir une icône de globe 🌐 (qui indique qu'il est public)
3. Clique dessus pour l'ouvrir

---

### Étape 5 : Tester l'upload

Pour être sûr que tout fonctionne :

1. Dans le bucket `partners-logos`, clique sur **"Upload"**
2. Sélectionne n'importe quelle image de test sur ton PC
3. Upload l'image
4. Une fois uploadée, clique sur l'image
5. Tu verras une URL qui ressemble à ça :
   ```
   https://tidencxeznpjvnfebwmw.supabase.co/storage/v1/object/public/partners-logos/test.png
   ```
6. **Copie cette URL** et ouvre-la dans un nouvel onglet
7. Si l'image s'affiche → ✅ **Tout fonctionne !**

---

## ✅ C'est terminé !

Maintenant l'application peut :
- Uploader des logos via le back-office
- Les stocker dans Supabase Storage
- Les afficher sur le site

---

## 📋 Récapitulatif des URLs

Une fois configuré, les logos auront des URLs comme :

```
https://tidencxeznpjvnfebwmw.supabase.co/storage/v1/object/public/partners-logos/microsoft-logo.png
https://tidencxeznpjvnfebwmw.supabase.co/storage/v1/object/public/partners-logos/aws-logo.png
```

---

## ❓ Problèmes ?

### "Bucket already exists"
→ C'est OK, tu peux utiliser le bucket existant

### L'image ne s'affiche pas après upload
→ Vérifie que le bucket est bien **Public** (coché lors de la création)
→ Tu peux changer ça après : Settings du bucket > Public bucket

### Permission denied
→ Va dans l'onglet **Policies** du bucket
→ Ajoute une policy "Public Access" pour SELECT

---

🎉 **Une fois fait, dis-moi et on pourra tester l'upload depuis le back-office !**
