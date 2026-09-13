# ⚡ Déploiement Rapide - 30 Minutes

## 🎯 Objectif
Déployer OFARO TECH sur Internet en **moins de 30 minutes** pour **moins de 15 000 FCFA/an**.

---

## ✅ ÉTAPE 1 : Acheter le domaine (10 min)

### Recommandation : ofarotech.com

1. **Aller sur** : https://www.namecheap.com
2. **Rechercher** : `ofarotech` ou `ofaro-tech`
3. **Ajouter au panier** : `.com` (environ $14/an)
4. **Créer un compte** avec email
5. **Payer** : Carte bancaire / PayPal
6. **Coût** : ~8 000 FCFA première année, ~14 000 FCFA/an après

✅ **Domaine acheté !**

---

## ✅ ÉTAPE 2 : Déployer sur Vercel (10 min)

### 2.1 Créer compte Vercel
1. **Aller sur** : https://vercel.com
2. **S'inscrire** avec GitHub (gratuit)
3. **Autoriser** l'accès aux repositories

### 2.2 Importer le projet
1. **Cliquer** : "Add New..." → "Project"
2. **Sélectionner** : `OFARO-TECH` (votre repo GitHub)
3. **Framework** : Next.js (détecté automatiquement)
4. **Ne rien changer** dans la configuration

### 2.3 Ajouter variables d'environnement
**Settings** → **Environment Variables** → Ajouter :

```env
NEXT_PUBLIC_SUPABASE_URL=https://tidencxeznpjvnfebwmw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZGVuY3hlem5wanZuZmVid213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4Mzk1MzUsImV4cCI6MjEwMzQxNTUzNX0.KkP1P-IjICzMrztf5XaMmjthoE9l5swxEutU7aClUBc
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZGVuY3hlem5wanZuZmVid213Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzgzOTUzNSwiZXhwIjoyMTAzNDE1NTM1fQ._LjsNT9PBQ_5om-aNPW_cbzfdLL2beD-YvQqGOlvBxU
NEXT_PUBLIC_SITE_URL=https://ofarotech.com
```

### 2.4 Déployer
1. **Cliquer** : "Deploy"
2. **Attendre** : 2-3 minutes
3. **Site accessible** : `votre-projet.vercel.app`

✅ **Site en ligne !**

---

## ✅ ÉTAPE 3 : Connecter le domaine (10 min)

### 3.1 Depuis Vercel
1. **Settings** → **Domains**
2. **Add Domain** : `ofarotech.com`
3. **Noter** les enregistrements DNS fournis :
   ```
   A Record: @ → 76.76.21.21
   CNAME: www → cname.vercel-dns.com
   ```

### 3.2 Depuis Namecheap
1. **Dashboard** → **Domain List**
2. **Cliquer** sur votre domaine → **Manage**
3. **Advanced DNS** → **Add New Record**
4. **Ajouter** :
   - Type: **A Record**
     - Host: `@`
     - Value: `76.76.21.21`
     - TTL: Automatic
   
   - Type: **CNAME**
     - Host: `www`
     - Value: `cname.vercel-dns.com`
     - TTL: Automatic

5. **Sauvegarder**

### 3.3 Attendre propagation
- **Temps** : 5-30 minutes
- **Vérifier** : Aller sur `https://ofarotech.com`
- **SSL** : Activé automatiquement par Vercel

✅ **Domaine connecté !**

---

## ✅ ÉTAPE 4 : Configuration finale (10 min)

### 4.1 Supabase - Créer bucket images
1. **Dashboard Supabase** → **Storage**
2. **New bucket** : `projects`
3. **Cocher** : Public bucket ✅
4. **Create**

### 4.2 Supabase - Créer table visiteurs
1. **SQL Editor**
2. **Coller** le contenu de `database/create-page-views-table.sql`
3. **Run**

### 4.3 Tester le site
- **Page accueil** : https://ofarotech.com
- **Page admin** : https://ofarotech.com/admin
- **Formulaire contact** : Envoyer un test
- **Upload image** : Tester dans Projets réalisés

✅ **Site opérationnel !**

---

## 📊 COÛTS RÉELS

| Service | Prix |
|---------|------|
| Domaine .com (an 1) | 8 000 FCFA |
| Vercel (hébergement) | 0 FCFA |
| Supabase (BDD) | 0 FCFA |
| SSL/HTTPS | 0 FCFA |
| **TOTAL** | **8 000 FCFA** |

**Prix mensuel** : 667 FCFA/mois (moins d'un café !)

---

## 🎯 CE QUI EST INCLUS

✅ Site web complet et fonctionnel  
✅ Nom de domaine professionnel  
✅ HTTPS sécurisé  
✅ Hébergement illimité  
✅ Base de données  
✅ Stockage d'images  
✅ Formulaires de contact  
✅ Panel d'administration  
✅ Compteur de visiteurs  
✅ Référencement Google  

---

## 🚀 APRÈS LE DÉPLOIEMENT

### Google Search Console (5 min)
1. https://search.google.com/search-console
2. **Ajouter** : `ofarotech.com`
3. **Vérifier** via balise HTML
4. **Soumettre sitemap** : `https://ofarotech.com/sitemap.xml`

### Google My Business (10 min)
1. https://business.google.com
2. **Créer fiche entreprise** :
   - Nom : OFARO TECH
   - Adresse : Agbalepedo, Lomé, Togo
   - Téléphone : +228 XX XX XX XX
   - Site : https://ofarotech.com
3. **Vérifier** (par courrier)

---

## ✨ FÉLICITATIONS !

Votre site OFARO TECH est maintenant :
- 🌍 Accessible partout dans le monde
- 🔒 Sécurisé avec HTTPS
- ⚡ Ultra rapide (CDN mondial)
- 💰 Coût : Moins de 700 FCFA/mois
- 📱 Compatible mobile
- 🎨 Professionnel

**Votre site est en ligne : https://ofarotech.com** 🎉

---

## 🆘 BESOIN D'AIDE ?

### Support Namecheap
- Chat 24/7 : https://www.namecheap.com/support/live-chat/
- Ticket : support@namecheap.com

### Support Vercel
- Docs : https://vercel.com/docs
- Discord : https://vercel.com/discord

### Support Supabase
- Docs : https://supabase.com/docs
- Discord : https://discord.supabase.com

---

**Temps total** : ⏱️ 30-40 minutes  
**Coût total** : 💰 8 000 FCFA (an 1)  
**Résultat** : 🚀 Site professionnel en ligne !
