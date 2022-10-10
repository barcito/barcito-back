import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSupplyDto } from './dto/create-supply.dto';
import { UpdateSupplyDto } from './dto/update-supply.dto';
import { Supply } from './entities/supply.entity';
import { Repository, Like } from 'typeorm';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class SuppliesService {
  constructor(
    @InjectRepository(Supply)
    private suppliesRepository: Repository<Supply>,
  ) {}

  async create(createSupplyDto: CreateSupplyDto): Promise<Supply> {
    const createdSupply = this.suppliesRepository.create(createSupplyDto);
    await this.suppliesRepository.save(createdSupply);
    return createdSupply;
  }

  findAll(): Promise<Supply[]> {
    return this.suppliesRepository.find();
  }

  async findById(id: number): Promise<Supply> {
    const supply = await this.suppliesRepository.findOne({ where: { id } });
    if (!supply) throw new NotFoundException('Supply not found');
    return supply;
  }

  async findAllSearched(query: string): Promise<Supply[]> {
    return this.suppliesRepository.find({
      where: {
        description: Like(`%${query}%`),
      },
    });
  }

  async update(id: number, updateSupplyDto: UpdateSupplyDto) {
    await this.suppliesRepository.update(id, updateSupplyDto);
    const updatedSupply = this.findById(id);
    return updatedSupply;
  }

  async remove(id: number) {
    const deleteResponse = await this.suppliesRepository.delete(id);
    if (!deleteResponse.affected)
      throw new NotFoundException('Supply not found');
  }
}
