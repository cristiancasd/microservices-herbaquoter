const request = require('supertest');
const { app } = require('../../app');

const { testData } = require('../../static/testData/testData');
const testDataPro = testData();
const { quoterCorrect2 } = testDataPro;

const { adminData, tokens, globalCreateQuoter } = require('../../test/setup-jest');

const randomUUID = 'c16ca228-cef4-453d-b007-7e2383eb894f';

describe('GET ALL QUOTERS /api/quoters', () => {
  it('should respond with a 200 status code', async () => {
    const { tokenAdmin } = tokens();
    await globalCreateQuoter(quoterCorrect2, tokenAdmin);
    const response = await request(app).get('/api/quoters').send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET QUOTER BY USER /api/quoters/idQuoter', () => {
  it('should respond array 200 status code', async () => {
    const { tokenAdmin } = tokens();
    await globalCreateQuoter(quoterCorrect2, tokenAdmin);
    let admin = adminData();
    const response = await request(app)
      .get('/api/quoters/iduser/' + admin.id)
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0].id).toBeDefined();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].description).toBeDefined();
    expect(response.body[0].image).toBeDefined();
    expect(response.body[0].products).toBeDefined();
    expect(response.body[0].products).toBeInstanceOf(Array);
    expect(response.body[0].products[0].sku).toBeDefined();
    expect(response.body[0].products[0].quantity).toBeDefined();
  });

  it('UUID dont exist in db should respond array (empty) 200', async () => {
    const response = await request(app)
      .get('/api/quoters/iduser/' + randomUUID)
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(!response.body[0]).toEqual(true);
  });

  test('bad ID should respond 400', async () => {
    const response = await request(app)
      .get('/api/quoters/iduser/' + 'dfsdf5545')
      .send();
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message && response.body.errors[0].field).toBeDefined();
  });
});

describe('GET QUOTER BY ID /api/quoters/idQuoter', () => {
  it('should respond array', async () => {
    const { tokenAdmin } = tokens();
    const quoterAdmin = await globalCreateQuoter(quoterCorrect2, tokenAdmin);
    const response = await request(app)
      .get('/api/quoters/findbyid/' + quoterAdmin.id)
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0].id).toBeDefined();
    expect(response.body[0].id).toEqual(quoterAdmin.id);
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].description).toBeDefined();
    expect(response.body[0].image).toBeDefined();
    expect(response.body[0].products).toBeDefined();
    expect(response.body[0].products).toBeInstanceOf(Array);
    expect(response.body[0].products[0].sku).toBeDefined();
    expect(response.body[0].products[0].quantity).toBeDefined();
  });
});
