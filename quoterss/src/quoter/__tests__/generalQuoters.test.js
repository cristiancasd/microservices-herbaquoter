const request = require('supertest');
const path = require('path');
const { app } = require('../../app');

const { initialData } = require('../../static/data/quoters-data');

//********************* BAD request uRL *****************************
describe('All bad request /apppi', () => {
  it('GET should respond with a 404 status code', async () => {
    const response = await request(app).get('/apppi');
    expect(response.statusCode).toBe(404);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBeDefined();
  });

  it('POST should respond with a 404 status code', async () => {
    const response = await request(app).post('/apppi');
    expect(response.statusCode).toBe(404);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBeDefined();
  });

  it('DELETE should respond with a 404 status code', async () => {
    const response = await request(app).delete('/apppi');
    expect(response.statusCode).toBe(404);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBeDefined();
  });

  it('UPDATE should respond with a 404 status code', async () => {
    const response = await request(app).put('/apppi');
    expect(response.statusCode).toBe(404);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBeDefined();
  });
});

//*********************** default quoters **********************************
describe('GET default quoter /default', () => {
  it('should respond 200 - array', async () => {
    const response = await request(app).get('/api/quoters/default').send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('the response must be equal to the original data default', async () => {
    const response = await request(app).get('/api/quoters/default').send();
    const loseweight = initialData();
    response.body.map((quoterDefault, count) => {
      expect(quoterDefault.title).toEqual(loseweight[count].title);
      expect(quoterDefault.description).toEqual(loseweight[count].description);
      expect(quoterDefault.products).toEqual(loseweight[count].products);
      expect(path.basename(quoterDefault.image)).toEqual(loseweight[count].image);
    });
  });
});
