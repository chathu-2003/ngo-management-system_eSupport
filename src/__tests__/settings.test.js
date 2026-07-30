const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { createUserAndToken } = require('./helpers/auth');

afterAll(async () => {
  await sequelize.close();
});

describe('GET /api/settings', () => {
  it('returns the site settings, creating a default record if none exists', async () => {
    const res = await request(app).get('/api/settings');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(1);
  });
});

describe('PUT /api/admin/settings (auth guard)', () => {
  it('rejects requests with no token', async () => {
    const res = await request(app).put('/api/admin/settings').send({ missionStatement: 'x' });
    expect(res.status).toBe(401);
  });

  it('rejects requests from a non-admin user', async () => {
    const { token } = await createUserAndToken(app, request);
    const res = await request(app)
      .put('/api/admin/settings')
      .set('Authorization', `Bearer ${token}`)
      .send({ missionStatement: 'x' });
    expect(res.status).toBe(403);
  });

  it('updates settings as admin', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    const res = await request(app)
      .put('/api/admin/settings')
      .set('Authorization', `Bearer ${token}`)
      .send({ missionStatement: 'Helping communities thrive.' });

    expect(res.status).toBe(200);
    expect(res.body.data.missionStatement).toBe('Helping communities thrive.');
  });
});
