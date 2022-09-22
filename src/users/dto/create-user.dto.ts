import {
  IsString,
  IsOptional,
} from '@nestjs/class-validator';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  refreshToken: string;
}
