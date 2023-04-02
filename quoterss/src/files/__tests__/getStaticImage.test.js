const request = require('supertest');
const { app } = require('../../app');

describe('GET /api/files-quoters/find/:imageName FIND STATIC IMAGE', () => {
  it('imageName exist, should respond with a 200 status code', async () => {
    const response = await request(app).get('/api/files-quoters/find/loseweight-full.jpg');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Buffer);
  });

  it('imageName dont exist, should respond with a 404 status code', async () => {
    const response = await request(app).get('/api/files-quoters/find/imageName');
    expect(response.statusCode).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBeDefined();
  });
});
