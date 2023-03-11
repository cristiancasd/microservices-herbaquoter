
const custom_error = require("./custom-error");
class RequestValidationError extends custom_error.CustomError {
    constructor(errors) { 
        super('Invalid request parameters');
        this.errors = errors;
        this.status = 400;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.param };
        });
    }
}
exports.RequestValidationError = RequestValidationError;
