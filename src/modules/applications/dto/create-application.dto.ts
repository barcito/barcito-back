import { IsString } from '@nestjs/class-validator';

export class CreateApplicationDto {
  @IsString()
  certificatePath: string;
}
