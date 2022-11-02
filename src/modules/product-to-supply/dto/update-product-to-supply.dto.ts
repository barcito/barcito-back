import { PartialType } from '@nestjs/mapped-types';
import { CreateProductToSupplyDto } from './create-product-to-supply.dto';

export class UpdateProductToSupplyDto extends PartialType(CreateProductToSupplyDto) {}
