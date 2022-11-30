import { IsOptional, IsString } from '@nestjs/class-validator';
import { AcademicUnit } from 'modules/academic-units/entities/academic-unit.entity';

export class CreateBarcitoDto {
  @IsString()
  name: string;

  @IsOptional()
  academicUnit: AcademicUnit;

  @IsString()
  openTime: string;

  @IsString()
  closeTime: string;

  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  imagePath: string;
}
