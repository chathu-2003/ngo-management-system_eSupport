const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EventRegistration = sequelize.define('EventRegistration', {
  eventId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(150), allowNull: false },
  phone: { type: DataTypes.STRING(20), allowNull: true },
  guests: { type: DataTypes.INTEGER, defaultValue: 1 },
  status: { type: DataTypes.ENUM('registered', 'cancelled'), defaultValue: 'registered' },
});

module.exports = EventRegistration;
