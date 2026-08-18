# 📋 FICHIERS À CRÉER POUR COMPLÉTER LE BACKEND

---

## ✅ FICHIERS DÉJÀ CRÉÉS

```
✅ package.json
✅ tsconfig.json
✅ .env.example
✅ .gitignore
✅ src/server.ts
✅ src/config/database.ts
✅ src/middleware/error.middleware.ts
✅ src/middleware/rateLimit.middleware.ts
✅ src/middleware/validation.middleware.ts
✅ src/routes/services.routes.ts
✅ src/controllers/services.controller.ts
✅ BACKEND-NODE-EXPRESS-README.md
✅ create-all-files.ps1
```

---

## 📝 FICHIERS MANQUANTS (À CRÉER)

Vous pouvez soit :
1. **Les créer manuellement** en copiant les routes existantes
2. **Utiliser les routes Next.js existantes** comme référence
3. **Me demander de les créer**

### Routes manquantes

```typescript
// src/routes/quotes.routes.ts
// Copier depuis services.routes.ts et adapter

// src/routes/contact.routes.ts
// Copier depuis services.routes.ts et adapter

// src/routes/internships.routes.ts
// IMPORTANT: Utiliser multer pour upload de fichiers
// Voir exemple ci-dessous

// src/routes/applications.routes.ts
// IMPORTANT: Utiliser multer pour upload de fichiers

// src/routes/jobs.routes.ts
// Route GET simple pour liste des offres

// src/routes/auth.routes.ts
// Pour Phase 2 (authentification)
```

### Contrôleurs manquants

```typescript
// src/controllers/quotes.controller.ts
// Copier depuis services.controller.ts et adapter

// src/controllers/contact.controller.ts
// Copier depuis services.controller.ts et adapter

// src/controllers/internships.controller.ts
// IMPORTANT: Gérer les fichiers uploadés

// src/controllers/applications.controller.ts
// IMPORTANT: Gérer les fichiers uploadés

// src/controllers/jobs.controller.ts
// Simple SELECT sur job_offers

// src/controllers/auth.controller.ts
// Pour Phase 2
```

---

## 📤 EXEMPLE: Route avec Upload de Fichiers

### Installation de multer

```bash
npm install multer
npm install --save-dev @types/multer
```

### Configuration Multer

```typescript
// src/utils/fileUpload.ts
import multer from 'multer';
import path from 'path';
import { Request } from 'express';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.path.includes('internships') ? 'internships' : 'applications';
    cb(null, `uploads/${folder}`);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = /pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Seuls les fichiers PDF, DOC et DOCX sont acceptés'));
  }
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB
  },
  fileFilter: fileFilter
});
```

### Route avec upload

```typescript
// src/routes/internships.routes.ts
import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validation.middleware';
import { upload } from '../utils/fileUpload';
import { createInternshipRequest } from '../controllers/internships.controller';

const router = Router();

router.post(
  '/request',
  upload.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'cover_letter', maxCount: 1 }
  ]),
  [
    body('first_name').notEmpty().withMessage('Prénom requis'),
    body('last_name').notEmpty().withMessage('Nom requis'),
    body('email').isEmail().withMessage('Email invalide'),
    body('phone').notEmpty().withMessage('Téléphone requis'),
    body('institution').notEmpty().withMessage('Établissement requis'),
    body('field_of_study').notEmpty().withMessage('Domaine d\'étude requis'),
    body('internship_type').notEmpty().withMessage('Type de stage requis'),
    body('desired_duration').notEmpty().withMessage('Durée requise'),
    body('desired_period_start').isDate().withMessage('Date de début invalide'),
    body('desired_period_end').isDate().withMessage('Date de fin invalide'),
    body('internship_objectives').notEmpty().withMessage('Objectifs requis'),
    validate
  ],
  createInternshipRequest
);

export default router;
```

### Contrôleur avec fichiers

```typescript
// src/controllers/internships.controller.ts
import { Request, Response, NextFunction } from 'express';
import { query } from '../config/database';

export const createInternshipRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    if (!files || !files.cv || !files.cover_letter) {
      return res.status(400).json({
        success: false,
        error: 'Le CV et la lettre de motivation sont requis'
      });
    }

    const cv = files.cv[0];
    const coverLetter = files.cover_letter[0];

    const {
      first_name,
      last_name,
      email,
      phone,
      address,
      institution,
      field_of_study,
      education_level,
      internship_type,
      desired_duration,
      desired_period_start,
      desired_period_end,
      internship_objectives
    } = req.body;

    // Génération référence
    const countResult = await query('SELECT COUNT(*) as total FROM internship_requests');
    const count = parseInt(countResult.rows[0].total) + 1;
    const reference_number = `ST-${String(count).padStart(3, '0')}`;

    // Gestion contact (même logique que services)
    // ...

    // Insertion avec chemins des fichiers
    const result = await query(
      `INSERT INTO internship_requests 
      (first_name, last_name, email, phone, address, institution, 
       field_of_study, education_level, internship_type, desired_duration, 
       desired_period_start, desired_period_end, internship_objectives, 
       cv_file_name, cv_file_path, cover_letter_file_name, cover_letter_file_path, 
       reference_number, status) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, 'nouvelle') 
      RETURNING *`,
      [
        first_name, last_name, email, phone, address || null,
        institution, field_of_study, education_level || null,
        internship_type, desired_duration, desired_period_start,
        desired_period_end, internship_objectives,
        cv.filename, cv.path,
        coverLetter.filename, coverLetter.path,
        reference_number
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Votre demande de stage a été envoyée avec succès',
      reference: reference_number,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};
```

---

## 🎯 FICHIERS SIMPLES À CRÉER

### 1. quotes.routes.ts & quotes.controller.ts
**Copier depuis services** et remplacer :
- `service_requests` → `quote_requests`
- `SR-` → `DV-`
- Champs: `project_type`, `project_description`, `budget`, `deadline`

### 2. contact.routes.ts & contact.controller.ts
**Copier depuis services** et remplacer :
- `service_requests` → `contact_messages`
- `SR-` → `MSG-`
- Champs: `sender_name`, `sender_email`, `sender_phone`, `subject`, `message`
- Status: `non_lu`

### 3. jobs.routes.ts & jobs.controller.ts
**Simple GET**:
```typescript
// jobs.controller.ts
export const getActiveJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await query(
      `SELECT * FROM job_offers 
       WHERE status = 'publiee' 
       AND (application_deadline IS NULL OR application_deadline >= CURRENT_DATE)
       ORDER BY publication_date DESC`
    );

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};
```

---

## 🚀 DÉMARRAGE RAPIDE

### 1. Installer les dépendances

```bash
cd ofaro-tech-backend
npm install
```

### 2. Configurer .env

```bash
copy .env.example .env
# Éditer .env avec vos valeurs
```

### 3. Tester ce qui existe déjà

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:5000`

### 4. Tester la route services

```bash
curl -X POST http://localhost:5000/api/services/request \
  -H "Content-Type: application/json" \
  -d '{
    "client_name": "Test",
    "client_email": "test@test.com",
    "client_phone": "+33612345678",
    "service_type": "Test",
    "description": "Test de la route services"
  }'
```

### 5. Créer les routes manquantes

Copier/adapter depuis `services.routes.ts` et `services.controller.ts`

---

## 📝 RÉSUMÉ

```
✅ Structure de base créée
✅ 1 route fonctionnelle (services)
✅ Configuration complète
✅ Prêt pour Render.com

⏳ 5 routes à créer (quotes, contact, internships, applications, jobs)
⏳ Upload de fichiers à configurer (internships, applications)
⏳ Authentification à implémenter (Phase 2)
```

---

**Voulez-vous que je crée tous les fichiers manquants maintenant ?**
