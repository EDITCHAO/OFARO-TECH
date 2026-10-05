# 📁 Configuration de la Bibliothèque de Documents

## 📋 Vue d'ensemble

La bibliothèque de documents permet de gérer tous les fichiers PDF, Excel et Word de OFARO TECH :
- **Cahiers de charges** - Spécifications de projets
- **Devis** - Propositions commerciales
- **Contrats** - Documents juridiques
- **Factures** - Documents comptables
- **Brochures** - Documents marketing
- **Guides** - Documentation technique
- **Offres commerciales** - Fiches produits/services
- **Rapports** - Rapports d'activité
- **Présentations** - Slides PowerPoint/PDF
- **Autres** - Documents divers

## ✅ Étapes de configuration dans Supabase

### 1️⃣ Créer le bucket de stockage

1. Connectez-vous à **Supabase Dashboard**
2. Allez dans **Storage** (menu de gauche)
3. Cliquez sur **"New bucket"**
4. Configuration :
   - **Name** : `documents-library`
   - **Public bucket** : ✅ **OUI** (cocher la case)
   - **File size limit** : 50 MB (par défaut)
5. Cliquez sur **"Create bucket"**

### 2️⃣ Créer la table documents_library

1. Allez dans **SQL Editor** (menu de gauche)
2. Cliquez sur **"New query"**
3. Copiez **TOUT** le contenu du fichier : `database/create-documents-library.sql`
4. Collez dans l'éditeur
5. Cliquez sur **"Run"** (ou `Ctrl+Enter`)
6. Vérifiez le message de succès : `Table documents_library créée avec succès !`

### 3️⃣ Configurer les politiques RLS (Row Level Security)

1. Toujours dans **SQL Editor**, cliquez sur **"New query"**
2. Copiez **TOUT** le contenu du fichier : `database/fix-documents-storage-policies.sql`
3. Collez dans l'éditeur
4. Cliquez sur **"Run"**
5. Vérifiez le message : `Politiques de stockage créées avec succès !`

## 🎯 Fonctionnalités disponibles

### Upload de documents
- **Types acceptés** : PDF, Excel (.xlsx, .xls), Word (.docx, .doc)
- **Taille maximale** : 10 MB par fichier
- **Drag & drop** : Glisser-déposer directement dans la zone
- **Métadonnées** : Titre, description, catégorie, tags

### Gestion des documents
- ✅ **Recherche** : Par titre ou nom de fichier
- ✅ **Filtres** : Par catégorie ou type de fichier
- ✅ **Affichage** : Vue carte ou liste
- ✅ **Actions** :
  - Télécharger (incrémente automatiquement le compteur)
  - Copier l'URL
  - Supprimer définitivement

### Catégories disponibles

| Catégorie | Description | Icône |
|-----------|-------------|-------|
| **Cahiers de charges** | Spécifications et exigences projets | 📋 |
| **Devis** | Propositions commerciales et tarifs | 💰 |
| **Contrats** | Documents juridiques et engagements | 📝 |
| **Factures** | Documents comptables | 🧾 |
| **Brochures** | Plaquettes institutionnelles | 📖 |
| **Guides** | Documentation technique | 📚 |
| **Offres commerciales** | Fiches produits et services | 🎯 |
| **Rapports** | Rapports d'activité, audits | 📊 |
| **Présentations** | Slides et supports de présentation | 🎤 |
| **Autres** | Documents divers | 📄 |

## 🧪 Tests après configuration

### Test 1 : Upload d'un document
1. Allez sur `http://localhost:3000/admin`
2. Cliquez sur **"Documents PDF"** dans le menu
3. Cliquez sur **"Ajouter un document"**
4. Remplissez le formulaire :
   - **Fichier** : Sélectionnez un PDF de test
   - **Titre** : `Document de test`
   - **Description** : `Test d'upload`
   - **Catégorie** : Choisir une catégorie (ex: Brochures)
   - **Tags** : `test, demo` (séparés par virgules)
5. Cliquez sur **"Uploader le document"**
6. ✅ Le document doit apparaître dans la liste

### Test 2 : Téléchargement
1. Trouvez le document uploadé
2. Cliquez sur l'icône **"Télécharger"** (↓)
3. ✅ Le fichier doit se télécharger
4. ✅ Le compteur de téléchargements doit augmenter

### Test 3 : Recherche et filtres
1. Tapez dans la barre de recherche
2. ✅ La liste doit se filtrer en temps réel
3. Changez de catégorie dans le filtre
4. ✅ Seuls les documents de cette catégorie doivent s'afficher

### Test 4 : Suppression
1. Cliquez sur l'icône **"Supprimer"** (🗑️)
2. Confirmez la suppression
3. ✅ Le document doit disparaître de la liste ET du bucket Supabase

## 🔧 Structure de la base de données

### Table `documents_library`

```sql
id                SERIAL PRIMARY KEY
file_name         VARCHAR(255)     -- Nom technique du fichier
original_name     VARCHAR(255)     -- Nom original uploadé
file_url          TEXT             -- URL complète Supabase
file_size         INTEGER          -- Taille en octets
file_type         VARCHAR(100)     -- MIME type (application/pdf, etc.)
title             VARCHAR(500)     -- Titre du document
description       TEXT             -- Description détaillée
category          VARCHAR(100)     -- Catégorie (voir liste ci-dessus)
tags              TEXT[]           -- Array de tags pour recherche
download_count    INTEGER          -- Nombre de téléchargements
uploaded_by       VARCHAR(255)     -- Email de l'uploader
is_active         BOOLEAN          -- Actif/Inactif
created_at        TIMESTAMP        -- Date de création
updated_at        TIMESTAMP        -- Date de modification
```

### Bucket Supabase Storage

- **Nom** : `documents-library`
- **Visibilité** : PUBLIC (les fichiers sont accessibles via URL)
- **Organisation** : Les fichiers sont stockés avec leur nom unique généré

## 📱 Navigation

### Depuis le tableau de bord admin
- Cliquez sur **"Documents PDF"** dans le menu latéral (Section 3: Système & Gouvernance)

### Accès direct
- URL : `http://localhost:3000/admin/documents`
- Requiert : Connexion admin (ou permissions éditeur)

## 🎨 Interface utilisateur

### Couleurs OFARO TECH
- **Orange** : Boutons principaux et éléments actifs (`bg-orange-600`)
- **Noir** : Textes et bordures (`bg-gray-950`)
- **Blanc** : Arrière-plans et cartes (`bg-white`)

### Responsive
- ✅ **Mobile** : Menu hamburger, cartes empilées
- ✅ **Tablette** : Grille 2 colonnes
- ✅ **Desktop** : Grille 3 colonnes

## ❓ Dépannage

### "StorageApiError: new row violates row-level security policy"
➡️ Exécutez le script `database/fix-documents-storage-policies.sql`

### "Bucket does not exist"
➡️ Créez le bucket `documents-library` dans Supabase Storage (PUBLIC)

### "Table documents_library does not exist"
➡️ Exécutez le script `database/create-documents-library.sql`

### Les documents ne s'affichent pas
1. Vérifiez que le bucket est **PUBLIC**
2. Vérifiez que les politiques RLS sont actives
3. Actualisez la page avec `Ctrl+F5`

## 📚 Documentation technique

### API Routes utilisées
- **Upload** : Supabase Storage API
- **Liste** : `SELECT * FROM documents_library`
- **Téléchargement** : URL publique Supabase + `UPDATE download_count`
- **Suppression** : `DELETE FROM documents_library` + suppression du fichier

### Permissions requises
- **Administrateur** : Accès complet (CRUD)
- **Éditeur** : Accès complet (CRUD)
- **Commercial** : Lecture seule
- **RH** : Lecture seule

---

✅ **Configuration terminée !** Vous pouvez maintenant gérer tous vos documents professionnels.
