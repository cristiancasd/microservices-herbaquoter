const custom_error = require("./custom-error");
class NotFoundError extends custom_error.CustomError {
    constructor(data='') {
        super('Route not found');
        this.status = 404;
        this.data=data;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeErrors() {
        return [{ message: this.data+' Not Found' }];
    } 
}
exports.NotFoundError = NotFoundError;
