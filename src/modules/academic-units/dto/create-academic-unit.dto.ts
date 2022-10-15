import { IsArray, IsString } from '@nestjs/class-validator';
import { IsOptional } from '@nestjs/class-validator';
import { Barcito } from 'modules/barcitos/entities/barcito.entity';
import { User } from 'modules/users/entities/user.entity';

export class CreateAcademicUnitDto {
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  barcitos: Barcito[];

  @IsOptional()
  @IsArray()
  users: User[];
}
