const { validationResult } = require('express-validator');
const { sequelize, Order, OrderItem, MarketplaceItem } = require('../models');

exports.checkout = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      await t.rollback();
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { items, shippingAddress, phone, paymentMethod } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'Cart is empty.' });
    }

    let totalAmount = 0;
    const orderItemsData = [];

    for (const cartItem of items) {
      const marketplaceItem = await MarketplaceItem.findByPk(cartItem.marketplaceItemId, { transaction: t });
      if (!marketplaceItem || !marketplaceItem.isAvailable) {
        await t.rollback();
        return res.status(404).json({
          success: false,
          message: `Item ${cartItem.marketplaceItemId} not found or unavailable.`,
        });
      }

      const quantity = parseInt(cartItem.quantity) || 1;
      if (marketplaceItem.stock < quantity) {
        await t.rollback();
        return res.status(400).json({ success: false, message: `Not enough stock for "${marketplaceItem.title}".` });
      }

      const subtotal = parseFloat(marketplaceItem.price) * quantity;
      totalAmount += subtotal;

      orderItemsData.push({ marketplaceItem, quantity, subtotal });
    }

    const order = await Order.create({
      buyerId: req.user.id,
      totalAmount,
      shippingAddress,
      phone,
      paymentMethod: paymentMethod || 'manual',
    }, { transaction: t });

    for (const { marketplaceItem, quantity, subtotal } of orderItemsData) {
      await OrderItem.create({
        orderId: order.id,
        marketplaceItemId: marketplaceItem.id,
        sellerId: marketplaceItem.userId,
        title: marketplaceItem.title,
        price: marketplaceItem.price,
        quantity,
        subtotal,
      }, { transaction: t });

      const newStock = marketplaceItem.stock - quantity;
      await marketplaceItem.update({
        stock: newStock,
        isAvailable: newStock > 0,
      }, { transaction: t });
    }

    await t.commit();

    const fullOrder = await Order.findByPk(order.id, {
      include: [{ model: OrderItem, as: 'items' }],
    });

    res.status(201).json({ success: true, message: 'Order placed successfully!', data: fullOrder });
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { buyerId: req.user.id },
      include: [{ model: OrderItem, as: 'items' }],
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};

exports.getMySales = async (req, res, next) => {
  try {
    const items = await OrderItem.findAll({
      where: { sellerId: req.user.id },
      include: [{ model: Order, as: 'order' }],
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: OrderItem, as: 'items' }],
    });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    const isSeller = order.items.some((item) => item.sellerId === req.user.id);
    if (!isSeller && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    const { status, paymentStatus } = req.body;
    const updateData = {};
    if (status !== undefined) updateData.status = status;
    if (paymentStatus !== undefined) updateData.paymentStatus = paymentStatus;

    await order.update(updateData);
    res.json({ success: true, message: 'Order updated.', data: order });
  } catch (err) {
    next(err);
  }
};
