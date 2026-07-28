const { SiteSettings } = require('../models');

exports.get = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findByPk(1);
    if (!settings) {
      settings = await SiteSettings.create({ id: 1 });
    }
    res.json({ success: true, data: settings });
  } catch (err) {
    next(err);
  }
};
