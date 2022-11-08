import { AcademicUnit } from 'modules/academic-units/entities/academic-unit.entity';
import { Category } from 'modules/categories/entities/category.entity';
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
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';

@Entity()
export class Barcito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'time' })
  openTime: string;

  @Column({ type: 'time' })
  closeTime: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  imagePath: string;

  //Productos del barcito
  @OneToMany(() => Product, (products: Product) => products.barcito)
  products: Product[];

  //Supplies del barcito
  @OneToMany(() => Supply, (supply: Supply) => supply.barcito)
  supplies: Supply[];

  @OneToMany(() => Category, (category: Category) => category.barcito)
  categories: Category[];

  //Administradores del barcito
  @OneToMany(() => User, (manager: User) => manager.barcitoManaged)
  managers: User[];

  //Unidad academica del barcito
  @ManyToOne(
    () => AcademicUnit,
    (academicUnit: AcademicUnit) => academicUnit.barcitos
  )
  academicUnit: AcademicUnit;

  //Pedidos realizados al barcito
  @OneToMany(() => Order, (order: Order) => order.barcito)
  orders: Order[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: string;
}
