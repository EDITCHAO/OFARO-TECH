# Guide de Remplacement des Logos OFARO TECH

## 📋 Résumé des modifications

J'ai mis à jour le code du site web pour utiliser vos nouveaux logos. Voici ce qui a été fait :

### ✅ Modifications effectuées automatiquement

1. **Header (components/layout/Header.tsx)** 
   - Remplacement du logo "OT" carré par le logo complet
   - Utilisation du composant `next/image` pour l'optimisation
   
2. **Footer (components/layout/Footer.tsx)**
   - Remplacement du logo "OT" carré par le logo complet
   - Ajout d'un filtre de luminosité pour le fond sombre

3. **Manifest PWA (app/manifest.ts)**
   - Déjà configuré pour utiliser les icônes 192x192 et 512x512

## 📥 Étapes à suivre (IMPORTANT)

### Étape 1 : Préparer les fichiers de logo

Vous devez créer 3 versions de vos logos :

#### A. Logo principal (logo-ofaro.png)
- **Source** : Le logo noir avec le cube hexagonal doré et "OFARO TECHNOLOGIE"
- **Format** : PNG avec fond transparent
- **Dimensions recommandées** : 1024x576px (ou garder le ratio d'origine)
- **Nom du fichier** : `logo-ofaro.png`

#### B. Icône PWA 192x192 (icon-192x192.png)
- **Source** : Le logo carré orange avec "OT" blanc
- **Format** : PNG
- **Dimensions** : 192x192px (EXACT)
- **Nom du fichier** : `icon-192x192.png`

#### C. Icône PWA 512x512 (icon-512x512.png)
- **Source** : Le logo carré orange avec "OT" blanc
- **Format** : PNG
- **Dimensions** : 512x512px (EXACT)
- **Nom du fichier** : `icon-512x512.png`

### Étape 2 : Redimensionner les images (si nécessaire)

Vous pouvez utiliser un de ces outils gratuits :

**Option 1 : En ligne (plus simple)**
- https://www.iloveimg.com/resize-image
- https://squoosh.app/
- https://www.resizepixel.com/

**Option 2 : Logiciel**
- GIMP (gratuit)
- Photoshop
- Paint.NET

**Option 3 : Générateur d'icônes PWA automatique**
- https://realfavicongenerator.net/ (Upload le logo carré, il génère toutes les tailles)

### Étape 3 : Copier les fichiers

1. Ouvrez l'Explorateur Windows
2. Allez dans : `c:\PROJET\OFARO TECH\ofaro-tech-website\public`
3. Copiez les 3 fichiers dans ce dossier :
   ```
   public/
   ├── logo-ofaro.png       ← Logo principal (nouveau)
   ├── icon-192x192.png     ← Remplace l'ancien
   └── icon-512x512.png     ← Remplace l'ancien
   ```

### Étape 4 : Vérifier l'installation

Lancez le script de vérification :

```powershell
.\check-logos.ps1
```

Ou vérifiez manuellement :

```powershell
Get-ChildItem public\logo-ofaro.png, public\icon-192x192.png, public\icon-512x512.png
```

### Étape 5 : Tester le site

1. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

2. Ouvrez votre navigateur sur `http://localhost:3000`

3. Vérifiez que :
   - ✅ Le logo apparaît dans le Header (en haut)
   - ✅ Le logo apparaît dans le Footer (en bas)
   - ✅ Le logo est cliquable et redirige vers l'accueil
   - ✅ Le logo s'adapte bien aux différentes tailles d'écran (mobile/desktop)

### Étape 6 : Optimiser les images (optionnel mais recommandé)

Pour de meilleures performances, optimisez vos images :

**En ligne :**
- https://tinypng.com/
- https://squoosh.app/

**Ou avec un outil :**
```bash
npm install -g sharp-cli
sharp -i logo-ofaro.png -o logo-ofaro-optimized.png
```

## 🎨 Personnalisation supplémentaire

### Ajuster la taille du logo dans le Header

Si le logo est trop grand ou trop petit, modifiez dans `components/layout/Header.tsx` :

```tsx
className="h-12 sm:h-14 w-auto"
```

Remplacez `h-12` (48px) et `h-14` (56px) par :
- Plus petit : `h-8` (32px), `h-10` (40px)
- Plus grand : `h-16` (64px), `h-20` (80px)

### Ajuster la taille du logo dans le Footer

Modifiez dans `components/layout/Footer.tsx` :

```tsx
className="h-16 w-auto brightness-200"
```

### Ajuster la luminosité du logo dans le Footer

Le filtre `brightness-200` rend le logo plus clair pour le fond sombre.

Pour ajuster :
- Plus clair : `brightness-250` ou `brightness-300`
- Moins clair : `brightness-150` ou `brightness-100` (aucun changement)
- Inverser les couleurs : `invert` au lieu de `brightness-200`

## 🚀 Déploiement

Une fois que tout fonctionne localement :

1. **Commit les changements :**
   ```bash
   git add .
   git commit -m "Mise à jour des logos OFARO TECH"
   git push
   ```

2. **Déployer sur Vercel :**
   - Vercel détectera automatiquement les changements
   - Le site sera redéployé avec les nouveaux logos

## ❓ Dépannage

### Le logo ne s'affiche pas

1. Vérifiez que le fichier existe :
   ```powershell
   Test-Path public\logo-ofaro.png
   ```

2. Vérifiez les permissions du fichier

3. Redémarrez le serveur de développement :
   ```bash
   npm run dev
   ```

### Le logo est déformé

Assurez-vous que :
- Le fichier PNG a un fond transparent
- Les dimensions sont correctes
- La classe CSS `w-auto` est présente (elle maintient le ratio)

### Le logo est trop pixelisé

- Utilisez une image en haute résolution (au moins 1024px de largeur)
- Assurez-vous que le format est PNG, pas JPG

### Erreur "Module not found: Can't resolve '/logo-ofaro.png'"

- Vérifiez que le fichier est bien dans `public/` et pas dans un sous-dossier
- Le chemin doit être `/logo-ofaro.png` (avec le slash initial)
- Redémarrez le serveur

## 📞 Support

Si vous rencontrez des problèmes, vérifiez :
1. Les fichiers sont bien dans `public/`
2. Les noms de fichiers sont corrects (sensible à la casse)
3. Le serveur est redémarré après avoir ajouté les fichiers

---

**Note** : Les anciens fichiers `ot.png` et `icon-192x192.jpeg` ne sont plus utilisés et peuvent être supprimés.
