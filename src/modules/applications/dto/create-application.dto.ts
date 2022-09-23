import { IsEnum, IsNumber, IsString } from '@nestjs/class-validator';
import { IsOptional } from 'class-validator';
import { Status } from 'enums/status.enum';
import { User } from 'modules/users/entities/user.entity';

export class CreateApplicationDto {
  @IsString()
  certificatePath: string;

  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @IsNumber()
  applicantUser: User;

  @IsOptional()
  @IsNumber()
  validatorUser: User;
}
