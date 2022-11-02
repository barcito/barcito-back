import { IsArray, IsNumber, IsString, IsOptional, IsBoolean } from '@nestjs/class-validator';
import { Barcito } from 'modules/barcitos/entities/barcito.entity';
import { Category } from 'modules/categories/entities/category.entity';
import { ProductToSupply } from 'modules/product-to-supply/entities/product-to-supply.entity';
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
  @IsNumber()
  stockForSale: number;

  @IsOptional()
  @IsString()
  imagePath: string;

  stock: Stock;

  @IsOptional()
  @IsArray()
  categories: Category[];

  @IsOptional()
  @IsArray()
  productToSupplies: ProductToSupply[];

  @IsOptional()
  barcito: Barcito;
}
