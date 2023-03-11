import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm'

@Entity()
export class Product {
    @ApiProperty({
        example:'1db34b69-7a41-42f4-8ab0-02911a12315e',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example:'Herbal Aloe',
        description: 'Nombre del producto',
    })
    @Column('text', {
        unique: true,
    })
    title: string;

    @ApiProperty({
        example: 100000,
        description: 'Valor del producto precio publico',
    })
    @Column('int')
    pricepublic:number;

    @ApiProperty({
        example: 85000,
        description: 'Valor del producto con 15% de descuento',
    })
    @Column('int')
    price15:number;

    @ApiProperty({
        example: 75000,
        description: 'Valor del producto con 25% de descuento',
    })
    @Column('int')
    price25:number;

    @ApiProperty({
        example: 65000,
        description: 'Valor del producto con 35% de descuento',
    })
    @Column('int')
    price35:number;

    @ApiProperty({
        example: 58000,
        description: 'Valor del producto con 42% de descuento',
    })
    @Column('int')
    price42:number;

    @ApiProperty({
        example: 50000,
        description: 'Valor del producto con 50% de descuento',
    })
    @Column('int')
    price50:number;

    @ApiProperty({
        example: 'Limpia, cicatriza y desinflama el colon',
        description: 'Descripción del producto',
    })
    @Column({
        type: 'text',
        default:''
    })
    description: string;    

    @ApiProperty({
        example: 24.95,
        description: 'Puntos de volumen del producto',
    })
    @Column('float')
    pv: number;    

    @ApiProperty({
        example: 85000,
        description: 'https://herbexample.com.co/product/aloe.jpg',
    })
    @Column({
        type: 'text',
        default:''
    })
    image: string;    

    @ApiProperty({
        example: '1023',
        description: 'Código que identifica el producto',
        uniqueItems: true
    })
    @Column({
        type: 'text',
        unique:true,
    })
    sku: string;   

    @ApiProperty({
        example:true,
        description: 'estado del producto',
    })
    @Column('bool',{
        default: true,
    })
    isactive: boolean;

    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.sku=this.sku.toUpperCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert()
    }

    @ManyToOne(
        ()=>User,
        (user)=>user.product,
        {eager: true} //cargar automaticamente la relación, que en el fron muestre el
    )
    user: User

    @ManyToOne(
        ()=>Category,
        (categorie)=>categorie.product,
        {eager: true} //cargar automaticamente la relación, que en el fron muestre el
    )
    categorie: Category
}

