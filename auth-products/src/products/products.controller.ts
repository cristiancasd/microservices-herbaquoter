import { Controller, Get, Post, Body, Patch, Param, Delete, Query,ParseUUIDPipe, Headers} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Product } from './entities/product.entity';
import { ProductSwagger } from './entities/swagger/productSwagger.entity';

@ApiTags('Products')
@Controller('products') 
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

 
  @Post('create')
  @ApiResponse({status: 201, description: 'Product created', type: ProductSwagger})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 410, description: 'Product inactive, it was deleted of DB'})
  @ApiBearerAuth('JWT-auth')
  @Auth(ValidRoles.admin, ValidRoles.superAdmin)
  create(
    @Body() createProductDto: CreateProductDto,
    @Headers() idCategory: string,
    @GetUser()user: User) {
    return this.productsService.create(createProductDto, user, idCategory);
  }
  
  @Get('find')
  @ApiResponse({status: 200, description: 'Products found', type: [ProductSwagger]})
  @ApiResponse({status: 404, description: 'products not found in DB'})
  findAll(@Query() paginationDto: PaginationDto ) {
    return this.productsService.findAll(paginationDto);
  }

  @Get('findby/:term')
  @ApiResponse({status: 200, description: 'Products found', type: Product})
  @ApiResponse({status: 404, description: 'products not found in DB'})
 
  findOne(@Param('term') term: string) {
    return this.productsService.findOne(term);
  }

  @Patch('edit/:id')
  @ApiResponse({status: 200, description: 'Product updated', type: ProductSwagger})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 403, description: 'User not authorized'})
  @ApiResponse({status: 404, description: 'product not found in DB'})
  @ApiResponse({status: 410, description: 'Product inactive, it was deleted of DB'})
  @ApiBearerAuth('JWT-auth')
  @Auth(ValidRoles.admin, ValidRoles.superAdmin)
  updateCategory(
    @Param('id', ParseUUIDPipe) id: string,  
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete('delete/:id')
  @ApiResponse({status: 200, description: 'Product deleted'})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 404, description: 'product not found in DB'})
  @ApiResponse({status: 410, description: 'Product inactive, it was deleted of DB'})
  @ApiBearerAuth('JWT-auth')
  @Auth(ValidRoles.admin, ValidRoles.superAdmin)
  remove(
    @Param('id', ParseUUIDPipe) id: string,  
    @GetUser()user: User) {
    return this.productsService.remove(id, user);
  }

  @Post('activate/:term')
  @ApiResponse({status: 201, description: 'Product activated', type: Product})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 404, description: 'product not found in DB'}) 
  @ApiBearerAuth('JWT-auth')
  @Auth(ValidRoles.admin, ValidRoles.superAdmin)
  activate(
    @Param('term') term: string,  
    @GetUser()user: User) {
    return this.productsService.activate(term, user);
  }
}