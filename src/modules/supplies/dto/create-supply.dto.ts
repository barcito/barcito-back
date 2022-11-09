import { IsString, IsBoolean } from '@nestjs/class-validator';
import { IsNumberString } from 'class-validator';
import { Stock } from 'modules/stock/entities/stock.entity';

export class CreateSupplyDto {
  @IsString()
  description: string;

  @IsBoolean()
  available: boolean;

  stock: Stock;

  @IsNumberString()
  barcitoId: number;
}
