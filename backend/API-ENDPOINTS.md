# 📡 API ENDPOINTS - OFARO TECH BACKEND

## 🔗 URL de Base

- **Local**: `http://localhost:5000`
- **Production**: `https://ofaro-tech-backend.onrender.com` (après déploiement)

---

## ✅ ENDPOINTS DISPONIBLES

### **1. Health Check**
```http
GET /health
```
**Description**: Vérifier que le serveur fonctionne

**Réponse**:
```json
{
  "status": "OK",
  "timestamp": "2026-08-18T14:41:10.116Z",
  "uptime": 18.221,
  "environment": "development"
}
```

---

### **2. Messages de Contact**

#### **Envoyer un message**
```http
POST /api/contact/send
```

**Body**:
```json
{
  "sender_name": "Jean Dupont",
  "sender_email": "jean.dupont@example.com",
  "sender_phone": "+228 90 12 34 56",
  "subject": "Demande d'information",
  "message": "Bonjour, je souhaite obtenir plus d'informations sur vos services."
}
```

**Réponse**:
```json
{
  "success": true,
  "message": "Votre message a été envoyé avec succès",
  "data": {
    "id": 1,
    "full_name": "Jean Dupont",
    "email": "jean.dupont@example.com",
    ...
  }
}
```

---

### **3. Demandes de Services**

#### **Créer une demande**
```http
POST /api/services/request
```

**Body**:
```json
{
  "client_name": "Marie Martin",
  "client_email": "marie.martin@example.com",
  "client_phone": "+228 91 23 45 67",
  "company_name": "ACME Corp",
  "service_type": "Développement Web",
  "description": "Nous avons besoin d'un site web vitrine pour notre entreprise avec 5 pages principales.",
  "urgency": "normale",
  "budget_range": "500000-1000000 FCFA"
}
```

**Réponse**:
```json
{
  "success": true,
  "message": "Votre demande a été envoyée avec succès",
  "reference": "SR-001",
  "data": { ... }
}
```

---

### **4. Demandes de Devis**

#### **Créer une demande de devis**
```http
POST /api/quotes
```

**Body**:
```json
{
  "company_name": "Tech Solutions SARL",
  "sector": "Services informatiques",
  "email": "contact@techsolutions.tg",
  "phone": "+228 92 34 56 78",
  "city": "Lomé",
  "services": ["Développement Web", "Hébergement"],
  "project_description": "Site e-commerce avec paiement mobile money",
  "has_logo": true,
  "has_domain": false,
  "budget": "2000000-5000000 FCFA",
  "contact_first_name": "Paul",
  "contact_last_name": "Agbodji",
  "desired_delivery_date": "2026-10-01"
}
```

**Réponse**:
```json
{
  "success": true,
  "message": "Votre demande de devis a été envoyée avec succès",
  "reference": "DV-001",
  "data": { ... }
}
```

#### **Obtenir les statistiques**
```http
GET /api/quotes/stats
```

**Réponse**:
```json
{
  "success": true,
  "data": {
    "total": 10,
    "nouveau": 3,
    "en_cours": 5,
    "traite": 2,
    "sans_suite": 0
  }
}
```

---

### **5. Demandes de Stage**

#### **Soumettre une demande de stage**
```http
POST /api/internships
```

**Body** (multipart/form-data):
```
first_name: "Sophie"
last_name: "Kouassi"
email: "sophie.kouassi@example.com"
phone: "+228 93 45 67 89"
institution: "Université de Lomé"
field_of_study: "Informatique"
education_level: "Licence 3"
internship_type: "Stage académique"
desired_duration: "3 mois"
desired_period_start: "2026-09-01"
desired_period_end: "2026-11-30"
internship_objectives: "Apprendre le développement web et mobile"
cv: [FILE]
cover_letter: [FILE]
```

**Réponse**:
```json
{
  "success": true,
  "message": "Votre demande de stage a été envoyée avec succès",
  "reference": "ST-001",
  "data": { ... }
}
```

---

### **6. Candidatures**

#### **Soumettre une candidature**
```http
POST /api/applications
```

**Body** (multipart/form-data):
```
application_type: "offre" ou "spontanee"
job_offer_id: 1 (optionnel, pour "offre")
first_name: "Pierre"
last_name: "Assogba"
email: "pierre.assogba@example.com"
phone: "+228 94 56 78 90"
position_sought: "Développeur Full Stack" (pour "spontanee")
education_level: "Master"
professional_experience: "5 ans d'expérience en développement web"
skills: "React, Node.js, PostgreSQL, Docker"
portfolio_url: "https://pierre-portfolio.com"
additional_message: "Motivé et passionné par les nouvelles technologies"
cv: [FILE]
cover_letter: [FILE]
```

**Réponse**:
```json
{
  "success": true,
  "message": "Votre candidature a été envoyée avec succès",
  "reference": "APP-001",
  "data": { ... }
}
```

---

### **7. Offres d'Emploi**

#### **Lister les offres publiées**
```http
GET /api/jobs
```

**Réponse**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "reference": "JOB-001",
      "title": "Développeur Full Stack",
      "contract_type": "CDI",
      "location": "Lomé",
      ...
    }
  ]
}
```

#### **Obtenir une offre spécifique**
```http
GET /api/jobs/:id
```

---

### **8. Authentification (Admin)**

#### **Connexion**
```http
POST /api/auth/login
```

**Body**:
```json
{
  "email": "admin@ofarotech.com",
  "password": "Admin@2025"
}
```

**Réponse**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@ofarotech.com",
    "role": "administrateur"
  }
}
```

---

## 🧪 EXEMPLES DE TESTS

### **PowerShell**

```powershell
# Test Health Check
Invoke-RestMethod -Uri "http://localhost:5000/health"

# Test Contact
$contactBody = @{
    sender_name = "Test User"
    sender_email = "test@example.com"
    sender_phone = "+228 90 12 34 56"
    subject = "Test"
    message = "Message de test"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/contact/send" -Method Post -Body $contactBody -ContentType "application/json"

# Test Devis Stats
Invoke-RestMethod -Uri "http://localhost:5000/api/quotes/stats"
```

### **cURL**

```bash
# Health Check
curl http://localhost:5000/health

# Contact
curl -X POST http://localhost:5000/api/contact/send \
  -H "Content-Type: application/json" \
  -d '{
    "sender_name": "Test User",
    "sender_email": "test@example.com",
    "sender_phone": "+228 90 12 34 56",
    "subject": "Test",
    "message": "Message de test"
  }'
```

---

## 🔐 AUTHENTIFICATION

Les endpoints `/api/auth/*` ne nécessitent pas d'authentification.

Les autres endpoints administratifs (lecture des demandes, gestion) nécessiteront un token JWT dans le header :
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 📝 NOTES IMPORTANTES

1. **Tous les endpoints POST retournent des références** (SR-001, DV-001, ST-001, APP-001)
2. **Les fichiers** (CV, lettres) doivent être envoyés en `multipart/form-data`
3. **Les emails sont validés** et normalisés automatiquement
4. **Les téléphones** doivent être au format international (+228...)
5. **Les statistiques** sont mises à jour automatiquement

---

## ✅ CHECKLIST DE TEST

```
⏳ Health check fonctionne
⏳ Créer un message de contact
⏳ Créer une demande de service
⏳ Créer une demande de devis
⏳ Obtenir les stats des devis
⏳ Soumettre une demande de stage (avec fichiers)
⏳ Soumettre une candidature (avec fichiers)
⏳ Lister les offres d'emploi
⏳ Login admin
```

---

**Votre API est prête ! 🚀**
