import { IsNumberString, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AcademicUnit } from 'modules/academic-units/entities/academic-unit.entity';

export class CreateBarcitoDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({
    type: () => AcademicUnit,
  })
  @IsOptional()
  academicUnit: AcademicUnit;

  @ApiProperty()
  @IsString()
  openTime: string;

  @ApiProperty()
  @IsString()
  closeTime: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  imagePath: string;
}
