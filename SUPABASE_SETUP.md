# Configuration Supabase pour Upload de CV

## Étapes à suivre

### 1. Créer le bucket Storage

1. Allez sur votre projet Supabase: https://supabase.com/dashboard
2. Cliquez sur **Storage** dans le menu latéral
3. Cliquez sur **"New bucket"**
4. Configurez le bucket:
   - **Name**: `applications`
   - **Public**: ✅ **Cochez cette case** (important pour permettre le téléchargement des CVs)
   - **File size limit**: 5 MB (optionnel)
   - **Allowed MIME types**: `application/pdf` (optionnel)
5. Cliquez sur **"Create bucket"**

### 2. Obtenir la Service Role Key

1. Allez dans **Settings** (icône engrenage en bas à gauche)
2. Cliquez sur **API**
3. Trouvez la section **Project API keys**
4. Copiez la clé **`service_role`** (PAS la clé `anon`!)
5. ⚠️ **ATTENTION**: Cette clé donne un accès complet à votre base de données. Ne la partagez JAMAIS publiquement!

### 3. Mettre à jour .env.local

Ouvrez le fichier `ofaro-tech-website/.env.local` et remplacez:

```env
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key_ici
```

Par:

```env
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey... (votre vraie clé)
```

### 4. Redémarrer le serveur

```bash
# Arrêtez le serveur (Ctrl+C)
# Puis redémarrez
npm run dev
```

## Vérification

Pour vérifier que tout fonctionne:

1. Allez sur http://localhost:3000/carrieres
2. Remplissez le formulaire de candidature
3. Sélectionnez un fichier PDF pour le CV
4. Cliquez sur "Envoyer ma candidature"
5. Si tout est OK, vous verrez: ✅ "Candidature envoyée avec succès!"

## Structure du bucket

Les CVs seront stockés dans:
```
applications/
  └── cv/
      ├── APP-001_Jean_Dupont_1234567890.pdf
      ├── APP-002_Marie_Martin_1234567891.pdf
      └── ...
```

## Sécurité

- ✅ Le bucket est public (lecture seule pour les CVs)
- ✅ Seule l'API backend peut uploader (avec SERVICE_ROLE_KEY)
- ✅ Taille maximale: 5 MB
- ✅ Format accepté: PDF uniquement

## Dépannage

### Erreur 500 lors de l'upload

1. Vérifiez que le bucket `applications` existe
2. Vérifiez que le bucket est **public**
3. Vérifiez que `SUPABASE_SERVICE_ROLE_KEY` est correcte dans `.env.local`
4. Redémarrez le serveur

### Bucket non trouvé

1. Allez dans Storage
2. Vérifiez que le bucket s'appelle exactement `applications` (pas `application` ou autre)
3. Créez-le s'il n'existe pas

### Permission denied

1. Allez dans le bucket `applications`
2. Cliquez sur ⚙️ Settings
3. Cochez **"Public bucket"**
4. Sauvegardez
