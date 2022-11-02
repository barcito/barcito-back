import { Supply } from "modules/supplies/entities/supply.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "modules/products/entities/product.entity";

@Entity()
export class ProductToSupply{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    productId: number;

    @Column()
    supplyId: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Product, (product: Product) => product.productToSupplies)
    product: Product;

    @ManyToOne(() => Supply, (supply: Supply) => supply.productToSupplies)
    supply: Supply;
}