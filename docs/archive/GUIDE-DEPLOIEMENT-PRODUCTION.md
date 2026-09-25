# 🚀 Guide de Déploiement Production - OFARO TECH

## 📋 Vue d'ensemble

Ce guide vous explique comment déployer votre site web OFARO TECH avec un nom de domaine personnalisé (.com ou .tg) et le rendre accessible à tous sur Internet.

---

## 💰 BUDGET ANNUEL ESTIMÉ

### Option 1 : Domaine .com (Recommandé pour visibilité internationale)
| Service | Prix/mois | Prix/an | Fournisseur |
|---------|-----------|---------|-------------|
| **Nom de domaine .com** | ~1 200 FCFA | **~14 000 FCFA** | Namecheap, GoDaddy |
| **Hébergement Vercel** | 0 FCFA | **0 FCFA** | Vercel (gratuit) |
| **Base de données Supabase** | 0 FCFA | **0 FCFA** | Supabase (gratuit) |
| **Email professionnel (optionnel)** | ~2 000 FCFA | **~24 000 FCFA** | Google Workspace / Zoho |
| **SSL/HTTPS** | 0 FCFA | **0 FCFA** | Inclus (Vercel) |
| **TOTAL SANS EMAIL** | ~1 200 FCFA | **~14 000 FCFA/an** | |
| **TOTAL AVEC EMAIL** | ~3 200 FCFA | **~38 000 FCFA/an** | |

### Option 2 : Domaine .tg (Pour cibler le Togo)
| Service | Prix/mois | Prix/an | Fournisseur |
|---------|-----------|---------|-------------|
| **Nom de domaine .tg** | ~3 500 FCFA | **~42 000 FCFA** | Café Informatique Togo |
| **Hébergement Vercel** | 0 FCFA | **0 FCFA** | Vercel (gratuit) |
| **Base de données Supabase** | 0 FCFA | **0 FCFA** | Supabase (gratuit) |
| **Email professionnel (optionnel)** | ~2 000 FCFA | **~24 000 FCFA** | Google Workspace / Zoho |
| **SSL/HTTPS** | 0 FCFA | **0 FCFA** | Inclus (Vercel) |
| **TOTAL SANS EMAIL** | ~3 500 FCFA | **~42 000 FCFA/an** | |
| **TOTAL AVEC EMAIL** | ~5 500 FCFA | **~66 000 FCFA/an** | |

### 💡 Recommandation

**Meilleur rapport qualité/prix : Domaine .com**
- ✅ Moins cher (~14 000 FCFA/an)
- ✅ Plus professionnel internationalement
- ✅ Meilleur référencement Google
- ✅ Plus crédible pour les clients

**Exemple de nom : `ofarotech.com` ou `ofaro-tech.com`**

---

## 📝 ÉTAPE 1 : Acheter un nom de domaine

### Option A : Domaine .com (Recommandé)

#### Via Namecheap (Facile + Pas cher)
1. Aller sur https://www.namecheap.com
2. Rechercher votre nom : `ofarotech.com`
3. Ajouter au panier
4. **Prix** : ~$1.18/mois = ~$14.17/an ≈ **14 000 FCFA/an**
5. Payer avec :
   - Carte bancaire
   - PayPal
   - Carte Visa/Mastercard

#### Via GoDaddy
1. Aller sur https://www.godaddy.com
2. Rechercher : `ofarotech.com`
3. **Prix** : ~$0.99/mois la première année puis ~$17.99/an
4. Paiement : Carte bancaire, PayPal

### Option B : Domaine .tg (Spécifique Togo)

#### Via Café Informatique Togo
1. **Contact** :
   - Site : https://www.nic.tg
   - Email : contact@cafeinformatique.tg
   - WhatsApp : +228 XX XX XX XX
2. Demander : `ofarotech.tg`
3. **Prix** : ~35 000 - 50 000 FCFA/an
4. Paiement : Mobile Money (Flooz/TMoney), Virement bancaire

#### Documents requis pour .tg :
- Copie CNI du propriétaire
- Justificatif d'entreprise (RCCM si société)

---

## 🌐 ÉTAPE 2 : Déployer le site sur Vercel

### Pourquoi Vercel ?
- ✅ **100% GRATUIT** (pas de limite pour site vitrine)
- ✅ SSL automatique (HTTPS sécurisé)
- ✅ Déploiement automatique depuis GitHub
- ✅ Rapide (CDN mondial)
- ✅ Compatible Next.js

### Étapes de déploiement

#### 2.1 Créer un compte Vercel
1. Aller sur https://vercel.com
2. S'inscrire avec votre compte GitHub
3. Gratuit à 100%

#### 2.2 Importer votre projet
1. Dashboard Vercel → **"Add New..."** → **"Project"**
2. Sélectionner le repository : `OFARO-TECH` (GitHub)
3. Configuration :
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

#### 2.3 Configurer les variables d'environnement
Dans **Settings** → **Environment Variables**, ajouter :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tidencxeznpjvnfebwmw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZGVuY3hlem5wanZuZmVid213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4Mzk1MzUsImV4cCI6MjEwMzQxNTUzNX0.KkP1P-IjICzMrztf5XaMmjthoE9l5swxEutU7aClUBc
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZGVuY3hlem5wanZuZmVid213Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzgzOTUzNSwiZXhwIjoyMTAzNDE1NTM1fQ._LjsNT9PBQ_5om-aNPW_cbzfdLL2beD-YvQqGOlvBxU

# Site URL (à changer après avoir configuré le domaine)
NEXT_PUBLIC_SITE_URL=https://ofarotech.com

# Backend API (si vous utilisez le backend Node.js)
NEXT_PUBLIC_API_URL=https://votre-backend.onrender.com
```

#### 2.4 Déployer
1. Cliquer sur **"Deploy"**
2. Attendre 2-3 minutes
3. Votre site sera accessible sur : `votre-projet.vercel.app`

---

## 🔗 ÉTAPE 3 : Connecter le domaine à Vercel

### 3.1 Depuis Vercel
1. Dashboard projet → **Settings** → **Domains**
2. Cliquer **"Add Domain"**
3. Entrer : `ofarotech.com`
4. Vercel va vous donner des **enregistrements DNS** :
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### 3.2 Depuis votre fournisseur de domaine

#### Si Namecheap :
1. Dashboard Namecheap → **Domain List**
2. Cliquer sur votre domaine → **Manage**
3. **Advanced DNS** → **Add New Record**
4. Ajouter les enregistrements fournis par Vercel :
   - **A Record** : `@` → `76.76.21.21`
   - **CNAME** : `www` → `cname.vercel-dns.com`

#### Si Café Informatique (.tg) :
1. Contacter le support
2. Leur fournir les enregistrements DNS de Vercel
3. Ils configureront pour vous (24-48h)

### 3.3 Activer SSL (HTTPS)
1. Vercel génère automatiquement le certificat SSL
2. Attendre 5-10 minutes
3. Votre site sera accessible en HTTPS : `https://ofarotech.com`

---

## 📧 ÉTAPE 4 : Configurer l'email professionnel (Optionnel)

### Option 1 : Google Workspace (Recommandé)
- **Prix** : $6/mois ≈ 3 600 FCFA/mois
- **Inclus** : 
  - Email : contact@ofarotech.com
  - Gmail interface
  - Google Drive 30 GB
  - Google Meet
- **Lien** : https://workspace.google.com

### Option 2 : Zoho Mail (Moins cher)
- **Prix** : GRATUIT jusqu'à 5 utilisateurs
- **Inclus** : 
  - Email : contact@ofarotech.com
  - 5 GB stockage/utilisateur
- **Lien** : https://www.zoho.com/mail/

### Option 3 : Titan Email (Économique)
- **Prix** : $1/mois ≈ 600 FCFA/mois
- **Inclus** : Email professionnel basique
- **Lien** : Disponible via Namecheap

### Configuration DNS pour email
Ajouter ces enregistrements MX dans votre DNS :
```
Type: MX
Priority: 10
Value: [fourni par votre service email]
```

---

## 🔍 ÉTAPE 5 : Référencement Google (SEO)

### 5.1 Google Search Console
1. Aller sur https://search.google.com/search-console
2. Ajouter votre site : `ofarotech.com`
3. Vérifier la propriété (via balise HTML ou DNS)
4. Soumettre votre sitemap : `https://ofarotech.com/sitemap.xml`

### 5.2 Google Analytics (optionnel)
1. Créer un compte : https://analytics.google.com
2. Obtenir l'ID : `G-XXXXXXXXX`
3. Ajouter dans votre `.env` :
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXX
   ```

### 5.3 Google My Business
1. Créer une fiche : https://business.google.com
2. Remplir :
   - Nom : OFARO TECH
   - Adresse : Agbalepedo, Lomé, Togo
   - Téléphone : +228 XX XX XX XX
   - Site web : https://ofarotech.com
3. Vérifier (par courrier ou téléphone)
4. Votre entreprise apparaîtra sur Google Maps

---

## 📊 ÉTAPE 6 : Configurer le monitoring

### Vercel Analytics (Gratuit)
1. Dashboard projet → **Analytics**
2. Activer **Web Analytics**
3. Vous verrez :
   - Visiteurs en temps réel
   - Pages les plus visitées
   - Origine du trafic

### Uptime Monitoring (Gratuit)
1. Créer un compte sur https://uptimerobot.com
2. Ajouter votre site : `https://ofarotech.com`
3. Recevoir des alertes si le site est down

---

## ✅ CHECKLIST DE DÉPLOIEMENT

Avant de lancer en production :

### Base de données
- [ ] Script SQL exécuté dans Supabase (`database/create-page-views-table.sql`)
- [ ] Bucket "projects" créé dans Supabase Storage
- [ ] Bucket configuré en PUBLIC
- [ ] Données de test supprimées

### Configuration
- [ ] Variables d'environnement configurées sur Vercel
- [ ] `NEXT_PUBLIC_SITE_URL` mis à jour avec le vrai domaine
- [ ] Email de contact changé : `contact@ofaro-tech.com`

### Domaine
- [ ] Nom de domaine acheté
- [ ] DNS configurés (A + CNAME)
- [ ] SSL actif (HTTPS)
- [ ] Email professionnel configuré (optionnel)

### SEO
- [ ] Site ajouté à Google Search Console
- [ ] Sitemap soumis
- [ ] Google My Business créé
- [ ] Réseaux sociaux liés (Facebook, LinkedIn)

### Tests
- [ ] Formulaire de contact fonctionne
- [ ] Formulaire de devis fonctionne
- [ ] Upload d'images projets fonctionne
- [ ] Admin accessible : `https://ofarotech.com/admin`
- [ ] Toutes les pages chargent correctement
- [ ] Version mobile testée

---

## 💡 CONSEILS POUR RÉDUIRE LES COÛTS

### 1. Commencer petit
- **Année 1** : Domaine .com + hébergement gratuit = **14 000 FCFA/an**
- Pas besoin d'email professionnel au début (utiliser Gmail)

### 2. Profiter des offres
- Namecheap : Première année souvent à **$0.99** (600 FCFA)
- GoDaddy : Promotions régulières

### 3. Renouveler à temps
- Configurer le renouvellement automatique
- Éviter les frais de réactivation

### 4. Email gratuit
- Utiliser Zoho Mail (gratuit jusqu'à 5 utilisateurs)
- Économie : **24 000 FCFA/an**

---

## 📞 SUPPORT ET ASSISTANCE

### Services recommandés au Togo
1. **Café Informatique**
   - Domaines .tg
   - Hébergement
   - Tel : +228 XX XX XX XX

2. **Togocom Business**
   - Hébergement local
   - Email professionnel

### En ligne (International)
1. **Namecheap Support**
   - Chat 24/7
   - Email : support@namecheap.com

2. **Vercel Support**
   - Documentation : https://vercel.com/docs
   - Discord : https://vercel.com/discord

---

## 🎯 RÉSUMÉ BUDGET FINAL

### Configuration recommandée (An 1)

| Élément | Prix |
|---------|------|
| Domaine .com (Namecheap) | **8 000 FCFA** |
| Hébergement Vercel | **0 FCFA** |
| Base de données Supabase | **0 FCFA** |
| Email Zoho (gratuit) | **0 FCFA** |
| SSL/HTTPS | **0 FCFA** |
| **TOTAL AN 1** | **8 000 FCFA** |

### Budget mensuel
- **667 FCFA/mois** (moins qu'un café par semaine !)

### Budget renouvellem ent (An 2+)
- Domaine : **14 000 FCFA/an**
- Hébergement : **0 FCFA**
- **TOTAL** : **14 000 FCFA/an**

---

## 🚀 APRÈS LE DÉPLOIEMENT

### Marketing gratuit
1. **Réseaux sociaux**
   - Facebook Page entreprise
   - LinkedIn Company Page
   - Instagram Business

2. **Annuaires en ligne**
   - Google My Business
   - Bing Places
   - Annuaires togolais

3. **SEO local**
   - Optimiser pour "développement web Togo"
   - "Agence IT Lomé"
   - "Site web entreprise Togo"

---

## ✨ FÉLICITATIONS !

Une fois ces étapes complétées, votre site OFARO TECH sera :
- ✅ Accessible mondialement sur `ofarotech.com`
- ✅ Sécurisé avec HTTPS
- ✅ Rapide (CDN mondial)
- ✅ Référencé sur Google
- ✅ Professionnel avec email personnalisé

**Budget total : Moins de 15 000 FCFA/an !** 🎉

---

**Date de création** : Février 2025  
**Version** : 1.0  
**Contact** : contact@ofaro-tech.com
