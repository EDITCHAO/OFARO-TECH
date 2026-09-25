# 🚀 Guide Complet : Gestion des Projets/Réalisations

## Vue d'ensemble

Ce système permet à l'admin de gérer les projets depuis le dashboard admin et de les afficher automatiquement sur la page "Réalisations".

## ✅ Fichiers créés

### 1. Base de données
- `database/create-projects-table.sql` - Schéma SQL complet

### 2. API Routes
- `app/api/projects/route.ts` - GET (liste) et POST (créer)
- `app/api/projects/[id]/route.ts` - GET, PUT (modifier), DELETE
- `app/api/projects/upload/route.ts` - Upload/Delete images

### 3. Frontend
- `components/home/RealizationsSection.tsx` - Modifié pour charger depuis l'API
- `app/admin/page.tsx` - À modifier pour ajouter la gestion des projets

---

## 📋 Étapes d'installation

### ÉTAPE 1 : Créer la table dans Supabase

1. Allez sur **Supabase Dashboard** → **SQL Editor**
2. Copiez le contenu de `database/create-projects-table.sql`
3. **Exécutez** le SQL

### ÉTAPE 2 : Créer le bucket Storage dans Supabase

1. Allez sur **Supabase Dashboard** → **Storage**
2. Cliquez sur **"New bucket"**
3. Nom: `projects`
4. **Cochez "Public bucket"** ✅
5. Cliquez sur **"Create bucket"**

### ÉTAPE 3 : Tester l'API

Une fois le serveur redémarré, testez dans le navigateur :

```
http://localhost:3000/api/projects
```

Vous devriez voir les 6 projets de test.

### ÉTAPE 4 : Vérifier la page d'accueil

Allez sur `http://localhost:3000`

La section "Nos Réalisations" devrait charger les projets depuis la base de données.

---

## 🎯 Prochaine étape : Interface Admin

Je dois maintenant créer l'interface dans `/admin` pour :
- ✅ Voir la liste des projets
- ✅ Créer un nouveau projet avec upload d'image
- ✅ Modifier un projet existant
- ✅ Supprimer un projet

---

## 📦 Structure de données d'un projet

```typescript
{
  id: number;
  title: string;                    // ex: "Application de Suivi de Flotte"
  category: string;                 // web | mobile | design | network
  description: string;              // Description détaillée
  client_name: string | null;       // ex: "TransLog Togo"
  duration: string | null;          // ex: "6 mois"
  year: string;                     // ex: "2025"
  image_url: string | null;         // URL Supabase Storage
  technologies: string[];           // ["Flutter", "Firebase", "Google Maps API"]
  status: string;                   // active | archived | draft
  display_order: number;            // Ordre d'affichage (0, 1, 2...)
  created_at: timestamp;
  updated_at: timestamp;
}
```

---

## 🔧 Exemple d'utilisation de l'API

### Créer un projet
```javascript
const response = await fetch('/api/projects', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: "Application de Suivi de Flotte",
    category: "mobile",
    description: "Application mobile et web de géolocalisation...",
    client_name: "TransLog Togo",
    duration: "5 mois",
    year: "2025",
    technologies: ["Flutter", "Firebase", "Google Maps API"],
    image_url: null,
    display_order: 0
  })
});
```

### Upload une image
```javascript
const formData = new FormData();
formData.append('file', imageFile);

const response = await fetch('/api/projects/upload', {
  method: 'POST',
  body: formData
});

const result = await response.json();
// result.fileUrl contient l'URL de l'image
```

### Modifier un projet
```javascript
await fetch(`/api/projects/${projectId}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: "Nouveau titre",
    image_url: "https://..."
  })
});
```

---

## ❓ Questions ?

Voulez-vous que je crée maintenant l'interface admin complète pour gérer les projets ?
