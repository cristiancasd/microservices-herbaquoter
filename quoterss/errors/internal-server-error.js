const custom_error = require("./custom-error");
class InternalServerError extends custom_error.CustomError {
    constructor(data='') {
        super('Internal Server Error');
        this.status = 500;
        this.data=data;
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
    serializeErrors() {
        return [{ message: this.data+' Internal Server Error' }];
    } 
}
exports.InternalServerError = InternalServerError;