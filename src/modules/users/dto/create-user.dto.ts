import {
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  IsArray,
  IsNumberString,
} from '@nestjs/class-validator';
import { AcademicUnit } from 'modules/academic-units/entities/academic-unit.entity';
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
  @IsString()
  refreshToken: string;

  //*RELATIONSHIPS

  @IsOptional()
  academicUnit: AcademicUnit;

  @IsOptional()
  @IsNumber()
  applicationDone: Application;

  @IsOptional()
  @IsArray()
  applicationsValidated: Application[];

  @IsOptional()
  barcitoManaged: Barcito;
}
