import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../common/dto/pagination.dto';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserToken } from './entities/swagger/user-token.entity';
import { User } from './entities/user.entity';
import { ValidRoles } from './interfaces/valid-roles';

@ApiTags('Auth')
@Controller('auth')
export class AuthController { 
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({status: 201, description: 'User was created', type: UserToken})
  @ApiResponse({status: 400, description: 'Bad request'})
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiResponse({status: 201, description: 'User LOGIN', type: UserToken})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 401, description: 'Email or Password incorrect'})
  @ApiResponse({status: 410, description: 'User inactive - talk with the admin'})
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }


  @Get()
  @ApiResponse({status: 201, description: 'Users founds',type: [User]})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 404, description: 'No hay usuarios en la DB'})
  @ApiBearerAuth('JWT-auth')
  @Auth(ValidRoles.admin, ValidRoles.superAdmin)
  findAll(@Query() paginationDto: PaginationDto ) {
    return this.authService.findAll(paginationDto);
  }


  @Get(':term')
  @ApiResponse({status: 201, description: 'User found',type: User})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 403, description: 'User no atuthorized'})
  @ApiResponse({status: 404, description: 'No existe el usuario en la DB'})
  @ApiBearerAuth('JWT-auth')
  @Auth()
  findOne(
    @Param('term') term: string,
    @GetUser()user: User) {
    return this.authService.findOne(term,user);
  }

  @Patch('admin/:id')  
  @ApiResponse({status: 201, description: 'User updated', type: User})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 404, description: 'No se encontró el usuario'})
  @ApiBearerAuth('JWT-auth')
  @Auth(ValidRoles.admin, ValidRoles.superAdmin)
  update(@Param('id', ParseUUIDPipe) id: string, 
  @Body() updateAuthDto: UpdateAuthDto) 
  {
    return this.authService.update(id, updateAuthDto);
  }

  @Patch(':id')
  @ApiResponse({status: 201, description: 'User updated', type: User})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 403, description: 'User no atuthorized'})
  @ApiResponse({status: 404, description: 'User not found in DB'})
  @ApiBearerAuth('JWT-auth')
  @Auth()
  updateUser(
    @Param('id', ParseUUIDPipe) id: string, 
  @Body() updateUserDto: UpdateUserDto,
  @GetUser()user: User) 
  {
    return this.authService.updateUser(id, updateUserDto, user);
  }
 
  @Delete(':id')
  @ApiResponse({status: 201, description: 'User deleted'})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 403, description: 'User no atuthorized'})
  @ApiResponse({status: 404, description: 'Data not found in DB'})
  @ApiResponse({status: 410, description: 'User deleted of DB'})
  @ApiBearerAuth('JWT-auth')
  @Auth()  
  remove(
    @Param('id', ParseUUIDPipe) id: string,    
    @GetUser(/*Aquí va la Data*/)user: User) 
  {
    return this.authService.remove(id, user);
  }

  @Post('activate/:term')
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({status: 201, description: 'User activated', type: User})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 404, description: 'User not found in DB'})
  @Auth(ValidRoles.admin, ValidRoles.superAdmin)
  activate(
    @Param('term') term: string,    
    //@GetUser(/*Aquí va la Data*/)user: User
    ) 
  {
    return this.authService.activate(term);
  }


  @Post('check-renew-token')
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({status: 201, description: 'Token renoved', type: UserToken,})
  @ApiResponse({status: 401, description: 'Invalid Token'})
  @Auth()
  checkAuthStatus(
    @GetUser() user: User
  ){
    return this.authService.checkAuthStatus(user);
  }
}
