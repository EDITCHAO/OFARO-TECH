# 📸 Voir les images sur le site

## ✅ J'AI CRÉÉ UNE PAGE GALERIE PUBLIQUE

### Nouvelle page créée : `/galerie`

**Lien** : `http://localhost:3000/galerie`

---

## 🎯 FONCTIONNALITÉS DE LA GALERIE

### Page publique `/galerie`
- ✅ Affiche toutes les images uploadées (actives)
- ✅ Grille responsive (1-4 colonnes)
- ✅ Recherche par nom/description
- ✅ Filtre par catégorie
- ✅ Compteur d'images
- ✅ **Lightbox** : clic sur une image pour agrandir
- ✅ **Téléchargement** : bouton pour télécharger l'image
- ✅ Affiche catégorie, dimensions, légende

### Design
- ✅ Header orange avec titre "Galerie OFARO TECH"
- ✅ Barre de filtres sticky (reste en haut)
- ✅ Hover zoom sur les images
- ✅ Modal plein écran pour voir en grand

---

## 🔧 PROBLÈME ACTUEL : RLS

Vous voyez "Total: 1 image" mais "Aucune image trouvée" parce que :

1. ❌ L'upload a eu une **erreur RLS** (Row-Level Security)
2. ❌ L'image est dans le bucket mais **PAS dans la base de données**
3. ❌ Sans entrée DB, l'image n'apparaît pas dans la grille

### Solution

**Exécutez d'abord** : `database/fix-media-library-storage-policies.sql`

Ce script :
- ✅ Corrige les politiques RLS du bucket
- ✅ Permet l'upload sans erreur
- ✅ Les nouvelles images iront dans la DB

---

## 📋 ÉTAPES POUR VOIR VOS IMAGES

### 1. Corriger les politiques RLS

```
Supabase → SQL Editor
→ Copier fix-media-library-storage-policies.sql
→ Coller et Run
```

### 2. Re-uploader une image

```
http://localhost:3000/admin/mediatheque
→ Uploader des images
→ Sélectionner une image
→ Catégorie: Portfolio
→ Uploader
```

✅ Cette fois, l'image ira dans la base de données !

### 3. Voir dans l'admin

```
http://localhost:3000/admin/mediatheque
```

L'image apparaît dans la grille avec :
- ✅ Aperçu
- ✅ Nom, dimensions, taille
- ✅ Bouton "Copier URL"
- ✅ Bouton "Supprimer"

### 4. Voir sur le site public

```
http://localhost:3000/galerie
```

L'image apparaît dans la galerie publique !

---

## 🎨 INTÉGRATION SUR D'AUTRES PAGES

Vous pouvez aussi afficher les images sur d'autres pages :

### Exemple : Afficher les images Portfolio sur la page d'accueil

```tsx
'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function HomePage() {
  const [portfolioImages, setPortfolioImages] = useState([]);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function loadImages() {
      const { data } = await supabase
        .from('media_library')
        .select('*')
        .eq('category', 'portfolio')
        .eq('is_active', true)
        .limit(6);
      
      setPortfolioImages(data || []);
    }
    loadImages();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {portfolioImages.map(img => (
        <img 
          key={img.id} 
          src={img.file_url} 
          alt={img.alt_text}
          className="w-full h-64 object-cover rounded-lg"
        />
      ))}
    </div>
  );
}
```

---

## 📊 RÉSUMÉ

### Pages disponibles

1. **`/admin/mediatheque`** (Admin)
   - Upload multiple
   - Gestion complète
   - Recherche/filtres
   - Copier URL / Supprimer

2. **`/galerie`** (Public) ← **NOUVEAU !**
   - Affichage public
   - Lightbox
   - Téléchargement
   - Recherche/filtres

### Workflow

```
1. Admin uploade image → /admin/mediatheque
2. Image stockée dans Supabase (Storage + DB)
3. Image visible dans admin → /admin/mediatheque
4. Image visible sur site → /galerie
5. Image utilisable partout via son URL
```

---

## 🚀 ACTION MAINTENANT

1. ✅ **Exécutez** le script SQL `fix-media-library-storage-policies.sql`
2. ✅ **Re-uploadez** une image test
3. ✅ **Vérifiez** qu'elle apparaît dans `/admin/mediatheque`
4. ✅ **Visitez** `/galerie` pour la voir en public
5. ✅ **Testez** le lightbox (clic sur l'image)

---

**Corrigez d'abord le RLS, puis les images apparaîtront partout ! 🎉**
