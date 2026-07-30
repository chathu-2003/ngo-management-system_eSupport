const path = require('path');
const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { createUserAndToken } = require('./helpers/auth');

afterAll(async () => {
  await sequelize.close();
});

const fixture = path.join(__dirname, 'fixtures', 'test-report.pdf');

describe('GET /api/reports', () => {
  it('returns published financial reports', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    const createRes = await request(app)
      .post('/api/admin/reports')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Annual Report 2025')
      .field('year', '2025')
      .field('isPublished', 'true')
      .attach('file', fixture);
    expect(createRes.status).toBe(201);

    const res = await request(app).get('/api/reports');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.find((r) => r.title === 'Annual Report 2025')).toBeDefined();
  });
});

describe('POST /api/admin/reports (auth guard)', () => {
  // No file attached here: `protect`/`adminOnly` run before multer parses the
  // body, so the guard rejects before the upload stream is consumed. Attaching
  // a file to these requests causes the client connection to reset.
  it('rejects requests with no token', async () => {
    const res = await request(app).post('/api/admin/reports').send({ title: 'No Auth' });
    expect(res.status).toBe(401);
  });

  it('rejects requests from a non-admin user', async () => {
    const { token } = await createUserAndToken(app, request);
    const res = await request(app)
      .post('/api/admin/reports')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Non Admin' });
    expect(res.status).toBe(403);
  });
});
