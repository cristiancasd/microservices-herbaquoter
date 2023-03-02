import { IsOptional, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateCategoryDto {
    @ApiProperty({
        description: 'Category name'
    })
    @IsString()
    @MinLength(1)
    title: string;
    
    @ApiProperty({
        description: 'category description'
    })
    @IsOptional()
    @IsString()
    @MinLength(1)
    description: string;
}
