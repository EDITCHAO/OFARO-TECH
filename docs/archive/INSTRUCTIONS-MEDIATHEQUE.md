# 📸 Configuration de la Médiathèque

## Étape 1️⃣ : Créer le bucket Supabase Storage

1. Allez dans votre projet Supabase → **Storage**
2. Cliquez sur **"New bucket"**
3. Configurez le bucket :
   - **Name** : `media-library`
   - **Public bucket** : ✅ COCHEZ CETTE CASE (très important !)
   - Cliquez sur **"Create bucket"**

## Étape 2️⃣ : Créer la table dans Supabase

1. Allez dans **SQL Editor** de Supabase
2. Copiez le contenu du fichier `database/create-media-library-table.sql`
3. Collez dans l'éditeur SQL
4. Cliquez sur **"Run"** pour exécuter

✅ **Confirmation** : Vous devriez voir "Success. No rows returned"

## Étape 3️⃣ : Ajouter le lien dans la sidebar

Le fichier `components/admin/AdminLayout.tsx` doit être modifié pour ajouter le menu "Médiathèque".

Ajoutez ceci dans la section `menuItems` (vers ligne 50) :

```tsx
{
  id: 'mediatheque',
  name: 'Médiathèque',
  icon: PhotoIcon, // Assurez-vous d'importer PhotoIcon
  path: '/admin/mediatheque'
}
```

## Étape 4️⃣ : Tester la médiathèque

1. Allez sur `http://localhost:3000/admin/mediatheque`
2. Cliquez sur **"Uploader des images"**
3. Sélectionnez une ou plusieurs images
4. Choisissez une catégorie (Portfolio, Blog, Team, etc.)
5. Ajoutez un texte alternatif (optionnel)
6. Cliquez sur **"Uploader"**

## ✨ Fonctionnalités disponibles

### 📤 Upload d'images
- Upload multiple d'images en une fois
- Catégories : Portfolio, Blog, Équipe, Services, Icônes, Bannières, Autres
- Texte alternatif et légende optionnels
- Aperçu avant upload

### 🔍 Recherche et filtres
- Recherche par nom de fichier
- Filtre par catégorie
- Compteur d'images

### 📋 Gestion des images
- Affichage en grille avec aperçu
- Informations : dimensions, poids, date
- **Copier l'URL** : cliquez pour copier l'URL publique de l'image
- **Supprimer** : supprime l'image du stockage ET de la base de données

### 💾 Stockage
- **Images** : Supabase Storage bucket `media-library`
- **Métadonnées** : Table PostgreSQL `media_library`
- **Organisation** : Les images sont organisées par catégorie (`portfolio/`, `blog/`, etc.)

## 🎨 Structure de la base de données

La table `media_library` contient :
- ✅ Nom du fichier (avec timestamp unique)
- ✅ Nom original du fichier
- ✅ URL publique de l'image
- ✅ Taille du fichier (octets)
- ✅ Type MIME (image/jpeg, image/png, etc.)
- ✅ Dimensions (largeur × hauteur)
- ✅ Texte alternatif (pour l'accessibilité)
- ✅ Légende
- ✅ Catégorie
- ✅ Uploadé par (utilisateur)
- ✅ Statut actif/inactif
- ✅ Dates de création et modification

## 🔗 Utiliser les images sur le site

Une fois une image uploadée :

1. Cliquez sur **"Copier URL"** sur l'image
2. L'URL est copiée dans votre presse-papier
3. Utilisez cette URL dans vos composants React :

```tsx
<img src="URL_COPIÉE" alt="Description" />
```

Ou récupérez les images depuis la base de données :

```tsx
const { data: images } = await supabase
  .from('media_library')
  .select('*')
  .eq('category', 'portfolio')
  .eq('is_active', true);
```

## 🎯 Catégories recommandées

- **Portfolio** : Projets, réalisations
- **Blog** : Articles, actualités
- **Team** : Photos d'équipe
- **Services** : Illustrations de services
- **Icons** : Icônes, logos
- **Banners** : Bannières, headers
- **Autres** : Tout le reste

## 🚨 Notes importantes

1. ⚠️ Le bucket DOIT être **PUBLIC** pour que les images soient accessibles sur le site
2. 📝 Les images sont nommées avec un timestamp pour éviter les conflits
3. 🗑️ La suppression supprime à la fois le fichier ET l'entrée en base de données
4. 🔒 Row Level Security (RLS) est activé pour la sécurité

## 🎨 Couleurs du thème

La page utilise les couleurs du site OFARO TECH :
- **Orange** : #EA580C (orange-600)
- **Noir** : #111827 (gray-900)
- **Blanc** : #FFFFFF

---

**Besoin d'aide ?** Consultez la documentation Supabase Storage : https://supabase.com/docs/guides/storage
