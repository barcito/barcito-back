import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Barcito {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public academicUnit: string;

  @Column()
  public openTime: number;

  @Column()
  public closeTime: number;

  @Column()
  public location: string;

  @Column()
  public imagePath: string;
}
