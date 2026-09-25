# 🎯 Installation Complète - Gestion des Projets

## ✅ Ce qui a été créé

### 1. Composant Admin Complet
**Fichier:** `components/admin/ProjectsManagement.tsx`

**Fonctionnalités:**
- ✅ Liste en grille des projets avec images
- ✅ Filtrage par catégorie (Web, Mobile, Design, Réseaux)
- ✅ Bouton "Ajouter un projet"
- ✅ Bouton "Modifier" sur chaque projet
- ✅ Bouton "Supprimer" avec confirmation
- ✅ Upload d'image avec prévisualisation
- ✅ Gestion des technologies (ajouter/supprimer)
- ✅ Champ client/entreprise
- ✅ Statut Publié/Brouillon
- ✅ Modal complet pour créer/modifier

### 2. Intégration dans l'Admin
**Fichier modifié:** `app/admin/page.tsx`
- Import du composant ProjectsManagement
- Remplacement de l'ancienne section "réalisations"

---

## 📋 Étapes d'installation (À FAIRE)

### ÉTAPE 1: Créer la table dans Supabase ✅

1. Ouvrez **Supabase Dashboard**
2. Allez dans **SQL Editor**
3. Copiez le contenu de `database/create-projects-table.sql`
4. Cliquez sur **"Run"**

### ÉTAPE 2: Créer le bucket Storage ✅

1. Allez sur **Storage** dans Supabase
2. Cliquez sur **"New bucket"**
3. Nom: `projects`
4. **Cochez "Public bucket"** ✅
5. Cliquez sur **"Create bucket"**

### ÉTAPE 3: Redémarrer le serveur

```powershell
# Arrêter le serveur (Ctrl+C)
# Puis relancer:
npm run dev
```

### ÉTAPE 4: Tester

1. Allez sur `http://localhost:3000/admin`
2. Cliquez sur **"Réalisations (Portfolio)"** dans le menu gauche
3. Vous devriez voir l'interface avec le bouton "Ajouter un projet"

---

## 🎨 Interface Admin - Ce que vous pouvez faire

### Créer un projet

1. Cliquez sur **"Ajouter un projet"**
2. Remplissez le formulaire :
   - **Image** : Upload depuis votre ordinateur (JPG, PNG, WEBP max 5MB)
   - **Titre** : Ex: "Application de Suivi de Flotte"
   - **Catégorie** : Web | Mobile | Design | Réseaux
   - **Description** : Texte détaillé du projet
   - **Client** : Ex: "TransLog Togo"
   - **Technologies** : Ajoutez une par une (Flutter, Firebase, etc.)
   - **Durée** : Ex: "6 mois"
   - **Année** : Ex: "2025"
3. Cliquez sur **"Créer le projet"**

### Modifier un projet

1. Sur une carte de projet, cliquez sur **"Modifier"**
2. Le formulaire s'ouvre avec les données existantes
3. Modifiez ce que vous voulez
4. Cliquez sur **"Mettre à jour"**

### Supprimer un projet

1. Sur une carte de projet, cliquez sur l'icône **🗑️ (poubelle)**
2. Confirmez la suppression
3. Le projet ET son image sont supprimés

### Masquer/Publier un projet

1. Cliquez sur **"Masquer"** ou **"Publier"**
2. Les projets masqués ne s'affichent PAS sur le site public
3. Seuls les projets "Publié" sont visibles sur la page Réalisations

---

## 📸 Gestion des images

### Upload
- Formats acceptés: JPG, PNG, WEBP
- Taille max: 5MB
- Les images sont stockées dans Supabase Storage (bucket `projects`)
- URL générée automatiquement

### Suppression
- Quand vous supprimez un projet, l'image est aussi supprimée du Storage
- Pas de fichiers orphelins !

---

## 🔄 Synchronisation avec la page publique

### Page "Réalisations" (Frontend)

Le composant `components/home/RealizationsSection.tsx` :
- ✅ Charge automatiquement les projets depuis l'API
- ✅ Affiche seulement les projets avec status='active'
- ✅ Filtre par catégorie
- ✅ Affiche l'image, titre, description, technologies, client

**Pour voir vos projets sur le site:**
1. Créez un projet dans l'admin
2. Uploadez une image
3. Mettez le statut sur "Publié"
4. Allez sur `http://localhost:3000`
5. Scrollez jusqu'à la section "Nos Réalisations"

---

## 🐛 Résolution de problèmes

### Erreur "Configuration Supabase manquante"
➡️ Vérifiez que `.env.local` contient :
```
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### Erreur "Bucket not found"
➡️ Créez le bucket `projects` dans Supabase Storage (voir ÉTAPE 2)

### Erreur "Table doesn't exist"
➡️ Exécutez le SQL de `database/create-projects-table.sql` (voir ÉTAPE 1)

### Images ne s'affichent pas
➡️ Vérifiez que le bucket `projects` est **PUBLIC** dans Supabase

### "Cannot read properties of undefined"
➡️ Redémarrez le serveur Next.js

---

## 📊 Structure de données

### Table `projects`
```sql
- id (INTEGER) - Auto-incrémenté
- title (VARCHAR) - Titre du projet
- category (VARCHAR) - web|mobile|design|network
- description (TEXT) - Description détaillée
- client_name (VARCHAR) - Nom du client
- duration (VARCHAR) - Ex: "6 mois"
- year (VARCHAR) - Ex: "2025"
- image_url (TEXT) - URL Supabase Storage
- technologies (JSONB) - Array de strings
- status (VARCHAR) - active|draft|archived
- display_order (INTEGER) - Ordre d'affichage
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

---

## 🚀 Prochaines améliorations possibles

- [ ] Drag & drop pour réordonner les projets
- [ ] Upload multiple d'images (galerie)
- [ ] Catégories personnalisées
- [ ] Statistiques de vues
- [ ] Export PDF du portfolio
- [ ] Page détaillée par projet

---

## ✨ Fonctionnalités implémentées

✅ CRUD complet (Create, Read, Update, Delete)
✅ Upload d'images vers Supabase Storage
✅ Gestion des technologies (ajout/suppression)
✅ Champ client/entreprise
✅ Filtrage par catégorie
✅ Statut Publié/Brouillon
✅ Interface responsive
✅ Prévisualisation des images
✅ Validation des formulaires
✅ Messages de succès/erreur
✅ Confirmation avant suppression
✅ Synchronisation automatique avec la page publique

---

## 📞 Besoin d'aide ?

Si vous avez des questions ou des problèmes :
1. Vérifiez que Supabase est bien configuré (table + bucket)
2. Vérifiez les variables d'environnement
3. Regardez la console du navigateur (F12) pour les erreurs
4. Vérifiez les logs du serveur Next.js

---

**Tout est prêt ! Vous pouvez maintenant gérer vos projets depuis l'admin !** 🎉
