import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, 
  NotFoundException, UnauthorizedException, GoneException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';


import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

import { validate as isUUID } from 'uuid'

  


@Injectable()
export class AuthService { 

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService, 
  ){}


  async create(createUserDto: CreateUserDto) {
    try{
      const {password, ...userData}=createUserDto;
      const user=this.userRepository.create({
        ...userData,
       password: bcrypt.hashSync(password, 10)
      });
      await this.userRepository.save(user);

      const {password:pass, ...resto }=user;
      return {
        user: resto,
        token: this.getJWT({id: resto.id, rol: user.rol})
      };

    }catch(error){
      this.handleDBErrors(error)
    }
  }

  async login(loginUserDto: LoginUserDto){
    const {password, email}=loginUserDto;
    const user=await this.userRepository.findOne({
      where: {email},
      select: {email: true, 
        password: true, 
        isactive: true, 
        id: true, 
        fullname: true, 
        rol:true, 
        herbalifelevel: true, 
        country: true,
        image: true,
      }, //Si no hago esto no me devuelve la contraseña
    });
    if(!user)
      throw new UnauthorizedException('Credentials are not valid (email)')
    
    if(!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)')
    
    if(!user.isactive)
      throw new GoneException('Inactive User - talk with the admin')

      const {password:pass, ...resto }=user;
      return {
        user: resto,
        token: this.getJWT({id: user.id, rol: user.rol})
      };
  }


  async findAll(paginationDto: PaginationDto ) {
    const {limit=10, offset=0}=paginationDto;
    const users=await this.userRepository.find({
      where: {
        isactive: true,
    },
      take: limit,
      skip: offset,
      relations: {
      }
    });
    if(!users|| users.length==0) throw new NotFoundException(`Users not found`)

    return users.map((user)=>{
      let {password, ...resto}=user;
      return resto
    })  
  }  


  async findOne(term: string, user: User) { 

    let users: User[];
    const queryBuilder=this.userRepository.createQueryBuilder('us');
    
    isUUID(term)
      ? users=[await this.userRepository.findOneBy({id: term,isactive: true})]
      : users=await queryBuilder.where('(us.email =:email or us.rol =:rol) and us.isactive =:isactive',{
        email: term.toLowerCase(),
        rol: term.toLowerCase(),
        isactive: true,
        })
        .getMany();      
    
    if(!users|| users.length==0) throw new NotFoundException(`Users with term ${term} not found`)
    
    
    if(users[0].id!=user.id && user.rol=='user')
     throw new ForbiddenException('You are trying to get a user that is not yours')

    return users.map((user)=>{
      let {password, ...resto}=user;
      return resto
    }) 
  }



  async update(id: string, updateAuthDto: UpdateAuthDto) {    
    const {email, password, ...toUpdate}=updateAuthDto;
    let user=await this.userRepository.preload({
      id,
      ...toUpdate
    });
    
    if(!user) throw new NotFoundException(`User with id ${id} not found`)
    try{
      let userUpdate={password:user.password};
      (password)
        ? userUpdate={ ...user, ...toUpdate, password: bcrypt.hashSync(password, 10)}
        : userUpdate={ ...user,  ...toUpdate, password: user.password }

      await this.userRepository.save(userUpdate);
      
      const {password: password2, ...restUserUpdate}=userUpdate
      return restUserUpdate;

    }catch(error){
      this.handleDBErrors(error)
    }      
  }


  async updateUser(id: string, updateAuthDto: UpdateUserDto, user: User) {  
    const {password, newPassword, ...toUpdate}=updateAuthDto;

    let userDB=await this.userRepository.preload({
      id,
      ...toUpdate
    });
    if(!userDB) throw new NotFoundException(`UserDB with id ${id} not found`)  
    
    if (userDB.id!=user.id)
      throw new ForbiddenException('You are trying to change a user that is not yours')
    
    if(!bcrypt.compareSync(password, userDB.password))
      throw new UnauthorizedException('Credentials are not valid (password)')
    
    try{ 
      
      let userUpdate ={password: userDB.password} ;

      (newPassword)
        ? userUpdate={ ...userDB, ...toUpdate,
        password: bcrypt.hashSync(newPassword, 10)
        }

        : userUpdate={ ...userDB,  ...toUpdate, password: userDB.password     
        }


      await this.userRepository.save(userUpdate);

      const {password: password2, ...restUserUpdate}=userUpdate
      return restUserUpdate;
    }catch(error){
      this.handleDBErrors(error)
    }  
    return {
      updateAuthDto,
      id      
    }    
  }


  async remove(id: string, user: User) {    
    let userDB=await this.userRepository.preload({id});
    if(!userDB) throw new NotFoundException(`userDB with id ${id} not found`);
    if(!userDB.isactive) 
      throw new GoneException(`user with id ${id} is inactive, it don't need to be remove`);
    if(user.rol=='user'){
      if(user.id!=userDB.id) 
        throw new ForbiddenException('You are trying to delete a user that is not yours')
    }    
    try{
      const userUpdate={
        ...userDB,
       isactive: false,
      }
      await this.userRepository.save(userUpdate);
      return;
    }catch(error){
      this.handleDBErrors(error)
    } 
  }


  async activate(term: string) {    
    let user: User;
    let id=term;
    if(!isUUID(term)){
      let userTemporal:User;
      const queryBuilder=this.userRepository.createQueryBuilder('us');
      userTemporal=await queryBuilder.where('UPPER(email) =:email' ,{
        email: term.toUpperCase(),
        })
        .getOne(); 
      if(!userTemporal) throw new NotFoundException(`user with email ${term} not found`)
      id=userTemporal.id
    }

    
    let userDB=await this.userRepository.preload({id});    
    if(!userDB) throw new NotFoundException(`userDB with id ${id} not found`)
    if(userDB.isactive) 
      return `user with id ${id} is active, it don't need to be activated`
    //throw new BadRequestException(`user with id ${id} is active, it don't need to be reactive`);
    try{
      const userUpdate={ 
        ...userDB,
       isactive: true,
      }
      await this.userRepository.save(userUpdate);

      return{
        ...userUpdate,
        password: '********'
      }
    }catch(error){
      this.handleDBErrors(error)
    } 
  }

  

  async checkAuthStatus(user: User){
    const {password, ...resto }=user;
    return {
      user: resto,
      token: this.getJWT({id: user.id, rol: user.rol})
    };
  }


  private getJWT(payload: JwtPayload){
    const token=this.jwtService.sign(payload);
    return token;
  }


  private handleDBErrors(error: any){
    if(error.code==='23505')
      throw new BadRequestException(error.detail);
    console.log(error)
    throw new InternalServerErrorException('Please check server logs')
  }
}
