import { IsArray, IsNumber, IsString, IsOptional, IsBoolean } from '@nestjs/class-validator';
import { Category } from 'modules/categories/entities/category.entity';
import { Stock } from 'modules/stock/entities/stock.entity';

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

  @IsNumber()
  barcitoId: number;

  @IsArray()
  stock: Stock[];

  @IsArray()
  categories: Category[];
}
