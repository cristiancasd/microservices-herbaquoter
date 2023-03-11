import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException, GoneException, ForbiddenException,} from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';
import { deleteImageCloudinary, uploadImageCloudinary } from './helpers/uploadImageCloudinary';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
  ){}

  async updateImage(file: Express.Multer.File, id:string , user: User, colection: string){
    
    if(!file) throw new BadRequestException(`file Type is incorrect`);
    
    if(user.rol=='user' && user.id!=id) throw new ForbiddenException('you do not have authorized');
    if(colection!='user'&&colection!='product') throw new BadRequestException(`colection "${colection}" is not correct`);
    

    let modelo: Product | User;

    (colection=='product' )
        ? modelo = await this.productRepository.preload({id})
        : modelo = await this.authRepository.preload({id})   
 
    if(!modelo) throw new NotFoundException(`${colection} with id ${id} not found`)
    if(!modelo.isactive) throw new GoneException(`${colection} with id ${id} is Inactive`);
    
    if(modelo.image) await deleteImageCloudinary(modelo.image)
    
    const {secure_url}= await uploadImageCloudinary(file,colection).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
    try{      
      if(colection=='product' ){
        const {id,title,image}=await this.productRepository.save({ ...modelo, image: secure_url ,user})
        return {
          id, 
          title,
          image,
          user: {
            id: user.id,
            fullname: user.fullname
          },
        }
      }else{
        const {id,fullname,image}=await this.authRepository.save({ ...modelo, image: secure_url})
        return {id, fullname,image,}
      }
    }catch(error){
      this.handleDBErrors(error)
    }
  }

  getStaticImage(imageName: string, colection: string){
    if(colection!='product'&&colection!='user') throw new NotFoundException(` No hay colección de imagenes llamada ${colection}`)  
    let path:string;
    colection=='product'
      ? path= join( __dirname, '../../static/products', imageName)
      : path= join( __dirname, '../../static/users', imageName)
      if(!existsSync(path))
      throw new NotFoundException(`No ${colection} found with image ${imageName}`)  
    return path;
  }
  

  private handleDBErrors(error: any){
    if(error.code==='23505')
      throw new BadRequestException(error.detail);
    console.log(error)
    throw new InternalServerErrorException('Please check server logs')
  }

}

