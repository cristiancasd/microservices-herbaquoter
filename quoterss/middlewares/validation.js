const { validationResult } = require("express-validator");
const { RequestValidationError } = require("../errors/request-validation-errors");

//Recoge los errores y los manifiesta o deja pasar en caso que no haya errores
const validation = (req, res, next) => {

    //console.log('en validation')
    const errors = validationResult(req);



   /**/ if (!errors.isEmpty()) {
        throw err = new RequestValidationError(errors.array());
    }

    next();
}



module.exports = {
    validation
}
