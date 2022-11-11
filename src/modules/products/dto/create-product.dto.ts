import { IsArray, IsNumber, IsString, IsOptional, IsBoolean } from '@nestjs/class-validator';
import { Category } from 'modules/categories/entities/category.entity';
import { ProductToStock } from 'modules/product-to-stock/entities/product-to-stock.entity';

export class CreateProductDto {

  @IsString()
  description: string;

  @IsBoolean()
  available: boolean;

  @IsNumber()
  finalSellPrice: number;

  @IsNumber()
  associatedSellPrice: number;

  @IsNumber()
  discount: number;

  @IsOptional()
  @IsString()
  imagePath: string;

  @IsArray()
  productToStock: ProductToStock[];

  @IsArray()
  categories: Category[];
}
