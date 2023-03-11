import {v4 as uuid} from 'uuid'

// La función tiene la estructura para que se permitido usar en el FileInterceptor
export const fileNamerInterceptor=
    (req: Express.Request, file: Express.Multer.File, callback: Function)=>
{
    console.log('estoy en fileNamer')
    if(!file) return callback(new Error('File is empty'), false);
    const fileExtension=file.mimetype.split('.')[1];
    const fileName=`${uuid()}.${fileExtension}`
    console.log('fileName', fileName)
    callback(null,fileName);  
}
