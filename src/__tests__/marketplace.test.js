const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { createUserAndToken } = require('./helpers/auth');

afterAll(async () => {
  await sequelize.close();
});

describe('GET /api/marketplace', () => {
  it('lists available items', async () => {
    const { token } = await createUserAndToken(app, request);
    await request(app)
      .post('/api/marketplace')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Handmade Basket')
      .field('price', '25.5');

    const res = await request(app).get('/api/marketplace');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.find((i) => i.title === 'Handmade Basket')).toBeDefined();
  });
});

describe('GET /api/marketplace/:id', () => {
  it('returns 404 for a non-existent item', async () => {
    const res = await request(app).get('/api/marketplace/999999');
    expect(res.status).toBe(404);
  });
});

describe('GET /api/marketplace/vendor/:userId', () => {
  it('returns seller info and listings', async () => {
    const { token, user } = await createUserAndToken(app, request);
    await request(app)
      .post('/api/marketplace')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Vendor Item')
      .field('price', '10');

    const res = await request(app).get(`/api/marketplace/vendor/${user.id}`);
    expect(res.status).toBe(200);
    expect(res.body.data.seller.id).toBe(user.id);
    expect(res.body.data.listings.find((i) => i.title === 'Vendor Item')).toBeDefined();
  });
});

describe('POST /api/marketplace', () => {
  it('rejects requests with no token', async () => {
    const res = await request(app).post('/api/marketplace').send({ title: 'No Auth', price: 10 });
    expect(res.status).toBe(401);
  });

  it('rejects creation with missing required fields', async () => {
    const { token } = await createUserAndToken(app, request);
    const res = await request(app)
      .post('/api/marketplace')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: '' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('creates a marketplace item for an authenticated user', async () => {
    const { token } = await createUserAndToken(app, request);
    const res = await request(app)
      .post('/api/marketplace')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Cool Item')
      .field('description', 'A cool item')
      .field('price', '50')
      .field('category', 'crafts');

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Cool Item');
    expect(res.body.data.stock).toBe(1);
  });
});

describe('PUT /api/marketplace/:id', () => {
  it("rejects updates from a user who does not own the item", async () => {
    const { token: ownerToken } = await createUserAndToken(app, request);
    const createRes = await request(app)
      .post('/api/marketplace')
      .set('Authorization', `Bearer ${ownerToken}`)
      .field('title', 'Owned Item')
      .field('price', '20');

    const { token: otherToken } = await createUserAndToken(app, request);
    const res = await request(app)
      .put(`/api/marketplace/${createRes.body.data.id}`)
      .set('Authorization', `Bearer ${otherToken}`)
      .send({ title: 'Hijacked' });

    expect(res.status).toBe(403);
  });

  it('allows the owner to update their item', async () => {
    const { token } = await createUserAndToken(app, request);
    const createRes = await request(app)
      .post('/api/marketplace')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Editable Item')
      .field('price', '20');

    const res = await request(app)
      .put(`/api/marketplace/${createRes.body.data.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Edited Item' });

    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe('Edited Item');
  });
});

describe('DELETE /api/marketplace/:id', () => {
  it('allows the owner to remove their item', async () => {
    const { token } = await createUserAndToken(app, request);
    const createRes = await request(app)
      .post('/api/marketplace')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Removable Item')
      .field('price', '20');

    const res = await request(app)
      .delete(`/api/marketplace/${createRes.body.data.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);

    const getRes = await request(app).get(`/api/marketplace/${createRes.body.data.id}`);
    expect(getRes.status).toBe(404);
  });
});
