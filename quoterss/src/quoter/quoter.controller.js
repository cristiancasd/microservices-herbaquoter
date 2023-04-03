require('colors');
const { titleQuoterByUserExist } = require('./utils/dbFinder');
const { initialData } = require('../static/data/quoters-data');
const { deleteImageCloudinary } = require('../helpers/imageManage');
const { ForbidenError } = require('../errors/forbidden-error');

const Product = require('./Products');
const Quoter = require('./Quoters');
const { RequestValidationError } = require('../errors/request-validation-errors');
const { InternalServerError } = require('../errors/internal-server-error');

const findDefaultQuoters = (req, res) => {
  const loseweight = initialData();
  const quotersInitial = loseweight.map((quoter) => {
  const baseUrl = process.env.STAGE === 'dev' ? process.env.HOST_API : process.env.HOST_API_PROD;
    
    return {
      ...quoter,
      image: baseUrl + '/files-quoters/find/' + quoter.image,
    };
  });
  res.status(200).json(quotersInitial);
};

const findQuoter = async (req, res) => {
  try {
    const { id } = req.params;
    const quoter = await Quoter.findAll({
      where: { $id$: id },
      include: [{ model: Product, as: 'products' }],
    });
    res.status(200).json(quoter);
  } catch (err) {
    //console.log('el error es ', err)
    const error = new InternalServerError(err + ', ');
    return next(error);
  }
};

const findAllQuoters = async (req, res) => {
  try {
    const quoters = await Quoter.findAll({
      include: [
        {
          model: Product,
          as: 'products',
        },
      ],
    });
    res.status(200).json(quoters);
  } catch (err) {
    //console.log('el error es ', err)
    const error = new InternalServerError(err + ', ');
    return next(error);
  }
};

const findAllQuotersByUser = async (req, res, next) => {
  const { idUser } = req.params;

  try {
    const quoters = await Quoter.findAll({
      where: { idUser },
      include: [{ model: Product, as: 'products' }],
    });
    res.status(200).json(quoters);
  } catch (err) {
    //console.log('el error en all quoters by user es ', err)
    const error = new InternalServerError(error + ', ');
    return next(error);
  }
};

const createQuoter = async (req, res, next) => {
  const { title, description = '', image = '', products = [] } = req.body;
  const idUser = req.user.id;
  if (await titleQuoterByUserExist(title, idUser)) {
    const temp = [
      {
        msg: 'Title already exist, try with other one',
        param: 'title',
      },
    ];
    const err = new RequestValidationError(temp);
    return next(err);
  }

  const data = {
    title,
    description,
    image,
    idUser,
  };

  try {
    const quoter = new Quoter(data);
    await quoter.save();

    await Promise.all(
      products.map(async (product) => {
        const { sku, quantity } = product;
        const productToAdd = { sku, quantity, quoterId: quoter.id };
        const productsDb = new Product(productToAdd);
        await productsDb.save();
      })
    );

    const quoterFinal = await Quoter.findAll({
      where: { $id$: quoter.id },
      include: [{ model: Product, as: 'products' }],
    });
    res.status(201).json(quoterFinal);
  } catch (error) {
    //console.log('el error es ', { error });
    const err = new InternalServerError(error + ', ');
    return next(err);
  }
};

const updateQuoter = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const idUser = req.user.id;
  const userRole = req.user.rol;

  if (await titleQuoterByUserExist(data.title, idUser, id)) {
    const temp = [
      {
        msg: 'Title already exist, try with other one',
        param: 'title',
      },
    ];
    const err = new RequestValidationError(temp);
    return next(err);
  }

  const quoterDB = await Quoter.findAll({
    where: { $id$: id },
    include: [{ model: Product, as: 'products' }],
  });

  const quoter = quoterDB[0];
  const { id: quoterId } = quoter;

  if (userRole === 'user')
    if (idUser != quoter.idUser) {
      const err = new ForbidenError('You cannot change a quoter of other user, ');
      return next(err);
    }

  const dataToUpload = {
    title: data.title,
    description: data.description,
    image: data.image,
  };

  try {
    await Quoter.upsert({
      id: quoterId,
      ...dataToUpload,
      idUser,
    });

    const products = data.products;
    const productsDb = quoter.products;

    const productsEqual =
      products.length === productsDb.length
        ? products.every((product, cont) => {
            return product.sku !== productsDb[cont].sku || product.sku !== productsDb[cont].sku ? false : true;
          })
        : false;

    const arrayAdapted = products.map((product) => {
      return { sku: product.sku, quantity: product.quantity };
    });

    if (!productsEqual) {
      await Product.destroy({
        where: { quoterId },
      });
      await Promise.all(
        arrayAdapted.map(async (product) => {
          const productToAdd = { ...product, quoterId };
          const productsDb = new Product(productToAdd);
          await productsDb.save();
        })
      );
    }

    res.json([
      {
        id: quoterId,
        products: arrayAdapted,
        ...dataToUpload,
      },
    ]);
  } catch (err) {
    //console.log('el error en all quoters by user es ', err);
    const error = new InternalServerError(err + ', ');
    return next(error);
  }
};

const deleteQuoter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const idUser = req.user.id;
    const userRole = req.user.rol;
    const quoter = await Quoter.findOne({ where: { id } });
    if (userRole === 'user')
      if (idUser != quoter.idUser) {
        const err = new ForbidenError('You cannot delete a quoter of other user, ');
        return next(err);
      }

    await Quoter.destroy({ where: { id } });
    if (quoter.image && quoter.image !== '') deleteImageCloudinary(quoter.image);

    res.json({ message: 'delete ok', id });
  } catch (err) {
    //console.log('el error en all quoters by user es ', err);
    const error = new InternalServerError(err + ', ');
    return next(error);
  }
};

const deletaAllByUser = async (req, res, next) => {
  try {
    const { idToDelete } = req.params;
    const idUser = req.user.id;
    const userRole = req.user.rol;
    if (userRole === 'user') {
      if (idUser !== idToDelete) {
        const err = new ForbidenError('You cannot delete ALl quoters of other user, ');
        return next(err);
      }
    }

    const response = await Quoter.destroy({ where: { idUser: idToDelete } });
    res.status(200).json();
  } catch (err) {
    //console.log('el error en all quoters by user es ', err);
    const error = new InternalServerError(error + ', ');
    return next(error);
  }
};

module.exports = {
  findDefaultQuoters,
  findQuoter,
  findAllQuoters,
  createQuoter,
  updateQuoter,
  deleteQuoter,
  findAllQuotersByUser,
  deletaAllByUser,
};
