const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const marketplaceController = require('../controllers/marketplaceController');
const { protect } = require('../middleware/auth');
const { makeUploader } = require('../middleware/upload');

const upload = makeUploader({ prefix: 'item', maxSizeMB: 5 });

router.get('/', marketplaceController.getAll);
router.get('/vendor/:userId', marketplaceController.getVendor);
router.get('/:id', marketplaceController.getOne);

router.post('/', protect, upload.single('image'), [
  body('title').trim().notEmpty().withMessage('Title is required.'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a valid number.'),
], marketplaceController.create);

router.put('/:id', protect, upload.single('image'), marketplaceController.update);
router.delete('/:id', protect, marketplaceController.remove);

module.exports = router;
