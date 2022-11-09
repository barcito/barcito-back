import { Order } from 'modules/orders/entities/order.entity';
import { Product } from 'modules/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class OrderedProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ type: 'numeric', precision: 8 , scale: 2 })
  lockedPrice: number;

  @Column()
  productId: number;

  @ManyToOne(() => Order, (order) => order.products)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orders)
  product: Product;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: string;
}
