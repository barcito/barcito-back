import { Receipt } from "modules/receipts/entities/receipt.entity";
import { Stock } from "modules/stock/entities/stock.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReceiptToStock {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    receiptId: number;

    @Column()
    stockId: number;

    @Column()
    quantity: number;

    @Column({ type: 'numeric', precision: 8 , scale: 2 })
    totalCost: number;

    @ManyToOne(() => Receipt, (receipt: Receipt) => receipt.receiptToStock)
    receipt: Receipt;

    @ManyToOne(() => Stock, (stock: Stock) => stock.receiptToStock)
    stock: Stock;
}
