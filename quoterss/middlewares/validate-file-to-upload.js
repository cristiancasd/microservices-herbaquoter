const { response } = require("express");
const { validationResult } = require("express-validator");
const { UploadFileError } = require("../errors/upload-file-error");
 
const validateImageToUpload=(req,res=response, next)=>{
    const errors=validationResult(req)
    if(errors.isEmpty()){
        console.log('estoy en validateImageToUpload')
        console.log('validateImageToUpload req.files', req.files);


        if(!req.files ){
            const err= new UploadFileError('File dont exist,');
            return next(err)
        }

        const {archivo}=req.files;  
        if (Object.keys(req.files).length === 0 || !archivo) {
            const err= new UploadFileError('File name archivo dont exist,');
            return next(err)
        } 

        const validExtensions=['png','jpg','jpeg'];
        const dividedName = archivo.name.split('.'); 
        const extension = dividedName[dividedName.length-1];

        if(!validExtensions.includes(extension)){
            const err= new UploadFileError(`The extension must be ${validExtensions},`);
            return next(err)
        };
    }
  
    next()
}
module.exports={
    validateImageToUpload
}