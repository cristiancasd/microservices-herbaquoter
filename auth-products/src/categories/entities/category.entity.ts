import { User } from "../../auth/entities/user.entity";
import { Product } from "../../products/entities/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Category {
    @ApiProperty({
        example:'1db34b69-7a41-42f4-8ab0-02911a12315e',
        description: 'category ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @ApiProperty({
        example:'Sistema Digestivo',
        description: 'Nombre de la categoria',
        uniqueItems: true
    })
    @Column('text', {
        unique: true,
    })
    title: string;

    @ApiProperty({
        example:'Productos para mejorar tu sistema digestivo',
        description: 'Descrpcion de la categoria',
    })
    @Column('text', {
        default:''
    })
    description: string;

    @ApiProperty({
        example:true,
        description: 'estado de la categoria',
    })
    @Column('bool',{
        default: true,
    })
    isactive: boolean;
    

    @ManyToOne(
        ()=>User, 
        (user)=>user.categorie,
        {eager: true} //cargar automaticamente la relación, que en el fron muestre el
    )
    user: User

    @OneToMany(
        ()=>Product,
        (product)=>product,
    )
    product: Product;
}
