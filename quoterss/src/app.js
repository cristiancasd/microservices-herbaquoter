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
app.use(express.json()); 
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//routes
app.use('/api/quoters', require('./quoter/quoter.route'));
app.use('/api/files-quoters', require('./files/uploads.route'));
app.use('/doc/quoters', swaggerUI.serve, swaggerUI.setup(docs));
app.all('*', async (req, res, next) => {
  const err = new NotFoundError('Route ');
  next(err);
});

// Middleware errors
app.use(errorHandler);

module.exports = { app };
