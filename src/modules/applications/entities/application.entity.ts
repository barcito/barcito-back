import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { User } from 'modules/users/entities/user.entity';
import { ApplicationStatus } from 'enums/application-status.enum';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  certificatePath: string;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
  })
  status: ApplicationStatus;

  @OneToOne(() => User, (applicantUser: User) => applicantUser.applicationDone)
  applicantUser: User;

  @ManyToOne(
    () => User,
    (validatorUser: User) => validatorUser.applicationsValidated,
  )
  validatorUser: User;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: string;
}
