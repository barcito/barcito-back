import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Barcito } from 'modules/barcitos/entities/barcito.entity';
import { Supply } from 'modules/supplies/entities/supply.entity';
import { Category } from 'modules/categories/entities/category.entity';
import { Receipt } from 'modules/receipts/entities/receipt.entity';

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  available: boolean;

  @Column()
  buyPrice: number;

  @Column()
  finalSellPrice: number;

  @Column()
  associatedSellPrice: number;

  @Column()
  discount: number;

  @Column({nullable: true})
  stock: number;

  @Column({nullable: true})
  stockForSale: number;

  @Column()
  lowStockWarning: number;

  @Column({type: 'date', nullable: true})
  lastRestock: string;

  @Column({nullable: true})
  imagePath: string;

  //Category relationship
  @ManyToMany(() => Category, (category: Category) => category.products, {nullable: true})
  @JoinTable({
    name: 'product_category',
    joinColumn: {
      name: 'product_id'
    },
    inverseJoinColumn: {
      name: 'category_id'
    }
  })
  categories: Category[];

  //Supply relationship
  @ManyToMany(() => Supply, (supply: Supply) => supply.products, {nullable: true})
  @JoinTable({
    name: 'product_supplies',
    joinColumn: {
      name: 'product_id',
    },
    inverseJoinColumn: {
      name: 'supply_id',
    },
  })
  supplies: Supply[];

  //Receipts relationship
  @OneToMany(() => Receipt, (receipt: Receipt) => receipt.product)
  receipts: Receipt[]

  //Barcito relationship
  @ManyToOne(() => Barcito, (barcito: Barcito) => barcito.products, {nullable: true})
  barcito: Barcito;
}
