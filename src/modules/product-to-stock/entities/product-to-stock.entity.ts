import { Product } from "modules/products/entities/product.entity";
import { Stock } from "modules/stock/entities/stock.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductToStock {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productId: number;

    @Column()
    stockId: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Product, (product: Product) => product.productToStock)
    product: Product;

    @ManyToOne(() => Stock, (stock: Stock) => stock.productToStock)
    stock: Stock;
}
