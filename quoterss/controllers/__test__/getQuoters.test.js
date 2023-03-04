const request = require('supertest');


const path= require('path')
const axios= require('axios')
const { app } = require('../../app');

const sequelize = require('../../src/config/database');
const Quoter = require('../../src/models/Quoters');
const Product = require('../../src/models/Products');

const { initialData } = require('../../static/data/quoters-data');
const  { testData }  =    require('../../static/testData/testData');
const testDataPro=testData()
const {quoterCorrect, quoterCorrect2, quoterCorrect3, quoterCorrect4, quoterBadWithoutTitle,quoterBadWithoutImage,quoterWithProductArrayBad }=testDataPro

const { adminData, 
   tokens,
   //idQuoterAdminData,
 } = require('../../src/test/setup-jest');

const randomUUID='c16ca228-cef4-453d-b007-7e2383eb894f';

const globalCreateQuoter = async (quot, token) => {
    
   const quoter= await request(app)
       .post('/api/quoters/create')
       .send(quot)
       .set('Authorization', `Bearer ${token}`);
       expect(quoter.statusCode).toBe(201);

   return quoter.body[0];
};


//********************* GET ALL QUOTER ***************************** 
describe('GET /api/quoters', () =>{
    test('should respond with a 200 status code', async()=>{
      const {tokenUser, tokenAdmin}=  tokens();

      await globalCreateQuoter(quoterCorrect2, tokenAdmin);

       const response= await request(app).get('/api/quoters').send();
       expect(response.statusCode).toBe(200);
       expect(response.body).toBeInstanceOf(Array)
    });

    /*test('should respond 200 - array', async()=>{
      const {tokenUser, tokenAdmin}=  tokens();

      const quoterAdmin= await globalCreateQuoter(quoterCorrect2, tokenAdmin);
        const response= await request(app).get('/api/quoters').send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array)
     });*/
});


//********************* GET QUOTER BY USER ************************* 
describe('GET QUOTER BY USER /api/quoters/idQuoter', () =>{
   
    test('should respond array 200', async()=>{
      
      const {tokenUser, tokenAdmin}=  tokens();
        await globalCreateQuoter(quoterCorrect2, tokenAdmin);
        let admin=   adminData();

        console.log(' 888888888888888888', tokenAdmin, admin)

        const response= await request(app).get('/api/quoters/iduser/'+admin.id).send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0].id).toBeDefined();
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].description).toBeDefined();
        expect(response.body[0].image).toBeDefined();
        expect(response.body[0].products).toBeDefined();
        expect(response.body[0].products).toBeInstanceOf(Array);
        //expect(response.body[0].products[0].idProduct).toBeDefined();
        expect(response.body[0].products[0].sku).toBeDefined();
        expect(response.body[0].products[0].quantity).toBeDefined();

     });

     test('bad UUID should respond array (empty) 200', async()=>{

        const response= await request(app).get('/api/quoters/iduser/'+randomUUID).send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(!response.body[0]).toEqual(true);
     });

     test('bad ID should respond 400', async()=>{
        const response= await request(app).get('/api/quoters/iduser/'+'dfsdf5545').send();
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
       expect(response.body.errors).toBeDefined();
       expect(response.body.errors[0].message && response.body.errors[0].field).toBeDefined();
     });

});

//********************* GET QUOTER BY ID ***************************** 

describe('GET QUOTER BY ID /api/quoters/idQuoter', () =>{

    it('GET QUOTER BY ID should respond array', async()=>{

        //let idQuoterAdmin=  await idQuoterAdminData();
        const {tokenUser, tokenAdmin}=  tokens();

        const quoterAdmin= await globalCreateQuoter(quoterCorrect2, tokenAdmin);

        const response= await request(app).get('/api/quoters/'+quoterAdmin.id).send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);

        expect(response.body[0].id).toBeDefined();
        expect(response.body[0].id).toEqual(quoterAdmin.id);

        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].description).toBeDefined();
        expect(response.body[0].image).toBeDefined();
        expect(response.body[0].products).toBeDefined();
        expect(response.body[0].products).toBeInstanceOf(Array);

        //expect(response.body[0].products[0].idProduct).toBeDefined();
        expect(response.body[0].products[0].sku).toBeDefined();
        expect(response.body[0].products[0].quantity).toBeDefined();

     });
});





