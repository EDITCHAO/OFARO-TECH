# 📸 Guide : Photos dans les Témoignages

## 📋 Vue d'ensemble

Les témoignages peuvent maintenant inclure des photos des clients qui donnent leurs avis. Les photos sont stockées dans Supabase Storage et affichées sur la page d'accueil et dans l'admin.

## ✅ Configuration dans Supabase

### 1️⃣ Créer le bucket de stockage

1. Connectez-vous à **Supabase Dashboard**
2. Allez dans **Storage** (menu de gauche)
3. Cliquez sur **"New bucket"**
4. Configuration :
   - **Name** : `testimonials-photos`
   - **Public bucket** : ✅ **OUI** (cocher la case)
   - **File size limit** : 2 MB (recommandé)
5. Cliquez sur **"Create bucket"**

### 2️⃣ Vérifier les politiques RLS

Les politiques RLS sont automatiquement créées pour un bucket public. Vérifiez qu'elles sont actives :

- ✅ **SELECT** : Lecture publique
- ✅ **INSERT** : Upload public  
- ✅ **DELETE** : Suppression publique

## 🎯 Utilisation dans l'admin

### ➕ Ajouter une photo lors de la création

1. Allez sur `/admin/temoignages`
2. Cliquez sur **"Ajouter un témoignage"**
3. Dans la section **"Photo du client (optionnel)"** :
   - Aperçu : Montre l'initiale du nom ou la photo sélectionnée
   - Bouton **"Choisir une photo"** : Cliquez pour sélectionner une image
4. Sélectionnez une photo :
   - **Formats acceptés** : JPG, PNG, GIF, WEBP
   - **Taille max** : 2 MB
   - **Recommandé** : Photo carrée, visage bien visible, fond neutre
5. L'aperçu s'affiche immédiatement
6. Remplissez les autres champs
7. Cliquez sur **"Ajouter"**

### ✏️ Modifier ou ajouter une photo existante

1. Trouvez le témoignage dans la liste
2. Cliquez sur l'icône **"Modifier"** (✏️ bleue)
3. Cliquez sur **"Choisir une photo"**
4. Sélectionnez une nouvelle image
5. Cliquez sur **"Modifier"**
6. ✅ L'ancienne photo est **automatiquement supprimée** du Storage

### 🗑️ Supprimer une photo

Pour supprimer une photo :
1. Modifiez le témoignage
2. Laissez le champ photo vide (ne sélectionnez pas de nouvelle photo)
3. Cliquez sur **"Modifier"**
4. ℹ️ La photo sera remplacée par l'initiale du nom sur le site

## 🖼️ Affichage sur le site

### Page d'accueil (`/`)

Section "Ce que disent nos clients" :
- **Avec photo** : Affiche la photo en rond (64x64px)
- **Sans photo** : Affiche l'initiale dans un cercle orange

### Page admin (`/admin/temoignages`)

Cartes de témoignages :
- **Avec photo** : Photo ronde 48x48px à gauche
- **Sans photo** : Initiale dans cercle orange

## 📐 Recommandations photos

### Format idéal
- **Dimension** : 500x500px minimum (format carré)
- **Poids** : Moins de 500 KB (optimisé)
- **Format** : JPG ou PNG
- **Qualité** : Bonne résolution, pas floue

### Cadrage
- ✅ **Visage bien centré** et visible
- ✅ **Fond neutre** (blanc, gris, uni)
- ✅ **Éclairage naturel** et uniforme
- ✅ **Expression professionnelle** (souriant)
- ❌ Éviter les photos de groupe
- ❌ Éviter les fonds chargés
- ❌ Éviter les photos trop sombres

### Bonnes pratiques
1. Demander une photo professionnelle au client
2. Vérifier que la photo est nette et bien cadrée
3. Optimiser la taille avant upload (max 500 KB)
4. Utiliser un format JPG pour les photos (PNG pour logos)
5. Tester l'affichage sur mobile et desktop

## 🔧 Fonctionnalités techniques

### Upload automatique
- Nom du fichier : `{timestamp}-{nom_client}.{ext}`
- Exemple : `1791374472434-Dr_Kofi_MENSAH.jpg`
- Stockage : `testimonials-photos/` dans Supabase Storage
- URL publique générée automatiquement

### Remplacement de photo
- Lors de la modification avec nouvelle photo :
  1. Upload de la nouvelle photo
  2. Suppression automatique de l'ancienne
  3. Mise à jour de l'URL dans la base de données

### Validation
- ✅ Type de fichier : Vérifie que c'est une image
- ✅ Taille : Max 2 MB
- ✅ Affichage : Aperçu immédiat avant upload

## 🧪 Tests recommandés

### Test 1 : Upload simple
1. Ajoutez un témoignage avec une photo
2. Vérifiez dans Supabase Storage → `testimonials-photos`
3. ✅ Le fichier doit être présent avec le bon nom
4. Actualisez la page d'accueil
5. ✅ La photo doit s'afficher dans le témoignage

### Test 2 : Remplacement
1. Modifiez un témoignage existant
2. Changez la photo
3. ✅ L'ancienne photo doit être supprimée du Storage
4. ✅ La nouvelle photo doit s'afficher

### Test 3 : Sans photo
1. Créez un témoignage SANS photo
2. ✅ L'initiale du nom doit s'afficher (cercle orange)
3. Vérifiez sur la page d'accueil
4. ✅ L'initiale doit aussi s'afficher là

### Test 4 : Suppression
1. Supprimez un témoignage avec photo
2. Vérifiez Supabase Storage
3. ⚠️ La photo reste dans le Storage (à nettoyer manuellement)

## ❓ Dépannage

### La photo ne s'affiche pas
1. Vérifiez que le bucket `testimonials-photos` est **PUBLIC**
2. Vérifiez l'URL dans la table `testimonials.client_photo_url`
3. Testez l'URL directement dans le navigateur
4. Actualisez avec `Ctrl+F5`

### "Bucket does not exist"
➡️ Créez le bucket `testimonials-photos` dans Supabase Storage (PUBLIC)

### "File too large"
➡️ Compressez l'image (max 2 MB). Utilisez un outil comme TinyPNG ou Squoosh

### L'aperçu ne s'affiche pas
➡️ Vérifiez que le fichier est bien une image (JPG, PNG, etc.)

### Photo floue ou pixelisée
➡️ Utilisez une photo en meilleure résolution (min 500x500px)

## 🎨 Personnalisation

### Changer la taille des photos

**Page d'accueil** (`TestimonialsSection.tsx`) :
```tsx
className="w-16 h-16 rounded-full..." // Actuellement 64x64px
// Changez en w-20 h-20 pour 80x80px
```

**Admin** (`app/admin/temoignages/page.tsx`) :
```tsx
className="w-12 h-12 rounded-full..." // Actuellement 48x48px
// Changez en w-16 h-16 pour 64x64px
```

### Changer le format (carré au lieu de rond)

Remplacez `rounded-full` par `rounded-lg` pour un format carré avec coins arrondis.

---

✅ **Configuration terminée !** Les témoignages peuvent maintenant afficher les photos des clients.
