import { Barcito } from 'modules/barcitos/entities/barcito.entity';
import { User } from 'modules/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class AcademicUnit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shortName: string;

  @Column()
  description: string;

  @OneToMany(() => Barcito, (barcitos: Barcito) => barcitos.academicUnit)
  barcitos: Barcito[];

  @OneToMany(() => User, (users: User) => users.academicUnit)
  users: User[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: string;
}
