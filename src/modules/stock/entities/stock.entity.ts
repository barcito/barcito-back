import { StockType } from 'enums/stock-type.enum';
import { Barcito } from 'modules/barcitos/entities/barcito.entity';
import { Category } from 'modules/categories/entities/category.entity';
import { ProductToStock } from 'modules/product-to-stock/entities/product-to-stock.entity';
import { ReceiptToStock } from 'modules/receipt-to-stock/entities/receipt-to-stock.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable
} from 'typeorm';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: StockType
  })
  type: StockType;

  @Column()
  description: string;

  @Column({ type: 'numeric', precision: 8 , scale: 2 })
  cost: number;

  @Column()
  quantity: number;

  @Column()
  warning: number;

  @Column()
  barcitoId: number;

  @ManyToMany(() => Category, (category: Category) => category.stock)
  @JoinTable({ name: "stock_to_categories" })
  categories: Category[]

  //Product relationship
  @OneToMany(() => ProductToStock, (productToStock: ProductToStock) => productToStock.stock)
  productToStock: ProductToStock[];

  //Barcito relationship
  @ManyToOne(() => Barcito, (barcito: Barcito) => barcito.stock)
  barcito: Barcito;

  //Receipt relationship
  @OneToMany(() => ReceiptToStock, (receiptToStock: ReceiptToStock) => receiptToStock.stock)
  receiptToStock: ReceiptToStock[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: string;
}
