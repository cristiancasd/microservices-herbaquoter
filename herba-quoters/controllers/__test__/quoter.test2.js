const request = require('supertest');




const path= require('path')
const axios= require('axios')
const { app } = require('../../app');

//const Product = require("../models/Products");
//const Quoter = require('../models/quoters');

//const Product = require("../src/models/Products");
//const Quoter = require('../src/models/Quoters');

const sequelize = require('../../src/config/database');
const Quoter = require('../../src/models/Quoters');
const Product = require('../../src/models/Products');

const { initialData } = require('../../static/data/quoters-data');


const  { testData }  =    require('../../static/testData/testData');
const testDataPro=testData()
const {quoterCorrect, quoterCorrect2, quoterCorrect3, quoterCorrect4,quoterCorrect5, quoterBadWithoutTitle,quoterBadWithoutImage,quoterWithProductArrayBad }=testDataPro


const { adminData, userData, tokens } = require('../../src/test/setup-jest');







const globalCreateQuoter = async (quot, token) => {
    const quoter= await request(app)
        .post('/api/quoters/create')
        .send(quot)
        .set('Authorization', `Bearer ${token}`);
        expect(quoter.statusCode).toBe(201);

    return quoter.body[0];
};




const randomUUID='c16ca228-cef4-453d-b007-7e2383eb894f';



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



//********************* DELETE QUOTER ***************************** 
describe('DELETE /api/quoters/delete',  () =>{ 
    
    it('Bad Data (Empty Athorization) should respond with a 401 status code', async()=>{
        const response= await request(app)
         .delete('/api/quoters/delete/'+'badIDQuoter')
        // .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(401);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
     }); 
 
     it('Bad Data (ID quoter no UUIID) should respond with a 401 status code', async()=>{
       const {tokenUser, tokenAdmin}= await tokens();
 
        const response= await request(app)
         .delete('/api/quoters/delete/'+'badIDQuoter')
         .set('Authorization', `Bearer ${tokenAdmin}`);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message && response.body.errors[0].message).toBeDefined();
     }); 
 
     it('Bad Data (ID quoter  UUIID dont exist) should respond with a 404 status code', async()=>{
       const {tokenUser, tokenAdmin}= await tokens();
        const response= await request(app)
         .delete('/api/quoters/delete/'+randomUUID)
         .set('Authorization', `Bearer ${tokenAdmin}`);
        expect(response.statusCode).toBe(404);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
     }); 
 
     it('Bad Data (Token User try delete other quoter different his) should respond with a 403 status code', async()=>{
       const user=  userData();
       //const idQuoterAdmin= await idQuoterAdminData();
       const {tokenUser, tokenAdmin}=  tokens();
 
       const quoterAdmin= await globalCreateQuoter(quoterCorrect2, tokenAdmin);
 
       const response= await request(app)
         .delete('/api/quoters/delete/'+quoterAdmin.id)
         .set('Authorization', `Bearer ${tokenUser}`);
    
         if(response.statusCode!==403)console.log('******************response1', response)
 
        expect(response.statusCode).toBe(403);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
     });
 
    it('Good deleted, should respond with a 200 status code', async()=>{
       //const idQuoterAdmin= await idQuoterAdminData();
       const {tokenUser, tokenAdmin}=  tokens();
       const quoterAdmin= await globalCreateQuoter(quoterCorrect2, tokenAdmin);
 
        const response= await request(app)
         .delete('/api/quoters/delete/'+quoterAdmin.id)
         .set('Authorization', `Bearer ${tokenAdmin}`);
 
         if(response.statusCode!==200)console.log('******************response2', response)
        expect(response.statusCode).toBe(200);
    });
 });
 
 //******************** DELETE ALL QUOTER BY USER  ********************
 describe('DELETE /api/quoters/deleteallbyuser/', ()=>{
 
    it('show error if the user is not authenticate', async()=>{
 
       const user=  userData();
       const {tokenUser, tokenAdmin}=  tokens();
 
        await globalCreateQuoter(quoterCorrect4, tokenUser);
        await globalCreateQuoter(quoterCorrect4, tokenAdmin);
 
        const response= await request(app)
         .delete('/api/quoters/deleteallbyuser/'+user.id)
        // .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(401);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
    })
 
    it('show error if the idUser is incorrect', async()=>{
       const {tokenUser, tokenAdmin}=  tokens();
 
        const quoterUser= await globalCreateQuoter(quoterCorrect4, tokenUser);
        const quoterAdmin=  await globalCreateQuoter(quoterCorrect4, tokenAdmin);
 
        const response= await request(app)
         .delete('/api/quoters/deleteallbyuser/'+'dasdfasklfa')
         .set('Authorization', `Bearer ${tokenUser}`);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
    })
 
    it('show error if a user try to delete the quoter of other one', async()=>{
       let admin=  await adminData()
 
       const {tokenUser, tokenAdmin}=  tokens();
        const quoterUser= await globalCreateQuoter(quoterCorrect4, tokenUser);
        const quoterAdmin=  await globalCreateQuoter(quoterCorrect4, tokenAdmin);
 
        const response= await request(app)
         .delete('/api/quoters/deleteallbyuser/'+admin.id)
         .set('Authorization', `Bearer ${tokenUser}`);
        expect(response.statusCode).toBe(403);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
    });
 
    it('show error if dont exist quoters from idUser (404)', async()=>{
       const {tokenUser, tokenAdmin}=  tokens();
        const quoterUser= await globalCreateQuoter(quoterCorrect4, tokenUser);
        const quoterAdmin=  await globalCreateQuoter(quoterCorrect4, tokenAdmin);
 
        const response= await request(app)
         .delete('/api/quoters/deleteallbyuser/'+randomUUID)
         .set('Authorization', `Bearer ${tokenUser}`);
 
 
         expect(response.statusCode).toBe(404);
         expect(response.body.errors).toBeDefined();
         expect(response.body.errors[0].message).toBeDefined();
    })
 
    it('It is ok if a user delete his ournes quoter', async()=>{
       let admin=   adminData()
 
       const user=  userData();
       const {tokenUser, tokenAdmin}=  tokens();
 
        const quoterUser= await globalCreateQuoter(quoterCorrect3, tokenUser);
        const quoterUser1= await globalCreateQuoter(quoterCorrect4, tokenUser);
        const quoterUser2= await globalCreateQuoter(quoterCorrect5, tokenUser);
        
        const quoterAdmin=  await globalCreateQuoter(quoterCorrect4, tokenAdmin);
 
        const response= await request(app)
         .delete('/api/quoters/deleteallbyuser/'+user.id)
         .set('Authorization', `Bearer ${tokenUser}`);
         expect(response.statusCode).toBe(200);
 
        
        const quotersUser= await Quoter.findAll({where: {idUser: user.id}});
        expect(quotersUser).toBeInstanceOf(Array);
        expect(quotersUser.length).toEqual(0);
        
 
        const quotersAdmin= await Quoter.findAll({where: {idUser: admin.id}});
        expect(quotersAdmin).toBeInstanceOf(Array);
        expect(quotersAdmin.length).not.toEqual(0);
 
    });
 
    it('It is ok if the admin delete the quoter of anyone user', async()=>{
       let admin=   adminData();
       const user=  userData();
 
       const {tokenUser, tokenAdmin}=  tokens();
        await globalCreateQuoter(quoterCorrect3, tokenUser);
        await globalCreateQuoter(quoterCorrect4, tokenUser);
        await globalCreateQuoter(quoterCorrect5, tokenUser);
        
        await globalCreateQuoter(quoterCorrect4, tokenAdmin);
 
        const response= await request(app)
         .delete('/api/quoters/deleteallbyuser/'+user.id)
         .set('Authorization', `Bearer ${tokenAdmin}`);
         expect(response.statusCode).toBe(200);
 
        const quotersUser= await Quoter.findAll({where: {idUser: user.id}});
        expect(quotersUser).toBeInstanceOf(Array);
        expect(quotersUser.length).toEqual(0);
 
        const quotersAdmin= await Quoter.findAll({where: {idUser: admin.id}});
        expect(quotersAdmin).toBeInstanceOf(Array);
        expect(quotersAdmin.length).not.toEqual(0);
    })
 })
 
 
 
 
 
 
 









/*
//********************* PUT QUOTER  ***************************** 
describe('PUT /api/quoters/edit',  () =>{
    

    it('Update fullness (200)', async()=>{

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

        const quoter = await globalCreateQuoter(quoterCorrect3, tokenAdmin);
       
        const response= await request(app)
         .put('/api/quoters/edit/'+idQuoterAdmin)
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
        const response= await request(app)
         .put('/api/quoters/edit/'+idQuoterAdmin)
         .send(quoterWithProductArrayBad)
         .set('Authorization', `Bearer ${tokenAdmin}`);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
    });  

    it('Bad Data (Empty Athorization) should respond with a 401 status code', async()=>{
        const response= await request(app)
         .put('/api/quoters/edit/'+idQuoterAdmin)
         .send(quoterCorrect)
         //.set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(401);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
    });   

    it('Bad Data (bad JWT) should respond with a 401 status code', async()=>{
        const response= await request(app)
         .put('/api/quoters/edit/'+idQuoterAdmin)
         .send(quoterCorrect)
         .set('Authorization', `Bearer fgdfgdfghdfgdfghdfgf`);
        expect(response.statusCode).toBe(401);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
    }); 

    it('Bad Data (ID quoter no UUIID) should respond with a 400 status code', async()=>{
        const response= await request(app)
         .put('/api/quoters/edit/'+'nc45zxc')
         .set('Authorization', `Bearer ${tokenAdmin}`);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message && response.body.errors[0].message).toBeDefined();
     }); 

     it('Bad Data (ID quoter  UUIID dont exist) should respond with a 400 status code', async()=>{
        const response= await request(app)
         .put('/api/quoters/edit/'+randomUUID)
         .set('Authorization', `Bearer ${tokenAdmin}`);
        expect(response.statusCode).toBe(404);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
     }); 

     it('Bad Data (Token User try delete other quoter different his) should respond with a 403 status code', async()=>{
        const response= await request(app)
         .put('/api/quoters/edit/'+idQuoterAdmin)
         .send(quoterCorrect)
         .set('Authorization', `Bearer ${tokenUser}`)
        expect(response.statusCode).toBe(403);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
     });

});

//********************* CREATE QUOTER ***************************** 
describe('POST /api/quoters/create - Error when send bad data', () =>{ 


    it('should respond with a 200 status code', async()=>{
        const quoter= await request(app)
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
        //expect(quoter.body[0].products[0].idProduct).toBeDefined();
        expect(quoter.body[0].products[0].sku).toBeDefined();
        expect(quoter.body[0].products[0].quantity).toBeDefined();
        //idNewQuoter=quoter.body[0].id;
    });

    it('data correctly saved in DB', async()=>{

        const response = await globalCreateQuoter(quoterCorrect5, tokenAdmin);
        const idNewQuoter=response.id
        const quoterDB= await Quoter.findAll({
            where: {'$id$': idNewQuoter},
            include:[{model: Product,as: 'products',}]
        });
        expect(quoterDB).toBeInstanceOf(Array);
        expect(quoterDB[0].title).toEqual(quoterCorrect5.title);
        expect(quoterDB[0].description).toEqual(quoterCorrect5.description);
        expect(quoterDB[0].image).toEqual(quoterCorrect5.image);
        expect(quoterDB[0].products).toBeDefined();
        expect(quoterDB[0].products).toBeInstanceOf(Array);
        expect(quoterDB[0].products[0].sku).toEqual(quoterCorrect5.products[0].sku);
        expect(quoterDB[0].products[0].quantity).toEqual(quoterCorrect5.products[0].quantity);
    })

    //todo: title repetitive include default quoters

    //todo: implement dont care upercases
    it('bada data (title already exist) should respond with a 400 status code', async()=>{

        await globalCreateQuoter(quoterCorrect, tokenAdmin);
        
        const response= await request(app)
        .post('/api/quoters/create')
        .send(quoterCorrect)
        .set('Authorization', `Bearer ${tokenAdmin}`);
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
    });

    it('Bad data(Title) should respond with a 400 status code', async()=>{
       const response= await request(app)
        .post('/api/quoters/create')
        .send(quoterBadWithoutTitle)
        .set('Authorization', `Bearer ${tokenAdmin}`);
       expect(response.statusCode).toBe(400);
       expect(response.body).toBeInstanceOf(Object);
       expect(response.body.errors).toBeDefined();
       expect(response.body.errors[0].message && response.body.errors[0].field).toBeDefined();
    });     

    it('Bad data(Image) should respond with a 400 status code', async()=>{
        const response= await request(app)
         .post('/api/quoters/create')
         .send(quoterBadWithoutImage)
         .set('Authorization', `Bearer ${tokenAdmin}`);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message && response.body.errors[0].field).toBeDefined();
     });   
     
     it('Bad data(Product Array) should respond with a 400 status code', async()=>{
        const response= await request(app)
         .post('/api/quoters/create')
         .send(quoterWithProductArrayBad)
         .set('Authorization', `Bearer ${tokenAdmin}`);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
     
     });     

     it('Bad Data (Empty Athorization) should respond with a 401 status code', async()=>{
        const response= await request(app)
         .post('/api/quoters/create')
         .send(quoterCorrect)
         //.set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(401);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
     });   

     it('Bad Data (bad JWT) should respond with a 401 status code', async()=>{
        const response= await request(app)
         .post('/api/quoters/create')
         .send(quoterCorrect)
         .set('Authorization', `Bearer fgdfgdfghdfgdfghdfgf`);
        expect(response.statusCode).toBe(401);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
     }); 


});








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

*/

//todo  *************** Upload image ********************************