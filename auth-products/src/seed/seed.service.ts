import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/entities/category.entity';
import { AuthService } from '../auth/auth.service';
import { deleteImageCloudinary } from 'src/files/helpers/uploadImageCloudinary';

 
@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly authService: AuthService,

    @InjectRepository(User) //Inyectamos repositorio para poder borrar los usuarios
    private readonly userRepository: Repository<User>,

    @InjectRepository(Category) //Inyectamos repositorio para poder borrar los usuarios
    private readonly categorieRepository: Repository<Category>
  ){}


  async runSeed() {
        
      await this.deleteActualImagesCloudinary();
      await this.deleteTables();
      const users=await this.insertUsers();
      const categories=await this.insertCategories(users[1]);
      
      await this.insertNewProductsNutrition(users[1], categories[0]);
      await this.insertNewProductsProtein(users[2], categories[1]);

      await this.insertNewProductsDigestion(users[2], categories[2]);
      await this.insertNewProductsTeas(users[1], categories[3]);
      await this.insertNewProductsOthers(users[2], categories[4]);
      await this.insertImagesProducts(users);
      await this.insertImagesUsers();
      console.log('Seed Excuted')
      return `Seed Excuted`;
  }


  private async deleteActualImagesCloudinary(){
    //todo: Subir las imagenes por carpetas, y borrar todas las fotos de esa carpeta
    console.log('voy a borrar imagenes de cloudinary')
    try{
      const users=await this.authService.findAll({limit:100})
      if(users.length>0)
      users.forEach((user)=> deleteImageCloudinary(user.image));
    }catch(error){
      console.log('error en users=await this.authService.findAll({limit:100})', error)
    }
    try{
      const products=await this.productsService.findAll({limit:100});
      if(products.length>0)
        products.forEach(async (product)=>await deleteImageCloudinary(product.image));
    }catch(error){
      console.log('error en products=await this.productsService.findAll({limit:100});', error)
    }
    console.log('FIN borrar imagenes de cloudinary')
    return true
  }

  private async deleteTables(){
    console.log('voy a borrar tablas')
    await this.productsService.deleteAllProductos();
    await this.categoriesService.deleteAllCategories();
    //En userRepository no está implementado borrar todos los users, lo implementamos aquí
    const queryBuilder=this.userRepository.createQueryBuilder()
    await queryBuilder
      .delete()
      .where({}) // Borra todo
      .execute()
    console.log(' FIN borrar tablas')
    return true
  }

  private async insertUsers(){
    console.log('voy a insertar Usuarios')
    const seedUsers=initialData.users;
    const users: User[]=[];
    seedUsers.forEach(user=>{
      users.push(this.userRepository.create(user))
    });
    const dbUsers=await this.userRepository.save(seedUsers)
    console.log('Fin insertar usuarios')
    return dbUsers
  }

  private async insertCategories(user: User){
    console.log('voy a insertar categorías')

    const seedCategories=initialData.categories;
    const categories: Category[]=[];
    seedCategories.forEach(category=>{
      categories.push(this.categorieRepository.create({...category, user}))
    });
    const dbCategories=await this.categorieRepository.save(categories)
    console.log('Fin insertar categorías')

    return dbCategories
  }



  private async insertNewProductsNutrition(user: User, category: Category){
    console.log('voy a Insertar productos nutricion')

    await this.productsService.deleteAllProductos();
    const seedProducts=initialData.productsNutrition;
    const insertPromises=[];
    seedProducts.forEach((seedProduct)=>{
      seedProduct.categoryId=category.id;
      insertPromises.push( this.productsService.create(seedProduct, user, category.id));
    });
    await Promise.all(insertPromises);
    console.log('fin insertar productos nutricion')

    return true;
  }  


  private async insertNewProductsProtein(user: User, category: Category){
    console.log('voy a Insertar productos Protein')

    const seedProducts=initialData.productsProtein;
    const insertPromises=[];
    seedProducts.forEach((seedProduct)=>{
      seedProduct.categoryId=category.id;
      insertPromises.push( this.productsService.create(seedProduct, user, category.id));
    });
    await Promise.all(insertPromises)
    console.log('Fin insertar productos Protein')

    return true;
  } 



  private async insertNewProductsDigestion(user: User, category: Category){
    console.log('voy a Insertar productos digestión')

    const seedProducts=initialData.productsDigestivos;
    const insertPromises=[];
    seedProducts.forEach((seedProduct)=>{
      seedProduct.categoryId=category.id;
      insertPromises.push( this.productsService.create(seedProduct, user, category.id));
    });
    await Promise.all(insertPromises)
    console.log('Fin insertar productos nutrición')

    return true;
  }  


  private async insertNewProductsTeas(user: User, category: Category){
    console.log('voy a Insertar productos Teas')

    const seedProducts=initialData.productsTeas;
    const insertPromises=[];
    seedProducts.forEach((seedProduct)=>{
      seedProduct.categoryId=category.id;
      insertPromises.push( this.productsService.create(seedProduct, user, category.id));
    });
    await Promise.all(insertPromises)
    console.log('Fin Insertar productos Teas')
    return true;
  }  


  private async insertNewProductsOthers(user: User, category: Category){
    console.log('voy a Insertar productos Otros')
    const seedProducts=initialData.productsOthers;
    const insertPromises=[];
    seedProducts.forEach((seedProduct)=>{
      seedProduct.categoryId=category.id;
      insertPromises.push( this.productsService.create(seedProduct, user, category.id));
    });
    await Promise.all(insertPromises)
    console.log('FIn Insertar productos otros')
    return true;
  }  


  private async insertImagesProducts(users){

    console.log('voy a Insertar Imagenes de productos')

    const products=await this.productsService.findAll({limit:100});

    let a=1;

    const baseUrl=process.env.STAGE==='dev'
      ? process.env.HOST_API
      : process.env.HOST_API_PROD

    products.forEach(async (product) => { 
      const path=baseUrl+'/files/product/'+product.image
      a==1 ? a=2 :a=1
      await this.productsService.update(product.id, {image: path}, users[a])
    });
    console.log('Fin a Insertar Imagenes productos')

    return true;
  }


  private async insertImagesUsers(){
    console.log('voy a Insertar imagenes usuarios')

    const users= await this.authService.findAll({limit:100})
    let a=1;
     const baseUrl=process.env.STAGE==='dev'
      ? process.env.HOST_API
      : process.env.HOST_API_PROD
     
    users.forEach(async (user) => {        
      const path=process.env.baseUrl+'/files/user/'+user.image
      a==1 ? a=2 :a=1
      await this.authService.update(user.id, {image: path})
    });
    console.log('fin a Insertar imagenes usuarios')

    return true;
  }
}
