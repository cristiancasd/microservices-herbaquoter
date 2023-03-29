
const request = require('supertest');
const { app } = require('../app');
const axios= require('axios')

const sequelize = require('../config/database');
const Quoter = require('../models/Quoters');
const Product = require('../models/Products');

//const  { testData }  =    require('../../static/testData/testData');
const { testData } = require('../static/testData/testData');

const { newJWT } = require('../helpers/newJWT');
const testDataPro=testData()
const {quoterCorrect, quoterCorrect2, quoterCorrect3, quoterCorrect4, quoterBadWithoutTitle,quoterBadWithoutImage,quoterWithProductArrayBad }=testDataPro


let defaultUser={ id: '42a7d9c9-4a05-4a36-aeab-33179850d87b', rol: 'user'};
let defaultAdmin={ id: 'e1e70f53-de0d-44f5-968a-ec19c865a23a', rol: 'admin'};
let defaultSuperAdmin={ id: 'b068b3d3-3bc9-426e-a38b-b37acd823f22', rol: 'super_admin'};

let user={};
let admin={};
let super_admin={};


let tokenAdmin='';
let tokenUser='';
let tokenSuperAdmin='';


let idQuoterAdmin=''
let idQuoterUser=''

const baseUrl='http://localhost:3009/api/auth/login';
const signinTest= async () =>{

    // The user admin must exist and be active in the DB Nest

    const {data}= await axios.post(
        baseUrl,
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
        baseUrl,
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
        baseUrl,
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


beforeAll(async () => {

    await sequelize.sync();

   /* const infoAdmin= await signinTest();
    tokenAdmin= infoAdmin.token;
    admin= infoAdmin.user;

    const infoUser= await signinTestUser();
    tokenUser=infoUser.token;
    user= infoUser.user;

    const infoSuper= await signinTestSuperAdmin();
    tokenSuperAdmin=infoUser.token;
    super_admin=infoSuper.user;
   */

     tokenAdmin = await newJWT(defaultAdmin.id,defaultAdmin.rol)
     tokenUser = await newJWT(defaultUser.id,defaultUser.rol) 
     tokenSuperAdmin = await newJWT(defaultSuperAdmin.id,defaultSuperAdmin.rol) 

    user={ ...defaultUser};
    admin={ ...defaultAdmin};
    super_admin={ ...defaultSuperAdmin};

    console.log('token user es ', tokenUser)
    console.log('token tokenAdmin es ', tokenAdmin)


  });

beforeEach(async() => {
    await Quoter.destroy({where: {}}); 
    //const quoterAdmin= await globalCreateQuoter(quoterCorrect2, tokenAdmin);
    //idQuoterAdmin=quoterAdmin.id;
});

afterEach(async() => {
    await Quoter.destroy({where: {}}); 
});

afterAll(async () => {
    //await dbConnection.close();
    await sequelize.close();
    //return clearCityDatabase();
});



 const adminData=   ()=>{
    return admin
}

const userData=   ()=>{
    return user
}


 const idQuoterAdminData= async ()=>{
    return idQuoterAdmin
}

const tokens=  ()=>{
    return {tokenAdmin, tokenUser}
}


module.exports={
    globalCreateQuoter,
    adminData,
    userData,
    idQuoterAdminData,
    tokens
}