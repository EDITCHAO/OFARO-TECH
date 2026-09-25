# 📤 Instructions pour Pousser sur GitHub

## ✅ Ce qui est fait :
- ✅ Git repository initialisé
- ✅ Commit initial créé (51 fichiers)
- ✅ Correction vercel.json commitée
- ✅ Remote GitHub configuré : https://github.com/EDITCHAO/OFARO-TECH.git
- ✅ Branche "main" créée

## 🚀 Pour pousser sur GitHub :

### Étape 1 : Ouvrir PowerShell ou CMD

Naviguez vers le dossier :
```bash
cd "c:\PROJET\OFARO TECH\ofaro-tech-website"
```

### Étape 2 : Pousser les changements

```bash
git push -u origin main
```

### Étape 3 : Authentification

Vous devrez entrer :
- **Username** : `EDITCHAO`
- **Password** : Votre **Personal Access Token** (PAS votre mot de passe GitHub)

## 🔑 Créer un Personal Access Token :

1. Allez sur : https://github.com/settings/tokens
2. Cliquez sur **"Generate new token"** → **"Tokens (classic)"**
3. Donnez un nom : "OFARO TECH Deploy"
4. Sélectionnez les permissions :
   - ✅ **repo** (cochez tout)
   - ✅ **workflow**
5. Cliquez sur **"Generate token"**
6. **COPIEZ LE TOKEN** (vous ne le verrez qu'une fois !)
7. Utilisez ce token comme mot de passe lors du `git push`

## 📝 Alternative : Utiliser GitHub CLI

Si vous avez GitHub CLI installé :
```bash
gh auth login
git push -u origin main
```

## ✅ Après le push réussi :

Votre code sera visible sur : **https://github.com/EDITCHAO/OFARO-TECH**

Ensuite, vous pourrez déployer sur Vercel :
1. Allez sur https://vercel.com
2. Connectez-vous avec GitHub
3. Import Project → Sélectionnez OFARO-TECH
4. Deploy !

---

## 🔧 Corrections appliquées :

✅ **vercel.json** : Pattern regex corrigé pour les images
- Avant : `/(.*).(?:jpg|jpeg|png|gif|webp|avif|svg)`
- Après : `/(.*?)\\.(jpg|jpeg|png|gif|webp|avif|svg)$`

Le déploiement Vercel devrait maintenant fonctionner sans erreur ! 🎉
