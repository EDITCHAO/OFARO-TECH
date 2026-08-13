# 🚀 Guide de Déploiement - OFARO TECH

Guide complet pour déployer le site OFARO TECH sur GitHub et Vercel.

---

## 📋 Pré-requis

- ✅ Compte GitHub : https://github.com/signup
- ✅ Compte Vercel : https://vercel.com/signup (connectez avec GitHub)
- ✅ Git installé sur votre machine : https://git-scm.com/downloads
- ✅ Node.js 18+ installé

---

## 🔧 Partie 1 : Préparation Locale

### 1. Vérifier que tout fonctionne localement

```bash
cd "c:\PROJET\OFARO TECH\ofaro-tech-website"
npm run build
```

Si le build réussit, vous êtes prêt à déployer ! ✅

### 2. Remplacer les icônes PWA (Important)

Actuellement, les icônes sont des placeholders. Remplacez-les :

1. Créez vos icônes avec https://realfavicongenerator.net/
2. Remplacez `public/icon-192x192.png`
3. Remplacez `public/icon-512x512.png`
4. Voir `public/ICON_README.md` pour plus de détails

---

## 📦 Partie 2 : Mise sur GitHub

### Étape 1 : Initialiser Git (si pas déjà fait)

Ouvrez PowerShell dans le dossier du projet :

```powershell
cd "c:\PROJET\OFARO TECH\ofaro-tech-website"
git init
git add .
git commit -m "Initial commit - OFARO TECH Website"
```

### Étape 2 : Créer un dépôt sur GitHub

1. Allez sur https://github.com/new
2. **Nom du dépôt** : `ofaro-tech-website` (ou autre nom)
3. **Description** : "Site web institutionnel OFARO TECH - Services IT au Togo"
4. **Visibilité** : 
   - ✅ **Public** (recommandé pour Vercel gratuit)
   - ⚠️ Private (nécessite plan Vercel payant)
5. ❌ **NE PAS** cocher "Initialize with README"
6. Cliquez sur **"Create repository"**

### Étape 3 : Connecter votre projet au dépôt GitHub

Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub :

```powershell
git remote add origin https://github.com/VOTRE_USERNAME/ofaro-tech-website.git
git branch -M main
git push -u origin main
```

**Exemple concret** :
```powershell
# Si votre username GitHub est "ofarotech"
git remote add origin https://github.com/ofarotech/ofaro-tech-website.git
git branch -M main
git push -u origin main
```

Entrez vos identifiants GitHub si demandé.

✅ Votre code est maintenant sur GitHub !

---

## 🌐 Partie 3 : Déploiement sur Vercel

### Méthode 1 : Via le site Vercel (Recommandé pour débutants)

1. **Connectez-vous à Vercel** : https://vercel.com/login
   - Choisissez "Continue with GitHub"
   - Autorisez Vercel à accéder à vos dépôts

2. **Importer votre projet** :
   - Cliquez sur "Add New..." → "Project"
   - Sélectionnez votre dépôt `ofaro-tech-website`
   - Cliquez sur "Import"

3. **Configuration du projet** :
   - **Framework Preset** : Next.js (détecté automatiquement)
   - **Root Directory** : `./` (laisser par défaut)
   - **Build Command** : `npm run build` (déjà configuré)
   - **Output Directory** : `.next` (déjà configuré)
   - **Install Command** : `npm install` (déjà configuré)

4. **Variables d'environnement** (optionnel) :
   - Actuellement aucune variable nécessaire
   - Si vous ajoutez des API keys plus tard, ajoutez-les ici

5. **Déployer** :
   - Cliquez sur "Deploy"
   - ⏳ Attendez 2-3 minutes
   - ✅ Votre site est en ligne !

### Méthode 2 : Via Vercel CLI (Avancé)

```powershell
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
cd "c:\PROJET\OFARO TECH\ofaro-tech-website"
vercel

# Suivre les instructions interactives
# Répondre "Y" (Yes) aux questions
```

---

## 🎯 Partie 4 : Configuration du Nom de Domaine

### Option A : Utiliser le domaine Vercel gratuit

Votre site sera accessible à :
```
https://ofaro-tech-website-votre-username.vercel.app
```

C'est gratuit et permanent !

### Option B : Utiliser votre propre domaine (Ex: ofarotech.com)

1. **Acheter un domaine** (si pas encore fait) :
   - Namecheap : https://www.namecheap.com
   - Google Domains : https://domains.google
   - GoDaddy : https://www.godaddy.com
   - Prix : ~10-15€/an

2. **Ajouter le domaine à Vercel** :
   - Dans votre projet Vercel → Settings → Domains
   - Entrez votre domaine : `ofarotech.com`
   - Cliquez "Add"

3. **Configurer les DNS** :
   Vercel vous donnera des instructions. Généralement :
   
   **Chez votre registrar (Namecheap, etc.)** :
   
   | Type  | Name | Value                        |
   |-------|------|------------------------------|
   | A     | @    | 76.76.21.21                  |
   | CNAME | www  | cname.vercel-dns.com         |

4. **Attendre la propagation** : 5 minutes à 48 heures (généralement < 1h)

5. **Activer HTTPS** : Automatique avec Vercel (certificat SSL gratuit)

✅ Votre site sera accessible sur votre domaine personnalisé !

---

## 🔄 Partie 5 : Mises à Jour du Site

### Déploiement automatique (Recommandé)

Chaque fois que vous poussez du code sur GitHub, Vercel redéploie automatiquement !

```powershell
# Modifier vos fichiers localement
# Ensuite :

git add .
git commit -m "Description de vos changements"
git push

# Vercel détecte le push et redéploie automatiquement
# Temps de déploiement : 1-2 minutes
```

### Déploiement manuel

Si vous voulez déployer une branche spécifique :

```powershell
vercel --prod
```

---

## ✅ Checklist de Déploiement

### Avant de déployer :

- [ ] `npm run build` fonctionne sans erreur
- [ ] Remplacer les icônes PWA (icon-192x192.png, icon-512x512.png)
- [ ] Vérifier les informations de contact dans `lib/constants.ts`
- [ ] Tester le site localement sur mobile (192.168.1.90:3000)
- [ ] Remplacer les images placeholder par de vraies images

### Après le déploiement :

- [ ] Tester toutes les pages sur le site en production
- [ ] Vérifier la responsivité mobile
- [ ] Tester les formulaires (Contact, Devis)
- [ ] Vérifier le SEO avec https://pagespeed.web.dev/
- [ ] Soumettre le sitemap à Google Search Console

---

## 🛠️ Commandes Utiles

### Build local (test de production)
```powershell
npm run build
npm run start
```

### Analyser les performances
```powershell
npm run build
# Puis ouvrir http://localhost:3000 dans Chrome
# DevTools > Lighthouse > Analyser
```

### Vérifier les erreurs TypeScript
```powershell
npm run lint
```

---

## 🔒 Sécurité et Bonnes Pratiques

### Fichiers à NE JAMAIS commit sur GitHub :

✅ Déjà exclus dans `.gitignore` :
- `/node_modules`
- `/.next`
- `.env.local`
- `.env`

### Variables d'environnement sensibles :

Si vous ajoutez des API keys :
1. Créez `.env.local` localement
2. Ajoutez-les dans Vercel Settings → Environment Variables
3. ❌ NE JAMAIS les commit sur GitHub

---

## 📊 Monitoring et Analytics

### Google Analytics (optionnel)

1. Créez un compte : https://analytics.google.com/
2. Obtenez votre ID de suivi (ex: G-XXXXXXXXXX)
3. Ajoutez-le dans `app/layout.tsx` :

```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
```

### Vercel Analytics (Recommandé)

1. Dans votre projet Vercel → Analytics
2. Activez "Enable Analytics"
3. Gratuit pour 100k vues/mois

---

## 🚨 Dépannage

### Erreur : "Build failed"

```powershell
# Vérifier localement
npm run build

# Si erreurs TypeScript :
npm run lint
```

### Erreur : "Module not found"

```powershell
# Vérifier package.json
npm install
```

### Site blanc après déploiement

1. Vérifier les logs Vercel → Deployments → View Function Logs
2. Vérifier la console du navigateur (F12)

### Images ne s'affichent pas

1. Vérifier que les images sont dans `/public/`
2. Utiliser des chemins absolus : `/images/photo.jpg`

---

## 📞 Support

### Documentation officielle :

- **Next.js** : https://nextjs.org/docs
- **Vercel** : https://vercel.com/docs
- **GitHub** : https://docs.github.com/

### Communautés :

- Next.js Discord : https://nextjs.org/discord
- Stack Overflow : https://stackoverflow.com/questions/tagged/next.js

---

## 🎉 Félicitations !

Votre site OFARO TECH est maintenant en ligne et accessible au monde entier ! 🌍

**Prochaines étapes suggérées** :

1. ✅ Configurer Google Search Console
2. ✅ Ajouter Google Analytics
3. ✅ Remplacer toutes les images placeholder
4. ✅ Configurer un domaine personnalisé
5. ✅ Ajouter un blog ou actualités
6. ✅ Intégrer un CRM pour les formulaires

---

**Date de création** : Décembre 2024  
**Version** : 1.0  
**Créé par** : OFARO TECH Development Team
