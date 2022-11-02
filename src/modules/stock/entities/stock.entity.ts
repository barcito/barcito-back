import { Product } from 'modules/products/entities/product.entity';
import { Supply } from 'modules/supplies/entities/supply.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne
} from 'typeorm';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', precision: 8 , scale: 2 })
  cost: number;

  @Column()
  quantity: number;

  @Column()
  warning: number;

  //Product relationship
  @OneToOne(() => Product, (product: Product) => product.stock)
  product: Product;

  //Supply relationship
  @OneToOne(() => Supply, (supply: Supply) => supply.stock)
  supply: Supply;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: string;
}
