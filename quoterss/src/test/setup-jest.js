const request = require('supertest');
const { app } = require('../app');
const sequelize = require('../database/config');
const Quoter = require('../quoter/Quoters');

const jwt = require('jsonwebtoken'); //Paquete generar JWT

let defaultUser = { id: '42a7d9c9-4a05-4a36-aeab-33179850d87b', rol: 'user' };
let defaultAdmin = { id: 'e1e70f53-de0d-44f5-968a-ec19c865a23a', rol: 'admin' };
let defaultSuperAdmin = { id: 'b068b3d3-3bc9-426e-a38b-b37acd823f22', rol: 'super_admin' };



let tokenAdmin = '';
let tokenUser = '';
let tokenSuperAdmin = '';

let idQuoterAdmin = '';
let idQuoterUser = '';

const newJWT = (id = '', rol = '') => {
  return new Promise((resolve, reject) => {
    const payload = { id, rol };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '4h', 
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('It can not create new JWT ');
        } else {
          resolve(token);
        }
      }
    );
  });
};

const globalCreateQuoter = async (quot, token) => {
  const quoter = await request(app).post('/api/quoters/create').send(quot).set('Authorization', `Bearer ${token}`);
  expect(quoter.statusCode).toBe(201);

  return quoter.body[0];
};

beforeAll(async () => {
  await sequelize.sync();

  tokenAdmin = await newJWT(defaultAdmin.id, defaultAdmin.rol);
  tokenUser = await newJWT(defaultUser.id, defaultUser.rol);
  tokenSuperAdmin = await newJWT(defaultSuperAdmin.id, defaultSuperAdmin.rol);
});

beforeEach(async () => {
  await Quoter.destroy({ where: {} });
});

afterEach(async () => {
  await Quoter.destroy({ where: {} });
});

afterAll(async () => {
  await sequelize.close();
});

const adminData = () => {
  return defaultAdmin;
};

const userData = () => {
  return defaultUser;
};

const idQuoterAdminData = async () => {
  return idQuoterAdmin;
};

const tokens = () => {
  return { tokenAdmin, tokenUser };
};

module.exports = {
  globalCreateQuoter,
  adminData,
  userData,
  idQuoterAdminData,
  tokens,
};
