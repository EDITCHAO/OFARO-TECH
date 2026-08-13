# Installation des Nouveaux Logos

## Fichiers à ajouter

Veuillez sauvegarder les logos suivants dans le dossier `public` :

### 1. Logo Principal (Logo complet avec "OFARO TECHNOLOGIE")
- **Nom du fichier** : `logo-ofaro.png`
- **Chemin complet** : `c:\PROJET\OFARO TECH\ofaro-tech-website\public\logo-ofaro.png`
- **Description** : Le logo noir avec le cube hexagonal doré et le texte "OFARO TECHNOLOGIE"
- **Dimensions recommandées** : 1024x576px (ou ratio similaire)
- **Format** : PNG avec fond transparent de préférence

### 2. Logo Carré pour PWA (Logo "OT" orange)
- **Nom du fichier** : `logo-ot-square.png`
- **Chemin complet** : `c:\PROJET\OFARO TECH\ofaro-tech-website\public\logo-ot-square.png`
- **Description** : Le logo carré orange avec "OT" en blanc
- **Dimensions** : 512x512px minimum
- **Format** : PNG

### 3. Icônes PWA
Pour les icônes PWA, créez également ces versions du logo carré orange :

- `icon-192x192.png` : Version 192x192px du logo carré orange
- `icon-512x512.png` : Version 512x512px du logo carré orange

## Instructions d'installation

1. **Téléchargez ou enregistrez** les deux logos que vous avez
2. **Renommez-les** selon les noms ci-dessus
3. **Copiez-les** dans le dossier `public`
4. **Vérifiez** que les fichiers sont bien présents :
   ```
   public/
   ├── logo-ofaro.png          ← Logo principal
   ├── logo-ot-square.png       ← Logo carré
   ├── icon-192x192.png         ← Icône PWA 192x192
   └── icon-512x512.png         ← Icône PWA 512x512
   ```

## Modifications déjà effectuées

✅ Le code du Header a été mis à jour pour utiliser `logo-ofaro.png`
✅ Le code du Footer a été mis à jour pour utiliser `logo-ofaro.png`
✅ Les icônes PWA sont déjà configurées dans `manifest.ts`

## Test après installation

Une fois les fichiers ajoutés, lancez le serveur de développement :

```bash
npm run dev
```

Puis vérifiez :
- Le logo apparaît correctement dans le Header
- Le logo apparaît correctement dans le Footer
- Les icônes PWA sont correctement affichées dans le manifest

## Optimisation des images (Optionnel)

Pour de meilleures performances, vous pouvez optimiser les images avec :

```bash
npm install --save-dev @squoosh/lib
```

Ou utilisez un service en ligne comme :
- https://tinypng.com/
- https://squoosh.app/
- https://imageoptim.com/
