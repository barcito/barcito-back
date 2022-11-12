import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { OrderStatus } from 'enums/order-status.enum';
import { OrderedProduct } from 'modules/ordered-products/entities/ordered-product.entity';
import { User } from 'modules/users/entities/user.entity';

export class CreateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsOptional()
  @IsNumber()
  code: number;

  @IsOptional()
  @IsNumber()
  amount: number;

  @IsArray()
  products: OrderedProduct[];

  user: User;
}
