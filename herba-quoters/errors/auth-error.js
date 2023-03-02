const custom_error = require("./custom-error");
class AuthError extends custom_error.CustomError {
    constructor(data='') {
        super('Unauthorized');
        this.status = 401;
        this.data=data;
        Object.setPrototypeOf(this, AuthError.prototype);
    }
    serializeErrors() {
        return [{ message: this.data+' Auth Error' }];
    } 
}
exports.AuthError = AuthError;
