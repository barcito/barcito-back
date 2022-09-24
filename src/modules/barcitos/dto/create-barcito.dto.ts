import { IsNumberString, IsOptional, IsString } from '@nestjs/class-validator';

export class CreateBarcitoDto {
  @IsString()
  academicUnit: string;

  @IsNumberString()
  openTime: number;

  @IsNumberString()
  closeTime: number;

  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  imagePath: string;
}
