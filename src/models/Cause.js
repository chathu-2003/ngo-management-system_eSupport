const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cause = sequelize.define('Cause', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  raised: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0,
  },
  goal: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'causes',
});

module.exports = Cause;
