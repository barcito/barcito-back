import { Product } from 'modules/products/entities/product.entity';
import { Barcito } from 'modules/barcitos/entities/barcito.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Supply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  available: boolean;

  @Column({ type: 'real' })
  buyPrice: number;

  @Column()
  stock: number;

  @Column()
  lowStockWarning: number;

  @Column({ type: 'date', nullable: true })
  lastRestock: string;

  //Barcito relationship
  @ManyToOne(() => Barcito, (barcito: Barcito) => barcito.products)
  barcito: Barcito;

  //Product relationship
  @ManyToMany(() => Product, (product: Product) => product.supplies)
  // @JoinTable()
  products: Product[];
}
