const request = require('supertest');
const app = require('../app');
const { sequelize, MarketplaceItem } = require('../models');
const { createUserAndToken } = require('./helpers/auth');

afterAll(async () => {
  await sequelize.close();
});

// NOTE: marketplaceController.create/update do not accept a `stock` field from
// the request body (stock always defaults to 1 via the model). To set up
// items with stock > 1 for these tests we create via the API, then set the
// stock directly through the Sequelize model.
const createItem = async (sellerToken, overrides = {}) => {
  const res = await request(app)
    .post('/api/marketplace')
    .set('Authorization', `Bearer ${sellerToken}`)
    .field('title', overrides.title || 'Order Item')
    .field('price', overrides.price || '20');

  const item = res.body.data;
  if (overrides.stock !== undefined) {
    await MarketplaceItem.update({ stock: overrides.stock }, { where: { id: item.id } });
    item.stock = overrides.stock;
  }
  return item;
};

describe('POST /api/orders (checkout)', () => {
  it('rejects requests with no token', async () => {
    const res = await request(app).post('/api/orders').send({ items: [{ marketplaceItemId: 1, quantity: 1 }] });
    expect(res.status).toBe(401);
  });

  it('rejects checkout with no items', async () => {
    const { token } = await createUserAndToken(app, request);
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ items: [] });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('places an order and decrements marketplace item stock', async () => {
    const { token: sellerToken } = await createUserAndToken(app, request);
    const item = await createItem(sellerToken, { title: 'Stocked Item', price: '15', stock: 5 });
    expect(item.stock).toBe(5);

    const { token: buyerToken } = await createUserAndToken(app, request);
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send({
        items: [{ marketplaceItemId: item.id, quantity: 2 }],
        shippingAddress: '123 Main St',
        phone: '0771234567',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.items.length).toBe(1);
    expect(res.body.data.items[0].quantity).toBe(2);
    expect(parseFloat(res.body.data.totalAmount)).toBe(30);

    const itemRes = await request(app).get(`/api/marketplace/${item.id}`);
    expect(itemRes.body.data.stock).toBe(3);
    expect(itemRes.body.data.isAvailable).toBe(true);
  });

  it('marks an item unavailable when stock reaches zero', async () => {
    const { token: sellerToken } = await createUserAndToken(app, request);
    const item = await createItem(sellerToken, { title: 'Last Item', price: '15', stock: 1 });

    const { token: buyerToken } = await createUserAndToken(app, request);
    await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send({ items: [{ marketplaceItemId: item.id, quantity: 1 }] });

    const itemRes = await request(app).get(`/api/marketplace/${item.id}`);
    expect(itemRes.status).toBe(404); // no longer available, public getOne 404s
  });

  it('rejects checkout when quantity exceeds stock', async () => {
    const { token: sellerToken } = await createUserAndToken(app, request);
    const item = await createItem(sellerToken, { title: 'Low Stock Item', price: '15', stock: 1 });

    const { token: buyerToken } = await createUserAndToken(app, request);
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send({ items: [{ marketplaceItemId: item.id, quantity: 5 }] });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe('GET /api/orders/my-orders', () => {
  it('rejects requests with no token', async () => {
    const res = await request(app).get('/api/orders/my-orders');
    expect(res.status).toBe(401);
  });

  it("returns the buyer's orders", async () => {
    const { token: sellerToken } = await createUserAndToken(app, request);
    const item = await createItem(sellerToken, { title: 'My Order Item', price: '10', stock: 3 });

    const { token: buyerToken } = await createUserAndToken(app, request);
    await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send({ items: [{ marketplaceItemId: item.id, quantity: 1 }] });

    const res = await request(app)
      .get('/api/orders/my-orders')
      .set('Authorization', `Bearer ${buyerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
  });
});

describe('GET /api/orders/my-sales', () => {
  it("returns the seller's sales", async () => {
    const { token: sellerToken } = await createUserAndToken(app, request);
    const item = await createItem(sellerToken, { title: 'Sale Item', price: '10', stock: 3 });

    const { token: buyerToken } = await createUserAndToken(app, request);
    await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send({ items: [{ marketplaceItemId: item.id, quantity: 1 }] });

    const res = await request(app)
      .get('/api/orders/my-sales')
      .set('Authorization', `Bearer ${sellerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.find((i) => i.title === 'Sale Item')).toBeDefined();
  });
});

describe('PATCH /api/orders/:id/status', () => {
  it('allows the seller to update order status', async () => {
    const { token: sellerToken } = await createUserAndToken(app, request);
    const item = await createItem(sellerToken, { title: 'Status Item', price: '10', stock: 3 });

    const { token: buyerToken } = await createUserAndToken(app, request);
    const orderRes = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send({ items: [{ marketplaceItemId: item.id, quantity: 1 }] });

    const res = await request(app)
      .patch(`/api/orders/${orderRes.body.data.id}/status`)
      .set('Authorization', `Bearer ${sellerToken}`)
      .send({ status: 'shipped' });

    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('shipped');
  });

  it('rejects updates from a user who is neither buyer, seller, nor admin', async () => {
    const { token: sellerToken } = await createUserAndToken(app, request);
    const item = await createItem(sellerToken, { title: 'Guarded Item', price: '10', stock: 3 });

    const { token: buyerToken } = await createUserAndToken(app, request);
    const orderRes = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send({ items: [{ marketplaceItemId: item.id, quantity: 1 }] });

    const { token: strangerToken } = await createUserAndToken(app, request);
    const res = await request(app)
      .patch(`/api/orders/${orderRes.body.data.id}/status`)
      .set('Authorization', `Bearer ${strangerToken}`)
      .send({ status: 'shipped' });

    expect(res.status).toBe(403);
  });
});
