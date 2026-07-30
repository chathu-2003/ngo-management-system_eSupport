const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { createUserAndToken } = require('./helpers/auth');

afterAll(async () => {
  await sequelize.close();
});

// Task creation only exists under the admin-protected routes (src/routes/admin.js).
const createTask = (token, overrides = {}) => request(app)
  .post('/api/admin/tasks')
  .set('Authorization', `Bearer ${token}`)
  .send({
    title: overrides.title || 'Sort Donations',
    description: overrides.description || 'Sort the donated items.',
    category: overrides.category || 'logistics',
  });

describe('GET /api/tasks', () => {
  it('lists active, open tasks', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    await createTask(token, { title: 'Listed Task' });

    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.find((t) => t.title === 'Listed Task')).toBeDefined();
  });
});

describe('GET /api/tasks/:id', () => {
  it('returns 404 for a non-existent task', async () => {
    const res = await request(app).get('/api/tasks/999999');
    expect(res.status).toBe(404);
  });
});

describe('POST /api/tasks/:id/apply', () => {
  it('rejects requests with no token', async () => {
    const { token } = await createUserAndToken(app, request, { role: 'admin' });
    const createRes = await createTask(token, { title: 'Apply Auth Task' });

    const res = await request(app).post(`/api/tasks/${createRes.body.data.id}/apply`).send({});
    expect(res.status).toBe(401);
  });

  it('submits an application for an open task', async () => {
    const { token: adminToken } = await createUserAndToken(app, request, { role: 'admin' });
    const createRes = await createTask(adminToken, { title: 'Applyable Task' });

    const { token: userToken } = await createUserAndToken(app, request);
    const res = await request(app)
      .post(`/api/tasks/${createRes.body.data.id}/apply`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ message: 'I would like to help' });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('applied');
  });

  it('rejects a duplicate application from the same user', async () => {
    const { token: adminToken } = await createUserAndToken(app, request, { role: 'admin' });
    const createRes = await createTask(adminToken, { title: 'Dup Apply Task' });

    const { token: userToken } = await createUserAndToken(app, request);
    await request(app)
      .post(`/api/tasks/${createRes.body.data.id}/apply`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ message: 'First' });

    const res = await request(app)
      .post(`/api/tasks/${createRes.body.data.id}/apply`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ message: 'Second' });

    expect(res.status).toBe(409);
  });

  it('returns 404 when applying to a non-existent task', async () => {
    const { token: userToken } = await createUserAndToken(app, request);
    const res = await request(app)
      .post('/api/tasks/999999/apply')
      .set('Authorization', `Bearer ${userToken}`)
      .send({});
    expect(res.status).toBe(404);
  });
});

describe('GET /api/tasks/my-applications', () => {
  it('rejects requests with no token', async () => {
    const res = await request(app).get('/api/tasks/my-applications');
    expect(res.status).toBe(401);
  });

  it("returns the user's applications", async () => {
    const { token: adminToken } = await createUserAndToken(app, request, { role: 'admin' });
    const createRes = await createTask(adminToken, { title: 'My Apps Task' });

    const { token: userToken } = await createUserAndToken(app, request);
    await request(app)
      .post(`/api/tasks/${createRes.body.data.id}/apply`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ message: 'Pick me' });

    const res = await request(app)
      .get('/api/tasks/my-applications')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    expect(res.body.data[0].task.title).toBe('My Apps Task');
  });
});

describe('PATCH /api/admin/task-applications/:id/status', () => {
  it("flips the task's status to in_progress when an application is accepted", async () => {
    const { token: adminToken } = await createUserAndToken(app, request, { role: 'admin' });
    const createRes = await createTask(adminToken, { title: 'Accept Flow Task' });
    const taskId = createRes.body.data.id;
    expect(createRes.body.data.status).toBe('open');

    const { token: userToken } = await createUserAndToken(app, request);
    const applyRes = await request(app)
      .post(`/api/tasks/${taskId}/apply`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ message: 'Accept me' });

    const acceptRes = await request(app)
      .patch(`/api/admin/task-applications/${applyRes.body.data.id}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'accepted' });

    expect(acceptRes.status).toBe(200);
    expect(acceptRes.body.data.status).toBe('accepted');

    const taskRes = await request(app).get(`/api/tasks/${taskId}`);
    expect(taskRes.body.data.status).toBe('in_progress');
  });

  it('rejects requests from a non-admin user', async () => {
    const { token } = await createUserAndToken(app, request);
    const res = await request(app)
      .patch('/api/admin/task-applications/1/status')
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'accepted' });
    expect(res.status).toBe(403);
  });
});
