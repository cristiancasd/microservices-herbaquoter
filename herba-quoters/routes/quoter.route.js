require('express-validator'); 
const { Router } = require("express");
const { validation } = require('../middlewares/validation');
const { check } = require('express-validator');
const { findAllQuoters, createQuoter, updateQuoter, deleteQuoter, findQuoter, findAllQuotersByUser, findDefaultQuoters, deletaAllByUser } = require('../controllers/quoter.controller');
//const { quoterByIdExists, quotersByUserExists } = require('../helpers/db-validators');
const { validateJWTbackendNest } = require('../middlewares/validate-jwt-backend-nest');
//const { validRoles } = require('../middlewares/validate-roles');
const { validateProductsArray } = require('../middlewares/validate-products-array');
const { quoterByIdExist, quotersByUserExist } = require('../middlewares/validate-db');

const router=Router();
 
router.get('/', findAllQuoters);

router.get('/default', findDefaultQuoters);

router.get('/iduser/:idUser',[
    check('idUser', 'idUser must be UUID').isUUID(),
    validation
] ,findAllQuotersByUser);

router.put('/edit/:id',[    
    validateJWTbackendNest,
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
    validateJWTbackendNest,
    check('title', 'title es obligatorio').not().isEmpty(),
    check('image', 'image must be String').isString(),
    check('products', 'products must be array').isArray(),
    validateProductsArray,
    validation], 
    createQuoter
);

router.get('/:id',[
    check('id', 'id UUID incorrect').isUUID(),
    quoterByIdExist,
    validation],
findQuoter);


router.delete('/delete/:id',[
    validateJWTbackendNest,
    check('id', 'id must be UUID').isUUID(),
    quoterByIdExist,
    //check('id').custom(quoterByIdExists),
    validation
] ,deleteQuoter);

router.delete('/deleteallbyuser/:idToDelete',[
    validateJWTbackendNest,
    check('idToDelete', 'idUser must be UUID').isUUID(),
    quotersByUserExist,
    validation
] ,deletaAllByUser);



module.exports= router;

