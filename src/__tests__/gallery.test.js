const path = require('path');
const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { createUserAndToken } = require('./helpers/auth');

afterAll(async () => {
  await sequelize.close();
});

const fixture = path.join(__dirname, 'fixtures', 'test-image.png');

describe('POST /api/gallery', () => {
  // No file attached here: `protect`/`adminOnly` run before multer parses the
  // body, so the guard rejects before the upload stream is consumed. Attaching
  // a file to these requests causes the client connection to reset.
  it('rejects requests with no token', async () => {
    const res = await request(app).post('/api/gallery').send({ title: 'No Auth' });
    expect(res.status).toBe(401);
  });

  it('rejects requests from a non-admin user', async () => {
    const { token } = await createUserAndToken(app, request);
    const res = await request(app)
      .post('/api/gallery')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Non Admin' });
    expect(res.status).toBe(403);
  });

  it('uploads a gallery image as admin', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    const res = await request(app)
      .post('/api/gallery')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Gallery Image')
      .field('category', 'events')
      .attach('image', fixture);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Gallery Image');

    const listRes = await request(app).get('/api/gallery');
    expect(listRes.status).toBe(200);
    expect(listRes.body.data.find((g) => g.title === 'Gallery Image')).toBeDefined();
  });
});
