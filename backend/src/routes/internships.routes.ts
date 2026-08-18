import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validation.middleware';
import { upload } from '../utils/fileUpload';
import { createInternshipRequest } from '../controllers/internships.controller';

const router = Router();

// POST /api/internships/request - Créer une demande de stage
router.post(
  '/request',
  upload.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'cover_letter', maxCount: 1 }
  ]),
  [
    body('first_name')
      .notEmpty()
      .withMessage('Le prénom est requis')
      .trim(),
    
    body('last_name')
      .notEmpty()
      .withMessage('Le nom est requis')
      .trim(),
    
    body('email')
      .notEmpty()
      .withMessage('L\'email est requis')
      .isEmail()
      .withMessage('Email invalide')
      .normalizeEmail(),
    
    body('phone')
      .notEmpty()
      .withMessage('Le téléphone est requis')
      .matches(/^[\+]?[0-9\s\-\(\)]+$/)
      .withMessage('Numéro de téléphone invalide'),
    
    body('institution')
      .notEmpty()
      .withMessage('L\'établissement est requis')
      .trim(),
    
    body('field_of_study')
      .notEmpty()
      .withMessage('Le domaine d\'étude est requis')
      .trim(),
    
    body('internship_type')
      .notEmpty()
      .withMessage('Le type de stage est requis')
      .trim(),
    
    body('desired_duration')
      .notEmpty()
      .withMessage('La durée souhaitée est requise')
      .trim(),
    
    body('desired_period_start')
      .notEmpty()
      .withMessage('La date de début est requise')
      .isISO8601()
      .withMessage('Format de date invalide'),
    
    body('desired_period_end')
      .notEmpty()
      .withMessage('La date de fin est requise')
      .isISO8601()
      .withMessage('Format de date invalide'),
    
    body('internship_objectives')
      .notEmpty()
      .withMessage('Les objectifs du stage sont requis')
      .isLength({ min: 10 })
      .withMessage('Les objectifs doivent contenir au moins 10 caractères'),
    
    body('address')
      .optional()
      .trim(),
    
    body('education_level')
      .optional()
      .trim(),
    
    validate
  ],
  createInternshipRequest
);

export default router;
