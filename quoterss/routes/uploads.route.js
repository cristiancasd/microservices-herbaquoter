const { Router } = require('express');
const { getStaticImage, updateImage } = require('../controllers/uploads.controller');
const { validation } = require('../middlewares/validation');
const { check } = require('express-validator');
const { validateImageToUpload } = require('../middlewares/validate-file-to-upload');
const { validateJWTbackendNest } = require('../middlewares/validate-jwt-backend-nest');
const { validateJwtLocally } = require('../middlewares/validate-jwt-locally');
const { quoterByIdExist } = require('../middlewares/validate-db');

const router=Router();

router.get('/find/:imageName', getStaticImage);   
 
router.put('/edit/:id',[
        //validateJWTbackendNest,
        validateJwtLocally,
        check('id', 'id UUID incorrect').isUUID(),
        quoterByIdExist,
        validateImageToUpload,
        validation],
    updateImage)
 
     

module.exports= router;