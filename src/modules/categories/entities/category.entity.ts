import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Product } from "modules/products/entities/product.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    //Product relationship
    @ManyToMany(() => Product, (product: Product) => product.supplies)
    products: Product[];

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: string;

    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt: string;
}
