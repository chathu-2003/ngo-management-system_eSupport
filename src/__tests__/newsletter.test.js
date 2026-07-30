const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { createUserAndToken, uniqueEmail } = require('./helpers/auth');

afterAll(async () => {
  await sequelize.close();
});

describe('POST /api/newsletter', () => {
  it('subscribes a new email to the newsletter', async () => {
    const email = uniqueEmail('newsletter');
    const res = await request(app).post('/api/newsletter').send({ email, name: 'Subscriber' });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe(email);
  });
});

describe('GET /api/admin/newsletter (auth guard)', () => {
  it('rejects requests with no token', async () => {
    const res = await request(app).get('/api/admin/newsletter');
    expect(res.status).toBe(401);
  });

  it('rejects requests from a non-admin user', async () => {
    const { token } = await createUserAndToken(app, request);
    const res = await request(app).get('/api/admin/newsletter').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(403);
  });
});
