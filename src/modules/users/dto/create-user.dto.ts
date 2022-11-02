import {
  IsString,
  IsOptional,
  IsEmail,
  IsArray,
} from '@nestjs/class-validator';
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
  applicationDone: Application;

  @IsOptional()
  @IsArray()
  applicationsValidated: Application[];
}
