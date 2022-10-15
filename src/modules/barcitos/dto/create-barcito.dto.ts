import { IsNumberString, IsOptional, IsString } from '@nestjs/class-validator';
import { AcademicUnit } from 'modules/academic-units/entities/academic-unit.entity';

export class CreateBarcitoDto {
  @IsString()
  name: string;

  @IsOptional()
  academicUnit: AcademicUnit;

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
