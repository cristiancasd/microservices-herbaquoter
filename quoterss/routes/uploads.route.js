const { Router } = require('express');
const { getStaticImage, updateImage } = require('../controllers/uploads.controller');
const { validation } = require('../middlewares/validation');
const { check } = require('express-validator');
const { validateImageToUpload } = require('../middlewares/validate-file-to-upload');
const { validateJWTbackendNest } = require('../middlewares/validate-jwt-backend-nest');
const { validateJwtLocally } = require('../middlewares/validate-jwt-locally');

const router=Router();

router.get('/find/:imageName', getStaticImage);   

router.put('/edit/:idQuoter',[
        //validateJWTbackendNest,
        validateJwtLocally,
        check('idQuoter', 'id UUID incorrect').isUUID(),
        validateImageToUpload,
        validation],
    updateImage)

    

module.exports= router;