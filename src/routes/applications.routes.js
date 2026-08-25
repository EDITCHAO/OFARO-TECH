const { Router } = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validation.middleware');
const { upload } = require('../utils/fileUpload');
const { submitApplication } = require('../controllers/applications.controller');

const router = Router();

router.post(
  '/submit',
  upload.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'cover_letter', maxCount: 1 }
  ]),
  [
    body('application_type')
      .notEmpty()
      .withMessage('Le type de candidature est requis')
      .isIn(['offre', 'spontanee'])
      .withMessage('Type de candidature invalide'),

    body('job_offer_id')
      .if(body('application_type').equals('offre'))
      .notEmpty()
      .withMessage("L'ID de l'offre est requis pour une candidature à une offre")
      .isInt()
      .withMessage("ID d'offre invalide"),

    body('position_sought')
      .if(body('application_type').equals('spontanee'))
      .notEmpty()
      .withMessage('Le poste recherché est requis pour une candidature spontanée')
      .trim(),

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
      .withMessage("L'email est requis")
      .isEmail()
      .withMessage('Email invalide')
      .normalizeEmail(),

    body('phone')
      .notEmpty()
      .withMessage('Le téléphone est requis')
      .matches(/^[\+]?[0-9\s\-\(\)]+$/)
      .withMessage('Numéro de téléphone invalide'),

    body('education_level')
      .notEmpty()
      .withMessage("Le niveau d'études est requis")
      .trim(),

    body('professional_experience')
      .notEmpty()
      .withMessage("L'expérience professionnelle est requise")
      .trim(),

    body('skills')
      .notEmpty()
      .withMessage('Les compétences sont requises')
      .trim(),

    body('address')
      .optional()
      .trim(),

    body('portfolio_url')
      .optional()
      .isURL()
      .withMessage('URL de portfolio invalide'),

    body('additional_message')
      .optional()
      .trim(),

    validate
  ],
  submitApplication
);

module.exports = router;
