const request = require('supertest');
const app = require('../app');
const { sequelize, User } = require('../models');
const { uniqueEmail } = require('./helpers/auth');

afterAll(async () => {
  await sequelize.close();
});

describe('POST /api/auth/register', () => {
  it('registers a new user and returns a token', async () => {
    const email = uniqueEmail('register');
    const res = await request(app).post('/api/auth/register').send({
      name: 'Jane Doe',
      email,
      password: 'Password123!',
      phone: '0771234567',
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(email);
    expect(res.body.user.role).toBe('user');
  });

  it('rejects duplicate email registration', async () => {
    const email = uniqueEmail('dup');
    await request(app).post('/api/auth/register').send({
      name: 'First', email, password: 'Password123!', phone: '0771234567',
    });

    const res = await request(app).post('/api/auth/register').send({
      name: 'Second', email, password: 'Password123!', phone: '0771234567',
    });

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
  });

  it('rejects registration with missing required fields', async () => {
    const res = await request(app).post('/api/auth/register').send({ email: 'bad@example.com' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe('POST /api/auth/login', () => {
  it('logs in with correct credentials', async () => {
    const email = uniqueEmail('login');
    await request(app).post('/api/auth/register').send({
      name: 'Login User', email, password: 'Password123!', phone: '0771234567',
    });

    const res = await request(app).post('/api/auth/login').send({ email, password: 'Password123!' });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('rejects login with wrong password', async () => {
    const email = uniqueEmail('wrongpw');
    await request(app).post('/api/auth/register').send({
      name: 'WrongPw User', email, password: 'Password123!', phone: '0771234567',
    });

    const res = await request(app).post('/api/auth/login').send({ email, password: 'WrongPassword!' });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('rejects login for a disabled account', async () => {
    const email = uniqueEmail('disabled');
    await User.create({ name: 'Disabled', email, password: 'Password123!', isActive: false });

    const res = await request(app).post('/api/auth/login').send({ email, password: 'Password123!' });

    expect(res.status).toBe(403);
  });
});

describe('GET /api/auth/me', () => {
  it('rejects requests with no token', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.status).toBe(401);
  });

  it('rejects requests with an invalid token', async () => {
    const res = await request(app).get('/api/auth/me').set('Authorization', 'Bearer invalid.token.here');
    expect(res.status).toBe(401);
  });

  it('returns the authenticated user with a valid token', async () => {
    const email = uniqueEmail('me');
    await request(app).post('/api/auth/register').send({
      name: 'Me User', email, password: 'Password123!', phone: '0771234567',
    });
    const loginRes = await request(app).post('/api/auth/login').send({ email, password: 'Password123!' });

    const res = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${loginRes.body.token}`);

    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(email);
  });
});
