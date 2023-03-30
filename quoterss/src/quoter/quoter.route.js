require('express-validator'); 
const { Router } = require("express");
const { validation } = require('../middlewares/validation');
const { check } = require('express-validator');
const { findAllQuoters, createQuoter, updateQuoter, deleteQuoter, findQuoter, findAllQuotersByUser, findDefaultQuoters, deletaAllByUser } = require('./quoter.controller');
//const { quoterByIdExists, quotersByUserExists } = require('../helpers/db-validators');
const { validateJWTbackendNest } = require('../middlewares/validate-jwt-backend-nest');
//const { validRoles } = require('../middlewares/validate-roles');
const { validateProductsArray } = require('../middlewares/validate-products-array');
const { quoterByIdExist, quotersByUserExist } = require('../middlewares/validate-db');
const { validateJwtLocally } = require('../middlewares/validate-jwt-locally');

const router=Router();
 
router.get('/', findAllQuoters);

router.get('/default', findDefaultQuoters);
 
router.get('/iduser/:idUser',[
    check('idUser', 'idUser must be UUID').isUUID(),
    validation
] ,findAllQuotersByUser);

router.put('/edit/:id',[     
    //validateJWTbackendNest,
    validateJwtLocally,
    check('id', 'id must be UUID').isUUID(),
    quoterByIdExist,
    check('title', 'Img must be String').isString(),
    check('description', 'description must be String').isString(),
    check('image', 'Img must be String').isString(),
    check('products', 'products must be array').isArray(),
    validateProductsArray,
    validation
] ,updateQuoter);


router.post('/create',[
    //validateJWTbackendNest,
    validateJwtLocally,
    check('title', 'title es obligatorio').not().isEmpty(),
    check('image', 'image must be String').isString(),
    check('products', 'products must be array').isArray(),
    validateProductsArray,
    validation], 
    createQuoter
);

router.get('/findbyid/:id',[
    check('id', 'id UUID incorrect').isUUID(),
    quoterByIdExist,
    validation],
findQuoter); 


router.delete('/delete/:id',[
    //validateJWTbackendNest,
    validateJwtLocally,
    check('id', 'id must be UUID').isUUID(),
    quoterByIdExist,
    //check('id').custom(quoterByIdExists),
    validation
] ,deleteQuoter);

router.delete('/deleteallbyuser/:idToDelete',[
    //validateJWTbackendNest,
    validateJwtLocally,
    check('idToDelete', 'idToDelete must be UUID').isUUID(),
    quotersByUserExist,
    validation
] ,deletaAllByUser);



module.exports= router;

