const { join } = require('path');
const fs = require('fs');

const Product = require('../quoter/Products');
const Quoter = require('../quoter/Quoters');

const { deleteImageCloudinary, saveImageOnCloudinary } = require('../helpers/imageManage');
const { NotFoundError } = require('../errors/not-found-error');
const { ForbidenError } = require('../errors/forbidden-error');
const { InternalServerError } = require('../errors/internal-server-error');

const getStaticImage = async (req, res, next) => {
  const { imageName } = req.params;
  console.log('image name is ', imageName);
  let pathImagen = join(__dirname, '../static/images', imageName);
  return fs.existsSync(pathImagen)
    ? res.sendFile(pathImagen)
    : //: res.status(400).json({ message: 'Image dont exists' });
      next(new NotFoundError('Image name dont exist, '));
};

const updateImage = async (req, res, next) => {
  const { id: idQuoter } = req.params;
  const idUser = req.user.id;
  const userRole = req.user.rol;

  console.log('actualizando imagen para el quoter con id ', idQuoter);

  const quoterDb = await Quoter.findAll({
    where: { $id$: idQuoter },
    // include: [{ model: Product, as: 'products', }]
  });

  const quoter = quoterDb[0];

  if (userRole === 'user')
    if (idUser != quoter.idUser) {
      const err = new ForbidenError('You cannot change a quoter of other user, ');
      return next(err);
    }

  try {
    if (quoter.image && quoter.image !== '') deleteImageCloudinary(quoter.image);
    const { secure_url } = await saveImageOnCloudinary(req.files.archivo);

    console.log('listo, imagen guardada');
    await Quoter.upsert({
      id: idQuoter,
      image: secure_url,
    });
    console.log('listo, imagen upsert');

    quoter.image = secure_url;
    console.log('quoter.image', quoter);
    res.json(quoter);
  } catch (err) {
    console.log('el error es ', err);
    const error = new InternalServerError(error + ', ');
    return next(error);
  }
};

module.exports = {
  getStaticImage,
  updateImage,
};
