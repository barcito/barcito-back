import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { Role } from 'enums/role.enum';
import { Application } from 'modules/applications/entities/application.entity';
import { Barcito } from 'modules/barcitos/entities/barcito.entity';
import { AcademicUnit } from 'modules/academic-units/entities/academic-unit.entity';
import { Order } from 'modules/orders/entities/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  dni: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  academicUnitId: number;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.ADMIN],
  })
  roles: Role[];

  @Column({ nullable: true })
  barcitoManagedId: number;

  @Column({ nullable: true })
  refreshToken: string;

  //Solicitudes y certificados
  @OneToOne(() => Application)
  @JoinColumn()
  applicationDone: Application;

  // Solicitudes realizadas por el usuario
  @OneToMany(() => Application, (applicationsValidated: Application) => applicationsValidated.validatorUser)
  applicationsValidated: Application[];

  // Barcito que administra el usuario
  @ManyToOne(() => Barcito, (barcito: Barcito) => barcito.managers)
  barcitoManaged: Barcito;

  // Unidad academica del usuario
  @ManyToOne(() => AcademicUnit, (academicUnit: AcademicUnit) => academicUnit.users)
  academicUnit: AcademicUnit;

  //Pedidos del usuario
  @OneToMany(() => Order, (order: Order) => order.user)
  orders: Order[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: string;
}
