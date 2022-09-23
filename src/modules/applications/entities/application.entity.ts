import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'modules/users/entities/user.entity';
import { Status } from 'enums/status.enum';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  certificatePath: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @OneToOne(
    () => User,
    (applicantUser: User) => applicantUser.applicationDone,
  )
  applicantUser: User;

  @ManyToOne(
    () => User,
    (validatorUser: User) => validatorUser.applicationsValidated,
  )
  validatorUser: User;
}
