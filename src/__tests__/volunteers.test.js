const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { createUserAndToken, uniqueEmail } = require('./helpers/auth');

afterAll(async () => {
  await sequelize.close();
});

describe('POST /api/volunteers', () => {
  it('registers a new volunteer', async () => {
    const email = uniqueEmail('volunteer');
    const res = await request(app).post('/api/volunteers').send({
      name: 'Vera Volunteer',
      email,
      phone: '0771234567',
      dateOfBirth: '1995-05-05',
      message: 'I want to help',
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe(email);
    expect(res.body.data.status).toBe('pending');
  });

  it('rejects a volunteer registration with missing required fields', async () => {
    const res = await request(app).post('/api/volunteers').send({ email: 'bad@example.com' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('rejects duplicate volunteer email registration', async () => {
    const email = uniqueEmail('dupvolunteer');
    await request(app).post('/api/volunteers').send({
      name: 'First Timer', email, phone: '0771234567',
    });

    const res = await request(app).post('/api/volunteers').send({
      name: 'Second Timer', email, phone: '0771234567',
    });

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
  });
});

describe('GET /api/volunteers (admin)', () => {
  it('rejects requests with no token', async () => {
    const res = await request(app).get('/api/volunteers');
    expect(res.status).toBe(401);
  });

  it('rejects requests from a non-admin user', async () => {
    const { token } = await createUserAndToken(app, request);
    const res = await request(app).get('/api/volunteers').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(403);
  });

  it('returns volunteers for an admin user', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    const res = await request(app).get('/api/volunteers').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

describe('PATCH /api/volunteers/:id/status', () => {
  it('updates volunteer status as admin', async () => {
    const email = uniqueEmail('statusvolunteer');
    const createRes = await request(app).post('/api/volunteers').send({
      name: 'Status Volunteer', email, phone: '0771234567',
    });
    const { token } = await createUserAndToken(app, request, { role: 'admin' });

    const res = await request(app)
      .patch(`/api/volunteers/${createRes.body.data.id}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'approved' });

    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('approved');
  });
});

describe('DELETE /api/volunteers/:id', () => {
  it('deletes a volunteer as admin', async () => {
    const email = uniqueEmail('deletevolunteer');
    const createRes = await request(app).post('/api/volunteers').send({
      name: 'Delete Volunteer', email, phone: '0771234567',
    });
    const { token } = await createUserAndToken(app, request, { role: 'admin' });

    const res = await request(app)
      .delete(`/api/volunteers/${createRes.body.data.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
