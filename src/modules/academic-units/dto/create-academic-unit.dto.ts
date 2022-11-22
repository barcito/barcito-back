import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAcademicUnitDto {
  @ApiProperty()
  @IsString()
  shortName: string;

  @ApiProperty()
  @IsString()
  description: string;
}
