import { Transform } from '@nestjs/class-transformer';
import { IsArray, IsBoolean, IsDate, IsEnum, IsNumberString, IsString } from '@nestjs/class-validator';
import { IsNumber, IsOptional } from 'class-validator';
import { ProductCategory } from 'enums/productCategory.enum';
import { Supply } from 'modules/supplies/entities/supply.entity';

export class CreateProductDto {
  @IsOptional()
  @IsEnum(ProductCategory)
  category: ProductCategory;

  @IsString()
  description: string;

  @IsNumberString()
  buyPrice: number;

  @IsNumberString()
  finalSellPrice: number;

  @IsNumberString()
  associatedSellPrice: number;

  @IsNumberString()
  discount: number;

  @IsNumberString()
  stock: number;

  @IsNumberString()
  available: number;

  @IsNumberString()
  lowStockWarning: number;

  @IsString()
  lastRestock: string;

  @IsOptional()
  @IsString()
  imagePath: string;

  @IsOptional()
  @IsArray()
  suppliesIds: number[];

  @IsOptional()
  @IsArray()
  supplies: Supply[];
}
