const custom_error = require("./custom-error");
class UploadFileError extends custom_error.CustomError {
    constructor(data='') {
        super('Upload file incorrect');
        this.status = 400;
        this.data=data;
        Object.setPrototypeOf(this, UploadFileError.prototype);
    }
    serializeErrors() {
        return [{ message: this.data+' file error' }];
    } 
}
exports.uploadFileError = UploadFileError;
