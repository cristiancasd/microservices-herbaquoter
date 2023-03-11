import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductsModule } from 'src/products/products.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    ProductsModule, 
    CategoriesModule,
    AuthModule,
    FilesModule
  ]

})
export class SeedModule {}
