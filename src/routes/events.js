const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const eventController = require('../controllers/eventController');
const { protect, adminOnly } = require('../middleware/auth');
const { makeUploader } = require('../middleware/upload');

const upload = makeUploader({ prefix: 'event', maxSizeMB: 5 });

router.get('/', eventController.getAll);
router.get('/:id', eventController.getOne);

router.post('/:id/register', [
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('email').isEmail().withMessage('Valid email is required.'),
], eventController.register);

router.post('/', protect, adminOnly, upload.single('image'), [
  body('title').trim().notEmpty().withMessage('Title is required.'),
  body('date').isISO8601().withMessage('Valid date is required.'),
], eventController.create);

router.put('/:id', protect, adminOnly, upload.single('image'), eventController.update);
router.delete('/:id', protect, adminOnly, eventController.remove);

module.exports = router;
