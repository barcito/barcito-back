import {
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  IsArray,
  IsNumberString,
} from '@nestjs/class-validator';
import { AcademicUnit } from 'enums/academic-unit.enum';
import { Application } from 'modules/applications/entities/application.entity';
import { Barcito } from 'modules/barcitos/entities/barcito.entity';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  dni: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsEnum(AcademicUnit)
  academicUnit: AcademicUnit;

  @IsOptional()
  @IsString()
  refreshToken: string;

  @IsOptional()
  @IsNumber()
  applicationDone: Application;

  @IsOptional()
  @IsArray()
  applicationsValidated: Application[];

  @IsOptional()
  barcitoManaged: Barcito;
}
