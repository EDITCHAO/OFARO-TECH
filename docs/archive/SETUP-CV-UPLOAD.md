# 📄 Configuration Upload de CV - OFARO TECH

## ⚠️ PROBLÈME ACTUEL
L'upload de CV ne fonctionne pas car le bucket "applications" n'existe pas dans Supabase Storage.

## ✅ SOLUTION RAPIDE (5 minutes)

### Méthode 1 : Script SQL automatique (Recommandé)

1. **Aller sur Supabase Dashboard**
   - https://supabase.com/dashboard
   - Sélectionner votre projet : **tidencxeznpjvnfebwmw**

2. **Ouvrir SQL Editor**
   - Menu gauche → **SQL Editor**
   - Cliquer sur **"New query"**

3. **Copier-coller ce script**
   ```sql
   -- Créer le bucket "applications" pour stocker les CV
   INSERT INTO storage.buckets (id, name, public)
   VALUES ('applications', 'applications', true)
   ON CONFLICT (id) DO UPDATE SET public = true;

   -- Supprimer les anciennes policies si elles existent
   DROP POLICY IF EXISTS "Allow public uploads to applications" ON storage.objects;
   DROP POLICY IF EXISTS "Allow public read from applications" ON storage.objects;
   DROP POLICY IF EXISTS "Allow authenticated delete from applications" ON storage.objects;
   DROP POLICY IF EXISTS "Allow authenticated update in applications" ON storage.objects;

   -- Permettre les uploads (tout le monde peut uploader un CV)
   CREATE POLICY "Allow public uploads to applications"
   ON storage.objects
   FOR INSERT
   TO public
   WITH CHECK (bucket_id = 'applications');

   -- Permettre la lecture publique
   CREATE POLICY "Allow public read from applications"
   ON storage.objects
   FOR SELECT
   TO public
   USING (bucket_id = 'applications');

   -- Permettre les suppressions (authentifiés seulement)
   CREATE POLICY "Allow authenticated delete from applications"
   ON storage.objects
   FOR DELETE
   TO authenticated
   USING (bucket_id = 'applications');

   -- Permettre les mises à jour (authentifiés seulement)
   CREATE POLICY "Allow authenticated update in applications"
   ON storage.objects
   FOR UPDATE
   TO authenticated
   USING (bucket_id = 'applications');
   ```

4. **Exécuter**
   - Cliquer sur **"Run"** (en bas à droite)
   - Attendre le message de succès ✅

5. **Tester**
   - Aller sur : https://ofaro-tech.vercel.app/carrieres
   - Soumettre une candidature avec un CV
   - L'upload devrait maintenant fonctionner ! 🎉

---

### Méthode 2 : Interface graphique (Alternative)

Si vous préférez créer le bucket manuellement :

1. **Supabase Dashboard → Storage**

2. **Créer le bucket**
   - Cliquer sur **"New bucket"**
   - **Name** : `applications` (en minuscules, exactement)
   - **Public bucket** : ✅ **Cocher cette case**
   - **Allowed MIME types** : `application/pdf`
   - **File size limit** : `5242880` (5 MB)
   - Cliquer sur **"Create bucket"**

3. **Configurer les politiques**
   - Aller dans **Storage** → **Policies**
   - Sélectionner le bucket **"applications"**
   - Ajouter ces 4 politiques :

   **a) Upload public**
   ```sql
   CREATE POLICY "Allow public uploads to applications"
   ON storage.objects FOR INSERT TO public
   WITH CHECK (bucket_id = 'applications');
   ```

   **b) Lecture publique**
   ```sql
   CREATE POLICY "Allow public read from applications"
   ON storage.objects FOR SELECT TO public
   USING (bucket_id = 'applications');
   ```

   **c) Suppression (admin)**
   ```sql
   CREATE POLICY "Allow authenticated delete from applications"
   ON storage.objects FOR DELETE TO authenticated
   USING (bucket_id = 'applications');
   ```

   **d) Mise à jour (admin)**
   ```sql
   CREATE POLICY "Allow authenticated update in applications"
   ON storage.objects FOR UPDATE TO authenticated
   USING (bucket_id = 'applications');
   ```

---

## 📂 Structure du bucket

Les CV seront stockés ainsi :
```
applications/
  └── cv/
      ├── APP-001_Jean_Dupont_1234567890.pdf
      ├── APP-002_Marie_Martin_1234567891.pdf
      └── APP-003_Pierre_Durand_1234567892.pdf
```

## 🔗 URLs des CV

Les CV seront accessibles via :
```
https://tidencxeznpjvnfebwmw.supabase.co/storage/v1/object/public/applications/cv/[FILENAME].pdf
```

---

## ✅ VÉRIFICATION

Après avoir créé le bucket, vérifiez :

### 1. Le bucket existe
- **Storage** → Vous devez voir **"applications"** dans la liste

### 2. Le bucket est PUBLIC
- Cliquer sur "applications" → Settings
- "Public bucket" doit être activé ✅

### 3. Les politiques sont actives
- **Storage** → **Policies** → "applications"
- Vous devez voir 4 politiques actives :
  - ✅ Allow public uploads to applications
  - ✅ Allow public read from applications
  - ✅ Allow authenticated delete from applications
  - ✅ Allow authenticated update in applications

---

## 🧪 TEST

1. **Aller sur** : https://ofaro-tech.vercel.app/carrieres

2. **Remplir le formulaire** :
   - Prénom : Test
   - Nom : Candidat
   - Email : test@example.com
   - Téléphone : +228 XX XX XX XX
   - Poste : Développeur
   - Message : Test de candidature
   - **CV** : Uploader un PDF (max 5 MB)

3. **Soumettre**
   - Vous devriez voir : ✅ "Candidature envoyée avec succès"
   - Le CV doit être visible dans Supabase Storage → applications → cv

4. **Vérifier dans l'admin**
   - https://ofaro-tech.vercel.app/admin
   - Menu "Candidatures"
   - La nouvelle candidature doit apparaître
   - Le CV doit être téléchargeable

---

## 🐛 DÉPANNAGE

### Erreur : "Bucket not found"
→ Le bucket n'existe pas encore. Exécutez le script SQL ci-dessus.

### Erreur : "Access denied"
→ Le bucket n'est pas PUBLIC ou les politiques ne sont pas configurées.

### Erreur : "File too large"
→ Le fichier dépasse 5 MB. Compressez le PDF.

### Erreur : "Invalid file type"
→ Seuls les PDF sont acceptés. Convertissez votre fichier en PDF.

---

## 📊 QUOTAS SUPABASE (Gratuit)

| Ressource | Limite gratuite |
|-----------|-----------------|
| Stockage | 1 GB |
| Bande passante | 2 GB/mois |
| Uploads | Illimité |

**Estimation** :
- 1 CV = ~500 KB
- 1 GB = ~2000 CV
- Largement suffisant pour démarrer !

---

## 🔒 SÉCURITÉ

### Ce qui est sécurisé ✅
- Upload limité aux PDF uniquement
- Taille maximale : 5 MB
- Noms de fichiers uniques (évite les écrasements)
- Suppression réservée aux admins authentifiés

### Recommandations
- Vérifier régulièrement les uploads
- Supprimer les CV des candidatures rejetées après 6 mois (RGPD)
- Backup mensuel du bucket

---

## ✨ APRÈS CONFIGURATION

Une fois le bucket créé, l'upload de CV fonctionnera pour :
- ✅ Page Carrières (candidatures spontanées)
- ✅ Page Offres d'emploi (candidatures aux offres)
- ✅ Formulaire de stage
- ✅ Panel admin (téléchargement des CV)

**Temps de configuration : 5 minutes maximum** ⏱️

---

**Besoin d'aide ?**
- Documentation Supabase Storage : https://supabase.com/docs/guides/storage
- Support : https://supabase.com/support
