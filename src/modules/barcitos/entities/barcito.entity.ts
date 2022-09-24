import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Barcito {
  @PrimaryGeneratedColumn()
  id: number;

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
}
