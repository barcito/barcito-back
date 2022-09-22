import {
  IsString,
  IsOptional,
  IsNumber,
} from '@nestjs/class-validator';
import { Application } from 'src/applications/entities/application.entity';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  refreshToken: string;

  @IsOptional()
  @IsNumber()
  applicationDone: Application;
}
