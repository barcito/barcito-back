import { Transform } from '@nestjs/class-transformer';
import { IsBoolean, IsDate, IsEnum, IsNumberString, IsString } from '@nestjs/class-validator';
import { IsNumber, IsOptional } from 'class-validator';
import { ProductCategory } from 'enums/productCategory.enum';

export class CreateProductDto {
  @IsOptional()
  @IsEnum(ProductCategory)
  category: ProductCategory;

  @IsString()
  description: string;

  @IsNumber()
  buyPrice: number;

  @IsNumber()
  finalSellPrice: number;

  @IsNumber()
  associatedSellPrice: number;

  @IsNumber()
  discount: number;

  @IsNumber()
  stock: number;

  @IsNumber()
  available: number;

  @IsNumber()
  lowStockWarning: number;

  @IsString()
  lastRestock: string;

  @IsString()
  imagePath: string;
}
