import { PartialType } from '@nestjs/mapped-types';
import { CreateAcademicUnitDto } from './create-academic-unit.dto';

export class UpdateAcademicUnitDto extends PartialType(CreateAcademicUnitDto) {}
