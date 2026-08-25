const { Router } = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validation.middleware');
const {
  getContactMessages,
  getContactMessageById,
  updateMessageStatus,
  sendContactMessage
} = require('../controllers/contact.controller');

const router = Router();

router.get('/', getContactMessages);
router.get('/:id', getContactMessageById);
router.patch('/:id/status', updateMessageStatus);

router.post(
  '/send',
  [
    body('subject')
      .notEmpty()
      .withMessage("L'objet du message est requis")
      .trim(),

    body('message')
      .notEmpty()
      .withMessage('Le message est requis')
      .isLength({ min: 5 })
      .withMessage('Le message doit contenir au moins 5 caractères'),

    validate
  ],
  sendContactMessage
);

module.exports = router;
