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
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
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

  @Column({ type: 'numeric', precision: 14})
  code: number;

  @Column({ type: 'numeric', precision: 8 , scale: 2 })
  amount: number;

  @Column()
  barcitoId: number;

  @ManyToOne(() => Barcito, (barcito: Barcito) => barcito.orders)
  barcito: Barcito;

  @ManyToOne(() => User, (user: User) => user.orders)
  user: User;

  @OneToMany(
    () => OrderedProduct,
    (orderedProducts: OrderedProduct) => orderedProducts.order,
    { cascade: true },
  )
  products: OrderedProduct[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @CreateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @CreateDateColumn({ type: 'timestamptz' })
  deletedAt: string;
}
