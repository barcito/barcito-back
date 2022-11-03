import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { Receipt } from './entities/receipt.entity';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipt)
    private receiptsRepository: Repository<Receipt>,
  ) {}

  async create(createReceiptDto: CreateReceiptDto): Promise<Receipt> {
    const createdReceipt = this.receiptsRepository.create(createReceiptDto);
    await this.receiptsRepository.save(createdReceipt);
    return createdReceipt;
  }

  findAll(): Promise<Receipt[]> {
    return this.receiptsRepository.find({
      relations: {
        receiptToStock: true
      }
    });
  }

  async findById(id: number): Promise<Receipt> {
    const receipt = await this.receiptsRepository.findOne({
      where: { id },
      relations: {
        receiptToStock: true
      }
    });
    if (!receipt) throw new NotFoundException('Receipt not found');
    return receipt;
  }

  async update(id: number, updateReceiptDto: UpdateReceiptDto) {
    await this.receiptsRepository.update(id, updateReceiptDto);
    const updatedReceipt = this.findById(id);
    return updatedReceipt;
  }

  async remove(id: number) {
    const deleteResponse = await this.receiptsRepository.delete(id);
    if (!deleteResponse.affected)
      throw new NotFoundException('Receipt not found');
  }
}
