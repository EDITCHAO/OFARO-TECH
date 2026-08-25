const { Router } = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validation.middleware');
const {
  getQuotes,
  getQuoteById,
  updateQuoteStatus,
  createQuoteRequest
} = require('../controllers/quotes.controller');

const router = Router();

router.get('/', getQuotes);
router.get('/:id', getQuoteById);
router.patch('/:id/status', updateQuoteStatus);

router.post(
  '/request',
  [
    body('client_name')
      .notEmpty()
      .withMessage('Le nom du client est requis')
      .trim(),

    body('client_email')
      .notEmpty()
      .withMessage("L'email est requis")
      .isEmail()
      .withMessage('Email invalide')
      .normalizeEmail(),

    body('client_phone')
      .notEmpty()
      .withMessage('Le téléphone est requis'),

    body('project_type')
      .notEmpty()
      .withMessage('Le type de projet est requis'),

    body('project_description')
      .notEmpty()
      .withMessage('La description du projet est requise'),

    validate
  ],
  createQuoteRequest
);

module.exports = router;
