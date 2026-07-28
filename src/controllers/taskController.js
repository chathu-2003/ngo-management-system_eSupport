const { Task, TaskApplication } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const { status, category, page = 1, limit = 20 } = req.query;
    const where = { isActive: true };
    if (status) where.status = status;
    if (category) where.category = category;

    const offset = (page - 1) * limit;
    const { count, rows } = await Task.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      success: true,
      data: rows,
      pagination: { total: count, page: parseInt(page), limit: parseInt(limit) },
    });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task || !task.isActive) {
      return res.status(404).json({ success: false, message: 'Task not found.' });
    }
    res.json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

exports.apply = async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task || !task.isActive) {
      return res.status(404).json({ success: false, message: 'Task not found.' });
    }
    if (task.status !== 'open') {
      return res.status(400).json({ success: false, message: 'This task is no longer open.' });
    }

    const existing = await TaskApplication.findOne({ where: { taskId: task.id, userId: req.user.id } });
    if (existing) {
      return res.status(409).json({ success: false, message: 'You have already applied for this task.' });
    }

    const application = await TaskApplication.create({
      taskId: task.id,
      userId: req.user.id,
      message: req.body.message,
    });

    res.status(201).json({ success: true, message: 'Application submitted!', data: application });
  } catch (err) {
    next(err);
  }
};

exports.getMyApplications = async (req, res, next) => {
  try {
    const applications = await TaskApplication.findAll({
      where: { userId: req.user.id },
      include: [{ model: Task, as: 'task' }],
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, data: applications });
  } catch (err) {
    next(err);
  }
};
