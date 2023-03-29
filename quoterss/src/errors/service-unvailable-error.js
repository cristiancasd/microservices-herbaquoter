const custom_error = require("./custom-error");
class ServiceUnvailableError extends custom_error.CustomError {
    constructor(data='') {
        super('Upload file incorrect');
        this.status = 503;
        this.data=data;
        Object.setPrototypeOf(this, ServiceUnvailableError.prototype);
    }
    serializeErrors() {
        return [{ message: this.data+' Service Unvailable' }];
    } 
}
exports.ServiceUnvailableError = ServiceUnvailableError;
