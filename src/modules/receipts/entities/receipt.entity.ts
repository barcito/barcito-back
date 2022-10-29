import { Product } from "modules/products/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity()
export class Receipt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'date'})
    date: string;

    @Column()
    ticket: number; //cambiar a archivo directamente

    @Column()
    quantity: number;

    @Column({ type: 'numeric', precision: 8 , scale: 2 })
    amount: number;

    @ManyToOne(() => Product, (product: Product) => product.receipts)
    product: Product;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: string;
  
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: string;
  
    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt: string;
}
