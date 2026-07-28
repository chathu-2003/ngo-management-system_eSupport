const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const contactController = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/auth');
const { publicFormLimiter } = require('../middleware/rateLimiter');

router.post('/', publicFormLimiter, [
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('email').isEmail().withMessage('Valid email is required.'),
  body('phone').trim().notEmpty().withMessage('Phone is required.'),
  body('message').trim().notEmpty().withMessage('Message is required.'),
], contactController.create);

router.get('/', protect, adminOnly, contactController.getAll);
router.get('/:id', protect, adminOnly, contactController.getOne);
router.patch('/:id/status', protect, adminOnly, contactController.updateStatus);
router.delete('/:id', protect, adminOnly, contactController.remove);

module.exports = router;
