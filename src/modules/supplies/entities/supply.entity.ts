import { Product } from 'modules/products/entities/product.entity';
import { Barcito } from 'modules/barcitos/entities/barcito.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { Stock } from 'modules/stock/entities/stock.entity';

@Entity()
export class Supply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  available: boolean;

  @OneToOne(() => Stock, (stock: Stock) => stock.supply, { cascade: true })
  @JoinColumn()
  stock: Stock;

  //Barcito relationship
  @ManyToOne(() => Barcito, (barcito: Barcito) => barcito.products)
  barcito: Barcito;

  //Product relationship
  @ManyToMany(() => Product, (product: Product) => product.supplies)
  products: Product[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: string;
}
