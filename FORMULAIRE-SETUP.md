# 🚀 Setup Formulaire de Service - Guide Complet

## 📋 Résumé

Le formulaire "Besoin d'un service spécifique ?" est maintenant connecté à la base de données PostgreSQL (Supabase) et une page admin permet de voir toutes les demandes.

---

## ✅ Étape 1 : Installation des dépendances

Ouvrez PowerShell dans le dossier du projet et exécutez :

```powershell
cd "c:\PROJET\OFARO TECH\ofaro-tech-website"

# Installer le driver PostgreSQL
npm install pg

# Installer les types TypeScript
npm install --save-dev @types/pg

# Installer dotenv pour les variables d'environnement
npm install dotenv
```

---

## ✅ Étape 2 : Vérifier la connexion à la base de données

### Test de connexion

```powershell
node scripts/test-db-connection.js
```

**Résultat attendu** :
```
========================================
  TEST DE CONNEXION À LA BASE DE DONNÉES
========================================

Configuration :
  Host: aws-0-eu-west-1.pooler.supabase.com
  Port: 6543
  Database: postgres
  User: postgres.rfatempjwgpznkacmhvo

Tentative de connexion...
✓ Connexion réussie !

Test de requête...
✓ Requête réussie !

✓ Table service_requests : EXISTE
  Nombre de demandes : 0

Vérification des tables :
  ✓ contacts
  ✓ request_history
  ✓ users

========================================
  TEST TERMINÉ AVEC SUCCÈS !
========================================
```

### Si les tables n'existent pas

Vous devez exécuter le schéma SQL dans votre base de données Supabase :

1. Allez sur https://supabase.com
2. Ouvrez votre projet
3. Allez dans **SQL Editor**
4. Copiez le contenu de `database/schema.sql`
5. Exécutez le script
6. Retestez la connexion

---

## ✅ Étape 3 : Démarrer le serveur

```powershell
npm run dev
```

Le serveur sera accessible sur :
- Local : http://localhost:3000
- Network : http://192.168.1.71:3000

---

## ✅ Étape 4 : Tester le formulaire

### 1. Accéder au formulaire

Allez sur http://localhost:3000 et scrollez jusqu'à la section orange "Besoin d'un service spécifique ?"

### 2. Remplir le formulaire

Exemple de test :
- **Nom complet** : Jean Dupont
- **Email** : jean.dupont@example.com
- **Téléphone** : +228 90 12 34 56
- **Service** : Développement Web
- **Description** : Je souhaite créer un site e-commerce pour ma boutique

### 3. Soumettre

Cliquez sur "Envoyer la demande"

### 4. Vérifier le résultat

Vous devriez voir un message vert de succès :
```
Votre demande a été envoyée avec succès. 
Nous vous contacterons dans les plus brefs délais.
Référence : SR-001
```

---

## ✅ Étape 5 : Voir les demandes dans l'admin

### Accéder à la page admin

Allez sur http://localhost:3000/admin/service-requests

### Fonctionnalités disponibles

1. **Vue tableau** : Toutes les demandes avec détails
2. **Recherche** : Par nom, email, téléphone, service ou référence
3. **Filtrage** : Par statut (nouvelle, en_analyse, en_cours, etc.)
4. **Export CSV** : Bouton en haut à droite
5. **Actions** : Voir, Modifier, Supprimer (icônes à droite)

### Colonnes affichées

| Colonne | Description |
|---------|-------------|
| Date | Référence + Date de soumission |
| Nom | Nom du client |
| Contact | Email + Téléphone |
| Service | Type de service demandé |
| Statut | Badge coloré avec le statut |
| Actions | Boutons d'action |

---

## 🔍 Structure des fichiers créés/modifiés

```
ofaro-tech-website/
├── app/
│   ├── api/
│   │   └── service-requests/
│   │       ├── route.ts                    [CRÉÉ] API GET - Liste des demandes
│   │       └── submit/
│   │           └── route.ts                [CRÉÉ] API POST - Soumettre une demande
│   └── admin/
│       └── service-requests/
│           └── page.tsx                    [CRÉÉ] Page admin
│
├── components/
│   └── home/
│       └── ServicesSection.tsx             [MODIFIÉ] Formulaire connecté
│
├── lib/
│   └── db.ts                               [EXISTANT] Connexion PostgreSQL
│
├── scripts/
│   └── test-db-connection.js               [CRÉÉ] Script de test
│
├── .env.local                              [CRÉÉ] Variables d'environnement
├── FORMULAIRE-SERVICE-GUIDE.md             [CRÉÉ] Documentation complète
└── FORMULAIRE-SETUP.md                     [CE FICHIER] Guide de setup
```

---

## 📊 Flux de données

### 1. Soumission du formulaire

```
Utilisateur
  ↓ Remplit le formulaire
Frontend (ServicesSection.tsx)
  ↓ POST /api/service-requests/submit
API Route (submit/route.ts)
  ↓ Validation + Génération référence
Base de données (Supabase)
  ├─→ Table service_requests (Nouvelle demande)
  ├─→ Table contacts (Création/MAJ contact)
  └─→ Table request_history (Historique)
  ↓
API Response
  ↓ { success: true, reference: "SR-001" }
Frontend
  ↓ Affiche message de succès
Utilisateur
```

### 2. Affichage dans l'admin

```
Admin
  ↓ Visite /admin/service-requests
Frontend (page.tsx)
  ↓ GET /api/service-requests?status=tous
API Route (route.ts)
  ↓ Query avec filtres
Base de données
  ↓ SELECT avec JOIN users
API Response
  ↓ { success: true, data: [...], pagination: {...} }
Frontend
  ↓ Affiche le tableau
Admin
```

---

## 🎨 Statuts des demandes

| Statut | Description | Couleur | Icône |
|--------|-------------|---------|-------|
| `nouvelle` | Demande fraîchement soumise | Bleu | 🕐 |
| `en_analyse` | En cours d'examen par l'équipe | Jaune | ⏳ |
| `en_cours` | Traitement actif de la demande | Violet | ⏳ |
| `terminee` | Demande traitée avec succès | Vert | ✅ |
| `en_attente` | En attente d'information client | Orange | 🕐 |
| `rejetee` | Demande rejetée | Rouge | 🗑️ |
| `archivee` | Demande archivée | Gris | 🗑️ |

---

## 🔐 Sécurité

### Actuellement implémenté

✅ Validation des données côté serveur
✅ Validation email avec regex
✅ Génération de références uniques
✅ Paramètres SQL préparés (protection SQL injection)
✅ Variables d'environnement pour credentials

### À ajouter avant production

⚠️ **Authentification admin** - Protéger `/admin/*`
⚠️ **Rate limiting** - Limiter les soumissions par IP
⚠️ **CAPTCHA** - Protection anti-spam
⚠️ **Authorization** - Vérifier les permissions utilisateur
⚠️ **CORS** - Configurer les origines autorisées
⚠️ **Logs** - Enregistrer toutes les actions sensibles

---

## 🐛 Dépannage

### Problème : Les packages ne s'installent pas

```powershell
# Nettoyer le cache npm
npm cache clean --force

# Supprimer node_modules et réinstaller
Remove-Item -Recurse -Force node_modules
npm install
```

### Problème : Erreur "Cannot connect to database"

**Vérifications** :
1. Le fichier `.env.local` existe ?
2. Les credentials sont corrects ?
3. Vous avez internet ?

**Test manuel** :
```powershell
node scripts/test-db-connection.js
```

### Problème : "Table service_requests does not exist"

**Solution** : Exécuter le schéma SQL dans Supabase
1. Supabase Dashboard → SQL Editor
2. Copier le contenu de `database/schema.sql`
3. Exécuter
4. Relancer le serveur

### Problème : Le formulaire ne soumet pas

**Vérifications** :
1. Ouvrir la console du navigateur (F12)
2. Regarder l'onglet Console pour les erreurs
3. Regarder l'onglet Network pour voir la requête API
4. Vérifier que l'API route existe

**Test de l'API** :
```powershell
# Avec curl (si disponible)
curl -X POST http://localhost:3000/api/service-requests/submit `
  -H "Content-Type: application/json" `
  -d '{\"client_name\":\"Test\",\"client_email\":\"test@test.com\",\"client_phone\":\"+228\",\"service_type\":\"Test\",\"description\":\"Test\"}'
```

### Problème : La page admin est vide

**Vérifications** :
1. Y a-t-il des demandes dans la base ?
2. L'API GET fonctionne ?

**Test de l'API** :
```
http://localhost:3000/api/service-requests
```

Devrait retourner :
```json
{
  "success": true,
  "data": [...],
  "pagination": {...}
}
```

---

## 📞 Commandes utiles

```powershell
# Tester la connexion DB
node scripts/test-db-connection.js

# Démarrer le serveur
npm run dev

# Build de production
npm run build

# Lancer en production
npm start

# Installer les dépendances
npm install

# Nettoyer et rebuild
Remove-Item -Recurse -Force .next
npm run dev
```

---

## 🎯 Prochaines étapes

1. ✅ Formulaire connecté - **FAIT**
2. ✅ Page admin - **FAIT**
3. ⏳ Modal de détails - **À FAIRE**
4. ⏳ Modification du statut - **À FAIRE**
5. ⏳ Assignation utilisateur - **À FAIRE**
6. ⏳ Notifications email - **À FAIRE**
7. ⏳ Dashboard statistiques - **À FAIRE**
8. ⏳ Authentification admin - **À FAIRE**

---

## ✅ Checklist finale

Avant de déclarer le formulaire opérationnel :

- [ ] Les packages `pg` et `@types/pg` sont installés
- [ ] Le fichier `.env.local` existe avec les bons credentials
- [ ] Le test de connexion DB réussit
- [ ] Le serveur démarre sans erreur
- [ ] Le formulaire soumet correctement
- [ ] La demande apparaît dans la base de données
- [ ] La page admin affiche les demandes
- [ ] La recherche fonctionne
- [ ] Le filtrage par statut fonctionne
- [ ] L'export CSV fonctionne

---

**Tout est prêt ! Le formulaire est maintenant connecté à la base de données et l'admin peut voir toutes les demandes ! 🎉**
