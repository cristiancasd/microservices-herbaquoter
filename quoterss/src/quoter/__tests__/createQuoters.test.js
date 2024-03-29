const request = require('supertest');
const { app } = require('../../app');
const Quoter = require('../Quoters');
const Product = require('../Products');

const { testData } = require('../../static/testData/testData');
const testDataPro = testData();
const { quoterCorrect, quoterCorrect5, quoterBadWithoutTitle, quoterBadWithoutImage, quoterWithProductArrayBad } =
  testDataPro;

const { globalCreateQuoter, tokens } = require('../../test/setup-jest');

describe('CREATE QUOTER - POST /api/quoters/create', () => {
  it('should respond with a 200 status code', async () => {
    const { tokenAdmin } = tokens();
    const quoter = await request(app) 
      .post('/api/quoters/create')
      .send(quoterCorrect)
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(quoter.statusCode).toBe(201);
    expect(quoter.body).toBeInstanceOf(Array);
    expect(quoter.body[0].id).toBeDefined();
    expect(quoter.body[0].title).toBeDefined();
    expect(quoter.body[0].description).toBeDefined();
    expect(quoter.body[0].image).toBeDefined();
    expect(quoter.body[0].products).toBeDefined();
    expect(quoter.body[0].products).toBeInstanceOf(Array);
    expect(quoter.body[0].products[0].sku).toBeDefined();
    expect(quoter.body[0].products[0].quantity).toBeDefined();
  });

  it('data correctly saved in DB', async () => {
    const { tokenAdmin } = tokens();
    const response = await globalCreateQuoter(quoterCorrect5, tokenAdmin);
    const idNewQuoter = response.id;
    const quoterDB = await Quoter.findAll({
      where: { $id$: idNewQuoter },
      include: [{ model: Product, as: 'products' }],
    });
    expect(quoterDB).toBeInstanceOf(Array);
    expect(quoterDB[0].title).toEqual(quoterCorrect5.title);
    expect(quoterDB[0].description).toEqual(quoterCorrect5.description);
    expect(quoterDB[0].image).toEqual(quoterCorrect5.image);
    expect(quoterDB[0].products).toBeDefined();
    expect(quoterDB[0].products).toBeInstanceOf(Array);
    expect(quoterDB[0].products[0].sku).toEqual(quoterCorrect5.products[0].sku);
    expect(quoterDB[0].products[0].quantity).toEqual(quoterCorrect5.products[0].quantity);
  });

  it('bad data (title already exist) should respond with a 400 status code', async () => {
    const { tokenAdmin } = tokens();
    await globalCreateQuoter(quoterCorrect, tokenAdmin);
    const response = await request(app)
      .post('/api/quoters/create')
      .send(quoterCorrect)
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBeDefined();
  });

  it('Bad data(Title) should respond with a 400 status code', async () => {
    const { tokenAdmin } = tokens();
    const response = await request(app)
      .post('/api/quoters/create')
      .send(quoterBadWithoutTitle)
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message && response.body.errors[0].field).toBeDefined();
  });

  it('Bad data(Image) should respond with a 400 status code', async () => {
    const { tokenAdmin } = tokens();
    const response = await request(app)
      .post('/api/quoters/create')
      .send(quoterBadWithoutImage)
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(response.statusCode).toBe(400);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message && response.body.errors[0].field).toBeDefined();
  });

  it('Bad data(Product Array) should respond with a 400 status code', async () => {
    const { tokenAdmin } = tokens();
    const response = await request(app)
      .post('/api/quoters/create')
      .send(quoterWithProductArrayBad)
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(response.statusCode).toBe(400);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBeDefined();
  });

  it('Bad Data (Empty Athorization) should respond with a 401 status code', async () => {
    const response = await request(app).post('/api/quoters/create').send(quoterCorrect);
    //.set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(401);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBeDefined();
  });

  it('Bad Data (bad JWT) should respond with a 401 status code', async () => {
    const response = await request(app)
      .post('/api/quoters/create')
      .send(quoterCorrect)
      .set('Authorization', `Bearer fgdfgdfghdfgdfghdfgf`);
    expect(response.statusCode).toBe(401);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBeDefined();
  });
});
