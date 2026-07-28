const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Partner = sequelize.define('Partner', {
  name: { type: DataTypes.STRING(200), allowNull: false },
  logo: { type: DataTypes.STRING(255), allowNull: true },
  website: { type: DataTypes.STRING(300), allowNull: true },
  type: { type: DataTypes.ENUM('partner', 'sponsor', 'donor'), defaultValue: 'partner' },
  description: { type: DataTypes.TEXT, allowNull: true },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
});

module.exports = Partner;
