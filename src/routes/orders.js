const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const orderController = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

router.post('/', protect, [
  body('items').isArray({ min: 1 }).withMessage('Cart items are required.'),
], orderController.checkout);

router.get('/my-orders', protect, orderController.getMyOrders);
router.get('/my-sales', protect, orderController.getMySales);
router.patch('/:id/status', protect, orderController.updateStatus);

module.exports = router;
