import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { PassportModule } from '@nestjs/passport';
import { CategoriesService } from 'src/categories/categories.service';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    CategoriesModule,
    TypeOrmModule.forFeature([Product]),
    PassportModule.register({defaultStrategy:'jwt'}),    
  ],
  exports: [
    ProductsService,  
    TypeOrmModule 
  ]

})
export class ProductsModule {}
