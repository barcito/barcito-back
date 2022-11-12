import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm";
import { Product } from "modules/products/entities/product.entity";
import { Barcito } from "modules/barcitos/entities/barcito.entity";
import { Stock } from "modules/stock/entities/stock.entity";
import { CategoryType } from "enums/category-type.enum";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: CategoryType
    })
    type: CategoryType;

    @Column()
    description: string;

    @Column()
    barcitoId: number;

    //Product relationship
    @ManyToMany(() => Product, (product: Product) => product.categories)
    products: Product[];

    //Stock relationship
    @ManyToMany(() => Stock, (stock: Stock) => stock.categories)
    stock: Stock[];

    @ManyToOne(() => Barcito, (barcito: Barcito) => barcito.categories)
    barcito: Barcito;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: string;

    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt: string;
}
