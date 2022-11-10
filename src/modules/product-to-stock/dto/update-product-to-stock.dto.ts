import { PartialType } from '@nestjs/mapped-types';
import { CreateProductToStockDto } from './create-product-to-stock.dto';

export class UpdateProductToStockDto extends PartialType(CreateProductToStockDto) {}
