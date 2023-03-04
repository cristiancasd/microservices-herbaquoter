import { BadRequestException, GoneException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { validate as isUUID } from 'uuid'


@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ){}

  async create(createCategoryDto: CreateCategoryDto, user: User) {
   
    const categoryDBconfirm=await this.searchCategoryByTitle(createCategoryDto.title);
    if(categoryDBconfirm){
      if(categoryDBconfirm.isactive)
        throw new BadRequestException(`the category with title "${createCategoryDto.title}" already exists`);
      throw new GoneException(`the category with title "${createCategoryDto.title}" exist, but is inactive, talk with the admin`);
    } 

    try{
      const category=this.categoryRepository.create({
        ...createCategoryDto,
      });
      const data=await this.categoryRepository.save({...category, user});
      
      const {id, fullname}=user;
      return {
        id: data.id,
        ...category,
        user:{id, fullname}
      };

    }catch(error){
      this.handleDBErrors(error) 
    }
  }

  async findAll(paginationDto) {
    const {limit=10, offset=0}=paginationDto;
    const categories=await this.categoryRepository.find({   
      where: {
        isactive: true,
    },
      take: limit,
      skip: offset,      
    });

    if(!categories || categories.length===0) 
        throw new NotFoundException(`Categories dont have data`) 
    
    return categories.map((category)=>{
      const {user, ...restCategory}=category;
      const {id, fullname}=user;
      return {
        ...restCategory,
        user:{
          id, fullname
        }            
      }
    }) 
  }

  async findOne(term: string) {
    let categories: Category[];
    const queryBuilder=this.categoryRepository.createQueryBuilder('ca');
    isUUID(term)
      ? categories=[await this.categoryRepository.findOneBy({id: term, isactive: true})]
      : categories=await queryBuilder.where('UPPER(ca.title) =:title and ca.isactive =:isactive',{
        title: term.toUpperCase(),
       isactive: true,
      })
      .leftJoinAndSelect('ca.user','user')
      .getMany()

    if(!categories || categories.length===0 || categories[0]==null) 
      throw new NotFoundException(`Categories with term ${term} not found`); 
      
      return categories.map(category  =>{
        const {user, ...restCategory}=category;
        const {id,fullname}=user
        return {
          ...restCategory,
          user:{id,fullname}
        }
      }) 
  }


  async findOneAdmin(term: string) {
    let category: Category;
    if (isUUID(term))
      category=await this.categoryRepository.findOneBy({id: term, isactive: true})     

    if(!category) return null; 
    return category;

  }
  


  async update(id: string, updateCategoryDto: UpdateCategoryDto, user: User) {
    let category=await this.categoryRepository.preload({
      id,
      ...updateCategoryDto,
    });
    if(!category) throw new NotFoundException(`category with id ${id} not found`)
    if(!category.isactive) throw new GoneException(`category with id ${id} is Inactive`);

    if(updateCategoryDto.title){
      const productDBconfirm=await this.searchCategoryByTitle(updateCategoryDto.title);
      if(productDBconfirm){
        if(productDBconfirm.id!=id)
          throw new BadRequestException(`the category with title "${updateCategoryDto.title}" already exist`);
      } 
    }

    try{      
      await this.categoryRepository.save({ ...category,user});      
      
      return {
        ...category,
        user:{id:user.id, fullname: user.fullname}
      };
    }catch(error){
      this.handleDBErrors(error)
    }
  }

  async remove(id: string, user: User) {
    let category=await this.categoryRepository.preload({id});
    if(!category) throw new NotFoundException(`category with id ${id} not found`)
    if(!category.isactive) throw new GoneException(`category with id ${id} is Inactive`);
    try{
      const categoryUpdate={
        ...category,
       isactive: false,
      }
      await this.categoryRepository.save({...categoryUpdate,user});
      return;
    }catch(error){
      this.handleDBErrors(error)
    }
  }

  async activate(term: string, user: User) {
    let category: Category;
    let id=term;
    if(!isUUID(term)){
      let categoryTemporal:Category;
      const queryBuilder=this.categoryRepository.createQueryBuilder('us');
      categoryTemporal=await queryBuilder.where('UPPER(title) =:title' ,{
        title: term.toUpperCase(),
        })
        .getOne(); 
      if(!categoryTemporal) throw new NotFoundException(`category with title ${term} not found`)
      id=categoryTemporal.id
    }

    category=await this.categoryRepository.preload({id});

    
    if(!category) throw new NotFoundException(`category with id ${id} not found`)
    if(category.isactive) 
      return `category with id ${id} is active, it don't need to be activated`
      //throw new GoneException(`category with id ${id} is active, it don't need to be reactive`);
    try{
      const categoryUpdate={
        ...category,
       isactive: true,
      }
      await this.categoryRepository.save({...categoryUpdate,user});
      return categoryUpdate
    }catch(error){
      this.handleDBErrors(error)
    }
  }

  async deleteAllCategories(){
    const query=this.categoryRepository.createQueryBuilder('categorie');
    try{
      return await query
        .delete()
        .where({})
        .execute();
    }catch(error){
      this.handleDBErrors(error);
    }
  }

  private async searchCategoryByTitle(title:string){
    const queryBuilder=this.categoryRepository.createQueryBuilder('us');
    return await queryBuilder.where('UPPER(title) =:title' ,{
      title: title.toUpperCase(),
      })
      .getOne();     
  }

  private handleDBErrors(error: any){
    if(error.code==='23505')
      throw new BadRequestException(error.detail);
    console.log(error)
    throw new InternalServerErrorException('Please check server logs')
  }
}