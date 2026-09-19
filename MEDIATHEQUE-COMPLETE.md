# 📸 Médiathèque OFARO TECH - Documentation Complète

## ✅ Ce qui a été créé

### 1. Fichiers créés
- ✅ `app/admin/mediatheque/page.tsx` - Page complète d'administration de la médiathèque
- ✅ `database/create-media-library-table.sql` - Script SQL pour créer la table
- ✅ `INSTRUCTIONS-MEDIATHEQUE.md` - Instructions de configuration
- ✅ `MEDIATHEQUE-COMPLETE.md` - Ce document

### 2. Fichiers modifiés
- ✅ `components/admin/AdminLayout.tsx` - Ajout navigation directe vers `/admin/mediatheque`

---

## 🚀 CONFIGURATION RAPIDE (3 ÉTAPES)

### ⚡ ÉTAPE 1 : Créer le bucket Supabase (1 minute)

1. Ouvrez votre projet Supabase : https://supabase.com/dashboard
2. Allez dans **Storage** (icône dossier dans le menu gauche)
3. Cliquez sur **"New bucket"**
4. Remplissez :
   - **Name** : `media-library`
   - **Public bucket** : ✅ **COCHEZ CETTE CASE !** (très important)
5. Cliquez **"Create bucket"**

✅ **Confirmation** : Le bucket `media-library` apparaît dans la liste

---

### ⚡ ÉTAPE 2 : Créer la table (30 secondes)

1. Restez dans Supabase, allez dans **SQL Editor** (icône <> dans le menu)
2. Cliquez **"New query"**
3. Ouvrez le fichier `ofaro-tech-website/database/create-media-library-table.sql`
4. **Copiez tout le contenu** du fichier
5. **Collez** dans l'éditeur SQL de Supabase
6. Cliquez **"Run"** (bouton vert en bas à droite)

✅ **Confirmation** : Vous voyez "Success. No rows returned"

---

### ⚡ ÉTAPE 3 : Tester (1 minute)

1. Retournez sur votre site : `http://localhost:3000/admin/mediatheque`
2. Vous devriez voir la page de médiathèque
3. Cliquez **"Uploader des images"**
4. Sélectionnez une image de test
5. Choisissez une catégorie (ex: Portfolio)
6. Cliquez **"Uploader"**

✅ **Confirmation** : L'image apparaît dans la grille !

---

## 📚 GUIDE UTILISATEUR

### 🎯 Accès à la médiathèque

**Méthode 1 : Menu sidebar**
- Allez sur `/admin`
- Cliquez sur **"Médiathèque"** dans la section "3. Système & Gouvernance"

**Méthode 2 : URL directe**
- `http://localhost:3000/admin/mediatheque`

---

### 📤 Upload d'images

1. Cliquez sur **"Uploader des images"** (bouton orange en haut à droite)
2. Cliquez sur **"Sélectionner les images"**
3. Choisissez une ou plusieurs images (formats : JPG, PNG, GIF, WEBP, SVG)
4. Sélectionnez une **catégorie** :
   - **Portfolio** : Projets, réalisations clients
   - **Blog** : Images pour articles/actualités
   - **Team** : Photos d'équipe
   - **Services** : Illustrations de services
   - **Icons** : Icônes, logos, symboles
   - **Banners** : Bannières, headers, couvertures
   - **Autres** : Tout le reste
5. (Optionnel) Ajoutez un **texte alternatif** (pour l'accessibilité)
6. (Optionnel) Ajoutez une **légende** (description)
7. Voyez l'**aperçu** de vos images
8. Cliquez **"Uploader"**

✅ **Résultat** : Images uploadées et affichées dans la grille

---

### 🔍 Recherche et filtres

**Recherche par nom**
- Tapez dans la barre de recherche (en haut à gauche)
- Recherche dans : nom du fichier, texte alternatif, légende

**Filtre par catégorie**
- Menu déroulant à côté de la barre de recherche
- Sélectionnez une catégorie ou "Toutes catégories"

**Statistiques**
- En bas des filtres : "Total: X images" / "Affichées: Y images"

---

### 📋 Gestion des images

Chaque image affiche :
- ✅ **Aperçu** de l'image
- ✅ **Badge de catégorie** (coin supérieur droit)
- ✅ **Nom du fichier original**
- ✅ **Dimensions** (largeur × hauteur en pixels)
- ✅ **Taille** (en KB ou MB)
- ✅ **Date d'upload**

**Actions disponibles :**

1. **📋 Copier l'URL**
   - Cliquez sur "Copier URL"
   - L'URL publique est copiée dans votre presse-papier
   - Utilisez-la dans vos composants React ou HTML

2. **🗑️ Supprimer**
   - Cliquez sur l'icône poubelle (rouge)
   - Confirmez la suppression
   - ⚠️ Supprime le fichier ET l'entrée en base de données

---

### 🔗 Utiliser les images sur le site

#### Méthode 1 : Copier-coller l'URL

```tsx
// Dans un composant React
<img src="URL_COPIÉE" alt="Description" />

// Exemple complet
<img 
  src="https://votreprojet.supabase.co/storage/v1/object/public/media-library/portfolio/1234567890-projet.jpg" 
  alt="Projet web OFARO TECH"
  className="w-full h-auto"
/>
```

#### Méthode 2 : Récupérer depuis la base de données

```tsx
// Récupérer toutes les images d'une catégorie
const { data: images } = await supabase
  .from('media_library')
  .select('*')
  .eq('category', 'portfolio')
  .eq('is_active', true)
  .order('created_at', { ascending: false });

// Afficher les images
{images?.map(img => (
  <img key={img.id} src={img.file_url} alt={img.alt_text} />
))}
```

#### Méthode 3 : Créer un hook personnalisé

```tsx
// hooks/useMediaLibrary.ts
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
      
      if (category) {
        query = query.eq('category', category);
      }
      
      const { data } = await query.order('created_at', { ascending: false });
      setImages(data || []);
    }
    loadImages();
  }, [category]);

  return images;
}

// Utilisation dans un composant
const portfolioImages = useMediaLibrary('portfolio');
```

---

## 🎨 FONCTIONNALITÉS TECHNIQUES

### 📁 Structure de stockage

**Organisation des fichiers :**
```
media-library/
├── portfolio/
│   ├── 1234567890-projet-web.jpg
│   └── 1234567891-app-mobile.png
├── blog/
│   ├── 1234567892-article-1.jpg
│   └── 1234567893-actualite.png
├── team/
│   └── 1234567894-photo-equipe.jpg
├── services/
├── icons/
├── banners/
└── autres/
```

**Nommage des fichiers :**
- Format : `{catégorie}/{timestamp}-{nom-original-nettoyé}.{extension}`
- Exemple : `portfolio/1736325678901-mon_projet_web.jpg`
- Les caractères spéciaux sont remplacés par des underscores

---

### 💾 Base de données

**Table : `media_library`**

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | SERIAL | Identifiant unique (auto-incrémenté) |
| `file_name` | VARCHAR(255) | Nom du fichier stocké (avec timestamp) |
| `original_name` | VARCHAR(255) | Nom original du fichier uploadé |
| `file_url` | TEXT | URL publique de l'image |
| `file_size` | INTEGER | Taille en octets |
| `mime_type` | VARCHAR(100) | Type MIME (image/jpeg, image/png, etc.) |
| `width` | INTEGER | Largeur en pixels |
| `height` | INTEGER | Hauteur en pixels |
| `alt_text` | VARCHAR(500) | Texte alternatif (accessibilité) |
| `caption` | TEXT | Légende ou description |
| `category` | VARCHAR(100) | Catégorie de l'image |
| `uploaded_by` | VARCHAR(255) | Utilisateur ayant uploadé |
| `is_active` | BOOLEAN | Statut actif/inactif |
| `created_at` | TIMESTAMP | Date de création |
| `updated_at` | TIMESTAMP | Date de dernière modification |

**Index créés :**
- ✅ `idx_media_category` sur `category`
- ✅ `idx_media_active` sur `is_active`
- ✅ `idx_media_created` sur `created_at DESC`

**Triggers :**
- ✅ Mise à jour automatique de `updated_at` lors de modification

**Sécurité (RLS) :**
- ✅ Row Level Security activé
- ✅ Lecture publique des médias actifs
- ✅ Accès admin complet

---

### 🎨 Design et couleurs

**Thème OFARO TECH :**
- **Primaire** : Orange-600 (#EA580C)
- **Secondaire** : Amber-500 (#F59E0B)
- **Texte** : Gray-900 (#111827)
- **Fond** : Gray-50 (#F9FAFB)
- **Cartes** : White (#FFFFFF)

**Responsive :**
- ✅ Grille adaptative (1-2-3-4 colonnes selon la taille d'écran)
- ✅ Menu mobile avec overlay
- ✅ Boutons tactiles optimisés

---

## 🔐 SÉCURITÉ

### Permissions Supabase

**Bucket `media-library` :**
- ✅ PUBLIC (lecture sans authentification)
- ✅ Upload/Delete nécessitent authentification admin

**Table `media_library` :**
- ✅ RLS activé
- ✅ Lecture publique (images actives seulement)
- ✅ Modification admin uniquement

### Bonnes pratiques

1. ✅ **Noms de fichiers sécurisés** : Caractères spéciaux nettoyés
2. ✅ **Timestamps** : Évite les conflits de noms
3. ✅ **Validation client** : Seules les images acceptées
4. ✅ **Catégorisation** : Organisation claire
5. ✅ **Alt text** : Accessibilité (WCAG)

---

## 🐛 DÉPANNAGE

### ❌ "Failed to upload"

**Causes possibles :**
1. Le bucket `media-library` n'existe pas
   - → Créez-le via Supabase Storage
2. Le bucket n'est pas PUBLIC
   - → Éditez le bucket, cochez "Public bucket"
3. Problème de connexion Supabase
   - → Vérifiez `.env.local` (NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY)

### ❌ "Failed to load images"

**Causes possibles :**
1. La table `media_library` n'existe pas
   - → Exécutez le script SQL `create-media-library-table.sql`
2. Problème RLS (Row Level Security)
   - → Le script SQL crée les bonnes policies
3. Problème de connexion
   - → Vérifiez votre connexion internet et Supabase

### ❌ Les images ne s'affichent pas

**Causes possibles :**
1. Le bucket n'est pas PUBLIC
   - → Éditez le bucket dans Supabase, cochez "Public bucket"
2. URL incorrecte
   - → Vérifiez `file_url` dans la base de données
3. CORS bloqué
   - → Normal en dev, les images Supabase passent le CORS

### ❌ "Page not found" sur /admin/mediatheque

**Cause :**
- Le serveur Next.js n'a pas rechargé le nouveau fichier

**Solution :**
1. Arrêtez le serveur (Ctrl+C dans le terminal)
2. Relancez : `npm run dev`
3. Rafraîchissez la page (F5 ou Ctrl+R)

---

## 📊 STATISTIQUES ET MONITORING

### Requêtes utiles

**Nombre d'images par catégorie :**
```sql
SELECT category, COUNT(*) as total, SUM(file_size) as total_size
FROM media_library
WHERE is_active = true
GROUP BY category
ORDER BY total DESC;
```

**Images les plus lourdes :**
```sql
SELECT original_name, category, file_size, width, height
FROM media_library
ORDER BY file_size DESC
LIMIT 10;
```

**Uploads récents :**
```sql
SELECT original_name, category, created_at, uploaded_by
FROM media_library
ORDER BY created_at DESC
LIMIT 20;
```

**Stockage total :**
```sql
SELECT 
  COUNT(*) as total_images,
  SUM(file_size) as total_bytes,
  ROUND(SUM(file_size)::numeric / 1024 / 1024, 2) as total_mb
FROM media_library
WHERE is_active = true;
```

---

## 🚀 ÉVOLUTIONS FUTURES (Optionnelles)

### Fonctionnalités suggérées

1. **📝 Édition des métadonnées**
   - Modifier alt_text et caption après upload
   - Changer la catégorie d'une image

2. **🗂️ Gestion par dossiers**
   - Créer des sous-dossiers personnalisés
   - Arborescence hiérarchique

3. **✂️ Édition d'images**
   - Recadrage
   - Redimensionnement
   - Rotation

4. **🏷️ Tags et mots-clés**
   - Ajouter des tags personnalisés
   - Recherche par tags

5. **📦 Upload en masse**
   - Drag & drop de dossiers
   - Import ZIP

6. **📊 Statistiques avancées**
   - Dashboard d'utilisation
   - Graphiques de stockage

7. **🔗 Galeries**
   - Créer des collections d'images
   - Générer des galeries pour le site

8. **⚡ Optimisation automatique**
   - Compression des images
   - Génération de thumbnails
   - Conversion WebP

---

## 📞 SUPPORT

### Ressources
- **Documentation Supabase Storage** : https://supabase.com/docs/guides/storage
- **Next.js 14** : https://nextjs.org/docs
- **Tailwind CSS** : https://tailwindcss.com/docs

### Problèmes courants
- Consultez la section "🐛 DÉPANNAGE" ci-dessus
- Vérifiez les logs du navigateur (F12 → Console)
- Vérifiez les logs Supabase (Dashboard → Logs)

---

## ✅ CHECKLIST DE VÉRIFICATION

Avant de dire "C'est terminé", vérifiez :

- [ ] Le bucket `media-library` existe dans Supabase Storage
- [ ] Le bucket est **PUBLIC** (case cochée)
- [ ] La table `media_library` existe dans Supabase Database
- [ ] Le script SQL s'est exécuté sans erreur
- [ ] La page `/admin/mediatheque` s'affiche correctement
- [ ] Le menu "Médiathèque" dans la sidebar fonctionne
- [ ] L'upload d'une image de test fonctionne
- [ ] L'image apparaît dans la grille après upload
- [ ] Le bouton "Copier URL" fonctionne
- [ ] L'URL copiée affiche bien l'image dans un nouvel onglet
- [ ] La suppression d'une image fonctionne
- [ ] Les filtres par catégorie fonctionnent
- [ ] La barre de recherche fonctionne

---

**🎉 FÉLICITATIONS !** Votre médiathèque est prête à l'emploi !

---

*Créé pour OFARO TECH - Back-office Next.js 14 + Supabase*
