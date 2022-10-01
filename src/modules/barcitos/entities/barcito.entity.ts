import { Product } from 'modules/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  //Productos del barcito
  @OneToMany(() => Product, (products: Product) => products.barcito, {
    nullable: true,
  })
  products: Product[];
}
