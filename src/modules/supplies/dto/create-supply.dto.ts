import { IsNumberString, IsString } from '@nestjs/class-validator';

export class CreateSupplyDto {
  @IsString()
  description: string;

  @IsNumberString()
  buyPrice: number;

  @IsNumberString()
  stock: number;

  @IsNumberString()
  lowStockWarning: number;

  @IsNumberString()
  lastRestock: number;
}
