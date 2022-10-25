import { Order } from 'modules/orders/entities/order.entity';
import { Product } from 'modules/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderedProduct {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public quantity: number;

  @ManyToOne(() => Order, (order) => order.products)
  public order: Order;

  @ManyToOne(() => Product, (product) => product.orders)
  public product: Product;
}
