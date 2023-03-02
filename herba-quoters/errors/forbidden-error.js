const custom_error = require("./custom-error");
class ForbidenError extends custom_error.CustomError {
    constructor(data='') {
        super('Forbiden');
        this.status = 403;
        this.data=data;
        Object.setPrototypeOf(this, ForbidenError.prototype);
    }
    serializeErrors() {
        return [{ message: this.data+' Forbidden Access' }];
    } 
}
exports.ForbidenError = ForbidenError;
