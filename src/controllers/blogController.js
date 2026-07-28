const { Blog } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 12 } = req.query;
    const where = { status: 'published' };
    if (category) where.category = category;

    const offset = (page - 1) * limit;
    const { count, rows } = await Blog.findAndCountAll({
      where,
      order: [['publishedAt', 'DESC']],
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
    const blog = await Blog.findOne({ where: { slug: req.params.slug, status: 'published' } });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found.' });
    }
    await blog.increment('views');
    res.json({ success: true, data: blog });
  } catch (err) {
    next(err);
  }
};
