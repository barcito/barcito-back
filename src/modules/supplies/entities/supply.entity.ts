import { Product } from 'modules/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Supply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'real' })
  buyPrice: number;

  @Column()
  stock: number;

  @Column()
  lowStockWarning: number;

  //Product relationship
  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
}
