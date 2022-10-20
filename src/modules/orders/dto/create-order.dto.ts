import { IsEnum, IsOptional, IsString } from '@nestjs/class-validator';
import { OrderStatus } from 'enums/order-status.enum';
import { Barcito } from 'modules/barcitos/entities/barcito.entity';
import { User } from 'modules/users/entities/user.entity';

export class CreateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsString()
  code: string;

  @IsString()
  date: string;

  @IsOptional()
  barcito: Barcito;

  @IsOptional()
  user: User;
}
