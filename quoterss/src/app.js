require('express-validator');
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { errorHandler } = require('./middlewares/error-handler');
const { NotFoundError } = require('./errors/not-found-error');

const swaggerUI = require('swagger-ui-express');
const docs = require('./docs');

const app = express();

//middlewares
app.use(cors());
app.use(express.json()); //Lectura y parseo del body
app.use(express.static('public')); //Directorio publico
app.use(
  fileUpload({
    useTempFiles: true,
    //tempFileDir : '/tmp/',
    //createParentPath: true //Si la carpeta no existe la creamos
  })
);

//routes
//app.use('/api/quoters',require('./routes/quoter.route'));
app.use('/api/quoters', require('./quoter/quoter.route'));

//app.use('/api/users',require('./routes/user.route'));
//app.use('/api/files-quoters',require('./files/uploads.route'));
app.use('/api/files-quoters', require('./files/uploads.route'));

app.use('/doc/quoters', swaggerUI.serve, swaggerUI.setup(docs));

app.all('*', async (req, res, next) => {
  const err = new NotFoundError('Route ');
  next(err);
});

// Middleware errors
app.use(errorHandler);

module.exports = { app };
