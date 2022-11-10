import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>
  ){}

  async create(createStockDto: CreateStockDto): Promise<Stock> {
    const createdStock = this.stockRepository.create(createStockDto);
    await this.stockRepository.save(createdStock);
    return createdStock;
  }

  findAll(): Promise<Stock[]> {
    return this.stockRepository.find();
  }

  async findById(id: number): Promise<Stock> {
    const stock = await this.stockRepository.findOne({
      where: { id }
    });
    if (!stock) throw new NotFoundException('Stock not found');
    return stock;
  }

  async update(id: number, updateStockDto: UpdateStockDto) {
    await this.stockRepository.update(id, updateStockDto);
    const updatedStock = this.findById(id);
    return updatedStock;
  }

  async remove(id: number) {
    const deleteResponse = await this.stockRepository.delete(id);
    if (!deleteResponse.affected)
      throw new NotFoundException('Stock not found');
  }
}
