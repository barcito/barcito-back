import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBarcitoDto } from './dto/create-barcito.dto';
import { UpdateBarcitoDto } from './dto/update-barcito.dto';
import { Barcito } from './entities/barcito.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class BarcitosService {
  constructor(
    @InjectRepository(Barcito)
    private BarcitoRepository: Repository<Barcito>,
  ) {}

  async create(createBarcitoDto: CreateBarcitoDto): Promise<Barcito> {
    const createdBarcito = this.BarcitoRepository.create(createBarcitoDto);
    await this.BarcitoRepository.save(createdBarcito);
    return createdBarcito;
  }

  async findAll(): Promise<Barcito[]> {
    return this.BarcitoRepository.find({
      relations: {
        managers: true,
        academicUnit: true,
      },
    });
  }

  async findById(id: number): Promise<Barcito> {
    const barcito = await this.BarcitoRepository.findOne({
      where: { id },
      relations: {
        academicUnit: true,
        managers: true
      },
    });
    if (!barcito) throw new NotFoundException('Barcito not found');
    return barcito;
  }

  async update(
    id: number,
    updateBarcitoDto: UpdateBarcitoDto,
  ): Promise<Barcito> {
    await this.BarcitoRepository.update(id, updateBarcitoDto);
    const updatedBarcito = await this.findById(id);
    return updatedBarcito;
  }

  async remove(id: number) {
    const deleteResponse = await this.BarcitoRepository.delete(id);
    if (!deleteResponse.affected)
      throw new NotFoundException('Barcito not found');
    return deleteResponse;
  }
}
