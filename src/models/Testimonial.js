const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Testimonial = sequelize.define('Testimonial', {
  name: { type: DataTypes.STRING(100), allowNull: false },
  role: { type: DataTypes.STRING(100), allowNull: true },
  organization: { type: DataTypes.STRING(200), allowNull: true },
  message: { type: DataTypes.TEXT, allowNull: false },
  photo: { type: DataTypes.STRING(255), allowNull: true },
  rating: { type: DataTypes.INTEGER, defaultValue: 5 },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
});

module.exports = Testimonial;
