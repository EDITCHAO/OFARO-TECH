# 🚀 Guide d'installation Supabase Partenaires

## 📋 Ce qu'on va faire

1. ✅ Créer la table SQL pour stocker les infos des partenaires
2. ✅ Créer le bucket Storage pour stocker les images/logos
3. ✅ Configurer les permissions (RLS)
4. ✅ Tester que tout fonctionne

---

## 🎯 Étape 1 : Créer la table SQL

### 1.1 - Ouvrir Supabase SQL Editor

1. Va sur : https://supabase.com/dashboard/project/tidencxeznpjvnfebwmw
2. Clique sur **SQL Editor** dans le menu de gauche
3. Clique sur **New query**

### 1.2 - Exécuter le script

1. Ouvre le fichier : `database/SETUP-PARTNERS-COMPLETE.sql`
2. **Copie TOUT le contenu** du fichier
3. **Colle** dans l'éditeur SQL
4. Clique sur **Run** (ou `Ctrl + Enter`)

### 1.3 - Vérifier

Tu devrais voir en bas :
```
Success. Rows: 5
```

Et un tableau avec 5 partenaires : Microsoft, AWS, Google Cloud, Oracle, Cisco

---

## 📦 Étape 2 : Créer le bucket Storage

### 2.1 - Ouvrir Storage

1. Dans le menu de gauche, clique sur **Storage**
2. Clique sur **New bucket**

### 2.2 - Configurer le bucket

Remplis les champs :
- **Name** : `partners-logos`
- **Public bucket** : ✅ **COCHER** (important !)
- **File size limit** : `5 MB`
- **Allowed MIME types** : Laisse vide (ou `image/*`)

3. Clique sur **Create bucket**

---

## 🔐 Étape 3 : Configurer les permissions du bucket

### 3.1 - Ouvrir les policies

1. Dans **Storage**, clique sur ton bucket `partners-logos`
2. Clique sur l'onglet **Policies** en haut
3. Tu verras "No policies yet"

### 3.2 - Policy 1 : Lecture publique

1. Clique sur **New Policy**
2. **Policy name** : `Public Access`
3. **Allowed operation** : Sélectionne **SELECT**
4. **Target roles** : `anon, authenticated`
5. **Policy definition** : 
   ```sql
   bucket_id = 'partners-logos'
   ```
6. **Create policy**

### 3.3 - Policy 2 : Upload authentifié

1. Clique sur **New Policy**
2. **Policy name** : `Authenticated Upload`
3. **Allowed operation** : Sélectionne **INSERT**
4. **Target roles** : `authenticated`
5. **Policy definition** : 
   ```sql
   bucket_id = 'partners-logos'
   ```
6. **Create policy**

### 3.4 - Policy 3 : Suppression authentifiée

1. Clique sur **New Policy**
2. **Policy name** : `Authenticated Delete`
3. **Allowed operation** : Sélectionne **DELETE**
4. **Target roles** : `authenticated`
5. **Policy definition** : 
   ```sql
   bucket_id = 'partners-logos'
   ```
6. **Create policy**

---

## ✅ Étape 4 : Tester l'installation

### 4.1 - Test de la table

Dans **SQL Editor**, exécute :

```sql
SELECT * FROM public.partners ORDER BY display_order;
```

Tu devrais voir 5 partenaires.

### 4.2 - Test du bucket

1. Va dans **Storage** > `partners-logos`
2. Clique sur **Upload file**
3. Upload une image de test (n'importe laquelle)
4. Une fois uploadée, clique sur l'image
5. Copie l'URL publique (elle doit ressembler à ça) :
   ```
   https://tidencxeznpjvnfebwmw.supabase.co/storage/v1/object/public/partners-logos/test.png
   ```
6. Ouvre cette URL dans un nouvel onglet → l'image doit s'afficher ✅

---

## 🎉 C'est terminé !

Si tout fonctionne :
- ✅ La table `partners` existe
- ✅ Le bucket `partners-logos` est créé
- ✅ Les permissions sont configurées
- ✅ Tu peux uploader et voir les images

## 🔄 Prochaine étape

Maintenant on va **mettre à jour le back-office** pour qu'il utilise Supabase au lieu de LocalStorage.

---

## ❓ Problèmes courants

### "Table already exists"
→ C'est normal si tu as déjà exécuté le script. Ignore l'erreur.

### "Bucket already exists"
→ Pareil, c'est OK.

### "Policy already exists"
→ Supprime les anciennes policies et recrée-les.

### L'image ne s'affiche pas
→ Vérifie que le bucket est bien **Public** (coché lors de la création)

---

📧 Besoin d'aide ? Demande-moi !
