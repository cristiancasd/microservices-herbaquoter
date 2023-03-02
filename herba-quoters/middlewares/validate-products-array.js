const { validationResult } = require("express-validator");
const { RequestValidationError } = require("../errors/request-validation-errors");


const validateProductsArray=  (req,res,next)=>{

    const {products}=req.body;
    if(products){


        if(products.length==0) return false
        let arrayOk=true
        
        products.map(product=>{
            const {sku,quantity}=product;
            if (!sku||!quantity) arrayOk=false;
        });

        if(!arrayOk) {
            const errors= validationResult(req);
            if(!errors.isEmpty()) console.log('errors.array()  ', errors.array())

            const productsError= [{
                msg:'each product object must have sku and quantity properties',
                param: 'products'
            }]

            throw (errors.isEmpty()) 
                ? new RequestValidationError(productsError)
                : new RequestValidationError([...errors.array(), ...productsError]);   
        }
    }
    
    next()
}


module.exports={
    validateProductsArray
}