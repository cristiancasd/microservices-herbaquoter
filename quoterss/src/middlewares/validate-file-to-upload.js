const { response } = require('express');
const { validationResult } = require('express-validator');
const { RequestValidationError } = require('../errors/request-validation-errors');

const validateImageToUpload = (req, res = response, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    if (!req.files) {
      //console.log('File dont exist');
      const temp = [
        {
          msg: 'File dont exist',
          param: 'archivo (form-data)',
        },
      ];
      const err = new RequestValidationError(temp);
      return next(err);
    }

    const { archivo } = req.files;
    if (Object.keys(req.files).length === 0 || !archivo) {
      //console.log('File name archivo dont exist');
      const temp = [
        {
          msg: `File name 'archivo' dont exist`,
          param: 'archivo (form-data)',
        },
      ];
      const err = new RequestValidationError(temp);
      return next(err);
    }

    const validExtensions = ['png', 'jpg', 'jpeg'];
    const dividedName = archivo.name.split('.');
    const extension = dividedName[dividedName.length - 1];

    if (!validExtensions.includes(extension)) {
      //console.log(`The extension must be ${validExtensions},`);
      const temp = [
        {
          msg: `The extension must be ${validExtensions}`,
          param: 'archivo (form-data)',
        },
      ];
      const err = new RequestValidationError(temp);
      return next(err);
    }
  }
  next();
};
module.exports = {
  validateImageToUpload,
};
