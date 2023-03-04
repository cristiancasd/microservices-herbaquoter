import { ApiProperty } from "@nestjs/swagger";

export class CategorySwagger {

    @ApiProperty({
        example:'1db34b69-7a41-42f4-8ab0-02911a12315e',
        description: 'category ID',
        uniqueItems: true
    })
    id: string; 

    @ApiProperty({
        example:'Sistema Digestivo',
        description: 'Nombre de la categoria',
        uniqueItems: true
    })
    title: string;

    @ApiProperty({
        example:'Productos para mejorar tu sistema digestivo',
        description: 'Descrpcion de la categoria',
    })
    description: string;

    @ApiProperty({
        example:true,
        description: 'estado de la categoria',
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
}