import { IsNumberString, IsString, IsArray } from '@nestjs/class-validator';
import { IsOptional } from 'class-validator';
import { Product } from 'modules/products/entities/product.entity';

export class CreateSupplyDto {
  @IsString()
  description: string;

  @IsNumberString()
  buyPrice: number;

  @IsNumberString()
  stock: number;

  @IsNumberString()
  lowStockWarning: number;

  @IsNumberString()
  lastRestock: number;

  @IsOptional()
  @IsArray()
  products: Product[];
}
