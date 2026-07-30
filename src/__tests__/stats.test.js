const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { createUserAndToken } = require('./helpers/auth');

afterAll(async () => {
  await sequelize.close();
});

describe('GET /api/stats/impact', () => {
  it('returns aggregate impact stats', async () => {
    const res = await request(app).get('/api/stats/impact');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('totalRaised');
    expect(res.body.data).toHaveProperty('totalVolunteers');
    expect(res.body.data).toHaveProperty('totalProjects');
    expect(res.body.data).toHaveProperty('totalEvents');
  });
});

describe('GET /api/admin/stats (auth guard)', () => {
  it('rejects requests with no token', async () => {
    const res = await request(app).get('/api/admin/stats');
    expect(res.status).toBe(401);
  });

  it('rejects requests from a non-admin user', async () => {
    const { token } = await createUserAndToken(app, request);
    const res = await request(app).get('/api/admin/stats').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(403);
  });
});
