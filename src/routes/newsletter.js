const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const newsletterController = require('../controllers/newsletterController');
const { publicFormLimiter } = require('../middleware/rateLimiter');

router.post('/', publicFormLimiter, [
  body('email').isEmail().withMessage('Valid email is required.'),
], newsletterController.subscribe);

module.exports = router;
