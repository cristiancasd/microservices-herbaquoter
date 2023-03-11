import { ApiProperty } from "@nestjs/swagger";

export class ProductSwagger {

    @ApiProperty({
        example:'1db34b69-7a41-42f4-8ab0-02911a12315e',
        description: 'Product ID',
        uniqueItems: true
    })

    @ApiProperty({
        example:'Herbal Aloe',
        description: 'Nombre del producto',
    })
    title: string;

    @ApiProperty({
        example: 100000,
        description: 'Valor del producto precio publico',
    })
    pricepublic:number;

    @ApiProperty({
        example: 85000,
        description: 'Valor del producto con 15% de descuento',
    })
    price15:number;

    @ApiProperty({
        example: 75000,
        description: 'Valor del producto con 25% de descuento',
    })
    price25:number;

    @ApiProperty({
        example: 65000,
        description: 'Valor del producto con 35% de descuento',
    })
    price35:number;

    @ApiProperty({
        example: 58000,
        description: 'Valor del producto con 42% de descuento',
    })
    price42:number;

    @ApiProperty({
        example: 50000,
        description: 'Valor del producto con 50% de descuento',
    })
    price50:number;

    @ApiProperty({
        example: 'Limpia, cicatriza y desinflama el colon',
        description: 'Descripción del producto',
    })
    description: string;    

    @ApiProperty({
        example: 24.95,
        description: 'Puntos de volumen del producto',
    })
    pv: number;    

    @ApiProperty({
        example: 85000,
        description: 'https://herbexample.com.co/product/aloe.jpg',
    })
    image: string;    

    @ApiProperty({
        example: '1023',
        description: 'Código que identifica el producto',
        uniqueItems: true
    })
    sku: string;   

    @ApiProperty({
        example:true,
        description: 'estado del producto',
    })
    isactive: boolean;


    @ApiProperty({
        example: {
            id:'adsa23432fdgdf4-23432',
            fullname: 'Camilo hernandez'
        },
        description: 'Basic User info',
    })
    user: {};

    @ApiProperty({
        example: {
            id:'adsa23432fdgdf4-23432',
            title: 'Salud Digestiva',
            description: 'importantepara el coln'
        },
        description: 'Basic category info',
    })
    category: {};
}