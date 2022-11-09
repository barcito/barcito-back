import { Barcito } from 'modules/barcitos/entities/barcito.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany
} from 'typeorm';
import { Stock } from 'modules/stock/entities/stock.entity';
import { ProductToSupply } from 'modules/product-to-supply/entities/product-to-supply.entity';

@Entity()
export class Supply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  available: boolean;

  @Column()
  barcitoId: number;

  @OneToOne(() => Stock, (stock: Stock) => stock.supply, { cascade: true })
  @JoinColumn()
  stock: Stock;

  //Barcito relationship
  @ManyToOne(() => Barcito, (barcito: Barcito) => barcito.products)
  barcito: Barcito;

  //Product relationship
  @OneToMany(() => ProductToSupply, (productToSupply: ProductToSupply) => productToSupply.supply)
  productToSupplies: ProductToSupply[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: string;
}
