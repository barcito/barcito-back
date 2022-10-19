import { OrderStatus } from 'enums/order-status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
