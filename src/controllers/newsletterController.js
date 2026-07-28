const { validationResult } = require('express-validator');
const { Newsletter } = require('../models');

exports.subscribe = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, name } = req.body;

    const [sub, created] = await Newsletter.findOrCreate({
      where: { email },
      defaults: { name },
    });

    if (!created) {
      if (sub.isActive) {
        return res.status(409).json({ success: false, message: 'This email is already subscribed.' });
      }
      await sub.update({ isActive: true, name: name || sub.name });
    }

    res.status(201).json({ success: true, message: 'Subscribed to newsletter!', data: sub });
  } catch (err) {
    next(err);
  }
};
