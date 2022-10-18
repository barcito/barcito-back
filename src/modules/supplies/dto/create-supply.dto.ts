import { IsNumberString, IsString, IsArray, IsBoolean } from '@nestjs/class-validator';
import { IsOptional } from 'class-validator';
import { Product } from 'modules/products/entities/product.entity';

export class CreateSupplyDto {
  @IsString()
  description: string;

  @IsBoolean()
  available: boolean;

  @IsNumberString()
  buyPrice: number;

  @IsNumberString()
  stock: number;

  @IsNumberString()
  lowStockWarning: number;

  @IsString()
  lastRestock: string;

  @IsOptional()
  @IsArray()
  products: Product[];
}
