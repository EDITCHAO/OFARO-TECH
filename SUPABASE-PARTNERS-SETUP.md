# Configuration Supabase pour les Partenaires

## 1️⃣ Créer le bucket de stockage

Allez sur votre dashboard Supabase : https://supabase.com/dashboard/project/tidencxeznpjvnfebwmw

### Storage > Create a new bucket
- **Nom** : `partners-logos`
- **Public** : ✅ Oui (les logos doivent être accessibles publiquement)
- **File size limit** : 5 MB
- **Allowed MIME types** : `image/png, image/jpeg, image/jpg, image/svg+xml, image/webp`

### Policies du bucket
```sql
-- Politique : Tout le monde peut lire les logos
CREATE POLICY "Public logos are viewable by everyone"
ON storage.objects FOR SELECT
USING (bucket_id = 'partners-logos');

-- Politique : Seuls les utilisateurs authentifiés peuvent uploader
CREATE POLICY "Authenticated users can upload logos"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'partners-logos'
    AND auth.role() = 'authenticated'
);

-- Politique : Seuls les utilisateurs authentifiés peuvent supprimer
CREATE POLICY "Authenticated users can delete logos"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'partners-logos'
    AND auth.role() = 'authenticated'
);
```

## 2️⃣ Créer la table `partners`

Allez sur : **SQL Editor** > **New Query**

Copiez-collez le contenu du fichier : `database/create-partners-table.sql`

Puis cliquez sur **Run** (ou `Ctrl + Enter`)

## 3️⃣ Vérifier que tout fonctionne

### Vérifier la table
```sql
SELECT * FROM public.partners;
```

### Vérifier le bucket
Dans **Storage** > `partners-logos` > Vous devriez voir le bucket vide et prêt

## 4️⃣ Structure URL des logos

Une fois uploadés, les logos auront cette URL :
```
https://tidencxeznpjvnfebwmw.supabase.co/storage/v1/object/public/partners-logos/microsoft-logo.png
```

## 5️⃣ Test rapide

Uploadez un logo test dans le bucket pour vérifier que tout fonctionne !

---

✅ Une fois ces étapes terminées, l'application pourra :
- Uploader les logos dans Supabase Storage
- Stocker les infos partenaires dans la table SQL
- Afficher les partenaires sur le site depuis Supabase
