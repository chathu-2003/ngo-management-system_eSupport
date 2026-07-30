const { User } = require('../../models');

let counter = 0;
const uniqueEmail = (prefix) => `${prefix}-${Date.now()}-${counter++}@example.com`;

const createUserAndToken = async (app, request, overrides = {}) => {
  const email = overrides.email || uniqueEmail('user');
  const password = overrides.password || 'Password123!';

  if (overrides.role === 'admin') {
    await User.create({
      name: overrides.name || 'Admin User',
      email,
      password,
      role: 'admin',
    });
  } else {
    await request(app).post('/api/auth/register').send({
      name: overrides.name || 'Test User',
      email,
      password,
      phone: overrides.phone || '0771234567',
    });
  }

  const res = await request(app).post('/api/auth/login').send({ email, password });
  return { token: res.body.token, user: res.body.user, email, password };
};

module.exports = { createUserAndToken, uniqueEmail };
