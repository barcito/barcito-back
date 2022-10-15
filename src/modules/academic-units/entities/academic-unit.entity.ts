import { Barcito } from 'modules/barcitos/entities/barcito.entity';
import { User } from 'modules/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AcademicUnit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @OneToMany(() => Barcito, (barcitos: Barcito) => barcitos.academicUnit, {
    nullable: true,
  })
  barcitos: Barcito[];

  @OneToMany(() => User, (users: User) => users.academicUnit, {
    nullable: true,
  })
  users: User[];
}
