const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LoanApplication = sequelize.define('LoanApplication', {
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(150), allowNull: false },
  phone: { type: DataTypes.STRING(20), allowNull: true },
  amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
  purpose: { type: DataTypes.STRING(300), allowNull: false },
  businessPlan: { type: DataTypes.TEXT, allowNull: true },
  status: {
    type: DataTypes.ENUM('pending', 'reviewing', 'approved', 'rejected', 'disbursed'),
    defaultValue: 'pending',
  },
  reviewNote: { type: DataTypes.TEXT, allowNull: true },
});

module.exports = LoanApplication;
