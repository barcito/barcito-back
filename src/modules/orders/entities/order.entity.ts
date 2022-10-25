import { OrderStatus } from 'enums/order-status.enum';
import { Barcito } from 'modules/barcitos/entities/barcito.entity';
import { OrderedProduct } from 'modules/ordered-products/entities/ordered-product.entity';
import { User } from 'modules/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column()
  code: string;

  @Column({ type: 'date' })
  date: string;

  @Column()
  amount: number;

  @ManyToOne(() => Barcito, (barcito: Barcito) => barcito.orders, {
    nullable: true,
  })
  barcito: Barcito;

  @ManyToOne(() => User, (user: User) => user.orders, { nullable: true })
  user: User;

  @OneToMany(
    () => OrderedProduct,
    (orderedProducts: OrderedProduct) => orderedProducts.order,
    { cascade: true },
  )
  products: OrderedProduct[];
}
