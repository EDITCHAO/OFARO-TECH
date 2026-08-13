# Images OFARO TECH

Ce dossier contient toutes les images utilisées sur le site web.

## 📁 Structure des dossiers

```
images/
├── hero/               # Images pour la section héro
│   └── hero-image.svg  # Image principale de la page d'accueil
│
├── projects/           # Images pour la section réalisations
│   ├── ecommerce.svg
│   ├── banking-app.svg
│   ├── hospital.svg
│   ├── branding.svg
│   ├── network.svg
│   └── school.svg
│
└── sectors/           # Images pour la section secteurs
    ├── banking.svg
    ├── education.svg
    ├── health.svg
    ├── commerce.svg
    ├── government.svg
    └── ngo.svg
```

## 🎨 Images créées

### Hero Section
- **hero-image.svg** : Illustration de transformation digitale avec hexagone, cube 3D, et icônes technologiques

### Projects (Réalisations)
- **ecommerce.svg** : Illustration de panier d'achat pour les projets e-commerce
- **banking-app.svg** : Téléphone mobile avec interface bancaire
- **hospital.svg** : Croix médicale pour les systèmes hospitaliers
- **branding.svg** : Palette de couleurs et pinceaux pour l'identité visuelle
- **network.svg** : Réseau de nœuds connectés pour l'infrastructure réseau
- **school.svg** : Livre et chapeau de graduation pour les systèmes scolaires

### Sectors (Secteurs d'activité)
- **banking.svg** : Bâtiment de banque avec colonnes (bleu)
- **education.svg** : Chapeau de graduation et livre (vert)
- **health.svg** : Croix médicale avec ligne de pouls (rouge)
- **commerce.svg** : Panier d'achat et boutique (violet)
- **government.svg** : Bâtiment gouvernemental avec dôme (indigo)
- **ngo.svg** : Globe terrestre avec mains (orange)

## 🔄 Remplacer une image

Pour remplacer une image par une vraie photo :

1. **Format recommandé** : SVG, PNG ou WebP
2. **Dimensions recommandées** :
   - Hero : 800x800px
   - Projects : 800x600px
   - Sectors : 400x300px

3. **Optimisation** : Utilisez [TinyPNG](https://tinypng.com/) ou [Squoosh](https://squoosh.app/)

4. **Remplacement** :
   ```bash
   # Exemple : remplacer l'image hero
   cp votre-nouvelle-image.svg public/images/hero/hero-image.svg
   ```

## 🎨 Images SVG

Toutes les images actuelles sont en **SVG** (format vectoriel), ce qui offre :

✅ **Qualité parfaite** à toute taille  
✅ **Poids minimal** (quelques Ko)  
✅ **Chargement rapide**  
✅ **Adaptatif** (pas de pixelisation)  
✅ **Animations possibles**

## 🖼️ Utilisation dans le code

### Hero Section
```tsx
<img 
  src="/images/hero/hero-image.svg" 
  alt="Transformation Digitale" 
/>
```

### Projects
```tsx
<img 
  src="/images/projects/ecommerce.svg" 
  alt="E-commerce Platform" 
/>
```

### Sectors
```tsx
<img 
  src="/images/sectors/banking.svg" 
  alt="Secteur Bancaire" 
/>
```

## 🎯 Personnalisation

### Changer les couleurs d'une image SVG

1. Ouvrez le fichier `.svg` dans un éditeur de texte
2. Cherchez les attributs `fill` et `stroke`
3. Modifiez les couleurs (ex: `fill="#FF6B00"`)

### Exemple :
```svg
<!-- Avant -->
<rect fill="#FF6B00" />

<!-- Après (orange vers bleu) -->
<rect fill="#3B82F6" />
```

## 📝 Notes

- Les images SVG sont **responsive** par défaut
- Elles s'adaptent automatiquement à leur conteneur
- Elles peuvent être **animées** avec CSS ou JavaScript
- Format idéal pour les **icônes** et **illustrations**

## 🚀 Ajout de nouvelles images

Pour ajouter une nouvelle image :

1. Placez-la dans le bon dossier (`hero/`, `projects/`, ou `sectors/`)
2. Utilisez un nom descriptif (ex: `healthcare-app.svg`)
3. Mettez à jour le composant React correspondant
4. Testez avec `npm run dev`

## 🔍 Vérification

Pour vérifier que toutes les images sont présentes :

```powershell
# Windows PowerShell
Get-ChildItem -Recurse -Include *.svg | Select-Object Name, Directory
```

```bash
# Linux/Mac
find . -name "*.svg" -type f
```

## 📊 Poids des images

Images SVG actuelles :
- Hero : ~3-5 KB
- Projects : ~2-4 KB chacune
- Sectors : ~1-3 KB chacune

**Total : ~25-35 KB** pour toutes les images ! 🎉

---

**Dernière mise à jour** : 2026-08-13  
**Créé par** : Kiro AI pour OFARO TECH
