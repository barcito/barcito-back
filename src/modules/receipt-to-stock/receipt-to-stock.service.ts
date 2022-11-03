import { Injectable } from '@nestjs/common';
import { CreateReceiptToStockDto } from './dto/create-receipt-to-stock.dto';
import { UpdateReceiptToStockDto } from './dto/update-receipt-to-stock.dto';

@Injectable()
export class ReceiptToStockService {
  create(createReceiptToStockDto: CreateReceiptToStockDto) {
    return 'This action adds a new receiptToStock';
  }

  findAll() {
    return `This action returns all receiptToStock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} receiptToStock`;
  }

  update(id: number, updateReceiptToStockDto: UpdateReceiptToStockDto) {
    return `This action updates a #${id} receiptToStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} receiptToStock`;
  }
}
