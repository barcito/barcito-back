import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Barcito {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public academicUnit: string;

  @Column({ type: 'timestamp' })
  public openTime: Date;

  @Column({ type: 'timestamp' })
  public closeTime: Date;

  @Column()
  public location: string;

  @Column()
  public imagePath: string;
}
