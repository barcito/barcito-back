import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from 'enums/role.enum';
import { Application } from 'modules/applications/entities/application.entity';
import { AcademicUnit } from 'enums/academicUnit.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column()
  public name: string;

  @Column()
  public surname: string;

  @Column({ unique: true })
  public dni: number;

  @Column()
  public phone: number;

  @Column({
    type: 'enum',
    enum: AcademicUnit
  })
  public academicUnit: AcademicUnit;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.ADMIN, Role.USER],
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

  @OneToMany(
    () => Application,
    (applicationsValidated: Application) => applicationsValidated.validatorUser,
    { nullable: true },
  )
  applicationsValidated?: Application[];
}
