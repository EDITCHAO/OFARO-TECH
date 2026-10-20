# 📸 Guide Upload Logos Partenaires dans Supabase

## Problème : Les logos ne s'affichent pas sur Vercel

Plusieurs raisons possibles :
1. ❌ Les `logo_url` contiennent du texte au lieu d'URLs (ex: "MS" au lieu de "https://...")
2. ❌ Le bucket `partners-logos` n'existe pas dans Supabase Storage
3. ❌ Les URLs externes sont bloquées par CORS

## Solution complète en 3 étapes

### Étape 1 : Créer le bucket Supabase Storage

1. Allez sur https://supabase.com
2. Sélectionnez votre projet : **tidencxeznpjvnfebwmw**
3. Menu **"Storage"** (à gauche)
4. Cliquez **"New bucket"**
5. Paramètres :
   - **Name** : `partners-logos`
   - **Public bucket** : ✅ **YES** (important !)
   - **File size limit** : 5 MB
   - **Allowed MIME types** : `image/*`
6. Cliquez **"Create bucket"**

### Étape 2 : Nettoyer et réinsérer les partenaires

1. Menu **"SQL Editor"** (à gauche)
2. Cliquez **"New Query"**
3. **Copiez-collez** le contenu de `database/fix-partners-logos.sql`
4. Cliquez **"Run"** (ou F5)
5. ✅ Vous devriez voir : 8 partenaires insérés

### Étape 3 : Vérifier que ça fonctionne

#### Test API
Ouvrez : https://ofaro-tech.vercel.app/api/partners

Vous devez voir :
```json
{
  "partners": [
    {
      "id": 1,
      "name": "Microsoft",
      "logo_url": "https://upload.wikimedia.org/...",
      "is_published": true
    },
    ...
  ]
}
```

#### Test page d'accueil
Ouvrez : https://ofaro-tech.vercel.app

Scrollez jusqu'à la section **"Nos Partenaires"** → Les logos doivent s'afficher !

---

## Alternative : Upload depuis l'Admin

Si vous préférez uploader vos propres logos :

### 1. Téléchargez les logos
Téléchargez des logos PNG/SVG depuis :
- https://worldvectorlogo.com/
- https://simpleicons.org/
- https://brandeps.com/

### 2. Uploadez via l'Admin
1. http://localhost:3000/admin → **Partenaires**
2. Cliquez **"Ajouter un partenaire"** (ou Modifier)
3. Section **"Logo"** :
   - Cliquez **"Choisir un fichier"**
   - Sélectionnez votre logo (PNG, JPG, SVG, max 5 MB)
4. Remplissez le reste :
   - **Nom** : Microsoft
   - **Site web** : https://www.microsoft.com
   - **Ordre** : 1
   - ✅ Cochez **"Publié"**
5. Cliquez **"Enregistrer"**

Le logo est automatiquement uploadé dans Supabase Storage `partners-logos` !

---

## Formats de logos recommandés

### ✅ Meilleurs formats
- **SVG** : Vectoriel, s'adapte à toutes les tailles, poids léger
- **PNG transparent** : Fond transparent, bonne qualité
- **WebP** : Moderne, excellent ratio qualité/poids

### ❌ À éviter
- JPG avec fond blanc (préférer PNG transparent)
- GIF (obsolète)
- Logos trop lourds (> 1 MB)

### 📐 Dimensions recommandées
- **Carré** : 200x200px, 400x400px, ou 512x512px
- **Rectangle** : 400x200px (ratio 2:1)
- **Format** : PNG 24-bit avec transparence

---

## Dépannage

### Les logos ne s'affichent toujours pas ?

#### 1. Vérifiez la table `partners`
```sql
SELECT id, name, 
  CASE 
    WHEN logo_url LIKE 'http%' THEN 'URL OK'
    ELSE 'URL INVALIDE'
  END as logo_status,
  is_published
FROM partners;
```

#### 2. Vérifiez le bucket
- Supabase → Storage → `partners-logos`
- Le bucket doit être **Public** ✅
- Testez une URL : `https://tidencxeznpjvnfebwmw.supabase.co/storage/v1/object/public/partners-logos/test.png`

#### 3. Vérifiez les CORS
Si les URLs externes ne marchent pas, uploadez les logos dans le bucket Supabase.

#### 4. Videz le cache
- Local : Ctrl + Shift + R
- Vercel : Attendez 30 secondes (cache CDN)

---

## Script automatique (NodeJS)

Si vous avez beaucoup de logos à uploader, créez un script :

```javascript
// upload-logos.js
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function uploadLogo(filePath, partnerName) {
  const fileBuffer = fs.readFileSync(filePath);
  const fileName = `${Date.now()}-${partnerName.toLowerCase()}.png`;
  
  const { data, error } = await supabase.storage
    .from('partners-logos')
    .upload(fileName, fileBuffer, {
      contentType: 'image/png',
      cacheControl: '3600'
    });
  
  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from('partners-logos')
    .getPublicUrl(fileName);
  
  return publicUrl;
}

// Utilisation
uploadLogo('./logos/microsoft.png', 'Microsoft')
  .then(url => console.log('URL:', url));
```

---

## Checklist finale

Avant de dire que c'est cassé, vérifiez :

- [ ] ✅ Bucket `partners-logos` existe et est **Public**
- [ ] ✅ Table `partners` a au moins 1 ligne avec `is_published = true`
- [ ] ✅ Colonne `logo_url` contient des URLs complètes (`http://` ou `https://`)
- [ ] ✅ L'API `/api/partners` retourne des données
- [ ] ✅ Cache navigateur vidé (Ctrl + Shift + R)
- [ ] ✅ Vercel déployé (dernier commit poussé)

Si tout est ✅ et ça ne marche toujours pas → Ouvrez F12 (console navigateur) et cherchez les erreurs !
