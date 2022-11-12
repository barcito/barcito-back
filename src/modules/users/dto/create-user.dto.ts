import {
  IsString,
  IsOptional,
  IsEmail,
  IsArray,
} from '@nestjs/class-validator';
import { IsNumber } from 'class-validator';
import { AcademicUnit } from 'modules/academic-units/entities/academic-unit.entity';
import { Application } from 'modules/applications/entities/application.entity';

export class CreateUserDto {
  @IsString()
  @IsEmail()
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

  academicUnit: AcademicUnit;

  @IsOptional()
  @IsNumber()
  barcitoManagedId: number;

  @IsOptional()
  applicationDone: Application;

  @IsOptional()
  @IsArray()
  applicationsValidated: Application[];
}
