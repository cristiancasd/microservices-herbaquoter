import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector //Poder usar la info de la metadata
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string[]=this.reflector.get('roles', context.getHandler());
    
    //Si los roles no vienen en la metadata, significa que la validación está en otro lugar
    if(!validRoles) return true;
    if(validRoles.length===0) return true;

    const req=context.switchToHttp().getRequest();
    const user=req.user;

    if(!user)
      throw new BadRequestException('User not found')
    console.log({userRol: user.rol})

    //for(const role of user.rol){
      if(validRoles.includes(user.rol)){
        return true;
      }
    //}

    throw new ForbiddenException(
      `User ${user.fullName} need a valid role [${validRoles}]`
    );
  }
}

