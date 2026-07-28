const { validationResult } = require('express-validator');
const { Volunteer } = require('../models');

exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, phone, dateOfBirth, message } = req.body;

    const existing = await Volunteer.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ success: false, message: 'This email is already registered as a volunteer.' });
    }

    const volunteer = await Volunteer.create({ name, email, phone, dateOfBirth, message });

    res.status(201).json({
      success: true,
      message: 'Volunteer registration submitted! We will review and contact you.',
      data: volunteer,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const where = {};
    if (status) where.status = status;

    const offset = (page - 1) * limit;
    const { count, rows } = await Volunteer.findAndCountAll({
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
    const volunteer = await Volunteer.findByPk(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ success: false, message: 'Volunteer not found.' });
    }
    res.json({ success: true, data: volunteer });
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const volunteer = await Volunteer.findByPk(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ success: false, message: 'Volunteer not found.' });
    }
    await volunteer.update({ status: req.body.status });
    res.json({ success: true, message: 'Volunteer status updated.', data: volunteer });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const volunteer = await Volunteer.findByPk(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ success: false, message: 'Volunteer not found.' });
    }
    await volunteer.destroy();
    res.json({ success: true, message: 'Volunteer deleted.' });
  } catch (err) {
    next(err);
  }
};
