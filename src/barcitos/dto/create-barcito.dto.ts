import { IsInt, IsString } from '@nestjs/class-validator';

export class CreateBarcitoDto {
  // @IsString()
  academicUnit: string;

  // @IsInt()
  openTime: number;

  // @IsInt()
  closeTime: number;

  // @IsString()
  location: string;

  // @IsString()
  imagePath: string;
}
