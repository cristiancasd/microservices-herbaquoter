require('colors');
const { titleQuoterByUserExist } = require('../helpers/dbFinder');
const { initialData } = require('../static/data/quoters-data');
const { deleteImageCloudinary, } = require('../helpers/imageManage');
const { validation } = require('../middlewares/validation');
const { validationResult } = require('express-validator');
const { ForbidenError } = require('../errors/forbidden-error');
const { BadRequestError } = require('../errors/bad-request-error');

const Product = require("../src/models/Products");
const Quoter = require('../src/models/Quoters');


const findDefaultQuoters = (req, res) => {

    const loseweight = initialData();
    const quotersInitial = loseweight.map(quoter => {
        return {
            ...quoter,
            image: process.env.HOST_API + '/files/' + quoter.image
        }
    }
    );
    //console.log('---------------- }',quotersInitial )
    res.status(200).json(quotersInitial);
}

const findQuoter = async (req, res) => {
    const { id } = req.params;
    const quoter = await Quoter.findAll({
        where: { '$id$': id },
        include: [{ model: Product, as: 'products', }]
    });
    res.status(200).json(quoter);
}

const findAllQuoters = async (req, res) => {

    const quoters = await Quoter.findAll({
        include: [{
            model: Product, as: 'products'
        }]
    });
    res.status(200).json(quoters);
}

const findAllQuotersByUser = async (req, res) => {
    const { idUser } = req.params;

    const quoters = await Quoter.findAll({
        where: { '$idUser$': idUser },
        include: [{ model: Product, as: 'products', }]
    });
    res.status(200).json(quoters);
}

const createQuoter = async (req, res, next) => {
    const { title, description = "", image = "", products = [] } = req.body;
    const idUser = req.user.id;

    if (await titleQuoterByUserExist(title, idUser)) {
        const err = new BadRequestError('Title already exist, try with other one, ')
        return next(err)
    }

    //console.log('voy a constuir la data')

    const data = {
        title,
        description,
        image,
        idUser
    }


    const quoter = new Quoter(data);
    await quoter.save();

    await Promise.all(
        products.map(async (product) => {
            const { sku, quantity } = product
            const productToAdd = { sku, quantity, quoterId: quoter.id }
            const productsDb = new Product(productToAdd)
            await productsDb.save();
        })
    )

    const quoterFinal = await Quoter.findAll({
        where: { '$id$': quoter.id },
        include: [{ model: Product, as: 'products', }]
    });
    res.status(201).json(quoterFinal);
}

const updateQuoter = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    const idUser = req.user.id
    const userRole = req.user.rol

    if (await titleQuoterByUserExist(data.title, idUser, id)) {
        const err = new BadRequestError('Title already exist, try with other one, ')
        return next(err)
    }


    const quoterDB = await Quoter.findAll({
        where: { '$id$': id },
        include: [{ model: Product, as: 'products', }]
    });

    const quoter = quoterDB[0]
    const { id: quoterId } = quoter;


    if (userRole === 'user')
        if (idUser != quoter.idUser) {
            const err = new ForbidenError('You cannot change a quoter of other user, ')
            return next(err)
        }

    const dataToUpload = {
        title: data.title,
        description: data.description,
        image: data.image,
    }

    console.log('dataToUpload ', dataToUpload)

    await Quoter.upsert({
        id: quoterId,
        //...quoterBeforeToUpload,
        ...dataToUpload,
        idUser
    });

    console.log('listo el upsert')

    const products = data.products;
    const productsDb = quoter.products;

    const productsEqual =
        products.length === productsDb.length
            ? products.every((product, cont) => {
                return (product.sku !== productsDb[cont].sku || product.sku !== productsDb[cont].sku)
                    ? false
                    : true;
            })
            : false


    const arrayAdapted = products.map(product => {
        return { sku: product.sku, quantity: product.quantity }
    })

    if (!productsEqual) {
        console.log('voy a destruir productos')
        await Product.destroy({
            where: { quoterId },
        });
        await Promise.all(
            arrayAdapted.map(async (product) => {
                const productToAdd = { ...product, quoterId }
                const productsDb = new Product(productToAdd)
                await productsDb.save();
            }));
        console.log('listo destrucción de productos')
    }


    res.json([{
        id: quoterId,
        products: arrayAdapted,
        ...dataToUpload,
    }]
    )
}

const deleteQuoter = async (req, res, next) => {
    const { id } = req.params;
    const idUser = req.user.id
    const userRole = req.user.rol
    console.log('borrando quoter ', id)
    const quoter = await Quoter.findOne({ where: { id } });
    //console.log(quoter)
    if (userRole === 'user')
        if (idUser != quoter.idUser) {
            const err = new ForbidenError('You cannot delete a quoter of other user, ')
            return next(err)
        }

    await Quoter.destroy({ where: { id } });
    if (quoter.image && quoter.image !== "") deleteImageCloudinary(quoter.image)
    res.json({ message: 'delete ok', id })
}

const deletaAllByUser = async (req, res, next) => {
    console.log('on deletaAllByUser  ')

    const { idToDelete } = req.params;
    const idUser = req.user.id
    const userRole = req.user.rol;

    console.log('on deletaAllByUser , userRole, idToDelete, idUser ', userRole, idToDelete, idUser)

    if (userRole === 'user') {
        if (idUser !== idToDelete) {
            const err = new ForbidenError('You cannot delete ALl quoters of other user, ')
            return next(err)
        }
    }

    console.log('user Authorized to delet quoter')
    const response = await Quoter.destroy({ where: { idUser: idToDelete } });
    console.log('response deleting process ', response)
    res.status(200).json();
}


module.exports = {
    findDefaultQuoters,
    findQuoter,
    findAllQuoters,
    createQuoter,
    updateQuoter,
    deleteQuoter,
    findAllQuotersByUser,
    deletaAllByUser,
}