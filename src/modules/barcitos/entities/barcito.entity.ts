import { Product } from 'modules/products/entities/product.entity';
import { Supply } from 'modules/supplies/entities/supply.entity';
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

  //Supplies del barcito
  @OneToMany(() => Supply, (supply: Supply) => supply.barcito, {
    nullable: true,
  })
  supplies: Supply[];
}
