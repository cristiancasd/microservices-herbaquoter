const request = require('supertest');




const path= require('path')
const axios= require('axios')
const { app } = require('../app2');

//const Product = require("../models/Products");
//const Quoter = require('../models/quoters');

const Product = require("../src/models/Products");
const Quoter = require('../src/models/Quoters');

const { initialData } = require('../static/data/quoters-data');



const quoterCorrect2= {
    title: 'AMIGAAAA',
    description: 'AMIGAAAA',
    image:'',
    products:[
        {
            "sku":"0146",
            "quantity":8
        }
    ]
}

const quoterCorrect= {
    title: 'Amigaaaaa2',
    description: 'Amigaaaaa2',
    image:'',
    products:[
        {
            "sku":"0789",
            "quantity":8
        },
        {
            "sku":"6585",
            "quantity":3
        }
    ]
}

const quoterCorrect3= {
    title: 'quoter3',
    description: 'quoter3',
    image:'',
    products:[
        {
            "sku":"0146",
            "quantity":8
        },
        {
            "sku":"0290",
            "quantity":3
        }
    ]
}

const quoterCorrect4= {
    title: "quoter4",
    description: "quoter4",
    image:'',
    products:[
        {
            "sku":"0146",
            "quantity":8
        },
        {
            "sku":"0290",
            "quantity":3
        }
    ]
}

const quoterCorrect5= {
    title: "quoter5",
    description: "quoter5",
    image:'',
    products:[
        {
            "sku":"0146",
            "quantity":8
        }
    ]
}

const quoterBadWithoutTitle= {
    //title: 'pruebaBad',
    image:'',
    products:[
        {
            "sku":"0146",
            "quantity":8
        }
    ]
}

const quoterBadWithoutImage= {
    title: 'pruebaBad',
    //image:'',
    products:[
        {
            "sku":"0146",
            "quantity":8
        }
    ]
}

const quoterWithProductArrayBad={
    title: 'pruebaBad',
    image: '',
    products:[
        {
            "skupd":"0146",
            "quantity":8
        }
    ]
}



const signinTest= async () =>{

    // The user admin must exist and be active in the DB Nest

    const {data}= await axios.post(
        'http://localhost:3005/api/auth/login',
        {
            "email": process.env.ADMIN_NEST_EMAIL,
            "password": process.env.ADMIN_NEST_PASSWORD,
        }
    );
    return data
}

const signinTestUser= async () =>{

    // The user admin must exist and be active in the DB Nest

    const {data}= await axios.post(
        'http://localhost:3005/api/auth/login',
        {
            "email": process.env.USER_NEST_EMAIL,
            "password": process.env.USER_NEST_PASSWORD,
        }
    );
    return data

}

const signinTestSuperAdmin= async () =>{

    // The user admin must exist and be active in the DB Nest

    const {data}= await axios.post(
        'http://localhost:3005/api/auth/login',
        {
            "email": process.env.SUPER_NEST_EMAIL,
            "password": process.env.SUPER_NEST_PASSWORD,
        }
    );
    return data
}


const globalCreateQuoter = async (quot, token) => {
    const quoter= await request(app)
        .post('/api/quoters/create')
        .send(quot)
        .set('Authorization', `Bearer ${token}`);
        expect(quoter.statusCode).toBe(201);

    return quoter.body[0];
};


const globalDeleteAllQuoterByUser=  async (idUser, token) => {
    await request(app)
        .delete('/api/quoters/deleteallbyuser/'+idUser)
        .set('Authorization', `Bearer ${token}`);
 
};

/*
const globalDeleteQuoter = async (idToDelete, token) => {
    await request(app)
         .delete('/api/quoters/delete/'+idToDelete)
         .set('Authorization', `Bearer ${token}`);
        //expect(response.statusCode).toBe(200);
};
*/
const randomUUID='c16ca228-cef4-453d-b007-7e2383eb894f';

let user={};
let admin={};
let super_admin={};

let tokenAdmin='';
let tokenUser='';
let tokenSuperAdmin='';


let idQuoterAdmin=''
let idQuoterUser=''

const sequelize = require('../src/config/database');


beforeAll(async () => {

    await sequelize.sync();


    const infoAdmin= await signinTest();
    tokenAdmin= infoAdmin.token;
    admin= infoAdmin.user;

    const infoUser= await signinTestUser();
    tokenUser=infoUser.token;
    user= infoUser.user;

    const infoSuper= await signinTestSuperAdmin();
    tokenSuperAdmin=infoUser.token;
    super_admin=infoSuper.user;

    //await globalDeleteAllQuoterByUser(admin.id, tokenAdmin)
    //await globalDeleteAllQuoterByUser(user.id, tokenUser)
    //await globalDeleteAllQuoterByUser(super_admin.id, tokenSuperAdmin)
  });


beforeEach(async() => {
    const quoterAdmin= await globalCreateQuoter(quoterCorrect2, tokenAdmin);
    idQuoterAdmin=quoterAdmin.id;
});

afterEach(async() => {

    await Quoter.destroy({where: {}}); 

    //await globalDeleteAllQuoterByUser(admin.id,tokenAdmin);
    //await globalDeleteAllQuoterByUser(user.id,tokenUser);
    //await globalDeleteAllQuoterByUser(super_admin.id,tokenSuperAdmin);
});



//const dbConnection = require('../database/config');
afterAll(async () => {
    //await dbConnection.close();
    await sequelize.close();
    //return clearCityDatabase();
});



//********************* GET ALL QUOTER ***************************** 
describe('GET /api/quoters', () =>{
    test('should respond with a 200 status code', async()=>{
       const response= await request(app).get('/api/quoters').send();
       expect(response.statusCode).toBe(200);
    });

    test('should respond 200 - array', async()=>{
        const response= await request(app).get('/api/quoters').send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array)
     });
});




//********************* GET QUOTER BY USER ************************* 
describe('GET /api/quoters/idQuoter', () =>{

    test('should respond array 200', async()=>{
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

/*
*/








//********************* GET QUOTER BY ID ***************************** 
describe('GET /api/quoters/idQuoter', () =>{

    it('GET QUOTER BY ID should respond array', async()=>{
        const response= await request(app).get('/api/quoters/'+idQuoterAdmin).send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);

        expect(response.body[0].id).toBeDefined();
        expect(response.body[0].id).toEqual(idQuoterAdmin);

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
        const response= await request(app)
         .delete('/api/quoters/delete/'+'badIDQuoter')
         .set('Authorization', `Bearer ${tokenAdmin}`);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message && response.body.errors[0].message).toBeDefined();
     }); 

     it('Bad Data (ID quoter  UUIID dont exist) should respond with a 404 status code', async()=>{
        const response= await request(app)
         .delete('/api/quoters/delete/'+randomUUID)
         .set('Authorization', `Bearer ${tokenAdmin}`);
        expect(response.statusCode).toBe(404);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
     }); 

     it('Bad Data (Token User try delete other quoter different his) should respond with a 403 status code', async()=>{
        const response= await request(app)
         .delete('/api/quoters/delete/'+idQuoterAdmin)
         .set('Authorization', `Bearer ${tokenUser}`);
        expect(response.statusCode).toBe(403);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
     });

     it('Good deleted, should respond with a 200 status code', async()=>{
        const response= await request(app)
         .delete('/api/quoters/delete/'+idQuoterAdmin)
         .set('Authorization', `Bearer ${tokenAdmin}`);
        expect(response.statusCode).toBe(200);
    });
});


//******************** DELETE ALL QUOTER BY USER  ********************
describe('DELETE /api/quoters/deleteallbyuser/', ()=>{

    it('show error if the user is not authenticate', async()=>{
        const quoterUser= await globalCreateQuoter(quoterCorrect4, tokenUser);
        const quoterAdmin=  await globalCreateQuoter(quoterCorrect4, tokenAdmin);

        const response= await request(app)
         .delete('/api/quoters/deleteallbyuser/'+user.id)
        // .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(401);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
    })

    it('show error if the idUser is incorrect', async()=>{
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
        const quoterUser= await globalCreateQuoter(quoterCorrect3, tokenUser);
        const quoterUser1= await globalCreateQuoter(quoterCorrect4, tokenUser);
        const quoterUser2= await globalCreateQuoter(quoterCorrect5, tokenUser);
        
        const quoterAdmin=  await globalCreateQuoter(quoterCorrect4, tokenAdmin);

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
/*
*/

//todo  *************** Upload image ********************************