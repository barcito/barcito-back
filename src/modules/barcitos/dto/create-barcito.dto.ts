import { IsNumber, IsString } from '@nestjs/class-validator';

export class CreateBarcitoDto {
  @IsString()
  academicUnit: string;

  @IsNumber()
  openTime: number;

  @IsNumber()
  closeTime: number;

  @IsString()
  location: string;

  @IsString()
  imagePath: string;
}
