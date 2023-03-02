const { join } = require('path')
const fs = require('fs')


const Product = require("../src/models/Products");
const Quoter = require('../src/models/Quoters');

const { deleteImageCloudinary, saveImageOnCloudinary } = require('../helpers/imageManage');


const getStaticImage = async (req, res) => {
    const { imageName } = req.params;
    let pathImagen = join(__dirname, '../static/images', imageName)
    return (fs.existsSync(pathImagen))
        ? res.sendFile(pathImagen)
        : res.status(400).json({ message: 'Image dont exists' });
}

const updateImage = async (req, res, next) => {
    const { idQuoter } = req.params;
    const idUser = req.user.id
    const userRole = req.user.rol


    const quoterDb = await Quoter.findAll({
        where: { '$id$': idQuoter },
        include: [{ model: Product, as: 'products', }]
    });

    const quoter = quoterDb[0];

    if (!quoter) {
        const err = new Error(`Quoter with id ${idQuoter} don't exist`)
        err.reasons = [{ message: `Quoter with id ${idQuoter} don't exist` }]
        err.status = 400
        return next(err)
        return res.status(400).json({
            message: `Quoter with id ${idQuoter} don't exist`
        });
    }



    if (userRole === 'user')
        if (idUser != quoter.idUser) {
            const err = new Error('You cannot change a quoter of other user')
            err.reasons = [{ message: 'You cannot change a quoter of other user' }]
            err.status = 403
            return next(err)
            return res.status(400).json({ message: 'You cannot change a quoter of other user' });

        }


    if (quoter.image && quoter.image !== "") deleteImageCloudinary(quoter.image)
    const { secure_url } = await saveImageOnCloudinary(req.files.archivo)
    await Quoter.upsert({
        id: idQuoter,
        image: secure_url
    });
    quoter.image = secure_url;
    res.json(quoter);
}

module.exports = {
    getStaticImage,
    updateImage
}
