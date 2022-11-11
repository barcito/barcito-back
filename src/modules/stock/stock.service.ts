import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockType } from 'enums/stock-type.enum';
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

  async create(barcito: number, createStockDto: CreateStockDto): Promise<Stock> {
    const createdStock = this.stockRepository.create({...createStockDto, barcitoId: barcito});
    await this.stockRepository.save(createdStock);
    return createdStock;
  }

  findAll(barcito: number): Promise<Stock[]> {
    return this.stockRepository.find({
      where: {
        barcitoId: barcito
      },
      relations: {
        categories: true
      }
    });
  }

  async findById(id: number): Promise<Stock> {
    const stock = await this.stockRepository.findOne({
      where: { id },
      relations: {
        categories: true
      }
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

  async getAllConsumables(barcito: number): Promise<Stock[]>{
    return this.stockRepository.find({
      where: {
        barcitoId: barcito,
        type: StockType.CONSUMABLE
      },
      relations: {
        categories: true
      }
    });
  }

  async getAllSupplies(barcito: number): Promise<Stock[]>{
    return this.stockRepository.find({
      where: {
        barcitoId: barcito,
        type: StockType.SUPPLY
      },
      relations:{ 
        categories: true
      }
    });
  }
}
