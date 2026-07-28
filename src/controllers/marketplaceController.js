const { validationResult } = require('express-validator');
const { MarketplaceItem, User } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 20 } = req.query;
    const where = { isAvailable: true };
    if (category) where.category = category;

    const offset = (page - 1) * limit;
    const { count, rows } = await MarketplaceItem.findAndCountAll({
      where,
      include: [{ model: User, as: 'seller', attributes: ['id', 'name', 'email'] }],
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
    const item = await MarketplaceItem.findByPk(req.params.id, {
      include: [{ model: User, as: 'seller', attributes: ['id', 'name', 'email'] }],
    });
    if (!item || !item.isAvailable) {
      return res.status(404).json({ success: false, message: 'Item not found.' });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

exports.getVendor = async (req, res, next) => {
  try {
    const seller = await User.findByPk(req.params.userId, {
      attributes: ['id', 'name', 'profileImage', 'createdAt'],
    });
    if (!seller) {
      return res.status(404).json({ success: false, message: 'Vendor not found.' });
    }

    const listings = await MarketplaceItem.findAll({
      where: { userId: seller.id, isAvailable: true },
      order: [['createdAt', 'DESC']],
    });

    res.json({ success: true, data: { seller, listings } });
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

    const { title, description, price, category, condition } = req.body;
    const image = req.file ? req.file.filename : null;

    const item = await MarketplaceItem.create({
      userId: req.user.id,
      title,
      description,
      price,
      category,
      condition,
      image,
    });

    res.status(201).json({ success: true, message: 'Item listed.', data: item });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const item = await MarketplaceItem.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found.' });
    }

    if (item.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    const { title, description, price, category, condition, isAvailable } = req.body;
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (category !== undefined) updateData.category = category;
    if (condition !== undefined) updateData.condition = condition;
    if (isAvailable !== undefined) updateData.isAvailable = isAvailable;
    if (req.file) updateData.image = req.file.filename;

    await item.update(updateData);
    res.json({ success: true, message: 'Item updated.', data: item });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await MarketplaceItem.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found.' });
    }

    if (item.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    await item.update({ isAvailable: false });
    res.json({ success: true, message: 'Item removed.' });
  } catch (err) {
    next(err);
  }
};
