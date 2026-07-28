const { validationResult } = require('express-validator');
const { LoanApplication } = require('../models');

exports.create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, phone, amount, purpose, businessPlan } = req.body;
    const loan = await LoanApplication.create({ name, email, phone, amount, purpose, businessPlan });

    res.status(201).json({
      success: true,
      message: 'Loan application submitted! We will review and get back to you.',
      data: loan,
    });
  } catch (err) {
    next(err);
  }
};
