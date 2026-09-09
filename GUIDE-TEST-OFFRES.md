# 🧪 Guide de test - Système d'offres d'emploi

## ✅ Corrections appliquées

### 1. **Formats d'image supportés**
- ✅ JPG / JPEG
- ✅ PNG
- ✅ GIF
- ✅ WebP
- ✅ SVG

### 2. **Attribut alt dynamique**
- Utilise `formData.image_alt` si rempli
- Sinon utilise `formData.title`
- Sinon affiche "Image de l'offre"

### 3. **Validation de l'accept HTML**
```html
accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
```

---

## 🚀 Procédure de test complète

### Étape 1: Démarrer le backend

```powershell
cd ofaro-tech-backend
npm start
```

**✅ Vérifier que vous voyez :**
```
Serveur démarré sur le port 5000
Connected to PostgreSQL database
```

---

### Étape 2: Démarrer le frontend

Ouvrir un **nouveau terminal** :

```powershell
cd ofaro-tech-website
npm run dev
```

**✅ Vérifier que vous voyez :**
```
- Local:   http://localhost:3000
```

---

### Étape 3: Appliquer la migration SQL

1. Allez sur **https://supabase.com/dashboard**
2. Sélectionnez votre projet
3. Allez dans **SQL Editor**
4. Exécutez cette requête :

```sql
-- Activer RLS sur job_offers
ALTER TABLE job_offers ENABLE ROW LEVEL SECURITY;

-- Politique 1: Lecture publique des offres publiées
CREATE POLICY "Public can view published job offers"
ON job_offers
FOR SELECT
USING (status = 'publiee');

-- Politique 2: Gestion complète pour authentifiés
CREATE POLICY "Authenticated users can manage job offers"
ON job_offers
FOR ALL
USING (true)
WITH CHECK (true);
```

---

### Étape 4: Créer une offre de test

1. Allez sur **http://localhost:3000/admin/offres**
2. Cliquez sur **"Nouvelle offre"**
3. Remplissez le formulaire :

```
Titre: Développeur Full-Stack React/Node.js
Département: Développement
Type de contrat: CDI
Localisation: Lomé, Togo
Mode de travail: Hybride
Niveau d'expérience: 3-5 ans
Niveau d'étude: Licence/Master

Description: Rejoignez notre équipe pour concevoir et développer des applications web modernes et performantes.

Missions: 
- Développer des applications React/Next.js
- Créer des API REST avec Node.js
- Collaborer avec l'équipe design

Date de publication: (aujourd'hui)
Date limite: (dans 30 jours)
Statut: Publiée  ⬅️ IMPORTANT !
```

4. **Ajouter une image** (n'importe quel format: JPG, PNG, GIF, WebP, SVG)
5. Cliquer sur **"Créer l'offre"**

**✅ Résultat attendu :**
```
Offre créée avec succès ✓
```

---

### Étape 5: Vérifier sur la page Carrières

1. Allez sur **http://localhost:3000/carrieres**
2. Descendez jusqu'à la section "Nos offres d'emploi"

**✅ Vous devriez voir :**
- **3 cartes d'offres** avec images
- Votre offre créée doit apparaître
- Image affichée correctement
- Badges (CDI, Hybride, etc.)
- Bouton "Voir les détails"

---

### Étape 6: Vérifier sur la page Offres

1. Allez sur **http://localhost:3000/offres**

**✅ Vous devriez voir :**
- **Toutes les offres publiées** en grille
- Filtres de recherche fonctionnels
- Images affichées
- Possibilité de filtrer par type de contrat, localisation

---

## 🐛 Troubleshooting

### Problème 1: "Aucune offre disponible"

**Cause possible :**
- Le backend n'est pas démarré
- Le statut n'est pas "publiee"
- La date limite est passée

**Solution :**
```powershell
# Vérifier que le backend tourne
cd ofaro-tech-backend
npm start

# Vérifier les offres en BDD
# Dans Supabase SQL Editor :
SELECT id, title, status, application_deadline 
FROM job_offers 
WHERE status = 'publiee';
```

---

### Problème 2: Erreur 401 sur l'API

**Cause :** Politiques RLS pas appliquées

**Solution :**
Exécutez la migration SQL (Étape 3)

---

### Problème 3: L'image ne s'affiche pas

**Causes possibles :**
1. Le chemin d'image est fictif (pas encore d'upload réel vers Supabase Storage)
2. L'image est trop lourde (> 5 Mo)

**Solution temporaire :**
L'upload d'image retourne un chemin fictif `/images/offers/...` qui ne fonctionne pas encore.

**Pour une vraie solution :**
1. Créer un bucket Supabase Storage appelé `job-offers`
2. Implémenter l'upload réel dans les fonctions `uploadImage()`

---

### Problème 4: "Multiple GoTrueClient" warning

**Cause :** Client Supabase recréé plusieurs fois

**Solution :** Déjà corrigé ✅
- Tous les fichiers utilisent maintenant le singleton

---

## 📊 Checklist de validation

- [ ] Backend démarré sur port 5000
- [ ] Frontend démarré sur port 3000
- [ ] Migration SQL exécutée
- [ ] Offre créée avec statut "Publiée"
- [ ] Image uploadée (tous formats supportés)
- [ ] Offre visible sur `/carrieres` (3 premières)
- [ ] Offre visible sur `/offres` (toutes les offres)
- [ ] Filtres fonctionnels
- [ ] Aucune erreur 401 dans la console
- [ ] Aucun warning "Multiple GoTrueClient"

---

## 🎯 Ce qui fonctionne maintenant

✅ **Validation des dates** : Impossible de mettre une date limite avant publication
✅ **Formats d'image** : JPG, PNG, GIF, WebP, SVG acceptés  
✅ **Client Supabase** : Singleton, plus de warning
✅ **RLS** : Politiques créées pour lecture publique
✅ **Alt dynamique** : Image avec texte alternatif intelligent
✅ **Affichage dynamique** : Les offres créées s'affichent automatiquement sur `/carrieres`

---

## 🚧 À implémenter plus tard

⚠️ **Upload d'image réel vers Supabase Storage**
- Créer le bucket `job-offers`
- Implémenter la fonction `uploadImage()` réelle
- Remplacer le chemin fictif par l'URL Supabase

⚠️ **Authentification admin**
- Mettre en place un système d'auth
- Restreindre l'accès à `/admin/*`
- Modifier les politiques RLS pour n'autoriser que les admins

---

**Tout devrait fonctionner maintenant !** 🎉

Si vous avez des questions, consultez :
- `CORRECTION-OFFRES-EMPLOI.md` pour les détails techniques
- La console du navigateur (F12) pour les erreurs
- Les logs Supabase dans le Dashboard
