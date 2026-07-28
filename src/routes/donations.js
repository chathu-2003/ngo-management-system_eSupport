const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const donationController = require('../controllers/donationController');
const { protect, adminOnly } = require('../middleware/auth');
const { publicFormLimiter } = require('../middleware/rateLimiter');

router.post('/', publicFormLimiter, [
  body('causeId').isInt({ min: 1 }).withMessage('Valid cause is required.'),
  body('amount').isFloat({ min: 1 }).withMessage('Amount must be at least 1.'),
], donationController.create);

router.get('/wall', donationController.getWall);
router.get('/', protect, adminOnly, donationController.getAll);
router.get('/my-donations', protect, donationController.getMyDonations);

module.exports = router;
