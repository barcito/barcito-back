import { IsNumber, IsString, IsBoolean, IsOptional } from '@nestjs/class-validator';
import { Barcito } from 'modules/barcitos/entities/barcito.entity';
import { Stock } from 'modules/stock/entities/stock.entity';

export class CreateSupplyDto {
  @IsString()
  description: string;

  @IsBoolean()
  available: boolean;

  stock: Stock;

  @IsOptional()
  barcito: Barcito;
}
