const { saveImageOnCloudinary, deleteImageCloudinary } = require("../helpers/imageManage");
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

 
describe('Pruebas en saveImageOnCloudinary', () => {

    test('must upload image to cloudinary', async() => {


        const archivo={
            tempFilePath:__dirname+'/temp.jpg'
        }
        
        //console.log('*****************, ',archivo)
        const response = await saveImageOnCloudinary( archivo );
        //console.log('response ******************* ', response);
        expect(response.secure_url).toBeDefined();
        expect( typeof response.secure_url ).toBe('string');
        //console.log('********* ',url)

        const nombreArr = response.secure_url.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        await cloudinary.uploader.destroy([ 'herbaApp/quoters/' + public_id ]); 
    });

    test('must be error uploading with file with bad properties to cloudinary', async() => {
        const archivo={
            // must be tempFilePath
            tempFile:__dirname+'/temp.jpg'
        }
        const response = await saveImageOnCloudinary( archivo );
        expect(response instanceof Error).toBe(true);
    });

    test('must be error uploading bad type file to cloudinary', async() => {
        const archivo=
        {
            tempFile:__dirname+'/temp.docx'
        }
        const response = await saveImageOnCloudinary( archivo );
        expect(response instanceof Error).toBe(true);
    });

    test('must delete file from cloudinary by id', async() => {
        
        const {secure_url}=await cloudinary.uploader.upload(__dirname+'/temp.jpg',  {folder: 'herbaApp/quoters/'})

        const response = await deleteImageCloudinary( secure_url );
        console.log(response)
        expect(response.result).toBeDefined();
        expect(response.result).toBe('ok');
    });

    test('must show /not found/ delete file from cloudinary by id dont exit', async() => {
        
        const url='https://res.cloudinary.com/cristiancasd/image/upload/v1680279951/herbaApp/quoters/iarkq1ghiucb3m71rcnl.png'
        const response = await deleteImageCloudinary( url );
        console.log(response)
        expect(response.result).toBeDefined();
        expect(response.result).toBe('not found');
    });



    //test('debe de retornar object error.message', async() => {
        //const file = new File([], 'foto.jpg');
        //const response = await saveImageOnCloudinary( file );
        //console.log('response error', response)
        //console.log('response.error', response.error)

        //expect(response.error).toBeDefined();
        //expect(response.error.message).toBeDefined();
   // });
});