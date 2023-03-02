import { IsBoolean, IsEmail, IsIn, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({
        description: 'user email'
    }) 
    @IsEmail()
    email: string; 
    
    @ApiProperty({
        description: 'Password: lowercase, Uppercase, number, length: min6-max 100'
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: 'The password must have a Uppercase, lowercase letter and a number'
        })
    password: string;

    @ApiProperty({
        description: 'User Name'
    })
    @IsString()
    @MinLength(1)
    fullname: string;

    @ApiProperty({
        description: 'user country'
    })
    @IsOptional()
    @IsString()
    @MinLength(1)
    country?: string;
 
    @ApiProperty({
        description: 'link web image'
    })
    @IsOptional()
    @IsString()
    @MinLength(1) 
    image?: string;

    @ApiProperty({
        description: 'user state: it is a boolean'
    })
    @IsOptional()
    @IsBoolean()
    isactive?: boolean; 
    
    @ApiProperty({
        description: "user rol, must be['user','admin','super-admin']"
    })
    @IsOptional()
    @IsString()
    @MinLength(1)
    @IsIn(['user','admin','super-admin'])
    rol?: string;

   
    
    @ApiProperty({
        description: "user level, must be['cliente','cliente-15', 'cliente-25', 'cliente-35','distribuidor-25', 'distribuidor-35','distribuidor-42', 'supervisor'] "
    })
    @IsString()
    @MinLength(1)
    @IsIn(['cliente','cliente-15', 'cliente-25', 'cliente-35',
    'distribuidor-25', 'distribuidor-35','distribuidor-42', 'supervisor'])
    herbalifelevel: string;  
}

