import { ReceiptToStock } from "modules/receipt-to-stock/entities/receipt-to-stock.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity()
export class Receipt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'date'})
    date: string;

    @Column()
    ticket: number; //cambiar a archivo directamente

    @Column({ type: 'numeric', precision: 8 , scale: 2 })
    amount: number;

    @Column()
    receiptPath: string;

    @OneToMany(() => ReceiptToStock, (receiptToStock: ReceiptToStock) => receiptToStock.receipt)
    receiptToStock: ReceiptToStock[];

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: string;
  
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: string;
  
    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt: string;
}
