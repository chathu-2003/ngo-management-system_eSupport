const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

router.get('/', taskController.getAll);
router.get('/my-applications', protect, taskController.getMyApplications);
router.get('/:id', taskController.getOne);
router.post('/:id/apply', protect, taskController.apply);

module.exports = router;
