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

//********************* PUT QUOTER  ***************************** 
describe('PUT /api/quoters/edit',  () =>{
    

    it('Update fullness (200)', async()=>{
        const {tokenUser, tokenAdmin}=  tokens();

        const dataToUpdate={
            title: 'testing',
            description: '',
            image:'',
            products:[
                {
                    "sku":"146",
                    "quantity":88
                }
            ]
        }
        const quoter = await globalCreateQuoter(quoterCorrect3, tokenAdmin);
       
        const response= await request(app)
            .put('/api/quoters/edit/'+quoter.id)
            .send(dataToUpdate)
            .set('Authorization', `Bearer ${tokenAdmin}`);
            expect(response.statusCode).toBe(200)
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body[0].id).toBeDefined();
            expect(response.body[0].title).toBeDefined();
            expect(response.body[0].description).toBeDefined();
            expect(response.body[0].image).toBeDefined();
            expect(response.body[0].products).toBeDefined();
            expect(response.body[0].products).toBeInstanceOf(Array);
            expect(response.body[0].products[0].sku).toBeDefined();
            expect(response.body[0].products[0].quantity).toBeDefined();

            const quoterDB= await Quoter.findAll({
                where: {'$id$': quoter.id},
                include:[{model: Product,as: 'products',}]
            });

            expect(quoterDB).toBeInstanceOf(Array);
            expect(quoterDB[0].title).toEqual(dataToUpdate.title);
            expect(quoterDB[0].description).toEqual(dataToUpdate.description);
            expect(quoterDB[0].image).toEqual(dataToUpdate.image);
            expect(quoterDB[0].products).toBeDefined();
            expect(quoterDB[0].products).toBeInstanceOf(Array);
            expect(quoterDB[0].products[0].sku).toEqual(dataToUpdate.products[0].sku);
            expect(quoterDB[0].products[0].quantity).toEqual(dataToUpdate.products[0].quantity);

    }); 
    

    //todo: implement dont care upercases
    it('We can not update a repetitive title (400)', async()=>{
        const {tokenUser, tokenAdmin}=  tokens();

        const quoter = await globalCreateQuoter(quoterCorrect5, tokenAdmin);

        const quoter2 = await globalCreateQuoter(quoterCorrect3, tokenAdmin);
       
        const response= await request(app)
         .put('/api/quoters/edit/'+quoter2.id)
         .send({
            title: quoter.title,
            description: '',
            image:'',
            products:[
                {
                    "sku":"0146",
                    "quantity":8,
                },
            ]
         })
         .set('Authorization', `Bearer ${tokenAdmin}`);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();

    });  


    it('Bad data(Product Array) should respond with a 400 status code', async()=>{
        const {tokenUser, tokenAdmin}=  tokens();

        const quoterAdmin = await globalCreateQuoter(quoterCorrect5, tokenAdmin);

    
        const response= await request(app)
         .put('/api/quoters/edit/'+quoterAdmin.id)
         .send(quoterWithProductArrayBad)
         .set('Authorization', `Bearer ${tokenAdmin}`);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
    });  

    it('Bad Data (Empty Athorization) should respond with a 401 status code', async()=>{
        const {tokenUser, tokenAdmin}=  tokens();

        const quoterAdmin = await globalCreateQuoter(quoterCorrect5, tokenAdmin);

        const response= await request(app)
         .put('/api/quoters/edit/'+quoterAdmin.id)
         .send(quoterCorrect)
         //.set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(401);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
    });   

    it('Bad Data (bad JWT) should respond with a 401 status code', async()=>{
        const {tokenUser, tokenAdmin}=  tokens();

        const quoterAdmin = await globalCreateQuoter(quoterCorrect5, tokenAdmin);
        const response= await request(app)
         .put('/api/quoters/edit/'+quoterAdmin.id)
         .send(quoterCorrect)
         .set('Authorization', `Bearer fgdfgdfghdfgdfghdfgf`);
        expect(response.statusCode).toBe(401);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
    }); 

    it('Bad Data (ID quoter no UUIID) should respond with a 400 status code', async()=>{
        const {tokenUser, tokenAdmin}=  tokens();

        const response= await request(app)
         .put('/api/quoters/edit/'+'nc45zxc')
         .set('Authorization', `Bearer ${tokenAdmin}`);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message && response.body.errors[0].message).toBeDefined();
     }); 

     it('Bad Data (ID quoter  UUIID dont exist) should respond with a 400 status code', async()=>{
        const {tokenUser, tokenAdmin}=  tokens();

        const response= await request(app)
         .put('/api/quoters/edit/'+randomUUID)
         .set('Authorization', `Bearer ${tokenAdmin}`);
        expect(response.statusCode).toBe(404);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
     }); 

     it('Bad Data (Token User try delete other quoter different his) should respond with a 403 status code', async()=>{
        const {tokenUser, tokenAdmin}=  tokens();

        const quoterAdmin = await globalCreateQuoter(quoterCorrect5, tokenAdmin);

        const response= await request(app)
         .put('/api/quoters/edit/'+quoterAdmin.id)
         .send(quoterCorrect)
         .set('Authorization', `Bearer ${tokenUser}`)
        expect(response.statusCode).toBe(403);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
     });

});