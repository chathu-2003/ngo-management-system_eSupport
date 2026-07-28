const { Gallery } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const { category } = req.query;
    const where = { isActive: true };
    if (category) where.category = category;

    const images = await Gallery.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    res.json({ success: true, data: images });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image file is required.' });
    }

    const { title, description, category } = req.body;
    const gallery = await Gallery.create({
      title,
      description,
      category,
      image: req.file.filename,
    });

    res.status(201).json({ success: true, message: 'Image uploaded.', data: gallery });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const gallery = await Gallery.findByPk(req.params.id);
    if (!gallery) {
      return res.status(404).json({ success: false, message: 'Image not found.' });
    }
    await gallery.update({ isActive: false });
    res.json({ success: true, message: 'Image removed.' });
  } catch (err) {
    next(err);
  }
};
