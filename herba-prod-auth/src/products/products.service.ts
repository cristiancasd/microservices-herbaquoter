import { BadRequestException, GoneException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { validate as isUUID } from 'uuid'
import { Category } from '../categories/entities/category.entity';
import { CategoriesService } from '../categories/categories.service';



@Injectable()
export class ProductsService {

  constructor(
    private readonly categoriesService: CategoriesService,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

  ){}

  async create(createProductDto: CreateProductDto, user: User, idCategory:String) {
    
    
    const productDBconfirm=await this.searchProductByTitle(createProductDto.title);
      if(productDBconfirm){
        if(productDBconfirm.isactive)
          throw new BadRequestException(`the product with title "${createProductDto.title}" already exists`);
     
        throw new GoneException(`the product with title "${createProductDto.title}" exist, but is inactive, talk with the admin`);
      } 


    try{      
      let categorie: Category;
      const{categoryId}=createProductDto ;  
      if (isUUID(categoryId))
      categorie=await this.categoriesService.findOneAdmin(categoryId)

      const product=this.productRepository.create({
        ...createProductDto,
      });  
      const data= await this.productRepository.save({...product, user, categorie});    
      
      if (categorie) {
        const{user: userCategory, isactive, ...restCategorie}=categorie;
        return {
          id: data.id,
          ...product,  
          user: {id: user.id, fullname: user.fullname},
          category:{...restCategorie}             
         };
      }     
      
      
      return {
        ...product, 
        user: {id: user.id, fullname: user.fullname},    
        category:null  
       };
      

    }catch(error){
      this.handleDBErrors(error)
    }
  }

  async findAll(paginationDto) {
    console.log('.......estoy en findAll');
    const {limit=1000, offset=0}=paginationDto;
    const products=await this.productRepository.find({   
      where: {
        isactive: true,
    },
      take: limit,
      skip: offset,      
    });
    console.log('products encotrados',products.length)

    if(!products || products.length===0) 
        throw new NotFoundException(`Products dont have data`);
    
    return products.map((product)=>{
      const {user, categorie, ...restProduct}=product;
      const {id, fullname}=user;
      
      if(categorie){
        const{user, isactive, ...restCategorie}=categorie;
        return {
          ...restProduct,
           user:{id, fullname},
           category: {...restCategorie},        
        }
      }

      return {
        ...restProduct,
        user:{
          id, fullname
        }            
      }
    }) 
  }

  async findOne(term: string) {
    let products: Product[];
    const queryBuilder=this.productRepository.createQueryBuilder('pro');
    isUUID(term)
      ? products=[await this.productRepository.findOneBy({id: term, isactive: true})]
      : products=await queryBuilder.where('(UPPER(pro.title) =:title or UPPER(pro.sku) =:sku) and pro.isactive =:isactive' ,{
        title: term.toUpperCase(),
        sku: term.toUpperCase(),
        isactive: true,
        })
        .leftJoinAndSelect('pro.user','user')
        .leftJoinAndSelect('pro.categorie','categorie')
        .getMany(); 
       


    if(!products || products.length===0 || products[0]==null) 
      throw new NotFoundException(`Products with term ${term} not found`);
      console.log('products ... ', products)
    
      return products.map(product  =>{
        const {user, categorie, ...restProduct}=product;
        const {id: userId, fullname}=user
        const {id: categoryId, title }=categorie
        return {
          ...restProduct,
          user:{userId, fullname},
          category:{categoryId, title}
        }
      }) 
  }

  async update(id: string, updateProductDto: UpdateProductDto, user: User) {
    let product=await this.productRepository.preload({
      id,
      ...updateProductDto,
    });

    if(!product) throw new NotFoundException(`product with id ${id} not found`)
    if(!product.isactive) throw new GoneException(`Product with id ${id} is Inactive`);

    if(updateProductDto.title){
      const productDBconfirm=await this.searchProductByTitle(updateProductDto.title);
      if(productDBconfirm){
        if(productDBconfirm.id!=id)
          throw new BadRequestException(`the product with title "${updateProductDto.title}" already exist`);
      }
    }

    try{    
      const {id:idUser, fullname, ...restoUser}=user; 
      let categorie: Category;
      const{categoryId}=updateProductDto ;  
        
      if (isUUID(categoryId)){
        categorie=await this.categoriesService.findOneAdmin(categoryId)
        await this.productRepository.save({ ...product,user, categorie})
        const {id:idCategorie, title, description, ... restCategorie}=categorie;
        return {
          ...product,
          user:{id:idUser,fullname},
          category:{id:idCategorie, title, description}
      };
      }else{
        await this.productRepository.save({ ...product, user})
        return {
          ...product,
          user:{id:idUser,fullname},
          category:null
      };
      }      
      
    }catch(error){
      this.handleDBErrors(error)
    }
  }

  async remove(id: string, user: User) {
    let product=await this.productRepository.preload({id});
    if(!product) throw new NotFoundException(`product with id ${id} not found`)
    if(!product.isactive) throw new GoneException(`product with id ${id} is Inactive`);
    try{
      const productUpdate={
        ...product,
       isactive: false,
      }
      await this.productRepository.save({...productUpdate,user});
      return;
    }catch(error){
      this.handleDBErrors(error)
    }
  }

  async activate(term: string, user: User) {
    let product: Product;
    let id=term;
    if(!isUUID(term)){
      let productTemporal:Product;
      const queryBuilder=this.productRepository.createQueryBuilder('us');
      productTemporal=await queryBuilder.where('UPPER(title) =:title' ,{
        title: term.toUpperCase(),
        })
        .getOne(); 
      if(!productTemporal) throw new NotFoundException(`product with title ${term} not found`)
      id=productTemporal.id
    }

    product=await this.productRepository.preload({id});

    
    if(!product) throw new NotFoundException(`product with id ${id} not found`)
    if(product.isactive) 
      return `product with id ${id} is active, it don't need to be activated`
      //throw new BadRequestException(`product with id ${id} is active, it don't need to be reactive`);
    try{
      const productUpdate={
        ...product,
       isactive: true,
      }
      await this.productRepository.save({...productUpdate,user});
      return productUpdate
    }catch(error){
      this.handleDBErrors(error)
    }
  }


  async deleteAllProductos(){
    const query=this.productRepository.createQueryBuilder('product');
    try{
      return await query
        .delete()
        .where({})
        .execute();
    }catch(error){
      this.handleDBErrors(error);
    }
  }



  private handleDBErrors(error: any){
    if(error.code==='23505')
      throw new BadRequestException(error.detail);
    console.log(error)
    throw new InternalServerErrorException('Please check server logs')
  }

  private async searchProductByTitle(title:string){
    const queryBuilder=this.productRepository.createQueryBuilder('us');
    return await queryBuilder.where('UPPER(title) =:title' ,{
      title: title.toUpperCase(),
      })
      .getOne();     
  }

}