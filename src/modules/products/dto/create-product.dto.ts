import { IsArray, IsNumber, IsString, IsOptional } from '@nestjs/class-validator';
import { Barcito } from 'modules/barcitos/entities/barcito.entity';
import { Category } from 'modules/categories/entities/category.entity';
import { Supply } from 'modules/supplies/entities/supply.entity';
import { Column } from 'typeorm';

export class CreateProductDto {

  @IsString()
  description: string;

  @Column()
  available: boolean;

  @IsNumber()
  buyPrice: number;

  @IsNumber()
  finalSellPrice: number;

  @IsNumber()
  associatedSellPrice: number;

  @IsNumber()
  discount: number;

  @IsOptional()
  @IsNumber()
  stock: number;

  @IsOptional()
  @IsNumber()
  stockForSale: number;

  @IsNumber()
  lowStockWarning: number;

  @IsOptional()
  @IsString()
  lastRestock: string;

  @IsOptional()
  @IsString()
  imagePath: string;

  @IsOptional()
  @IsArray()
  categories: Category[];

  @IsOptional()
  @IsArray()
  supplies: Supply[];

  @IsOptional()
  barcito: Barcito;
}
