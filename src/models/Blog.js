const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Blog = sequelize.define('Blog', {
  title: { type: DataTypes.STRING(300), allowNull: false },
  slug: { type: DataTypes.STRING(320), allowNull: true, unique: true },
  excerpt: { type: DataTypes.TEXT, allowNull: true },
  content: { type: DataTypes.TEXT('long'), allowNull: false },
  image: { type: DataTypes.STRING(255), allowNull: true },
  author: { type: DataTypes.STRING(100), defaultValue: 'Admin' },
  category: { type: DataTypes.STRING(100), allowNull: true },
  status: { type: DataTypes.ENUM('draft', 'published'), defaultValue: 'draft' },
  publishedAt: { type: DataTypes.DATE, allowNull: true },
  views: { type: DataTypes.INTEGER, defaultValue: 0 },
});

module.exports = Blog;
