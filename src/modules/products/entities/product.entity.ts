import {
  Column,
  Entity,
  JoinTable,
  OneToOne,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { Barcito } from 'modules/barcitos/entities/barcito.entity';
import { Supply } from 'modules/supplies/entities/supply.entity';
import { Category } from 'modules/categories/entities/category.entity';
import { Receipt } from 'modules/receipts/entities/receipt.entity';
import { OrderedProduct } from 'modules/ordered-products/entities/ordered-product.entity';
import { Stock } from 'modules/stock/entities/stock.entity';
import { ProductToSupply } from 'modules/product-to-supply/entities/product-to-supply.entity';


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
  stockForSale: number;

  @Column({ nullable: true })
  imagePath: string;

  @OneToOne(() => Stock, (stock: Stock) => stock.product, { cascade: true })
  @JoinColumn()
  stock: Stock;

  //Category relationship
  @ManyToMany(() => Category, (category: Category) => category.products)
  @JoinTable({ name: "product_to_category" })
  categories: Category[];

  //Supply relationship
  @OneToMany(() => ProductToSupply, (productToSupply: ProductToSupply) => productToSupply.product, {cascade: true, orphanedRowAction: 'delete'})
  productToSupplies: ProductToSupply[];

  //Receipts relationship
  @OneToMany(() => Receipt, (receipt: Receipt) => receipt.product)
  receipts: Receipt[];

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
