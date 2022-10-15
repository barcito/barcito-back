import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { Receipt } from './entities/receipt.entity';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ProductsService } from 'modules/products/products.service';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipt)
    private receiptsRepository: Repository<Receipt>,
    private productsService: ProductsService
  ) {}

  async create(createReceiptDto: CreateReceiptDto): Promise<Receipt> {
    const createdReceipt = this.receiptsRepository.create(createReceiptDto);
    const savedReceipt = await this.receiptsRepository.save(createdReceipt);
    const product = await this.productsService.findById(savedReceipt.product.id);
    const updStock = { stock: product.stock + savedReceipt.quantity, buyPrice: savedReceipt.amount / savedReceipt.quantity };
    this.productsService.update(product.id, updStock);
    return createdReceipt;
  }

  findAll(): Promise<Receipt[]> {
    return this.receiptsRepository.find();
  }

  async findById(id: number): Promise<Receipt> {
    const receipt = await this.receiptsRepository.findOne({ where: { id } });
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
