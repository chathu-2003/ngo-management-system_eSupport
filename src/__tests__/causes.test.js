const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { createUserAndToken } = require('./helpers/auth');

afterAll(async () => {
  await sequelize.close();
});

describe('GET /api/causes', () => {
  it('lists active causes with computed progress', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    await request(app)
      .post('/api/causes')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Clean Water')
      .field('description', 'Providing clean water access.')
      .field('goal', '1000');

    const res = await request(app).get('/api/causes');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    const cause = res.body.data.find((c) => c.title === 'Clean Water');
    expect(cause).toBeDefined();
    expect(cause.progress).toBe(0);
  });
});

describe('GET /api/causes/:id', () => {
  it('returns a single cause', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    const createRes = await request(app)
      .post('/api/causes')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Single Cause')
      .field('description', 'A single cause.')
      .field('goal', '500');

    const res = await request(app).get(`/api/causes/${createRes.body.data.id}`);
    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe('Single Cause');
  });

  it('returns 404 for a non-existent cause', async () => {
    const res = await request(app).get('/api/causes/999999');
    expect(res.status).toBe(404);
  });
});

describe('POST /api/causes', () => {
  it('rejects requests with no token', async () => {
    const res = await request(app).post('/api/causes').send({ title: 'No Auth', goal: 100 });
    expect(res.status).toBe(401);
  });

  it('rejects requests from a non-admin user', async () => {
    const { token } = await createUserAndToken(app, request);
    const res = await request(app)
      .post('/api/causes')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Non Admin', goal: 100 });
    expect(res.status).toBe(403);
  });

  it('rejects creation with missing required fields', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    const res = await request(app)
      .post('/api/causes')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: '' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('creates a cause as admin', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    const res = await request(app)
      .post('/api/causes')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'New Cause')
      .field('description', 'A good cause')
      .field('goal', '2000');

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('New Cause');
  });
});

describe('PUT /api/causes/:id', () => {
  it('updates a cause as admin', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    const createRes = await request(app)
      .post('/api/causes')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Update Me')
      .field('description', 'Cause to update.')
      .field('goal', '300');

    const res = await request(app)
      .put(`/api/causes/${createRes.body.data.id}`)
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Updated Title');

    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe('Updated Title');
  });
});

describe('DELETE /api/causes/:id', () => {
  it('soft-deletes a cause as admin', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    const createRes = await request(app)
      .post('/api/causes')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Delete Me')
      .field('description', 'Cause to delete.')
      .field('goal', '300');

    const res = await request(app)
      .delete(`/api/causes/${createRes.body.data.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);

    const getRes = await request(app).get(`/api/causes/${createRes.body.data.id}`);
    expect(getRes.status).toBe(404);
  });
});
