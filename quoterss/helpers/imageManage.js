const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
  
 
const deleteImageCloudinary = async (urlImage) => { 
    console.log('voy a borrar imagen') 
    const nombreArr = urlImage.split('/');
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split('.');
    //const a= cloudinary.uploader.destroy(public_id);
    const resp=await cloudinary.uploader.destroy(public_id);
    console.log('resp cloudinary ',resp)
}

const saveImageOnCloudinary = async (archivo) => {
    console.log('salvando imagen')
    const { tempFilePath } = archivo
    return await cloudinary.uploader.upload(tempFilePath)
}

module.exports = {
    deleteImageCloudinary,
    saveImageOnCloudinary,
}