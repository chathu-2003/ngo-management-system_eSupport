const sequelize = require('../config/database');

const User = require('./User');
const Contact = require('./Contact');
const Volunteer = require('./Volunteer');
const Cause = require('./Cause');
const Event = require('./Event');
const Donation = require('./Donation');
const Gallery = require('./Gallery');
const MarketplaceItem = require('./MarketplaceItem');
const Blog = require('./Blog');
const Newsletter = require('./Newsletter');
const Task = require('./Task');
const LoanApplication = require('./LoanApplication');
const Inquiry = require('./Inquiry');
const Partner = require('./Partner');
const Testimonial = require('./Testimonial');
const SiteSettings = require('./SiteSettings');
const FinancialReport = require('./FinancialReport');
const EventRegistration = require('./EventRegistration');
const TaskApplication = require('./TaskApplication');
const Order = require('./Order');
const OrderItem = require('./OrderItem');

// Associations
User.hasMany(Donation, { foreignKey: 'userId', as: 'donations' });
Donation.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Cause.hasMany(Donation, { foreignKey: 'causeId', as: 'donations' });
Donation.belongsTo(Cause, { foreignKey: 'causeId', as: 'cause' });

User.hasMany(MarketplaceItem, { foreignKey: 'userId', as: 'listings' });
MarketplaceItem.belongsTo(User, { foreignKey: 'userId', as: 'seller' });

Event.hasMany(EventRegistration, { foreignKey: 'eventId', as: 'registrations' });
EventRegistration.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });

Task.hasMany(TaskApplication, { foreignKey: 'taskId', as: 'applications' });
TaskApplication.belongsTo(Task, { foreignKey: 'taskId', as: 'task' });

User.hasMany(TaskApplication, { foreignKey: 'userId', as: 'taskApplications' });
TaskApplication.belongsTo(User, { foreignKey: 'userId', as: 'applicant' });

User.hasMany(Order, { foreignKey: 'buyerId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'buyerId', as: 'buyer' });

Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

MarketplaceItem.hasMany(OrderItem, { foreignKey: 'marketplaceItemId', as: 'orderItems' });
OrderItem.belongsTo(MarketplaceItem, { foreignKey: 'marketplaceItemId', as: 'marketplaceItem' });

User.hasMany(OrderItem, { foreignKey: 'sellerId', as: 'sales' });
OrderItem.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });

module.exports = {
  sequelize,
  User,
  Contact,
  Volunteer,
  Cause,
  Event,
  Donation,
  Gallery,
  MarketplaceItem,
  Blog,
  Newsletter,
  Task,
  LoanApplication,
  Inquiry,
  Partner,
  Testimonial,
  SiteSettings,
  FinancialReport,
  EventRegistration,
  TaskApplication,
  Order,
  OrderItem,
};
