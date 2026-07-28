const { validationResult } = require('express-validator');
const { Inquiry } = require('../models');

exports.create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, phone, subject, message } = req.body;
    const inquiry = await Inquiry.create({ name, email, phone, subject, message });

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted. We will respond soon.',
      data: inquiry,
    });
  } catch (err) {
    next(err);
  }
};
