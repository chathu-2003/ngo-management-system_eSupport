const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { createUserAndToken } = require('./helpers/auth');

afterAll(async () => {
  await sequelize.close();
});

const createCause = async (token, overrides = {}) => {
  const res = await request(app)
    .post('/api/causes')
    .set('Authorization', `Bearer ${token}`)
    .field('title', overrides.title || 'Donation Cause')
    .field('description', overrides.description || 'A cause for donations.')
    .field('goal', overrides.goal || '1000');
  return res.body.data;
};

describe('POST /api/donations', () => {
  it('creates a donation and increases the cause raised amount', async () => {
    const { token: adminToken } = await createUserAndToken(app, request, { role: 'admin' });
    const cause = await createCause(adminToken);

    const res = await request(app).post('/api/donations').send({
      causeId: cause.id,
      amount: 500,
      donorName: 'Generous Donor',
      donorEmail: 'donor@example.com',
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(Number(res.body.data.amount)).toBe(500);

    const causeRes = await request(app).get(`/api/causes/${cause.id}`);
    expect(parseFloat(causeRes.body.data.raised)).toBe(500);
  });

  it('rejects a donation with an invalid amount', async () => {
    const { token: adminToken } = await createUserAndToken(app, request, { role: 'admin' });
    const cause = await createCause(adminToken);

    const res = await request(app).post('/api/donations').send({ causeId: cause.id, amount: 0 });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('returns 404 for a donation to a non-existent cause', async () => {
    const res = await request(app).post('/api/donations').send({ causeId: 999999, amount: 100 });
    expect(res.status).toBe(404);
  });
});

describe('GET /api/donations/wall', () => {
  it('returns non-anonymous completed donations', async () => {
    const { token: adminToken } = await createUserAndToken(app, request, { role: 'admin' });
    const cause = await createCause(adminToken, { title: 'Wall Cause' });

    await request(app).post('/api/donations').send({
      causeId: cause.id, amount: 250, donorName: 'Wall Donor', isAnonymous: false,
    });
    await request(app).post('/api/donations').send({
      causeId: cause.id, amount: 300, donorName: 'Anon Donor', isAnonymous: true,
    });

    const res = await request(app).get('/api/donations/wall');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    const names = res.body.data.map((d) => d.donorName);
    expect(names).toContain('Wall Donor');
    expect(names).not.toContain('Anon Donor');
  });
});

describe('GET /api/donations (admin)', () => {
  it('rejects requests with no token', async () => {
    const res = await request(app).get('/api/donations');
    expect(res.status).toBe(401);
  });

  it('rejects requests from a non-admin user', async () => {
    const { token } = await createUserAndToken(app, request);
    const res = await request(app).get('/api/donations').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(403);
  });

  it('returns donations for an admin user', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    const res = await request(app).get('/api/donations').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

describe('GET /api/donations/my-donations', () => {
  it('rejects requests with no token', async () => {
    const res = await request(app).get('/api/donations/my-donations');
    expect(res.status).toBe(401);
  });

  it("returns the logged-in user's donations", async () => {
    const { token: adminToken } = await createUserAndToken(app, request, { role: 'admin' });
    const cause = await createCause(adminToken, { title: 'My Donations Cause' });
    const { token, email } = await createUserAndToken(app, request);

    await request(app)
      .post('/api/donations')
      .set('Authorization', `Bearer ${token}`)
      .send({ causeId: cause.id, amount: 100 });

    const res = await request(app)
      .get('/api/donations/my-donations')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    expect(res.body.data[0].donorEmail).toBe(email);
  });
});
