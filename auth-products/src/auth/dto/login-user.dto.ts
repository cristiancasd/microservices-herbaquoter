import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {
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
}


