const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FinancialReport = sequelize.define('FinancialReport', {
  title: { type: DataTypes.STRING(300), allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false },
  file: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  isPublished: { type: DataTypes.BOOLEAN, defaultValue: true },
});

module.exports = FinancialReport;
