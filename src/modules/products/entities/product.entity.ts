import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { Barcito } from 'modules/barcitos/entities/barcito.entity';
import { Category } from 'modules/categories/entities/category.entity';
import { OrderedProduct } from 'modules/ordered-products/entities/ordered-product.entity';
import { ProductToStock } from 'modules/product-to-stock/entities/product-to-stock.entity';


@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  available: boolean;

  @Column({ type: 'numeric', precision: 8 , scale: 2 })
  finalSellPrice: number;

  @Column({ type: 'numeric', precision: 8 , scale: 2 })
  associatedSellPrice: number;

  @Column({ type: 'numeric', precision: 8 , scale: 2 })
  discount: number;

  @Column({ nullable: true })
  imagePath: string;

  @Column()
  barcitoId: number;

  //Stock relationship
  @OneToMany(() => ProductToStock, (productToStock: ProductToStock) => productToStock.product, { cascade: true })
  productToStock: ProductToStock[];

  //Category relationship
  @ManyToMany(() => Category, (category: Category) => category.products)
  @JoinTable({ name: "product_to_category" })
  categories: Category[];

  //Barcito relationship
  @ManyToOne(() => Barcito, (barcito: Barcito) => barcito.products)
  barcito: Barcito;

  //Ordered products relationship
  @OneToMany(() => OrderedProduct, (orderedProducts: OrderedProduct) => orderedProducts.product)
  orders: OrderedProduct[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: string;
}
