import { IsNumber, IsString, IsArray, IsBoolean, IsOptional } from '@nestjs/class-validator';
import { Product } from 'modules/products/entities/product.entity';

export class CreateSupplyDto {
  @IsString()
  description: string;

  @IsBoolean()
  available: boolean;

  @IsNumber()
  buyPrice: number;

  @IsNumber()
  stock: number;

  @IsNumber()
  lowStockWarning: number;

  @IsString()
  lastRestock: string;

  @IsOptional()
  @IsArray()
  products: Product[];
}
