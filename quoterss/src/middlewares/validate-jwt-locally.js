const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/auth-error');
require('colors');

const validateJwtLocally = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    const err = new AuthError('Token is missing,');
    return next(err);
  }
  try {
    const tokenAdapted = token.replace('Bearer ', '');
    const user = jwt.verify(tokenAdapted, process.env.JWT_SECRET);

    req.user = user;
    req.userRol = user.rol;

    next();
  } catch (error) {
    console.log('error', error);
    const err = new AuthError('Token not vaild, ');
    return next(err);
  }
};

module.exports = {
  validateJwtLocally,
};
