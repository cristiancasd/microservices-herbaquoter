import { IsArray, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {

    @ApiProperty({
        description: 'Product Title'
    })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty({
        description: 'Product public price'
    })
    @IsNumber()
    @IsPositive()
    pricepublic: number;

    @ApiProperty({
        description: 'Product price with 15% discount. It is int'
    })
    @IsNumber()
    @IsPositive()
    price15: number;

    @ApiProperty({
        description: 'Product price with 25% discount. It is int'
    })
    @IsNumber()
    @IsPositive()
    price25: number;

    @ApiProperty({
        description: 'Product price with 35% discount. It is int'
    })
    @IsNumber()
    @IsPositive()
    price35: number;

    @ApiProperty({
        description: 'Product price with 42% discount. It is int'
    })
    @IsNumber()
    @IsPositive()
    price42: number;

    @ApiProperty({
        description: 'Product price with 50% discount. It is int'
    })
    @IsNumber()
    @IsPositive()
    price50: number;

    @ApiProperty({
        description: 'Product description'
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: 'Volume Points, it is float number'
    })
    @IsNumber()
    @IsPositive()
    pv: number;

    @ApiProperty({
        description: 'link web image'
    })
    @IsString()
    @IsOptional()
    image?: string;
    
    @ApiProperty({
        description: 'unique number code, minimum 3 characters'
    })
    @IsString()
    @MinLength(3)
    sku: string;

    @ApiProperty({
        description: 'id of category. It is UUID'
    })
    @IsOptional()
    @IsString()
    @MinLength(1)
    categoryId?: string;
}

