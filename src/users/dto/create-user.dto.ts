import { IsString } from '@nestjs/class-validator';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  refreshToken: string;
}
