import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderedProductDto } from './create-ordered-product.dto';

export class UpdateOrderedProductDto extends PartialType(CreateOrderedProductDto) {}
