const request = require('supertest');
const { app } = require('../../app');

//const sequelize = require('../../database/config');
const Quoter = require('../Quoters');
const { testData } = require('../../static/testData/testData');

const testDataPro = testData();
const {
  quoterCorrect2,
  quoterCorrect3,
  quoterCorrect4,
  quoterCorrect5,
} = testDataPro;

const { adminData, userData, tokens,globalCreateQuoter } = require('../../test/setup-jest');

const randomUUID = 'c16ca228-cef4-453d-b007-7e2383eb894f';

describe('DELETE QUOTER BY ID /api/quoters/delete', () => {
  it('Bad Data (Empty Athorization) should respond with a 401 status code', async () => {
    const response = await request(app).delete('/api/quoters/delete/' + 'badIDQuoter');
    // .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(401);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBeDefined();
  });

  it('Bad Data (ID quoter no UUIID) should respond with a 401 status code', async () => {
    const { tokenUser, tokenAdmin } = await tokens();

    const response = await request(app)
      .delete('/api/quoters/delete/' + 'badIDQuoter')
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(response.statusCode).toBe(400);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message && response.body.errors[0].message).toBeDefined();
  });

  it('Bad Data (ID quoter  UUIID dont exist) should respond with a 404 status code', async () => {
    const { tokenUser, tokenAdmin } = await tokens();
    const response = await request(app)
      .delete('/api/quoters/delete/' + randomUUID)
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBeDefined();
  });

  it('Bad Data (Token User try delete other quoter different his) should respond with a 403 status code', async () => {
    const user = userData();
    //const idQuoterAdmin= await idQuoterAdminData();
    const { tokenUser, tokenAdmin } = tokens();
    const quoterAdmin = await globalCreateQuoter(quoterCorrect2, tokenAdmin);
    const response = await request(app)
      .delete('/api/quoters/delete/' + quoterAdmin.id)
      .set('Authorization', `Bearer ${tokenUser}`);
    expect(response.statusCode).toBe(403);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBeDefined();
  });

  it('Good deleted, should respond with a 200 status code', async () => {
    //const idQuoterAdmin= await idQuoterAdminData();
    const { tokenAdmin } = tokens();
    const quoterAdmin = await globalCreateQuoter(quoterCorrect2, tokenAdmin);
    const response = await request(app)
      .delete('/api/quoters/delete/' + quoterAdmin.id)
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(response.statusCode).toBe(200);
  });
});

describe('DELETE ALL QUOTERS BY USER /api/quoters/deleteallbyuser/', () => {
  it('show error if the user is not authenticate', async () => {
    const user = userData();
    const { tokenUser, tokenAdmin } = tokens();
    await globalCreateQuoter(quoterCorrect4, tokenUser);
    await globalCreateQuoter(quoterCorrect4, tokenAdmin);
    const response = await request(app).delete('/api/quoters/deleteallbyuser/' + user.id);
    // .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(401);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBeDefined();
  });

  it('show error if the idUser is incorrect', async () => {
    const { tokenUser, tokenAdmin } = tokens();
    const response = await request(app)
      .delete('/api/quoters/deleteallbyuser/' + 'dasdfasklfa')
      .set('Authorization', `Bearer ${tokenUser}`);
    expect(response.statusCode).toBe(400);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBeDefined();
  });

  it('show error if a user try to delete the quoter of other one', async () => {
    let admin = adminData();
    const { tokenUser, tokenAdmin } = tokens();
    const quoterUser = await globalCreateQuoter(quoterCorrect4, tokenUser);
    const quoterAdmin = await globalCreateQuoter(quoterCorrect4, tokenAdmin);
    const response = await request(app)
      .delete('/api/quoters/deleteallbyuser/' + admin.id)
      .set('Authorization', `Bearer ${tokenUser}`);
    expect(response.statusCode).toBe(403);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBeDefined();
  });

  it('show error if dont exist quoters from idUser (404)', async () => {
    const { tokenUser, tokenAdmin } = tokens();
    const response = await request(app)
      .delete('/api/quoters/deleteallbyuser/' + randomUUID)
      .set('Authorization', `Bearer ${tokenUser}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBeDefined();
  });

  it('is ok if a user delete his ournes quoter', async () => {
    let admin = adminData();
    const user = userData();
    const { tokenUser, tokenAdmin } = tokens();
    const quoterUser = await globalCreateQuoter(quoterCorrect3, tokenUser);
    const quoterUser1 = await globalCreateQuoter(quoterCorrect4, tokenUser);
    const quoterUser2 = await globalCreateQuoter(quoterCorrect5, tokenUser);
    const quoterAdmin = await globalCreateQuoter(quoterCorrect4, tokenAdmin);
    const response = await request(app)
      .delete('/api/quoters/deleteallbyuser/' + user.id)
      .set('Authorization', `Bearer ${tokenUser}`);
    expect(response.statusCode).toBe(200);

    const quotersUser = await Quoter.findAll({ where: { idUser: user.id } });
    expect(quotersUser).toBeInstanceOf(Array);
    expect(quotersUser.length).toEqual(0);

    const quotersAdmin = await Quoter.findAll({ where: { idUser: admin.id } });
    expect(quotersAdmin).toBeInstanceOf(Array);
    expect(quotersAdmin.length).not.toEqual(0);
  });

  it('is ok if the admin delete the quoter of anyone user', async () => {
    let admin = adminData();
    const user = userData();

    const { tokenUser, tokenAdmin } = tokens();
    await globalCreateQuoter(quoterCorrect3, tokenUser);
    await globalCreateQuoter(quoterCorrect4, tokenUser);
    await globalCreateQuoter(quoterCorrect5, tokenUser);

    await globalCreateQuoter(quoterCorrect4, tokenAdmin);

    const response = await request(app)
      .delete('/api/quoters/deleteallbyuser/' + user.id)
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(response.statusCode).toBe(200);

    const quotersUser = await Quoter.findAll({ where: { idUser: user.id } });
    expect(quotersUser).toBeInstanceOf(Array);
    expect(quotersUser.length).toEqual(0);

    const quotersAdmin = await Quoter.findAll({ where: { idUser: admin.id } });
    expect(quotersAdmin).toBeInstanceOf(Array);
    expect(quotersAdmin.length).not.toEqual(0);
  });
});
