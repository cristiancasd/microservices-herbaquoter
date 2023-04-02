const request = require('supertest');
const { app } = require('../../app');
const { testData } = require('../../static/testData/testData');
const FormData = require('form-data');
const fs = require('fs/promises');

const { globalCreateQuoter, tokens } = require('../../test/setup-jest');
const { quoterCorrect } = testData();

const randomUUID = 'c16ca228-cef4-453d-b007-7e2383eb894f';

describe('PUT /api/files-quoters/edit/:id  UPDATE IMAGE', () => {
  it('imageName exist, should respond with a 200 status code', async () => {
    const response = await request(app).get('/api/files-quoters/find/loseweight-full.jpg');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Buffer);
  });

  it('Bad Data (bad JWT) should respond with a 401 status code', async () => {
    const response = await request(app)
      .put('/api/files-quoters/edit/id')
      //.send(quoterCorrect)
      .set('Authorization', `Bearer fgdfgdfghdfgdfghdfgf`);
    expect(response.statusCode).toBe(401);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBeDefined();
  });

  it('Bad Data (id Quoter dont exist) should respond with a 404 status code', async () => {
    const { tokenAdmin } = tokens();
    const response = await request(app)
      .put('/api/files-quoters/edit/' + randomUUID)
      //.send(quoterCorrect)
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBeDefined();
  });

  it('Bad Data (body sended wrong) should respond with a 404 status code', async () => {
    const { tokenAdmin } = tokens();

    const quoter = await globalCreateQuoter(quoterCorrect, tokenAdmin);

    const response = await request(app)
      .put('/api/files-quoters/edit/' + quoter.id)
      .send({})
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(response.statusCode).toBe(400);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBeDefined();
    expect(response.body.errors[0].field).toBeDefined();
  });

  /*
     it('should respond with a 200 status code', async()=>{

        const {tokenAdmin}=  tokens();

        const image = await fs.readFile('./temp.jpg');
        const form = new FormData();
        form.append('archivo', image, 'archivo');


        const quoter = await globalCreateQuoter(quoterCorrect, tokenAdmin);


        const response= await request(app)
         .put('/api/files-quoters/edit/'+quoter.id)
         .send(form)
         .set('Authorization', `Bearer ${tokenAdmin}`)

        expect(response.statusCode).toBe(400);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
        expect(response.body.errors[0].field).toBeDefined();
     });*/
});
