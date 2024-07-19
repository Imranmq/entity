// tests/entity.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Entity = require('../models/Entity');

beforeAll(async () => {
  await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Entity API', () => {
  it('should create a new entity', async () => {
    const response = await request(app)
      .post('/entity')
      .send({
        name: 'Test Entity',
        type: 'Test Type',
      })
      .expect(201);

    expect(response.body.name).toBe('Test Entity');
  });

  it('should fetch an entity by id', async () => {
    const entity = new Entity({
      name: 'Test Entity',
      type: 'Test Type',
    });
    await entity.save();

    const response = await request(app)
      .get(`/entity/${entity._id}`)
      .expect(200);

    expect(response.body.name).toBe('Test Entity');
  });
});
