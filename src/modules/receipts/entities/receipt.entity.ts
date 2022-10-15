import { Product } from "modules/products/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Receipt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'date'})
    date: string;

    @Column()
    ticket: number;

    @Column()
    quantity: number;

    @Column()
    amount: number;

    @ManyToOne(() => Product, (product: Product) => product.receipts)
    product: Product;
}
