# DOCUMENTATION DES ROUTES API
## OFARO TECH - Backend API

---

## 📋 ROUTES PUBLIQUES (Frontend → Backend)

### 1. Demande de Service Spécifique

**Endpoint:** `POST /api/services/request`

**Description:** Permet à un client de soumettre une demande de service.

**Content-Type:** `application/json`

**Body:**
```json
{
  "client_name": "Jean Dupont",
  "client_email": "jean.dupont@example.com",
  "client_phone": "+33 6 12 34 56 78",
  "company_name": "Entreprise XYZ",
  "service_type": "Développement Web",
  "description": "Description détaillée du besoin",
  "urgency": "normale",
  "budget_range": "5000-10000 EUR"
}
```

**Champs obligatoires:**
- `client_name` ✅
- `client_email` ✅
- `client_phone` ✅
- `service_type` ✅
- `description` ✅

**Champs optionnels:**
- `company_name`
- `urgency` (normale | urgent | très urgent)
- `budget_range`

**Réponse succès (201):**
```json
{
  "success": true,
  "message": "Votre demande a été envoyée avec succès",
  "reference": "SR-001",
  "data": { ... }
}
```

**Réponse erreur (400):**
```json
{
  "error": "Tous les champs obligatoires doivent être remplis"
}
```

---

### 2. Demande de Devis

**Endpoint:** `POST /api/quotes/request`

**Description:** Permet à un client de demander un devis personnalisé.

**Content-Type:** `application/json`

**Body:**
```json
{
  "client_name": "Marie Martin",
  "client_email": "marie.martin@example.com",
  "client_phone": "+33 6 98 76 54 32",
  "company_name": "StartUp ABC",
  "project_type": "Application Mobile",
  "project_description": "Description complète du projet",
  "budget": "15000-20000 EUR",
  "deadline": "3 mois"
}
```

**Champs obligatoires:**
- `client_name` ✅
- `client_email` ✅
- `client_phone` ✅
- `project_type` ✅
- `project_description` ✅

**Champs optionnels:**
- `company_name`
- `budget`
- `deadline`

**Réponse succès (201):**
```json
{
  "success": true,
  "message": "Votre demande de devis a été envoyée avec succès",
  "reference": "DV-001",
  "data": { ... }
}
```

---

### 3. Message de Contact

**Endpoint:** `POST /api/contact/send`

**Description:** Permet à un visiteur d'envoyer un message de contact.

**Content-Type:** `application/json`

**Body:**
```json
{
  "sender_name": "Paul Dubois",
  "sender_email": "paul.dubois@example.com",
  "sender_phone": "+33 6 11 22 33 44",
  "subject": "Question sur vos services",
  "message": "Contenu du message"
}
```

**Champs obligatoires:**
- `sender_name` ✅
- `sender_email` ✅
- `subject` ✅
- `message` ✅

**Champs optionnels:**
- `sender_phone`

**Réponse succès (201):**
```json
{
  "success": true,
  "message": "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.",
  "reference": "MSG-001",
  "data": { ... }
}
```

---

### 4. Demande de Stage

**Endpoint:** `POST /api/internships/request`

**Description:** Permet à un étudiant de soumettre une demande de stage.

**Content-Type:** `multipart/form-data`

**Form Data:**
```
first_name: "Sophie"
last_name: "Bernard"
email: "sophie.bernard@example.com"
phone: "+33 6 55 44 33 22"
address: "123 Rue de Paris, 75001 Paris"
institution: "Université Paris 1"
field_of_study: "Informatique"
education_level: "Licence 3"
internship_type: "Stage académique"
desired_duration: "3 mois"
desired_period_start: "2026-09-01"
desired_period_end: "2026-11-30"
internship_objectives: "Objectifs du stage"
cv: [FILE]
cover_letter: [FILE]
```

**Champs obligatoires:**
- `first_name` ✅
- `last_name` ✅
- `email` ✅
- `phone` ✅
- `institution` ✅
- `field_of_study` ✅
- `internship_type` ✅
- `desired_duration` ✅
- `desired_period_start` ✅
- `desired_period_end` ✅
- `internship_objectives` ✅
- `cv` (fichier) ✅
- `cover_letter` (fichier) ✅

**Champs optionnels:**
- `address`
- `education_level`

**Fichiers acceptés:**
- PDF, DOC, DOCX
- Taille max: 10 MB par fichier

**Réponse succès (201):**
```json
{
  "success": true,
  "message": "Votre demande de stage a été envoyée avec succès",
  "reference": "ST-001",
  "data": { ... }
}
```

---

### 5. Candidature (Offre ou Spontanée)

**Endpoint:** `POST /api/applications/submit`

**Description:** Permet à un candidat de postuler à une offre ou d'envoyer une candidature spontanée.

**Content-Type:** `multipart/form-data`

**Form Data (Candidature à une offre):**
```
application_type: "offre"
job_offer_id: "1"
first_name: "Thomas"
last_name: "Petit"
email: "thomas.petit@example.com"
phone: "+33 6 88 77 66 55"
address: "456 Avenue des Champs, 69000 Lyon"
education_level: "Master 2"
professional_experience: "5 ans d'expérience en développement"
skills: "JavaScript, React, Node.js, PostgreSQL"
portfolio_url: "https://thomas-petit.dev"
additional_message: "Message complémentaire"
cv: [FILE]
cover_letter: [FILE]
```

**Form Data (Candidature spontanée):**
```
application_type: "spontanee"
position_sought: "Développeur Full Stack"
first_name: "Laura"
last_name: "Girard"
email: "laura.girard@example.com"
phone: "+33 6 99 88 77 66"
address: "789 Boulevard du Midi, 13000 Marseille"
education_level: "Master 2"
professional_experience: "3 ans d'expérience"
skills: "Python, Django, React, PostgreSQL"
portfolio_url: "https://laura-girard.com"
additional_message: "Motivations"
cv: [FILE]
cover_letter: [FILE]
```

**Champs obligatoires:**
- `application_type` ✅ (offre | spontanee)
- `first_name` ✅
- `last_name` ✅
- `email` ✅
- `phone` ✅
- `education_level` ✅
- `professional_experience` ✅
- `skills` ✅
- `cv` (fichier) ✅
- `cover_letter` (fichier) ✅

**Champs conditionnels:**
- `job_offer_id` ✅ (requis si application_type = "offre")
- `position_sought` ✅ (requis si application_type = "spontanee")

**Champs optionnels:**
- `address`
- `portfolio_url`
- `additional_message`

**Réponse succès (201):**
```json
{
  "success": true,
  "message": "Votre candidature a été envoyée avec succès",
  "reference": "APP-001",
  "data": { ... }
}
```

**Réponse erreur (404):**
```json
{
  "error": "Cette offre n'est plus disponible"
}
```

---

### 6. Liste des Offres d'Emploi Actives

**Endpoint:** `GET /api/jobs/active`

**Description:** Récupère toutes les offres d'emploi publiées et non expirées.

**Méthode:** GET

**Paramètres:** Aucun

**Réponse succès (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": 1,
      "reference": "OFF-001",
      "title": "Développeur Full Stack",
      "department": "Développement",
      "contract_type": "CDI",
      "location": "Paris",
      "work_mode": "Hybride",
      "description": "Description complète du poste",
      "missions": "Liste des missions",
      "responsibilities": "Responsabilités",
      "required_skills": "Compétences requises",
      "profile": "Profil recherché",
      "education_level": "Bac +5",
      "experience_level": "3-5 ans",
      "publication_date": "2026-08-01",
      "application_deadline": "2026-09-30",
      "published_at": "2026-08-01T10:00:00Z"
    },
    ...
  ]
}
```

---

## 🔐 ROUTES PRIVÉES (Administration)

### À IMPLÉMENTER (Phase 2)

#### Authentification
- `POST /api/auth/login` - Connexion administrateur
- `POST /api/auth/logout` - Déconnexion
- `GET /api/auth/me` - Informations utilisateur connecté
- `POST /api/auth/refresh` - Renouveler le token

#### Gestion des demandes de services
- `GET /api/admin/services` - Liste des demandes
- `GET /api/admin/services/:id` - Détails d'une demande
- `PUT /api/admin/services/:id/status` - Changer le statut
- `POST /api/admin/services/:id/notes` - Ajouter une note
- `DELETE /api/admin/services/:id` - Supprimer (soft delete)

#### Gestion des devis
- `GET /api/admin/quotes` - Liste des demandes de devis
- `GET /api/admin/quotes/:id` - Détails
- `PUT /api/admin/quotes/:id/status` - Changer le statut
- `POST /api/admin/quotes/:id/notes` - Ajouter une note

#### Gestion des messages
- `GET /api/admin/messages` - Liste des messages
- `GET /api/admin/messages/:id` - Détails
- `PUT /api/admin/messages/:id/status` - Changer le statut
- `POST /api/admin/messages/:id/notes` - Ajouter une note

#### Gestion des stages
- `GET /api/admin/internships` - Liste des demandes
- `GET /api/admin/internships/:id` - Détails
- `PUT /api/admin/internships/:id/status` - Changer le statut
- `POST /api/admin/internships/:id/notes` - Ajouter une note

#### Gestion des offres d'emploi
- `GET /api/admin/jobs` - Liste des offres
- `POST /api/admin/jobs` - Créer une offre
- `GET /api/admin/jobs/:id` - Détails
- `PUT /api/admin/jobs/:id` - Modifier une offre
- `PUT /api/admin/jobs/:id/status` - Changer le statut
- `DELETE /api/admin/jobs/:id` - Supprimer

#### Gestion des candidatures
- `GET /api/admin/applications` - Liste des candidatures
- `GET /api/admin/applications/:id` - Détails
- `PUT /api/admin/applications/:id/status` - Changer le statut
- `POST /api/admin/applications/:id/notes` - Ajouter une note

#### Gestion des contacts/clients
- `GET /api/admin/contacts` - Liste des contacts
- `GET /api/admin/contacts/:id` - Détails et historique complet
- `PUT /api/admin/contacts/:id` - Mettre à jour
- `GET /api/admin/contacts/:id/history` - Historique des interactions

#### Statistiques
- `GET /api/admin/stats/dashboard` - Statistiques du tableau de bord
- `GET /api/admin/stats/requests` - Statistiques des demandes
- `GET /api/admin/stats/recruitment` - Statistiques recrutement

#### Fichiers
- `GET /api/admin/files/:type/:reference/:filename` - Télécharger un fichier
- `DELETE /api/admin/files/:id` - Supprimer un fichier

#### Utilisateurs
- `GET /api/admin/users` - Liste des utilisateurs admin
- `POST /api/admin/users` - Créer un utilisateur
- `PUT /api/admin/users/:id` - Modifier un utilisateur
- `DELETE /api/admin/users/:id` - Supprimer

#### Journal d'activité
- `GET /api/admin/activity-log` - Journal des actions

---

## 🔍 CODES DE RÉPONSE HTTP

| Code | Signification | Usage |
|------|---------------|-------|
| 200 | OK | Succès (GET, PUT) |
| 201 | Created | Ressource créée avec succès |
| 400 | Bad Request | Données invalides ou manquantes |
| 401 | Unauthorized | Non authentifié |
| 403 | Forbidden | Non autorisé (permissions insuffisantes) |
| 404 | Not Found | Ressource introuvable |
| 500 | Internal Server Error | Erreur serveur |

---

## 📊 FORMAT DES DONNÉES

### Date/Heure
- Format: ISO 8601
- Exemple: `2026-08-17T10:30:00Z`

### Numéros de référence
- Services: `SR-001`, `SR-002`, ...
- Devis: `DV-001`, `DV-002`, ...
- Messages: `MSG-001`, `MSG-002`, ...
- Stages: `ST-001`, `ST-002`, ...
- Candidatures: `APP-001`, `APP-002`, ...

### Statuts

#### Demandes de services
```typescript
type ServiceStatus = 
  | 'nouvelle' 
  | 'en_analyse' 
  | 'en_cours' 
  | 'terminee' 
  | 'en_attente' 
  | 'rejetee' 
  | 'archivee';
```

#### Demandes de devis
```typescript
type QuoteStatus = 
  | 'nouveau' 
  | 'en_analyse' 
  | 'accepte' 
  | 'refuse' 
  | 'en_attente_infos' 
  | 'annule' 
  | 'archive';
```

#### Messages de contact
```typescript
type MessageStatus = 
  | 'non_lu' 
  | 'lu' 
  | 'en_cours' 
  | 'repondu' 
  | 'archive';
```

#### Demandes de stage
```typescript
type InternshipStatus = 
  | 'nouvelle' 
  | 'en_analyse' 
  | 'dossier_incomplet' 
  | 'entretien' 
  | 'acceptee' 
  | 'refusee' 
  | 'stage_en_cours' 
  | 'stage_termine' 
  | 'annulee' 
  | 'archivee';
```

#### Candidatures
```typescript
type ApplicationStatus = 
  | 'nouvelle' 
  | 'en_analyse' 
  | 'preselectionee' 
  | 'entretien' 
  | 'acceptee' 
  | 'refusee' 
  | 'dossier_incomplet' 
  | 'en_attente' 
  | 'retiree' 
  | 'archivee';
```

#### Offres d'emploi
```typescript
type JobStatus = 
  | 'brouillon' 
  | 'publiee' 
  | 'suspendue' 
  | 'expiree' 
  | 'archivee';
```

---

## 🛡️ SÉCURITÉ

### Validation des emails
Regex utilisée: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

### Validation des fichiers
- Types acceptés: PDF, DOC, DOCX
- Taille maximale: 10 MB par fichier
- Vérification du type MIME côté serveur

### Protection des données sensibles
- Les chemins de fichiers complets ne sont jamais exposés dans les réponses API
- Les mots de passe sont hachés avec bcrypt
- Les tokens JWT expirent après 24h

### Rate Limiting
- À implémenter: 100 requêtes par minute par IP pour les routes publiques
- À implémenter: 1000 requêtes par minute pour les routes admin authentifiées

---

## 📝 NOTES D'IMPLÉMENTATION

### Gestion des fichiers
- Les fichiers sont stockés dans `/uploads/<type>/<reference>/`
- Exemple: `/uploads/internships/ST-001/1723456789_cv.pdf`
- Les dossiers sont créés automatiquement si nécessaires

### Gestion des contacts centralisée
- Un contact unique est créé par email
- Les compteurs sont incrémentés à chaque nouvelle interaction
- L'historique complet est accessible via la table `request_history`

### Notifications
- Actuellement: TODO
- Phase 2: Email automatique à l'administration
- Phase 3: Notifications en temps réel dans l'interface admin

### Historique
- Chaque action importante est enregistrée dans `request_history`
- Actions trackées: created, status_changed, note_added, assigned, etc.

---

**Dernière mise à jour:** 17 août 2026  
**Version:** 1.0  
**OFARO TECH**
