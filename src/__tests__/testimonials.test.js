const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { createUserAndToken } = require('./helpers/auth');

afterAll(async () => {
  await sequelize.close();
});

describe('GET /api/testimonials', () => {
  it('returns active testimonials', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    await request(app)
      .post('/api/admin/testimonials')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Happy Beneficiary', message: 'This NGO changed my life.' });

    const res = await request(app).get('/api/testimonials');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.find((t) => t.name === 'Happy Beneficiary')).toBeDefined();
  });
});

describe('POST /api/admin/testimonials (auth guard)', () => {
  it('rejects requests with no token', async () => {
    const res = await request(app).post('/api/admin/testimonials').send({ name: 'No Auth', message: 'x' });
    expect(res.status).toBe(401);
  });

  it('rejects requests from a non-admin user', async () => {
    const { token } = await createUserAndToken(app, request);
    const res = await request(app)
      .post('/api/admin/testimonials')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Non Admin', message: 'x' });
    expect(res.status).toBe(403);
  });
});
