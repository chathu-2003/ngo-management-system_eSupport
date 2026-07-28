const { FinancialReport } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const { year, page = 1, limit = 20 } = req.query;
    const where = { isPublished: true };
    if (year) where.year = year;

    const offset = (page - 1) * limit;
    const { count, rows } = await FinancialReport.findAndCountAll({
      where,
      order: [['year', 'DESC']],
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
