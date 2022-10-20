import { AcademicUnit } from 'modules/academic-units/entities/academic-unit.entity';
import { Order } from 'modules/orders/entities/order.entity';
import { Product } from 'modules/products/entities/product.entity';
import { Supply } from 'modules/supplies/entities/supply.entity';
import { User } from 'modules/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Barcito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  openTime: number;

  @Column()
  closeTime: number;

  @Column()
  location: string;

  @Column()
  imagePath: string;

  //Productos del barcito
  @OneToMany(() => Product, (products: Product) => products.barcito, {
    nullable: true,
  })
  products: Product[];

  //Supplies del barcito
  @OneToMany(() => Supply, (supply: Supply) => supply.barcito, {
    nullable: true,
  })
  supplies: Supply[];

  //Administradores del barcito
  @OneToMany(() => User, (manager: User) => manager.barcitoManaged, {
    nullable: true,
  })
  managers: User[];

  //Unidad academica del barcito
  @ManyToOne(
    () => AcademicUnit,
    (academicUnit: AcademicUnit) => academicUnit.barcitos,
    { nullable: true },
  )
  academicUnit: AcademicUnit;

  //Pedidos realizados al barcito
  @OneToMany(() => Order, (order: Order) => order.barcito)
  orders: Order[];
}
