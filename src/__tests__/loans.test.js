const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { createUserAndToken } = require('./helpers/auth');

afterAll(async () => {
  await sequelize.close();
});

describe('POST /api/loans', () => {
  it('creates a loan application', async () => {
    const res = await request(app).post('/api/loans').send({
      name: 'Loan Applicant',
      email: 'loan.applicant@example.com',
      amount: 5000,
      purpose: 'Start a small business',
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.purpose).toBe('Start a small business');
  });
});

describe('GET /api/admin/loans (auth guard)', () => {
  it('rejects requests with no token', async () => {
    const res = await request(app).get('/api/admin/loans');
    expect(res.status).toBe(401);
  });

  it('rejects requests from a non-admin user', async () => {
    const { token } = await createUserAndToken(app, request);
    const res = await request(app).get('/api/admin/loans').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(403);
  });
});
