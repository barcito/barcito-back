import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCategory } from 'enums/productCategory.enum';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ProductCategory,
    array: true,
    default: [ProductCategory.BEBIDA],
  })
  category: ProductCategory;

  @Column()
  description: string;

  @Column()
  buyPrice: number;

  @Column()
  finalSellPrice: number;

  @Column()
  associatedSellPrice: number;

  @Column()
  discount: number;

  @Column()
  stock: number;

  @Column({ type: 'smallint' })
  available: number;

  @Column()
  lowStockWarning: number;

  @Column({ type: 'bigint' })
  lastRestock: string;

  @Column()
  imagePath: string;
}
