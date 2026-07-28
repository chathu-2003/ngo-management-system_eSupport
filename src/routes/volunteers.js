const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const volunteerController = require('../controllers/volunteerController');
const { protect, adminOnly } = require('../middleware/auth');
const { publicFormLimiter } = require('../middleware/rateLimiter');

router.post('/', publicFormLimiter, [
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('email').isEmail().withMessage('Valid email is required.'),
  body('phone').trim().notEmpty().withMessage('Phone is required.'),
], volunteerController.register);

router.get('/', protect, adminOnly, volunteerController.getAll);
router.get('/:id', protect, adminOnly, volunteerController.getOne);
router.patch('/:id/status', protect, adminOnly, volunteerController.updateStatus);
router.delete('/:id', protect, adminOnly, volunteerController.remove);

module.exports = router;
