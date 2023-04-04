require('dotenv');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const deleteImageCloudinary = async (urlImage) => {
  const nombreArr = urlImage.split('/');
  const nombre = nombreArr[nombreArr.length - 1];
  const [public_id] = nombre.split('.');
  const resp = await cloudinary.uploader.destroy(['herbaApp/quoters/' + public_id]);
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
