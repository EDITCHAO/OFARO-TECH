const { Router } = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validation.middleware');
const { createServiceRequest } = require('../controllers/services.controller');

const router = Router();

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
      .withMessage("L'email est requis")
      .isEmail()
      .withMessage('Email invalide')
      .normalizeEmail(),

    body('client_phone')
      .notEmpty()
      .withMessage('Le téléphone est requis')
      .matches(/^[\+]?[0-9\s\-\(\)]+$/)
      .withMessage('Numéro de téléphone invalide'),

    body('service_type')
      .notEmpty()
      .withMessage('Le type de service est requis'),

    body('description')
      .notEmpty()
      .withMessage('La description est requise')
      .isLength({ min: 10 })
      .withMessage('La description doit contenir au moins 10 caractères'),

    body('company_name')
      .optional()
      .trim(),

    body('urgency')
      .optional()
      .isIn(['normale', 'urgent', 'très urgent'])
      .withMessage('Urgence invalide'),

    body('budget_range')
      .optional()
      .trim(),

    validate
  ],
  createServiceRequest
);

module.exports = router;
