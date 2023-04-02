require('dotenv');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
/*cloudinary.config({
    
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    
    secure: true
});*/

const deleteImageCloudinary = async (urlImage) => {
  console.log('voy a borrar imagen');
  const nombreArr = urlImage.split('/');
  const nombre = nombreArr[nombreArr.length - 1];
  const [public_id] = nombre.split('.');
  //const a= cloudinary.uploader.destroy(public_id);
  const resp = await cloudinary.uploader.destroy(['herbaApp/quoters/' + public_id]);
  console.log('resp cloudinary ', resp);
  return resp;
};

const saveImageOnCloudinary = async (archivo) => {
  try {
    const { tempFilePath } = archivo;
    return await cloudinary.uploader.upload(tempFilePath, { folder: 'herbaApp/quoters/', resource_type: 'image' });
  } catch (err) {
    return new Error('Problem with file');
  }
};

module.exports = {
  deleteImageCloudinary,
  saveImageOnCloudinary,
};
