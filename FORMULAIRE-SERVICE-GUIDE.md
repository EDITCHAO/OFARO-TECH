# 🔧 Connexion Formulaire de Service à la Base de Données

## ✅ Ce qui a été fait

### 1. API Backend créée

#### Route de soumission : `/api/service-requests/submit`
- **Fichier** : `app/api/service-requests/submit/route.ts`
- **Méthode** : POST
- **Fonction** : Enregistre les demandes de service dans la base de données

**Champs acceptés** :
- `client_name` : Nom complet du client (requis)
- `client_email` : Email du client (requis)
- `client_phone` : Téléphone du client (requis)
- `service_type` : Type de service demandé (requis)
- `description` : Description du besoin (requis)

**Fonctionnalités** :
- ✅ Validation des données (email, champs requis)
- ✅ Génération automatique de numéro de référence (SR-001, SR-002, etc.)
- ✅ Création/mise à jour du contact dans la table `contacts`
- ✅ Enregistrement dans l'historique (`request_history`)
- ✅ Réponse avec référence de demande

#### Route de récupération : `/api/service-requests`
- **Fichier** : `app/api/service-requests/route.ts`
- **Méthode** : GET
- **Fonction** : Récupère toutes les demandes avec filtres et pagination

**Paramètres de requête** :
- `status` : Filtrer par statut (nouvelle, en_analyse, en_cours, terminee, etc.)
- `limit` : Nombre de résultats (par défaut 50)
- `offset` : Pagination (par défaut 0)

---

### 2. Formulaire Frontend connecté

**Fichier modifié** : `components/home/ServicesSection.tsx`

**Changements** :
- ✅ Ajout du state management (useState)
- ✅ Fonction `handleSubmit` pour soumettre le formulaire
- ✅ Gestion du loading pendant la soumission
- ✅ Messages de succès/erreur
- ✅ Réinitialisation du formulaire après succès
- ✅ Désactivation des champs pendant la soumission

**Composant séparé** : `ServiceRequestForm`
- Gestion complète de l'état du formulaire
- Validation côté client
- Feedback visuel pour l'utilisateur

---

### 3. Page Admin créée

**Fichier** : `app/admin/service-requests/page.tsx`

**Fonctionnalités** :
- ✅ Affichage de toutes les demandes de service
- ✅ Tableau avec colonnes : Date, Nom, Contact, Service, Statut, Actions
- ✅ Recherche en temps réel (nom, email, téléphone, service, référence)
- ✅ Filtrage par statut
- ✅ Export CSV
- ✅ Badges de statut colorés avec icônes
- ✅ Formatage des dates en français
- ✅ Compteur total de demandes
- ✅ Interface responsive et moderne

**Statuts disponibles** :
- 🔵 **Nouvelle** - Demande fraîchement soumise
- 🟡 **En analyse** - En cours d'examen
- 🟣 **En cours** - Traitement en cours
- 🟢 **Terminée** - Demande traitée
- 🟠 **En attente** - En attente d'information
- 🔴 **Rejetée** - Demande rejetée
- ⚫ **Archivée** - Demande archivée

---

### 4. Configuration Base de Données

**Fichier** : `.env.local`

```env
DB_HOST=aws-0-eu-west-1.pooler.supabase.com
DB_PORT=6543
DB_NAME=postgres
DB_USER=postgres.rfatempjwgpznkacmhvo
DB_PASSWORD=zNAlL6eAwO7pUX5q
```

**Connexion** : `lib/db.ts`
- Pool de connexions PostgreSQL
- Gestion des erreurs
- Logging des requêtes

---

## 🚀 Comment tester

### 1. Installer les dépendances

```bash
cd "c:\PROJET\OFARO TECH\ofaro-tech-website"
npm install pg
npm install @types/pg --save-dev
```

### 2. Vérifier que le serveur tourne

```bash
npm run dev
```

Le site devrait être accessible sur http://localhost:3000

### 3. Tester le formulaire

1. Allez sur la page d'accueil : http://localhost:3000
2. Scrollez jusqu'à la section "Besoin d'un service spécifique ?"
3. Remplissez le formulaire :
   - Nom complet : Test User
   - Email : test@example.com
   - Téléphone : +228 XX XX XX XX
   - Service : Développement Web
   - Description : Test de connexion à la base de données
4. Cliquez sur "Envoyer la demande"
5. Vous devriez voir un message de succès avec une référence (ex: SR-001)

### 4. Voir les demandes dans l'admin

1. Allez sur : http://localhost:3000/admin/service-requests
2. Vous devriez voir votre demande de test dans le tableau
3. Testez les fonctionnalités :
   - Recherche
   - Filtrage par statut
   - Export CSV

---

## 📊 Structure de la Base de Données

### Table `service_requests`

| Colonne | Type | Description |
|---------|------|-------------|
| id | SERIAL | ID unique |
| client_name | VARCHAR(255) | Nom du client |
| client_email | VARCHAR(255) | Email du client |
| client_phone | VARCHAR(50) | Téléphone du client |
| company_name | VARCHAR(255) | Nom de l'entreprise (optionnel) |
| service_type | VARCHAR(255) | Type de service demandé |
| description | TEXT | Description de la demande |
| urgency | VARCHAR(50) | Niveau d'urgence |
| budget_range | VARCHAR(100) | Budget estimé |
| status | VARCHAR(50) | Statut de la demande |
| assigned_to | INTEGER | Utilisateur assigné |
| internal_notes | TEXT | Notes internes |
| reference_number | VARCHAR(50) | Référence unique (SR-XXX) |
| submitted_at | TIMESTAMP | Date de soumission |
| updated_at | TIMESTAMP | Dernière mise à jour |
| completed_at | TIMESTAMP | Date de completion |

### Table `contacts`

Centralise tous les contacts (prospects, clients, candidats)
- Mise à jour automatique lors de chaque demande
- Compteurs : total_requests, total_quotes, total_messages, etc.

### Table `request_history`

Historique de toutes les actions sur les demandes
- Création, changement de statut, assignation, etc.

---

## 🔧 Prochaines étapes possibles

### Fonctionnalités à ajouter :

1. **Détails de la demande**
   - Modal ou page dédiée pour voir tous les détails
   - Afficher la description complète
   - Historique des changements

2. **Modification du statut**
   - Dropdown pour changer le statut directement depuis le tableau
   - Ajout de notes internes
   - Assignation à un utilisateur

3. **Notifications**
   - Email au client après soumission
   - Email à l'admin lors d'une nouvelle demande
   - Notifications dans l'interface admin

4. **Dashboard**
   - Statistiques : nombre de demandes par statut
   - Graphiques : évolution des demandes
   - Services les plus demandés

5. **Authentification Admin**
   - Login/logout
   - Protection des routes admin
   - Gestion des utilisateurs et permissions

---

## 🐛 Dépannage

### Erreur : "Cannot connect to database"

**Solution** :
1. Vérifiez que le fichier `.env.local` existe
2. Vérifiez les credentials de la base de données
3. Testez la connexion avec un client PostgreSQL

### Erreur : "Module 'pg' not found"

**Solution** :
```bash
npm install pg
npm install @types/pg --save-dev
```

### Le formulaire ne soumet pas

**Solution** :
1. Ouvrez la console du navigateur (F12)
2. Regardez les erreurs dans l'onglet Console
3. Vérifiez l'onglet Network pour voir la requête API

### Les demandes n'apparaissent pas dans l'admin

**Solution** :
1. Vérifiez la console du navigateur pour les erreurs
2. Testez l'API directement : http://localhost:3000/api/service-requests
3. Vérifiez que les données sont bien dans la base de données

---

## 📝 Notes importantes

### Sécurité

⚠️ **Important** : Avant de déployer en production :

1. **Authentification** : Ajouter un système de login pour l'admin
2. **Authorization** : Protéger les routes API avec des middlewares
3. **Validation** : Ajouter une validation serveur plus robuste
4. **Rate limiting** : Limiter le nombre de soumissions par IP
5. **CORS** : Configurer les origines autorisées
6. **Variables d'environnement** : Ne jamais commit les fichiers .env

### Performance

- Les requêtes sont optimisées avec des index
- La pagination limite le nombre de résultats
- Le lazy loading évite de charger toutes les données d'un coup

### Maintenance

- Logs dans la console pour debugging
- Historique complet dans `request_history`
- Possibilité d'archiver les anciennes demandes

---

## 📞 Support

En cas de problème, vérifiez :
1. Les logs du serveur Next.js
2. La console du navigateur
3. Les logs de la base de données

---

**Date de création** : Décembre 2024  
**Version** : 1.0  
**Développé par** : OFARO TECH
