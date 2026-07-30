const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { createUserAndToken } = require('./helpers/auth');

afterAll(async () => {
  await sequelize.close();
});

describe('GET /api/partners', () => {
  it('returns active partners', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    await request(app)
      .post('/api/admin/partners')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Acme Foundation', type: 'sponsor' });

    const res = await request(app).get('/api/partners');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.find((p) => p.name === 'Acme Foundation')).toBeDefined();
  });
});

describe('POST /api/admin/partners (auth guard)', () => {
  it('rejects requests with no token', async () => {
    const res = await request(app).post('/api/admin/partners').send({ name: 'No Auth Partner' });
    expect(res.status).toBe(401);
  });

  it('rejects requests from a non-admin user', async () => {
    const { token } = await createUserAndToken(app, request);
    const res = await request(app)
      .post('/api/admin/partners')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Non Admin Partner' });
    expect(res.status).toBe(403);
  });
});
