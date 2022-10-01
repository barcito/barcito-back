import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCategory } from 'enums/productCategory.enum';
import { Barcito } from 'modules/barcitos/entities/barcito.entity';
import { Supply } from 'modules/supplies/entities/supply.entity';

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

  @Column({ type: 'real' })
  buyPrice: number;

  @Column({ type: 'real' })
  finalSellPrice: number;

  @Column({ type: 'real' })
  associatedSellPrice: number;

  @Column()
  discount: number;

  @Column()
  stock: number;

  @Column({ type: 'smallint' })
  available: number;

  @Column()
  lowStockWarning: number;

  @Column()
  lastRestock: string;

  @Column()
  imagePath: string;

  //Barcito relationship
  @ManyToOne(() => Barcito, (barcito: Barcito) => barcito.products)
  barcito: Barcito;

  //Supply relationship
  @ManyToMany(() => Supply)
  @JoinTable()
  supplies: Supply[];
}
