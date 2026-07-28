const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const adminController = require('../controllers/adminController');
const {
  User, Gallery, MarketplaceItem, Blog, Newsletter, Task,
  LoanApplication, Inquiry, Partner, Testimonial,
  SiteSettings, FinancialReport, EventRegistration,
  TaskApplication, Order, OrderItem,
} = require('../models');
const { Op } = require('sequelize');
const { makeUploader, PDF_TYPES } = require('../middleware/upload');

const reportUpload = makeUploader({ prefix: 'report', maxSizeMB: 10, allowedMimeTypes: PDF_TYPES });

router.use(protect, adminOnly);

// ── Stats ──────────────────────────────────────────────────────────────────
router.get('/stats', adminController.getStats);

// ── Members (Users) ────────────────────────────────────────────────────────
router.get('/members', async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search = '', role = '' } = req.query;
    const where = {};
    if (search) where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } },
    ];
    if (role) where.role = role;
    const offset = (page - 1) * limit;
    const { rows, count } = await User.findAndCountAll({
      where, limit: +limit, offset,
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, data: rows, pagination: { total: count, page: +page, limit: +limit } });
  } catch (err) { next(err); }
});

router.patch('/members/:id/role', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    await user.update({ role: req.body.role });
    res.json({ success: true, message: 'Role updated' });
  } catch (err) { next(err); }
});

router.patch('/members/:id/status', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    await user.update({ isActive: req.body.isActive });
    res.json({ success: true, message: 'Status updated' });
  } catch (err) { next(err); }
});

router.delete('/members/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    await user.destroy();
    res.json({ success: true, message: 'User deleted' });
  } catch (err) { next(err); }
});

// ── Gallery ────────────────────────────────────────────────────────────────
router.get('/gallery', async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const { rows, count } = await Gallery.findAndCountAll({
      limit: +limit, offset: (+page - 1) * +limit,
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, data: rows, pagination: { total: count, page: +page, limit: +limit } });
  } catch (err) { next(err); }
});

router.post('/gallery', async (req, res, next) => {
  try {
    const item = await Gallery.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) { next(err); }
});

router.put('/gallery/:id', async (req, res, next) => {
  try {
    const item = await Gallery.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    await item.update(req.body);
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
});

router.delete('/gallery/:id', async (req, res, next) => {
  try {
    const item = await Gallery.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    await item.destroy();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
});

// ── Marketplace ────────────────────────────────────────────────────────────
router.get('/marketplace', async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const { rows, count } = await MarketplaceItem.findAndCountAll({
      limit: +limit, offset: (+page - 1) * +limit,
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, data: rows, pagination: { total: count, page: +page, limit: +limit } });
  } catch (err) { next(err); }
});

router.patch('/marketplace/:id/status', async (req, res, next) => {
  try {
    const item = await MarketplaceItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    await item.update({ isAvailable: req.body.isAvailable });
    res.json({ success: true, message: 'Status updated' });
  } catch (err) { next(err); }
});

router.delete('/marketplace/:id', async (req, res, next) => {
  try {
    const item = await MarketplaceItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    await item.destroy();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
});

// ── Blog ───────────────────────────────────────────────────────────────────
router.get('/blogs', async (req, res, next) => {
  try {
    const { page = 1, limit = 15, status = '' } = req.query;
    const where = {};
    if (status) where.status = status;
    const { rows, count } = await Blog.findAndCountAll({
      where, limit: +limit, offset: (+page - 1) * +limit,
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, data: rows, pagination: { total: count, page: +page, limit: +limit } });
  } catch (err) { next(err); }
});

router.post('/blogs', async (req, res, next) => {
  try {
    const body = { ...req.body };
    if (!body.slug && body.title) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();
    }
    if (body.status === 'published' && !body.publishedAt) body.publishedAt = new Date();
    const blog = await Blog.create(body);
    res.status(201).json({ success: true, data: blog });
  } catch (err) { next(err); }
});

router.put('/blogs/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Not found' });
    const body = { ...req.body };
    if (body.status === 'published' && !blog.publishedAt) body.publishedAt = new Date();
    await blog.update(body);
    res.json({ success: true, data: blog });
  } catch (err) { next(err); }
});

router.delete('/blogs/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Not found' });
    await blog.destroy();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
});

// ── Newsletter ─────────────────────────────────────────────────────────────
router.get('/newsletter', async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const { rows, count } = await Newsletter.findAndCountAll({
      limit: +limit, offset: (+page - 1) * +limit,
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, data: rows, pagination: { total: count, page: +page, limit: +limit } });
  } catch (err) { next(err); }
});

router.patch('/newsletter/:id/status', async (req, res, next) => {
  try {
    const sub = await Newsletter.findByPk(req.params.id);
    if (!sub) return res.status(404).json({ success: false, message: 'Not found' });
    await sub.update({ isActive: req.body.isActive });
    res.json({ success: true, message: 'Status updated' });
  } catch (err) { next(err); }
});

router.delete('/newsletter/:id', async (req, res, next) => {
  try {
    const sub = await Newsletter.findByPk(req.params.id);
    if (!sub) return res.status(404).json({ success: false, message: 'Not found' });
    await sub.destroy();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
});

// ── Tasks ──────────────────────────────────────────────────────────────────
router.get('/tasks', async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status = '' } = req.query;
    const where = { isActive: true };
    if (status) where.status = status;
    const { rows, count } = await Task.findAndCountAll({
      where, limit: +limit, offset: (+page - 1) * +limit,
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, data: rows, pagination: { total: count, page: +page, limit: +limit } });
  } catch (err) { next(err); }
});

router.post('/tasks', async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (err) { next(err); }
});

router.put('/tasks/:id', async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Not found' });
    await task.update(req.body);
    res.json({ success: true, data: task });
  } catch (err) { next(err); }
});

router.delete('/tasks/:id', async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Not found' });
    await task.update({ isActive: false });
    res.json({ success: true, message: 'Removed' });
  } catch (err) { next(err); }
});

// ── Loan Applications ──────────────────────────────────────────────────────
router.get('/loans', async (req, res, next) => {
  try {
    const { page = 1, limit = 15, status = '' } = req.query;
    const where = {};
    if (status) where.status = status;
    const { rows, count } = await LoanApplication.findAndCountAll({
      where, limit: +limit, offset: (+page - 1) * +limit,
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, data: rows, pagination: { total: count, page: +page, limit: +limit } });
  } catch (err) { next(err); }
});

router.patch('/loans/:id/status', async (req, res, next) => {
  try {
    const loan = await LoanApplication.findByPk(req.params.id);
    if (!loan) return res.status(404).json({ success: false, message: 'Not found' });
    await loan.update({ status: req.body.status, reviewNote: req.body.reviewNote });
    res.json({ success: true, message: 'Updated' });
  } catch (err) { next(err); }
});

router.delete('/loans/:id', async (req, res, next) => {
  try {
    const loan = await LoanApplication.findByPk(req.params.id);
    if (!loan) return res.status(404).json({ success: false, message: 'Not found' });
    await loan.destroy();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
});

// ── Inquiries ──────────────────────────────────────────────────────────────
router.get('/inquiries', async (req, res, next) => {
  try {
    const { page = 1, limit = 15, status = '' } = req.query;
    const where = {};
    if (status) where.status = status;
    const { rows, count } = await Inquiry.findAndCountAll({
      where, limit: +limit, offset: (+page - 1) * +limit,
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, data: rows, pagination: { total: count, page: +page, limit: +limit } });
  } catch (err) { next(err); }
});

router.patch('/inquiries/:id/status', async (req, res, next) => {
  try {
    const inq = await Inquiry.findByPk(req.params.id);
    if (!inq) return res.status(404).json({ success: false, message: 'Not found' });
    await inq.update({ status: req.body.status, response: req.body.response });
    res.json({ success: true, message: 'Updated' });
  } catch (err) { next(err); }
});

router.delete('/inquiries/:id', async (req, res, next) => {
  try {
    const inq = await Inquiry.findByPk(req.params.id);
    if (!inq) return res.status(404).json({ success: false, message: 'Not found' });
    await inq.destroy();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
});

// ── Partners ───────────────────────────────────────────────────────────────
router.get('/partners', async (req, res, next) => {
  try {
    const { rows, count } = await Partner.findAndCountAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: rows, total: count });
  } catch (err) { next(err); }
});

router.post('/partners', async (req, res, next) => {
  try {
    const p = await Partner.create(req.body);
    res.status(201).json({ success: true, data: p });
  } catch (err) { next(err); }
});

router.put('/partners/:id', async (req, res, next) => {
  try {
    const p = await Partner.findByPk(req.params.id);
    if (!p) return res.status(404).json({ success: false, message: 'Not found' });
    await p.update(req.body);
    res.json({ success: true, data: p });
  } catch (err) { next(err); }
});

router.delete('/partners/:id', async (req, res, next) => {
  try {
    const p = await Partner.findByPk(req.params.id);
    if (!p) return res.status(404).json({ success: false, message: 'Not found' });
    await p.destroy();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
});

// ── Testimonials ───────────────────────────────────────────────────────────
router.get('/testimonials', async (req, res, next) => {
  try {
    const { rows, count } = await Testimonial.findAndCountAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: rows, total: count });
  } catch (err) { next(err); }
});

router.post('/testimonials', async (req, res, next) => {
  try {
    const t = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: t });
  } catch (err) { next(err); }
});

router.put('/testimonials/:id', async (req, res, next) => {
  try {
    const t = await Testimonial.findByPk(req.params.id);
    if (!t) return res.status(404).json({ success: false, message: 'Not found' });
    await t.update(req.body);
    res.json({ success: true, data: t });
  } catch (err) { next(err); }
});

router.delete('/testimonials/:id', async (req, res, next) => {
  try {
    const t = await Testimonial.findByPk(req.params.id);
    if (!t) return res.status(404).json({ success: false, message: 'Not found' });
    await t.destroy();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
});

// ── Site Settings ──────────────────────────────────────────────────────────
router.get('/settings', async (req, res, next) => {
  try {
    let settings = await SiteSettings.findByPk(1);
    if (!settings) settings = await SiteSettings.create({ id: 1 });
    res.json({ success: true, data: settings });
  } catch (err) { next(err); }
});

router.put('/settings', async (req, res, next) => {
  try {
    let settings = await SiteSettings.findByPk(1);
    if (!settings) settings = await SiteSettings.create({ id: 1 });
    await settings.update(req.body);
    res.json({ success: true, message: 'Settings updated', data: settings });
  } catch (err) { next(err); }
});

// ── Financial Reports ──────────────────────────────────────────────────────
router.get('/reports', async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const { rows, count } = await FinancialReport.findAndCountAll({
      limit: +limit, offset: (+page - 1) * +limit,
      order: [['year', 'DESC']],
    });
    res.json({ success: true, data: rows, pagination: { total: count, page: +page, limit: +limit } });
  } catch (err) { next(err); }
});

router.post('/reports', reportUpload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'Report file (PDF) is required.' });
    const { title, year, description, isPublished } = req.body;
    const report = await FinancialReport.create({
      title, year, description, isPublished,
      file: req.file.filename,
    });
    res.status(201).json({ success: true, data: report });
  } catch (err) { next(err); }
});

router.put('/reports/:id', reportUpload.single('file'), async (req, res, next) => {
  try {
    const report = await FinancialReport.findByPk(req.params.id);
    if (!report) return res.status(404).json({ success: false, message: 'Not found' });
    const updateData = { ...req.body };
    if (req.file) updateData.file = req.file.filename;
    await report.update(updateData);
    res.json({ success: true, data: report });
  } catch (err) { next(err); }
});

router.delete('/reports/:id', async (req, res, next) => {
  try {
    const report = await FinancialReport.findByPk(req.params.id);
    if (!report) return res.status(404).json({ success: false, message: 'Not found' });
    await report.destroy();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
});

// ── Event Registrations ────────────────────────────────────────────────────
router.get('/events/:id/registrations', async (req, res, next) => {
  try {
    const registrations = await EventRegistration.findAll({
      where: { eventId: req.params.id },
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, data: registrations });
  } catch (err) { next(err); }
});

// ── Task Applications ──────────────────────────────────────────────────────
router.get('/task-applications', async (req, res, next) => {
  try {
    const { status = '', taskId = '' } = req.query;
    const where = {};
    if (status) where.status = status;
    if (taskId) where.taskId = taskId;
    const applications = await TaskApplication.findAll({
      where,
      include: [
        { model: Task, as: 'task', attributes: ['id', 'title'] },
        { model: User, as: 'applicant', attributes: ['id', 'name', 'email'] },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, data: applications });
  } catch (err) { next(err); }
});

router.patch('/task-applications/:id/status', async (req, res, next) => {
  try {
    const application = await TaskApplication.findByPk(req.params.id);
    if (!application) return res.status(404).json({ success: false, message: 'Not found' });
    await application.update({ status: req.body.status });
    if (req.body.status === 'accepted') {
      await Task.update({ status: 'in_progress' }, { where: { id: application.taskId } });
    }
    res.json({ success: true, message: 'Updated', data: application });
  } catch (err) { next(err); }
});

// ── Orders ─────────────────────────────────────────────────────────────────
router.get('/orders', async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const { rows, count } = await Order.findAndCountAll({
      include: [
        { model: OrderItem, as: 'items' },
        { model: User, as: 'buyer', attributes: ['id', 'name', 'email'] },
      ],
      limit: +limit, offset: (+page - 1) * +limit,
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, data: rows, pagination: { total: count, page: +page, limit: +limit } });
  } catch (err) { next(err); }
});

router.patch('/orders/:id/status', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Not found' });
    const { status, paymentStatus } = req.body;
    const updateData = {};
    if (status !== undefined) updateData.status = status;
    if (paymentStatus !== undefined) updateData.paymentStatus = paymentStatus;
    await order.update(updateData);
    res.json({ success: true, message: 'Updated', data: order });
  } catch (err) { next(err); }
});

module.exports = router;
