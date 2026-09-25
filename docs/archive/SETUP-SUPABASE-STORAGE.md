# Configuration Supabase Storage pour les Images de Projets

## ⚠️ IMPORTANT : Cette étape est OBLIGATOIRE pour que l'upload d'images fonctionne

## Étapes pour créer le bucket "projects"

### 1. Accéder à Supabase Storage

1. Connectez-vous à votre dashboard Supabase : https://supabase.com/dashboard
2. Sélectionnez votre projet : **tidencxeznpjvnfebwmw**
3. Dans le menu de gauche, cliquez sur **Storage**

### 2. Créer le bucket "projects"

1. Cliquez sur le bouton **"New bucket"** ou **"Create a new bucket"**
2. Remplissez les informations :
   - **Name** : `projects` (exactement ce nom, en minuscules)
   - **Public bucket** : ✅ **Cochez cette case** (très important!)
   - **Allowed MIME types** : Laissez vide ou ajoutez : `image/jpeg, image/jpg, image/png, image/webp, image/svg+xml`
   - **File size limit** : `5242880` (5MB)

3. Cliquez sur **"Create bucket"**

### 3. Vérifier que le bucket est PUBLIC

1. Dans la liste des buckets, cliquez sur **"projects"**
2. Cliquez sur l'icône **Settings** (engrenage) en haut à droite
3. Vérifiez que **"Public bucket"** est bien activé ✅
4. Si ce n'est pas le cas, activez-le et sauvegardez

### 4. Configurer les politiques (Policies)

Par défaut, un bucket public permet la lecture. Pour l'upload depuis l'admin, ajoutez cette politique :

1. Allez dans **Storage** > **Policies**
2. Sélectionnez le bucket **"projects"**
3. Cliquez sur **"New Policy"**
4. Choisissez **"For full customization"**
5. Remplissez :
   - **Policy name** : `Allow authenticated uploads`
   - **Allowed operation** : `INSERT`
   - **Target roles** : `authenticated` ou `anon` (selon votre besoin)
   - **Policy definition** : 
   ```sql
   true
   ```
   Ou pour plus de sécurité (seulement les utilisateurs authentifiés) :
   ```sql
   auth.role() = 'authenticated'
   ```

6. Cliquez sur **"Review"** puis **"Save policy"**

### 5. Variables d'environnement sur Vercel

Sur Vercel, assurez-vous d'avoir configuré ces variables :

```env
NEXT_PUBLIC_SUPABASE_URL=https://tidencxeznpjvnfebwmw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZGVuY3hlem5wanZuZmVid213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4Mzk1MzUsImV4cCI6MjEwMzQxNTUzNX0.KkP1P-IjICzMrztf5XaMmjthoE9l5swxEutU7aClUBc
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZGVuY3hlem5wanZuZmVid213Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzgzOTUzNSwiZXhwIjoyMTAzNDE1NTM1fQ._LjsNT9PBQ_5om-aNPW_cbzfdLL2beD-YvQqGOlvBxU
```

### 6. Tester l'upload

1. Allez sur votre admin : https://ofaro-tech.vercel.app/admin
2. Cliquez sur **"Projets réalisés"**
3. Cliquez sur **"Ajouter un projet"**
4. Essayez d'uploader une image
5. Vérifiez dans la console du navigateur s'il y a des erreurs

## Structure du bucket

Les images uploadées auront le format suivant :
```
projects/
  ├── 1234567890-abc123.jpg
  ├── 1234567891-def456.png
  └── 1234567892-ghi789.webp
```

## URLs des images

Les images seront accessibles publiquement via :
```
https://tidencxeznpjvnfebwmw.supabase.co/storage/v1/object/public/projects/[FILENAME]
```

## Dépannage

### Erreur : "Bucket not found"
→ Le bucket n'existe pas encore. Créez-le selon les instructions ci-dessus.

### Erreur : "Access denied"
→ Le bucket n'est pas public OU les politiques ne sont pas configurées correctement.

### Erreur : "Invalid API key"
→ Les variables d'environnement ne sont pas configurées sur Vercel.

### Erreur 500 sur l'API
→ Vérifiez les logs Vercel pour voir le message d'erreur exact :
   - Dashboard Vercel > Votre projet > Deployments > Dernier deployment > Logs

## ✅ Checklist finale

- [ ] Bucket "projects" créé
- [ ] Bucket configuré en **PUBLIC**
- [ ] Politique d'upload configurée
- [ ] Variables d'environnement sur Vercel configurées
- [ ] Test d'upload réussi depuis l'admin

---

**Une fois ces étapes complétées, l'upload d'images fonctionnera parfaitement !** 🎉
