import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validation.middleware';
import { createQuoteRequest } from '../controllers/quotes.controller';

const router = Router();

// POST /api/quotes/request - Créer une demande de devis
router.post(
  '/request',
  [
    body('client_name')
      .notEmpty()
      .withMessage('Le nom du client est requis')
      .trim()
      .isLength({ min: 2, max: 255 })
      .withMessage('Le nom doit contenir entre 2 et 255 caractères'),
    
    body('client_email')
      .notEmpty()
      .withMessage('L\'email est requis')
      .isEmail()
      .withMessage('Email invalide')
      .normalizeEmail(),
    
    body('client_phone')
      .notEmpty()
      .withMessage('Le téléphone est requis')
      .matches(/^[\+]?[0-9\s\-\(\)]+$/)
      .withMessage('Numéro de téléphone invalide'),
    
    body('project_type')
      .notEmpty()
      .withMessage('Le type de projet est requis'),
    
    body('project_description')
      .notEmpty()
      .withMessage('La description du projet est requise')
      .isLength({ min: 10 })
      .withMessage('La description doit contenir au moins 10 caractères'),
    
    body('company_name')
      .optional()
      .trim(),
    
    body('budget')
      .optional()
      .trim(),
    
    body('deadline')
      .optional()
      .trim(),
    
    validate
  ],
  createQuoteRequest
);

export default router;
