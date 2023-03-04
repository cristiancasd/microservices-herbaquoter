
const custom_error = require("../errors/custom-error");


const errorHandler = (
    err,
    req,
    res,
    next) => {

    // console.log('el e rror es ---------9999999999-----------', err)


    console.log('en error handler')
    if (err instanceof custom_error.CustomError) {
        console.log(err.serializeErrors())
        return res.status(err.status).send({ errors: err.serializeErrors() });
    }
    console.log('Something went wrong')
    res.status(400).send({

        errors: [{ message: 'Something went wrong' }]
    });

    /*if (res.headersSent) {
        return next(err)
    }
    res.status(err.status).json({
        errors: err.reasons
    });*/

}

module.exports = {
    errorHandler
}