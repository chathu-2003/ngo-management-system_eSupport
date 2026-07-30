const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { createUserAndToken } = require('./helpers/auth');

afterAll(async () => {
  await sequelize.close();
});

describe('POST /api/inquiries', () => {
  it('creates an inquiry', async () => {
    const res = await request(app).post('/api/inquiries').send({
      name: 'Curious Person',
      email: 'curious@example.com',
      subject: 'Question about donations',
      message: 'How can I donate?',
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.subject).toBe('Question about donations');
  });
});

describe('GET /api/admin/inquiries (auth guard)', () => {
  it('rejects requests with no token', async () => {
    const res = await request(app).get('/api/admin/inquiries');
    expect(res.status).toBe(401);
  });

  it('rejects requests from a non-admin user', async () => {
    const { token } = await createUserAndToken(app, request);
    const res = await request(app).get('/api/admin/inquiries').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(403);
  });
});
