import { IsString } from '@nestjs/class-validator';
import { IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  refreshToken: string;
}
