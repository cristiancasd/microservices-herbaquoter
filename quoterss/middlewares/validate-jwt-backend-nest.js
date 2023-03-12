const axios= require('axios');
const { AuthError } = require('../errors/auth-error');
const { ServiceUnvailableError } = require('../errors/service-unvailable-error');
require('colors')



const validateJWTbackendNest= async (req,res,next)=>{
    const tokenToReview=req.header('Authorization');
  

    try{
        if(!tokenToReview){
            const err= new AuthError('Token missing, ')
            return next(err)
       }

       const baseUrl=process.env.STAGE==='dev'
        ? process.env.AXIOS_URL_BACKEND_USERS_DEV
        : process.env.AXIOS_URL_BACKEND_USERS 

        console.log('baseURL ', baseUrl)
        
        console.log('token to review: ')
        console.log(tokenToReview)

        const config = {
            headers: { Authorization: tokenToReview }
        };
            
        const bodyParameters = {
            key: "value"
        };
        const {data}= await axios.post(
        //'http://auth-products-srv:3009/api/auth/check-renew-token', 
          baseUrl,
          bodyParameters,
          config
        )

        console.log('respues del backend: ',data)
        
        req.user=data.user
        req.userRol=data.user.rol
        next()
    }catch(error){
        console.log('hubo un error validando el JWT', error)
        if(error.response)console.log(error.response.data)
        const err= (error.response)
            ? new AuthError('Token not vaild, ')
            : new ServiceUnvailableError('Backend Auth Error, ')
        return next(err)
    }  
}

module.exports={
    validateJWTbackendNest
}