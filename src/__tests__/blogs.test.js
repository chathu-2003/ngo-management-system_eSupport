const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { createUserAndToken } = require('./helpers/auth');

afterAll(async () => {
  await sequelize.close();
});

// Blog creation only exists under the admin-protected routes (src/routes/admin.js).
// The public /api/blogs routes are read-only.
const createBlog = (token, overrides = {}) => request(app)
  .post('/api/admin/blogs')
  .set('Authorization', `Bearer ${token}`)
  .send({
    title: overrides.title || 'A Blog Post',
    content: overrides.content || 'Some content here.',
    status: overrides.status || 'draft',
  });

describe('GET /api/blogs', () => {
  it('only returns published posts, not drafts', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    const publishedRes = await createBlog(token, { title: 'Published Post', status: 'published' });
    const draftRes = await createBlog(token, { title: 'Draft Post', status: 'draft' });

    expect(publishedRes.status).toBe(201);
    expect(draftRes.status).toBe(201);

    const res = await request(app).get('/api/blogs');
    expect(res.status).toBe(200);
    const titles = res.body.data.map((b) => b.title);
    expect(titles).toContain('Published Post');
    expect(titles).not.toContain('Draft Post');
  });
});

describe('GET /api/blogs/:slug', () => {
  it('returns a published post and increments its view count in the database', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    const createRes = await createBlog(token, { title: 'Viewable Post', status: 'published' });
    const { slug } = createRes.body.data;
    expect(createRes.body.data.views).toBe(0);

    // NOTE: blogController.getOne calls `blog.increment('views')` but responds
    // with the same (pre-increment) instance instead of the refreshed one. On
    // MySQL, Sequelize's increment() does not mutate the in-memory instance,
    // so the very response to this request still reports the pre-increment
    // count (0) even though the DB row is now at 1. We verify the real
    // increment took effect by requesting the same slug again, which loads a
    // fresh instance from the DB reflecting the first call's increment.
    const firstRes = await request(app).get(`/api/blogs/${slug}`);
    expect(firstRes.status).toBe(200);
    expect(firstRes.body.data.title).toBe('Viewable Post');
    expect(firstRes.body.data.views).toBe(0);

    const secondRes = await request(app).get(`/api/blogs/${slug}`);
    expect(secondRes.body.data.views).toBe(1);
  });

  it('returns 404 for a draft post slug', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    const createRes = await createBlog(token, { title: 'Hidden Draft', status: 'draft' });
    const { slug } = createRes.body.data;

    const res = await request(app).get(`/api/blogs/${slug}`);
    expect(res.status).toBe(404);
  });

  it('returns 404 for a non-existent slug', async () => {
    const res = await request(app).get('/api/blogs/does-not-exist');
    expect(res.status).toBe(404);
  });
});

describe('POST /api/admin/blogs (auth guard)', () => {
  it('rejects requests with no token', async () => {
    const res = await request(app).post('/api/admin/blogs').send({ title: 'No Auth', content: 'x' });
    expect(res.status).toBe(401);
  });

  it('rejects requests from a non-admin user', async () => {
    const { token } = await createUserAndToken(app, request);
    const res = await request(app)
      .post('/api/admin/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Non Admin', content: 'x' });
    expect(res.status).toBe(403);
  });

  it('auto-generates a slug and sets publishedAt when publishing', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    const res = await createBlog(token, { title: 'Auto Slug Post', status: 'published' });
    expect(res.status).toBe(201);
    expect(res.body.data.slug).toContain('auto-slug-post');
    expect(res.body.data.publishedAt).toBeDefined();
    expect(res.body.data.publishedAt).not.toBeNull();
  });
});
