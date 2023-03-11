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
const {quoterCorrect, quoterCorrect2, quoterCorrect3, quoterCorrect4, quoterCorrect5, quoterBadWithoutTitle,quoterBadWithoutImage,quoterWithProductArrayBad }=testDataPro

const { globalCreateQuoter, adminData, idQuoterAdminData, userData, tokens } = require('../../src/test/setup-jest');

const randomUUID='c16ca228-cef4-453d-b007-7e2383eb894f';

//********************* BAD request uRL ***************************** 
describe('All bad request /apppi',  () =>{
    test('GET should respond with a 404 status code', async()=>{
        const response= await request(app)
         .get('/apppi')
        expect(response.statusCode).toBe(404);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
    }); 

    test('POST should respond with a 404 status code', async()=>{
        const response= await request(app)
         .post('/apppi')
        expect(response.statusCode).toBe(404);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
    }); 

    test('DELETE should respond with a 404 status code', async()=>{
        const response= await request(app)
         .delete('/apppi')
        expect(response.statusCode).toBe(404);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
    }); 

    test('UPDATE should respond with a 404 status code', async()=>{
        const response= await request(app)
         .put('/apppi')
        expect(response.statusCode).toBe(404);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
    }); 
})

//*********************** default quoters **********************************
describe('GET default quoter /default',  () =>{
    it('should respond 200 - array', async()=>{
        const response= await request(app).get('/api/quoters/default').send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array)
     });

     it('the response must be equal to the original data default', async()=>{
        const response= await request(app).get('/api/quoters/default').send();
        const loseweight=initialData();
        response.body.map((quoterDefault,count)=>{
            expect(quoterDefault.title).toEqual(loseweight[count].title)
            expect(quoterDefault.description).toEqual(loseweight[count].description)
            expect(quoterDefault.products).toEqual(loseweight[count].products)
            expect(path.basename(quoterDefault.image)).toEqual(loseweight[count].image)
        })
     });
})