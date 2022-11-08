import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm";
import { Product } from "modules/products/entities/product.entity";
import { Barcito } from "modules/barcitos/entities/barcito.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    //Product relationship
    @ManyToMany(() => Product, (product: Product) => product.categories)
    products: Product[];

    @ManyToOne(() => Barcito, (barcito: Barcito) => barcito.categories)
    barcito: Barcito;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: string;

    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt: string;
}
