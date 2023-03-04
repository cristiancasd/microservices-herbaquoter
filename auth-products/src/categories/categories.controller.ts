import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto'; 
import { Category } from './entities/category.entity';
import { CategorySwagger } from './entities/swagger/categorySwagger.entity';
 
@ApiTags('Categories')
@Controller('categories') 
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    ) {}

  @Post('create')
  @ApiResponse({status: 201, description: 'Category created', type: CategorySwagger})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 410, description: 'Category already exist, but it is inactive'})
  @ApiBearerAuth('JWT-auth')
  @Auth(ValidRoles.admin, ValidRoles.superAdmin)
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @GetUser()user: User) {
    return this.categoriesService.create(createCategoryDto, user);
  }

  @Get('find')
  @ApiResponse({status: 200, description: 'Categories found', type: [CategorySwagger]})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 404, description: 'Categories not found in DB'})
  findAll(@Query() paginationDto: PaginationDto ) {
    return this.categoriesService.findAll(paginationDto);
  }

  @Get('findby/:term')
  @ApiResponse({status: 200, description: 'Category found', type: Category})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 404, description: 'Category not found in DB'})
  findOne(@Param('term') term: string) {
    return this.categoriesService.findOne(term);
  }

  @Patch('edit/:id')
  @ApiResponse({status: 200, description: 'Category updated', type: CategorySwagger})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 404, description: 'Category not found in DB'})
  @ApiResponse({status: 410, description: 'Category is inactive'})
  @ApiBearerAuth('JWT-auth')
  @Auth(ValidRoles.admin, ValidRoles.superAdmin)
  updateCategory(
    @Param('id', ParseUUIDPipe) id: string,  
    @Body() updateCategoryDto: UpdateCategoryDto,
    @GetUser()user: User) {
    return this.categoriesService.update(id, updateCategoryDto, user);
  }

  @Delete('delete/:id')
  @ApiResponse({status: 200, description: 'Category deleted'})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 404, description: 'Category not found in DB'})
  @ApiResponse({status: 410, description: 'Category is inactive'})
  @ApiBearerAuth('JWT-auth')
  @Auth(ValidRoles.admin, ValidRoles.superAdmin)
  remove(
    @Param('id', ParseUUIDPipe) id: string,  
    @Body() updateCategoryDto: UpdateCategoryDto,
    @GetUser()user: User) {
    return this.categoriesService.remove(id, user);
  }

  @Post('activate/:term')
  @ApiResponse({status: 201, description: 'Category activated'})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 404, description: 'Category not found in DB'})
  @ApiBearerAuth('JWT-auth')
  @Auth(ValidRoles.admin, ValidRoles.superAdmin)
  activate(
    @Param('term') term: string,  
    //@Body() updateCategoryDto: UpdateCategoryDto,
    @GetUser()user: User) {
    return this.categoriesService.activate(term, user);
  }
}