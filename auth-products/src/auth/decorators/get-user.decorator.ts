import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const GetUser=createParamDecorator(
    (data, ctx: ExecutionContext)=>{
        //data, info que viene desde el controller al momento de usar el decorador
        const req=ctx.switchToHttp().getRequest();
        const user=req.user;
        if(!user)
            throw new InternalServerErrorException('User not found (request)')
        return user;
    }
)
