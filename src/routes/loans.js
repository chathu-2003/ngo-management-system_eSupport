const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const loanController = require('../controllers/loanController');
const { publicFormLimiter } = require('../middleware/rateLimiter');

router.post('/', publicFormLimiter, [
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('email').isEmail().withMessage('Valid email is required.'),
  body('amount').isFloat({ min: 1 }).withMessage('Amount must be a positive number.'),
  body('purpose').trim().notEmpty().withMessage('Purpose is required.'),
], loanController.create);

module.exports = router;
