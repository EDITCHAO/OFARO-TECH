# ⭐ Configuration du Module Témoignages

## 📋 Vue d'ensemble

Le module de gestion des témoignages permet à l'admin de créer, modifier et gérer tous les avis clients affichés sur le site OFARO TECH.

### Fonctionnalités
- ✅ CRUD complet (Créer, Lire, Modifier, Supprimer)
- ✅ Système de notation 5 étoiles
- ✅ Mise en avant des meilleurs témoignages
- ✅ Activation/Désactivation sans suppression
- ✅ Recherche en temps réel
- ✅ Statistiques (total, actifs, en avant, note moyenne)
- ✅ Affichage dynamique sur la page d'accueil

## ✅ Étapes de configuration dans Supabase

### 1️⃣ Créer la table testimonials

1. Connectez-vous à **Supabase Dashboard**
2. Allez dans **SQL Editor** (menu de gauche)
3. Cliquez sur **"New query"**
4. Copiez **TOUT** le contenu du fichier : `database/create-testimonials-table.sql`
5. Collez dans l'éditeur
6. Cliquez sur **"Run"** (ou `Ctrl+Enter`)
7. Vérifiez le message de succès : `Table testimonials créée avec succès !`

### Structure de la table

```sql
id                  SERIAL PRIMARY KEY
client_name         VARCHAR(255)       -- Nom complet du client
client_position     VARCHAR(255)       -- Poste/Fonction
client_company      VARCHAR(255)       -- Entreprise
client_photo_url    TEXT              -- Photo (optionnel)
testimonial_text    TEXT              -- Contenu du témoignage
rating              INTEGER           -- Note sur 5 (1-5)
is_featured         BOOLEAN           -- Mis en avant
display_order       INTEGER           -- Ordre d'affichage
is_active           BOOLEAN           -- Actif/Inactif
created_at          TIMESTAMP         -- Date de création
updated_at          TIMESTAMP         -- Date de modification
```

## 🎯 Utilisation de la page admin

### Accès
- Menu : **"Témoignages"** dans la section "1. GÉNÉRAL (CONTENU)"
- URL directe : `http://localhost:3000/admin/temoignages`

### 📊 Statistiques affichées
1. **Total** : Nombre total de témoignages
2. **Actifs** : Témoignages visibles sur le site
3. **En avant** : Témoignages mis en avant sur la page d'accueil
4. **Note moyenne** : Moyenne des notes sur 5

### ➕ Ajouter un témoignage

1. Cliquez sur **"Ajouter un témoignage"**
2. Remplissez le formulaire :
   - **Nom du client** * : Dr. Kofi MENSAH
   - **Poste/Fonction** * : Directeur Général
   - **Entreprise** * : Hôpital Central de Lomé
   - **Témoignage** * : Le contenu complet du témoignage
   - **Note** * : Cliquez sur les étoiles (1 à 5)
   - **Mettre en avant** : Cocher pour afficher sur la page d'accueil
   - **Actif** : Cocher pour rendre visible
3. Cliquez sur **"Ajouter"**

### ✏️ Modifier un témoignage

1. Trouvez le témoignage dans la liste
2. Cliquez sur l'icône **"Modifier"** (✏️ bleue)
3. Modifiez les champs souhaités
4. Cliquez sur **"Modifier"**

### 🗑️ Supprimer un témoignage

1. Cliquez sur l'icône **"Supprimer"** (🗑️ rouge)
2. Confirmez la suppression
3. Le témoignage est **définitivement supprimé** de la base

### 👁️ Activer/Désactiver

- Cliquez sur l'icône **œil** (👁️ vert = actif, 👁️ barré gris = inactif)
- Les témoignages inactifs ne sont pas visibles sur le site mais restent dans la base
- Permet de masquer temporairement un témoignage sans le supprimer

### ⭐ Mettre en avant / Retirer

- Cliquez sur **"En avant"** (orange) ou **"Promouvoir"** (gris)
- Les témoignages mis en avant sont affichés sur la page d'accueil
- Permet de sélectionner les meilleurs témoignages

### 🔍 Rechercher

Tapez dans la barre de recherche pour filtrer par :
- Nom du client
- Entreprise
- Poste
- Contenu du témoignage

## 🎨 Affichage sur le site

### Page d'accueil
- Section "Ce que disent nos clients"
- Affiche les témoignages où `is_featured = true` ET `is_active = true`
- Carousel automatique avec les témoignages mis en avant
- Affichage : Nom, Poste, Entreprise, Note étoiles, Témoignage

### Ordre d'affichage
Les témoignages sont triés par `display_order` (ASC) puis par `created_at` (DESC)
- Plus petit `display_order` = affiché en premier
- Si même `display_order`, le plus récent en premier

## 🧪 Tests recommandés

### Test 1 : Création
1. Ajoutez un témoignage de test
2. Vérifiez qu'il apparaît dans la liste admin
3. Vérifiez qu'il apparaît sur la page d'accueil (si `is_featured = true`)

### Test 2 : Modification
1. Modifiez le texte d'un témoignage
2. Changez la note de 4 à 5 étoiles
3. Vérifiez que les modifications sont sauvegardées

### Test 3 : Activation/Désactivation
1. Désactivez un témoignage
2. Vérifiez qu'il disparaît de la page d'accueil
3. Vérifiez qu'il reste visible dans l'admin (avec opacité réduite)
4. Réactivez-le et vérifiez qu'il réapparaît

### Test 4 : Mise en avant
1. Ajoutez un témoignage avec `is_featured = false`
2. Vérifiez qu'il N'apparaît PAS sur la page d'accueil
3. Mettez-le en avant (`is_featured = true`)
4. Vérifiez qu'il apparaît maintenant sur la page d'accueil

### Test 5 : Suppression
1. Créez un témoignage de test
2. Supprimez-le
3. Vérifiez qu'il a disparu de la liste admin
4. Vérifiez qu'il a disparu de la base de données

## 🎨 Interface utilisateur

### Cartes de témoignages (admin)

```
┌─────────────────────────────────────┐
│ ⭐ En avant                         │
│                                     │
│ Dr. Kofi MENSAH                     │
│ Directeur Général                   │
│ Hôpital Central de Lomé             │
│                                     │
│ ⭐⭐⭐⭐⭐                            │
│                                     │
│ "OFARO TECH a transformé notre..."  │
│                                     │
│ [En avant] [👁️] [✏️] [🗑️]        │
│                                     │
│ Ajouté le 05/10/2026                │
└─────────────────────────────────────┘
```

### Codes couleurs

- **Orange** : Témoignage mis en avant
- **Vert** : Témoignage actif
- **Gris** : Témoignage inactif (opacité réduite)
- **Bleu** : Bouton de modification
- **Rouge** : Bouton de suppression

### Responsive
- ✅ **Mobile** : 1 colonne
- ✅ **Tablette** : 2 colonnes
- ✅ **Desktop** : 3 colonnes

## ❓ Dépannage

### "Table testimonials does not exist"
➡️ Exécutez le script `database/create-testimonials-table.sql` dans Supabase SQL Editor

### Les témoignages n'apparaissent pas sur le site
1. Vérifiez que `is_active = true`
2. Vérifiez que `is_featured = true` (pour page d'accueil)
3. Vérifiez les politiques RLS dans Supabase
4. Actualisez la page avec `Ctrl+F5`

### Les modifications ne sont pas sauvegardées
1. Vérifiez la console du navigateur (`F12`)
2. Vérifiez que les politiques RLS permettent les UPDATE
3. Vérifiez que tous les champs obligatoires sont remplis

### Erreur "Failed to fetch"
➡️ Vérifiez que :
- Les variables d'environnement Supabase sont correctes dans `.env.local`
- Le bucket/table existe dans Supabase
- Votre connexion internet fonctionne

## 📊 Bonnes pratiques

### Rédaction de témoignages
- ✅ Utiliser des citations authentiques
- ✅ Mentionner des résultats concrets
- ✅ Varier les secteurs d'activité
- ✅ Inclure le nom complet et le poste
- ✅ Vérifier l'orthographe et la grammaire

### Gestion
- ✅ Garder 6-8 témoignages mis en avant maximum
- ✅ Mettre à jour régulièrement avec de nouveaux clients
- ✅ Archiver (désactiver) les témoignages obsolètes
- ✅ Privilégier les notes 5 étoiles pour la mise en avant
- ✅ Varier les types d'entreprises (hôpital, banque, école, etc.)

### Ordre d'affichage recommandé
1. Témoignages 5 étoiles avec résultats impressionnants
2. Clients prestigieux (grandes entreprises, institutions)
3. Témoignages récents
4. Varier les secteurs d'activité

## 🔐 Permissions

### Rôles avec accès
- **Administrateur** : Accès complet (CRUD)
- **Éditeur** : Accès complet (CRUD)
- **Commercial** : Lecture seule
- **RH** : Lecture seule

---

✅ **Configuration terminée !** Vous pouvez maintenant gérer tous les témoignages clients depuis l'espace admin.
