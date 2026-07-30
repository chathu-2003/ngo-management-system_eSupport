const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { createUserAndToken } = require('./helpers/auth');

afterAll(async () => {
  await sequelize.close();
});

const futureDate = () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

describe('GET /api/events', () => {
  it('lists active events', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Beach Cleanup')
      .field('date', futureDate());

    const res = await request(app).get('/api/events');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.find((e) => e.title === 'Beach Cleanup')).toBeDefined();
  });
});

describe('GET /api/events/:id', () => {
  it('returns 404 for a non-existent event', async () => {
    const res = await request(app).get('/api/events/999999');
    expect(res.status).toBe(404);
  });
});

describe('POST /api/events', () => {
  it('rejects requests with no token', async () => {
    const res = await request(app).post('/api/events').send({ title: 'No Auth', date: futureDate() });
    expect(res.status).toBe(401);
  });

  it('rejects requests from a non-admin user', async () => {
    const { token } = await createUserAndToken(app, request);
    const res = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Non Admin', date: futureDate() });
    expect(res.status).toBe(403);
  });

  it('rejects creation with missing required fields', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    const res = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: '' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('creates an event as admin', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    const res = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Tree Planting')
      .field('description', 'Plant trees')
      .field('date', futureDate())
      .field('location', 'Central Park');

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Tree Planting');
  });
});

describe('POST /api/events/:id/register', () => {
  it('registers a participant for an event and increments attendees', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    const createRes = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Registerable Event')
      .field('date', futureDate());

    const eventId = createRes.body.data.id;

    const res = await request(app).post(`/api/events/${eventId}/register`).send({
      name: 'Attendee One',
      email: 'attendee.one@example.com',
      phone: '0771234567',
      guests: 2,
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.guests).toBe(2);

    const getRes = await request(app).get(`/api/events/${eventId}`);
    expect(getRes.body.data.attendees).toBe(2);
  });

  it('rejects registration with missing required fields', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    const createRes = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Validation Event')
      .field('date', futureDate());

    const res = await request(app).post(`/api/events/${createRes.body.data.id}/register`).send({ name: '' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('returns 404 when registering for a non-existent event', async () => {
    const res = await request(app).post('/api/events/999999/register').send({
      name: 'Ghost', email: 'ghost@example.com',
    });
    expect(res.status).toBe(404);
  });
});

describe('DELETE /api/events/:id', () => {
  it('soft-deletes an event as admin', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    const createRes = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Delete Event')
      .field('date', futureDate());

    const res = await request(app)
      .delete(`/api/events/${createRes.body.data.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);

    const getRes = await request(app).get(`/api/events/${createRes.body.data.id}`);
    expect(getRes.status).toBe(404);
  });
});
