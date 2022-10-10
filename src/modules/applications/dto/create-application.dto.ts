import { IsEnum, IsNumber, IsString, IsOptional } from '@nestjs/class-validator';
import { ApplicationStatus } from 'enums/application-status.enum';
import { User } from 'modules/users/entities/user.entity';

export class CreateApplicationDto {
  @IsOptional()
  @IsString()
  certificatePath: string;

  @IsOptional()
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;

  @IsOptional()
  @IsNumber()
  applicantUser: User;

  @IsOptional()
  @IsNumber()
  validatorUser: User;
}
