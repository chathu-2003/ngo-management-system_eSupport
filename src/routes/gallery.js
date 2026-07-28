const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const { protect, adminOnly } = require('../middleware/auth');
const { makeUploader } = require('../middleware/upload');

const upload = makeUploader({ prefix: 'gallery', maxSizeMB: 10 });

router.get('/', galleryController.getAll);
router.post('/', protect, adminOnly, upload.single('image'), galleryController.create);
router.delete('/:id', protect, adminOnly, galleryController.remove);

module.exports = router;
