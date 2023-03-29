require('colors');
const { titleQuoterByUserExist } = require('../helpers/dbFinder');
const { initialData } = require('../static/data/quoters-data');
const { deleteImageCloudinary, } = require('../helpers/imageManage');
const { validation } = require('../middlewares/validation');
const { validationResult } = require('express-validator');
const { ForbidenError } = require('../errors/forbidden-error');
const { BadRequestError } = require('../errors/bad-request-error');
 
const Product = require("../models/Products");
const Quoter = require('../models/Quoters');
const { RequestValidationError } = require('../errors/request-validation-errors');
const { InternalServerError } = require('../errors/internal-server-error');


const findDefaultQuoters = (req, res) => {
    const loseweight = initialData();
    const quotersInitial = loseweight.map(quoter => {

    const baseUrl=process.env.STAGE==='dev'
        ? process.env.HOST_API
        : process.env.HOST_API_PROD

        return {
            ...quoter,
            image: baseUrl + '/files-quoters/find/' + quoter.image
        }
    }
    );
    //console.log('---------------- }',quotersInitial )
    res.status(200).json(quotersInitial);
}

const findQuoter = async (req, res) => {
    try{
        const { id } = req.params;
    const quoter = await Quoter.findAll({
        where: { '$id$': id },
        include: [{ model: Product, as: 'products', }]
    });
    res.status(200).json(quoter);
    }catch(err){
        //console.log('el error es ', err)
        const error = new InternalServerError(err+', ')
        return next(error)
    }
    
}

const findAllQuoters = async (req, res) => {

    try{
        const quoters = await Quoter.findAll({
            include: [{
                model: Product, as: 'products'
            }]
        });
        res.status(200).json(quoters);
    }catch(err){
        //console.log('el error es ', err)
        const error = new InternalServerError(err+', ')
        return next(error)
    }
    
}

const findAllQuotersByUser = async (req, res, next) => {
    
    const { idUser } = req.params;
    //console.log('voy a traer los quoters para el user ', idUser)

    try{
        const quoters = await Quoter.findAll({
            where: { idUser },
            //where: { '$idUser$': idUser },
            include: [{ model: Product, as: 'products', }]
        });
        //console.log('la respuesta de all quoters by user es  ', quoters)
        res.status(200).json(quoters);

    }catch(err){
        //console.log('el error en all quoters by user es ', err)
        const error = new InternalServerError(error+', ')
        return next(error)
    }
    
}

const createQuoter = async (req, res, next) => {
    const { title, description = "", image = "", products = [] } = req.body;
    const idUser = req.user.id;
    console.log('creating quoter to id: ',idUser)
    if (await titleQuoterByUserExist(title, idUser)) {
        //const err = new BadRequestError('Title already exist, try with other one, ')
        const temp= [{
            msg:'Title already exist, try with other one',
            param: 'title'
            }]
           const err = new RequestValidationError(temp)
        return next(err)
    }

    //console.log('voy a constuir la data')

    const data = {
        title,
        description,
        image,
        idUser
    }

    try{
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
    }catch(error){
        console.log('el error es ', {error});

        const err = new InternalServerError(error+', ')
        return next(err)
    }
    



}

const updateQuoter = async (req, res, next) => {
    
   
    const { id } = req.params;
    const data = req.body;
    const idUser = req.user.id
    const userRole = req.user.rol 

    if (await titleQuoterByUserExist(data.title, idUser, id)) {
       // const err = new BadRequestError('Title already exist, try with other one, ')
       const temp= [{
        msg:'Title already exist, try with other one',
        param: 'title'
        }]
       const err = new RequestValidationError(temp)
       
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

   // console.log('dataToUpload ', dataToUpload)

   try{
    await Quoter.upsert({
        id: quoterId,
        //...quoterBeforeToUpload,
        ...dataToUpload,
        idUser
    });

    //console.log('listo el upsert')

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
        //console.log('voy a destruir productos')
        await Product.destroy({
            where: { quoterId },
        });
        await Promise.all(
            arrayAdapted.map(async (product) => {
                const productToAdd = { ...product, quoterId }
                const productsDb = new Product(productToAdd)
                await productsDb.save();
            }));
        //console.log('listo destrucción de productos')
        //return next(err)
    }

    

    res.json([{
        id: quoterId,
        products: arrayAdapted,
        ...dataToUpload,
    }]
    )
   }catch(err){
       console.log('el error en all quoters by user es ', err)
       const error = new InternalServerError(err+', ')
       return next(error)
   }

    
}

const deleteQuoter = async (req, res, next) => {
    try{
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
    }catch(err){
        console.log('el error en all quoters by user es ', err)
        const error = new InternalServerError(err+', ')
        return next(error)
    }
    
}

const deletaAllByUser = async (req, res, next) => {
    console.log('on deletaAllByUser  ')

    try{
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
    }catch(err){
        console.log('el error en all quoters by user es ', err)
        const error = new InternalServerError(error+', ')
        return next(error)
    }

    
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