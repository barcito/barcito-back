import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.enum';
import { Application } from '../../applications/entities/application.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.ADMIN, Role.USER],
  })
  public roles: Role[];

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column({
    nullable: true,
  })
  public refreshToken: string;

  //Solicitudes
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
