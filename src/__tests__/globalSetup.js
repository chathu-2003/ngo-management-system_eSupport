const path = require('path');

module.exports = async () => {
  require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env.test') });
  const { sequelize } = require('../models');
  await sequelize.sync({ force: true });
  await sequelize.close();
};
