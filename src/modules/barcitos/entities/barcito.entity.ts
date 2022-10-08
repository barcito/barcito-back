import { User } from 'modules/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Barcito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  academicUnit: string;

  @Column()
  openTime: number;

  @Column()
  closeTime: number;

  @Column()
  location: string;

  @Column()
  imagePath: string;

  @OneToMany(
    () => User,
    (manager: User) => manager.barcitoManaged,
    { nullable: true}
  )
  managers: User[];
}
