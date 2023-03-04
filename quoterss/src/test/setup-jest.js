
const request = require('supertest');
const { app } = require('../../app');
const axios= require('axios')

const sequelize = require('../config/database');
const Quoter = require('../models/Quoters');
const Product = require('../models/Products');

const  { testData }  =    require('../../static/testData/testData');
const testDataPro=testData()
const {quoterCorrect, quoterCorrect2, quoterCorrect3, quoterCorrect4, quoterBadWithoutTitle,quoterBadWithoutImage,quoterWithProductArrayBad }=testDataPro



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

    const infoAdmin= await signinTest();
    tokenAdmin= infoAdmin.token;
    admin= infoAdmin.user;

    const infoUser= await signinTestUser();
    tokenUser=infoUser.token;
    user= infoUser.user;

    const infoSuper= await signinTestSuperAdmin();
    tokenSuperAdmin=infoUser.token;
    super_admin=infoSuper.user;

    
    //const quoterAdmin= await globalCreateQuoter(quoterCorrect2, tokenAdmin);
    //idQuoterAdmin=quoterAdmin.id;

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