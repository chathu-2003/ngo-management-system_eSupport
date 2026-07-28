const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  buyerId: { type: DataTypes.INTEGER, allowNull: false },
  totalAmount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
  shippingAddress: { type: DataTypes.STRING(300), allowNull: true },
  phone: { type: DataTypes.STRING(20), allowNull: true },
  paymentMethod: { type: DataTypes.STRING(50), allowNull: true },
  paymentStatus: { type: DataTypes.ENUM('pending', 'paid'), defaultValue: 'pending' },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'pending',
  },
});

module.exports = Order;
