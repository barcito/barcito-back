import { IsString } from '@nestjs/class-validator';
export class CreateAcademicUnitDto {
  @IsString()
  shortName: string;

  @IsString()
  description: string;
}
