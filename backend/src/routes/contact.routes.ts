import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validation.middleware';
import { sendContactMessage } from '../controllers/contact.controller';

const router = Router();

// POST /api/contact/send - Envoyer un message de contact
router.post(
  '/send',
  [
    body('sender_name')
      .notEmpty()
      .withMessage('Le nom est requis')
      .trim()
      .isLength({ min: 2, max: 255 })
      .withMessage('Le nom doit contenir entre 2 et 255 caractères'),
    
    body('sender_email')
      .notEmpty()
      .withMessage('L\'email est requis')
      .isEmail()
      .withMessage('Email invalide')
      .normalizeEmail(),
    
    body('sender_phone')
      .optional()
      .matches(/^[\+]?[0-9\s\-\(\)]+$/)
      .withMessage('Numéro de téléphone invalide'),
    
    body('subject')
      .notEmpty()
      .withMessage('Le sujet est requis')
      .trim()
      .isLength({ min: 3, max: 255 })
      .withMessage('Le sujet doit contenir entre 3 et 255 caractères'),
    
    body('message')
      .notEmpty()
      .withMessage('Le message est requis')
      .isLength({ min: 10 })
      .withMessage('Le message doit contenir au moins 10 caractères'),
    
    validate
  ],
  sendContactMessage
);

export default router;
