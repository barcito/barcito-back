import { Module } from '@nestjs/common';
import { AcademicUnitsService } from './academic-units.service';
import { AcademicUnitsController } from './academic-units.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicUnit } from './entities/academic-unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AcademicUnit])],
  controllers: [AcademicUnitsController],
  providers: [AcademicUnitsService],
})
export class AcademicUnitsModule {}
