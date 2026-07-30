const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { createUserAndToken } = require('./helpers/auth');

afterAll(async () => {
  await sequelize.close();
});

describe('POST /api/contacts', () => {
  it('creates a contact message', async () => {
    const res = await request(app).post('/api/contacts').send({
      name: 'John Contact',
      email: 'john.contact@example.com',
      phone: '0771234567',
      message: 'Hello there',
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('John Contact');
    expect(res.body.data.status).toBe('pending');
  });

  it('rejects a contact message with missing required fields', async () => {
    const res = await request(app).post('/api/contacts').send({ email: 'bad@example.com' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe('GET /api/contacts (admin)', () => {
  it('rejects requests with no token', async () => {
    const res = await request(app).get('/api/contacts');
    expect(res.status).toBe(401);
  });

  it('rejects requests from a non-admin user', async () => {
    const { token } = await createUserAndToken(app, request);
    const res = await request(app).get('/api/contacts').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(403);
  });

  it('returns contacts for an admin user', async () => {
    await request(app).post('/api/contacts').send({
      name: 'Admin List Contact',
      email: 'adminlist.contact@example.com',
      phone: '0771234567',
      message: 'Hello admin',
    });

    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    const res = await request(app).get('/api/contacts').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

describe('PATCH /api/contacts/:id/status', () => {
  it('updates the status as admin', async () => {
    const createRes = await request(app).post('/api/contacts').send({
      name: 'Status Contact',
      email: 'status.contact@example.com',
      phone: '0771234567',
      message: 'Update me',
    });
    const { token } = await createUserAndToken(app, request, { role: 'admin' });

    const res = await request(app)
      .patch(`/api/contacts/${createRes.body.data.id}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'read' });

    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('read');
  });
});

describe('DELETE /api/contacts/:id', () => {
  it('deletes a contact as admin', async () => {
    const createRes = await request(app).post('/api/contacts').send({
      name: 'Delete Contact',
      email: 'delete.contact@example.com',
      phone: '0771234567',
      message: 'Delete me',
    });
    const { token } = await createUserAndToken(app, request, { role: 'admin' });

    const res = await request(app)
      .delete(`/api/contacts/${createRes.body.data.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
