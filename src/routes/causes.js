const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const causeController = require('../controllers/causeController');
const { protect, adminOnly } = require('../middleware/auth');
const { makeUploader } = require('../middleware/upload');

const upload = makeUploader({ prefix: 'cause', maxSizeMB: 5 });

router.get('/', causeController.getAll);
router.get('/:id', causeController.getOne);

router.post('/', protect, adminOnly, upload.single('image'), [
  body('title').trim().notEmpty().withMessage('Title is required.'),
  body('goal').isFloat({ min: 1 }).withMessage('Goal must be a positive number.'),
], causeController.create);

router.put('/:id', protect, adminOnly, upload.single('image'), causeController.update);
router.delete('/:id', protect, adminOnly, causeController.remove);

module.exports = router;
