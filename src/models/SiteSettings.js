const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SiteSettings = sequelize.define('SiteSettings', {
  registrationNumber: { type: DataTypes.STRING(100), allowNull: true },
  legalStatus: { type: DataTypes.STRING(200), allowNull: true },
  missionStatement: { type: DataTypes.TEXT, allowNull: true },
  visionStatement: { type: DataTypes.TEXT, allowNull: true },
  history: { type: DataTypes.TEXT, allowNull: true },
  foundedYear: { type: DataTypes.INTEGER, allowNull: true },
  address: { type: DataTypes.STRING(300), allowNull: true },
  phone: { type: DataTypes.STRING(20), allowNull: true },
  email: { type: DataTypes.STRING(150), allowNull: true },
  facebookUrl: { type: DataTypes.STRING(300), allowNull: true },
  twitterUrl: { type: DataTypes.STRING(300), allowNull: true },
  instagramUrl: { type: DataTypes.STRING(300), allowNull: true },
  whatsappNumber: { type: DataTypes.STRING(20), allowNull: true },
  privacyPolicy: { type: DataTypes.TEXT('long'), allowNull: true },
  termsOfUse: { type: DataTypes.TEXT('long'), allowNull: true },
  refundPolicy: { type: DataTypes.TEXT('long'), allowNull: true },
  beneficiariesCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  logo: { type: DataTypes.STRING(255), allowNull: true },
});

module.exports = SiteSettings;
