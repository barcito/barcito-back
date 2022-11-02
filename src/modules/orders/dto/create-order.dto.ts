import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { OrderStatus } from 'enums/order-status.enum';
import { Barcito } from 'modules/barcitos/entities/barcito.entity';
import { OrderedProduct } from 'modules/ordered-products/entities/ordered-product.entity';
import { User } from 'modules/users/entities/user.entity';

export class CreateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsString()
  code: string;

  @IsNumber()
  amount: number;

  @IsArray()
  products: OrderedProduct[];

  @IsOptional()
  barcito: Barcito;

  @IsOptional()
  user: User;
}
