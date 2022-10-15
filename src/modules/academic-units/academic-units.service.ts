import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAcademicUnitDto } from './dto/create-academic-unit.dto';
import { UpdateAcademicUnitDto } from './dto/update-academic-unit.dto';
import { AcademicUnit } from './entities/academic-unit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AcademicUnitsService {
  constructor(
    @InjectRepository(AcademicUnit)
    private academicUnitsRepository: Repository<AcademicUnit>,
  ) {}

  async create(
    createAcademicUnitDto: CreateAcademicUnitDto,
  ): Promise<AcademicUnit> {
    const createdAcademicUnit = this.academicUnitsRepository.create(
      createAcademicUnitDto,
    );
    await this.academicUnitsRepository.save(createdAcademicUnit);
    return createdAcademicUnit;
  }

  findAll(): Promise<AcademicUnit[]> {
    return this.academicUnitsRepository.find();
  }

  async findById(id: number): Promise<AcademicUnit> {
    const academicUnit = await this.academicUnitsRepository.findOne({
      where: { id },
    });
    if (!academicUnit) throw new NotFoundException('Academic unit not found');
    return academicUnit;
  }

  async update(id: number, updateAcademicUnitDto: UpdateAcademicUnitDto) {
    await this.academicUnitsRepository.update(id, updateAcademicUnitDto);
    const updatedAcademicUnit = this.findById(id);
    return updatedAcademicUnit;
  }

  async remove(id: number) {
    const deleteResponse = await this.academicUnitsRepository.delete(id);
    if (!deleteResponse.affected)
      throw new NotFoundException('Academic unit not found');
  }
}
