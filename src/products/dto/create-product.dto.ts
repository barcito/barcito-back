import { Transform } from '@nestjs/class-transformer';
import { IsBoolean, IsDate, IsEnum, IsString } from '@nestjs/class-validator';
import { IsNumber } from 'class-validator';
import { ProductCategory } from 'enums/productCategory.enum';

export class CreateProductDto {
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

  @Transform((val) => BigInt(val.value))
  lastRestock: string;

  @IsString()
  imagePath: string;
}
