const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

router.get('/impact', statsController.getImpact);

module.exports = router;
