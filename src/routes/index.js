const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/contacts', require('./contacts'));
router.use('/volunteers', require('./volunteers'));
router.use('/causes', require('./causes'));
router.use('/events', require('./events'));
router.use('/donations', require('./donations'));
router.use('/gallery', require('./gallery'));
router.use('/marketplace', require('./marketplace'));
router.use('/blogs', require('./blogs'));
router.use('/newsletter', require('./newsletter'));
router.use('/tasks', require('./tasks'));
router.use('/loans', require('./loans'));
router.use('/inquiries', require('./inquiries'));
router.use('/partners', require('./partners'));
router.use('/testimonials', require('./testimonials'));
router.use('/settings', require('./settings'));
router.use('/reports', require('./reports'));
router.use('/orders', require('./orders'));
router.use('/stats', require('./stats'));
router.use('/admin', require('./admin'));

module.exports = router;
