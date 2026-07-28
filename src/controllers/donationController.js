const { validationResult } = require('express-validator');
const { Donation, Cause, User } = require('../models');

exports.create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { causeId, amount, donorName, donorEmail, paymentMethod, isRecurring, isAnonymous } = req.body;

    const cause = await Cause.findByPk(causeId);
    if (!cause || !cause.isActive) {
      return res.status(404).json({ success: false, message: 'Cause not found.' });
    }

    const donation = await Donation.create({
      causeId,
      userId: req.user ? req.user.id : null,
      donorName: donorName || (req.user ? req.user.name : 'Anonymous'),
      donorEmail: donorEmail || (req.user ? req.user.email : null),
      amount,
      paymentMethod: paymentMethod || 'manual',
      status: 'completed',
      isRecurring: !!isRecurring,
      isAnonymous: !!isAnonymous,
    });

    await cause.update({ raised: parseFloat(cause.raised) + parseFloat(amount) });

    res.status(201).json({
      success: true,
      message: `Thank you for donating LKR ${amount} to "${cause.title}"!`,
      data: donation,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const { causeId, page = 1, limit = 20 } = req.query;
    const where = {};
    if (causeId) where.causeId = causeId;

    const offset = (page - 1) * limit;
    const { count, rows } = await Donation.findAndCountAll({
      where,
      include: [{ model: Cause, as: 'cause', attributes: ['id', 'title'] }],
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

exports.getWall = async (req, res, next) => {
  try {
    const { limit = 20 } = req.query;
    const donations = await Donation.findAll({
      where: { status: 'completed', isAnonymous: false },
      include: [{ model: Cause, as: 'cause', attributes: ['id', 'title'] }],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      attributes: ['id', 'donorName', 'amount', 'isRecurring', 'createdAt'],
    });
    res.json({ success: true, data: donations });
  } catch (err) {
    next(err);
  }
};

exports.getMyDonations = async (req, res, next) => {
  try {
    const donations = await Donation.findAll({
      where: { userId: req.user.id },
      include: [{ model: Cause, as: 'cause', attributes: ['id', 'title'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, data: donations });
  } catch (err) {
    next(err);
  }
};
