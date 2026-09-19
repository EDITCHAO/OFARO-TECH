# 🚀 Guide Rapide : Médiathèque en 3 Minutes

## ⏱️ CONFIGURATION (Faites-le maintenant !)

### 1️⃣ Créer le bucket (1 min)

```
Supabase Dashboard → Storage → New bucket
├── Name: media-library
├── ✅ Public bucket (COCHEZ !)
└── Create bucket
```

### 2️⃣ Créer la table (30 sec)

```
Supabase Dashboard → SQL Editor → New query
├── Ouvrir: database/create-media-library-SIMPLE.sql ⭐ (RECOMMANDÉ)
├── Copier tout le contenu
├── Coller dans SQL Editor
└── Run
```

**Alternative :** `create-media-library-table.sql` (version détaillée)

### 3️⃣ Tester (1 min)

```
http://localhost:3000/admin/mediatheque
├── Cliquer "Uploader des images"
├── Sélectionner une image
├── Choisir catégorie (Portfolio)
└── Uploader
```

---

## 📸 UTILISATION QUOTIDIENNE

### Upload d'images

```
1. Cliquez "Uploader des images" (bouton orange)
2. Sélectionnez vos images
3. Choisissez la catégorie
4. (Optionnel) Texte alternatif et légende
5. Cliquez "Uploader"
```

**Catégories disponibles :**
- 🎨 **Portfolio** : Projets clients
- 📝 **Blog** : Articles
- 👥 **Team** : Équipe
- ⚙️ **Services** : Illustrations services
- 🎯 **Icons** : Icônes, logos
- 📢 **Banners** : Bannières
- 📦 **Autres** : Le reste

### Utiliser une image sur le site

```
1. Trouvez votre image dans la grille
2. Cliquez "Copier URL"
3. Collez dans votre code :

<img src="URL_COPIÉE" alt="Description" />
```

### Supprimer une image

```
1. Trouvez l'image
2. Cliquez icône poubelle (rouge)
3. Confirmez
```

---

## 🔍 RECHERCHE

**Barre de recherche :**
- Cherche dans : nom fichier, texte alternatif, légende

**Filtre catégorie :**
- Menu déroulant : Portfolio, Blog, Team, etc.

---

## 💡 ASTUCES

### ✅ Bonnes pratiques

1. **Nommez bien vos fichiers** avant upload
   - ❌ `IMG_1234.jpg`
   - ✅ `projet-site-web-client-abc.jpg`

2. **Utilisez les catégories** correctement
   - Organisation plus facile
   - Recherche plus rapide

3. **Ajoutez du texte alternatif** (accessibilité)
   - Décrit l'image pour les lecteurs d'écran
   - Bon pour le SEO

4. **Optimisez avant upload** (optionnel)
   - Redimensionnez les grandes images
   - Compressez pour réduire le poids

### 🎯 Raccourcis

- **Accès direct** : `/admin/mediatheque`
- **Via menu** : Admin → Médiathèque (section 3)

---

## 📊 INFORMATIONS AFFICHÉES

Pour chaque image :
- ✅ Aperçu visuel
- ✅ Nom du fichier
- ✅ Catégorie (badge)
- ✅ Dimensions (px)
- ✅ Taille (KB/MB)
- ✅ Date d'upload

---

## 🐛 PROBLÈMES COURANTS

### ❌ "Failed to upload"
→ Vérifiez que le bucket `media-library` existe et est PUBLIC

### ❌ "Failed to load images"
→ Exécutez le script SQL `create-media-library-table.sql`

### ❌ Page not found
→ Redémarrez le serveur : `npm run dev`

---

## 🎨 CODE : Utiliser les images

### Basique
```tsx
<img 
  src="https://votre-url.supabase.co/storage/v1/object/public/media-library/portfolio/123-image.jpg" 
  alt="Description"
/>
```

### Depuis la base de données
```tsx
const { data: images } = await supabase
  .from('media_library')
  .select('*')
  .eq('category', 'portfolio')
  .eq('is_active', true);

{images?.map(img => (
  <img key={img.id} src={img.file_url} alt={img.alt_text} />
))}
```

### Hook React personnalisé
```tsx
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from 'react';

export function useMediaLibrary(category?: string) {
  const [images, setImages] = useState([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function loadImages() {
      let query = supabase
        .from('media_library')
        .select('*')
        .eq('is_active', true);
      
      if (category) query = query.eq('category', category);
      
      const { data } = await query;
      setImages(data || []);
    }
    loadImages();
  }, [category]);

  return images;
}

// Utilisation
const portfolioImages = useMediaLibrary('portfolio');
```

---

## 📦 CE QUI A ÉTÉ CRÉÉ

### Fichiers créés
- ✅ `app/admin/mediatheque/page.tsx` (page admin)
- ✅ `database/create-media-library-table.sql` (script SQL)
- ✅ `INSTRUCTIONS-MEDIATHEQUE.md` (instructions détaillées)
- ✅ `MEDIATHEQUE-COMPLETE.md` (documentation complète)
- ✅ `GUIDE-RAPIDE-MEDIATHEQUE.md` (ce guide)

### Fichiers modifiés
- ✅ `components/admin/AdminLayout.tsx` (navigation vers /admin/mediatheque)

### À faire par vous
- ⏳ Créer bucket `media-library` dans Supabase
- ⏳ Exécuter script SQL pour créer la table

---

## ✅ CHECKLIST

Configuration :
- [ ] Bucket `media-library` créé
- [ ] Bucket est PUBLIC (case cochée)
- [ ] Table `media_library` créée (script SQL exécuté)

Test :
- [ ] Page `/admin/mediatheque` s'affiche
- [ ] Upload d'une image fonctionne
- [ ] Image apparaît dans la grille
- [ ] "Copier URL" fonctionne
- [ ] Suppression fonctionne

---

**🎉 C'EST TOUT !** Vous êtes prêt à gérer vos images comme un pro !

**Besoin de plus de détails ?** → Consultez `MEDIATHEQUE-COMPLETE.md`

---

*OFARO TECH - Back-office Next.js 14*
