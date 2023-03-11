import { Category } from "../../categories/entities/category.entity";
import { Product } from "../../products/entities/product.entity";
import {OneToMany, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";


@Entity('users')
export class User {
    @ApiProperty({
        example:'1db34b69-7a41-42f4-8ab0-02911a12315e',
        description: 'user ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @ApiProperty({
        example:'admin@test.com',
        description: 'user email',
        uniqueItems: true
    })
    @Column('text',{
        unique: true
    })
    email: string;
    
    @ApiProperty({
        example:'Abc123',
        description: 'user password, mínimo 6 caracteres',
    })
    @Column('text',{
      //  select: false, //En find y querybuilder no se incluye
    })
    password: string;
    
    @ApiProperty({
        example:'Natalia Paris',
        description: 'Nombre del usuario',
    })
    @Column('text')
    fullname: string;
    
    @ApiProperty({
        example:true,
        description: 'Estado del usuario',
    })
    @Column('bool',{
        default: true,
    })
    isactive: boolean;
    
    @ApiProperty({
        example:'admin',
        description: 'rol del usuario',
    })
    @Column('text'
        ,{default: 'user'}
        //,{array: true, default: 'user'}
    )
    rol: string;

    @ApiProperty({
        example:'Colombia',
        description: 'Pais del usuario',
    })
    @Column('text',{
        default: 'Colombia',
    })
    country: string;

    @ApiProperty({
        example:'https://herbexample.com.co/user/nataliaparis.jpg',
        description: 'Dirección URL de la imagen del usuario',
    })
    @Column('text',{ 
        default: '',
    })
    image: string;
    
    @ApiProperty({
        example:'supervisor',
        description: 'Posición del usuario',
    })
    @Column('text'    
        //,{default: 'supervisor',}
    )
    herbalifelevel: string;


    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.email=this.email.toLowerCase().trim();
        this.fullname=this.fullname.toUpperCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert()
    }
    
    @OneToMany(
        ()=>Category,
        (categorie)=>categorie,
        //{eager: true} //cargar automaticamente la relación, que en el fron muestre el
    )
    categorie: Category;

    @OneToMany(
        ()=>Product,
        (product)=>product,
    )
    product: Product;

    
}