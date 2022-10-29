import { Order } from 'modules/orders/entities/order.entity';
import { Product } from 'modules/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class OrderedProduct {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public quantity: number;

  @Column({ type: 'numeric', precision: 8 , scale: 2 })
  public lockedPrice: number;

  @ManyToOne(() => Order, (order) => order.products)
  public order: Order;

  @ManyToOne(() => Product, (product) => product.orders)
  public product: Product;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: string;
}
