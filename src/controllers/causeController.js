const { validationResult } = require('express-validator');
const { Cause, Donation } = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res, next) => {
  try {
    const where = { isActive: true };
    const causes = await Cause.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    const causesWithProgress = causes.map((c) => ({
      ...c.toJSON(),
      progress: c.goal > 0 ? Math.min(Math.round((c.raised / c.goal) * 100), 100) : 0,
    }));

    res.json({ success: true, data: causesWithProgress });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const cause = await Cause.findByPk(req.params.id);
    if (!cause || !cause.isActive) {
      return res.status(404).json({ success: false, message: 'Cause not found.' });
    }

    const progress = cause.goal > 0 ? Math.min(Math.round((cause.raised / cause.goal) * 100), 100) : 0;
    res.json({ success: true, data: { ...cause.toJSON(), progress } });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { title, description, goal, color } = req.body;
    const image = req.file ? req.file.filename : null;

    const cause = await Cause.create({ title, description, goal, color, image });
    res.status(201).json({ success: true, message: 'Cause created.', data: cause });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const cause = await Cause.findByPk(req.params.id);
    if (!cause) {
      return res.status(404).json({ success: false, message: 'Cause not found.' });
    }

    const { title, description, goal, color, isActive } = req.body;
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (goal !== undefined) updateData.goal = goal;
    if (color !== undefined) updateData.color = color;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (req.file) updateData.image = req.file.filename;

    await cause.update(updateData);
    res.json({ success: true, message: 'Cause updated.', data: cause });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const cause = await Cause.findByPk(req.params.id);
    if (!cause) {
      return res.status(404).json({ success: false, message: 'Cause not found.' });
    }
    await cause.update({ isActive: false });
    res.json({ success: true, message: 'Cause removed.' });
  } catch (err) {
    next(err);
  }
};
