const custom_error = require("./custom-error");
class BadRequestError extends custom_error.CustomError {
    constructor(data='') {
        super('Upload file incorrect');
        this.status = 400;
        this.data=data;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serializeErrors() {
        return [{ message: this.data }];
    } 
}
exports.BadRequestError = BadRequestError;