const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);


const deleteImageCloudinary = (urlImage) => {
    const nombreArr = urlImage.split('/');
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split('.');
    cloudinary.uploader.destroy(public_id);
    //const resp=await cloudinary.uploader.destroy(public_id);
    //console.log('resp cloudinary ',resp)
}

const saveImageOnCloudinary = async (archivo) => {
    const { tempFilePath } = archivo
    return await cloudinary.uploader.upload(tempFilePath)
}

module.exports = {
    deleteImageCloudinary,
    saveImageOnCloudinary,
}