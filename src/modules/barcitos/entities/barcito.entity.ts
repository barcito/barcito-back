import { AcademicUnit } from 'modules/academic-units/entities/academic-unit.entity';
import { Category } from 'modules/categories/entities/category.entity';
import { Order } from 'modules/orders/entities/order.entity';
import { Product } from 'modules/products/entities/product.entity';
import { Receipt } from 'modules/receipts/entities/receipt.entity';
import { Stock } from 'modules/stock/entities/stock.entity';
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

  @Column()
  academicUnitId: number;

  //Stock del barcito
  @OneToMany(() => Stock, (stock: Stock) => stock.barcito)
  stock: Stock[];

  //Productos de venta del barcito
  @OneToMany(() => Product, (products: Product) => products.barcito)
  products: Product[];

  @OneToMany(() => Category, (category: Category) => category.barcito)
  categories: Category[];

  //Administradores del barcito
  @OneToMany(() => User, (manager: User) => manager.barcitoManaged)
  managers: User[];

  //Unidad academica del barcito
  @ManyToOne(() => AcademicUnit, (academicUnit: AcademicUnit) => academicUnit.barcitos)
  academicUnit: AcademicUnit;

  //Pedidos realizados al barcito
  @OneToMany(() => Order, (order: Order) => order.barcito)
  orders: Order[];

  @OneToMany(() => Receipt, (receipt: Receipt) => receipt.barcito)
  receipts: Receipt[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: string;
}
