const { validationResult } = require('express-validator');
const { RequestValidationError } = require('../errors/request-validation-errors');

const validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw (err = new RequestValidationError(errors.array()));
  }
  next();
};

module.exports = {
  validation,
};
