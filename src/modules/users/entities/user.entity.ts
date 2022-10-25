import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from 'enums/role.enum';
import { Application } from 'modules/applications/entities/application.entity';
import { Exclude } from '@nestjs/class-transformer';
import { Barcito } from 'modules/barcitos/entities/barcito.entity';
import { AcademicUnit } from 'modules/academic-units/entities/academic-unit.entity';
import { Order } from 'modules/orders/entities/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  @Exclude()
  public password: string;

  @Column()
  public name: string;

  @Column()
  public surname: string;

  @Column({ unique: true })
  public dni: string;

  @Column()
  public phone: string;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.ADMIN],
  })
  public roles: Role[];

  @Column({
    nullable: true,
  })
  public refreshToken: string;

  //Solicitudes y certificados
  @OneToOne(() => Application, { nullable: true })
  @JoinColumn()
  applicationDone: Application;

  // Solicitudes realizadas por el usuario
  @OneToMany(
    () => Application,
    (applicationsValidated: Application) => applicationsValidated.validatorUser,
    { nullable: true },
  )
  applicationsValidated: Application[];

  // Barcito que administra el usuario
  @ManyToOne(() => Barcito, (barcito: Barcito) => barcito.managers, {
    nullable: true,
  })
  barcitoManaged: Barcito;

  // Unidad academica del usuario
  @ManyToOne(
    () => AcademicUnit,
    (academicUnit: AcademicUnit) => academicUnit.users,
    { nullable: true },
  )
  academicUnit: AcademicUnit;

  //Pedidos del usuario
  @OneToMany(() => Order, (order: Order) => order.user)
  orders: Order[];
}
