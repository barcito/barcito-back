import { IsEnum, IsString, IsOptional } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApplicationStatus } from 'enums/application-status.enum';
import { User } from 'modules/users/entities/user.entity';

export class CreateApplicationDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  certificatePath: string;

  @ApiProperty({
    enum: ApplicationStatus,
    enumName: 'ApplicationStatus',
  })
  @IsOptional()
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;

  @ApiProperty()
  @IsOptional()
  applicantUser: User;

  @ApiProperty()
  @IsOptional()
  validatorUser: User;
}
