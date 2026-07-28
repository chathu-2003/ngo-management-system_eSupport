const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TaskApplication = sequelize.define('TaskApplication', {
  taskId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: true },
  status: {
    type: DataTypes.ENUM('applied', 'accepted', 'rejected', 'completed'),
    defaultValue: 'applied',
  },
});

module.exports = TaskApplication;
