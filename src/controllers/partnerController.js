const { Partner } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const { type } = req.query;
    const where = { isActive: true };
    if (type) where.type = type;

    const partners = await Partner.findAll({ where, order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: partners });
  } catch (err) {
    next(err);
  }
};
