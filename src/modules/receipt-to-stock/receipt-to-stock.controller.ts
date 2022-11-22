import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReceiptToStockService } from './receipt-to-stock.service';
import { CreateReceiptToStockDto } from './dto/create-receipt-to-stock.dto';
import { UpdateReceiptToStockDto } from './dto/update-receipt-to-stock.dto';

@ApiTags('Receipt to Stock')
@Controller('receipt-to-stock')
export class ReceiptToStockController {
  constructor(private readonly receiptToStockService: ReceiptToStockService) {}

  @Post()
  create(@Body() createReceiptToStockDto: CreateReceiptToStockDto) {
    return this.receiptToStockService.create(createReceiptToStockDto);
  }

  @Get()
  findAll() {
    return this.receiptToStockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receiptToStockService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReceiptToStockDto: UpdateReceiptToStockDto,
  ) {
    return this.receiptToStockService.update(+id, updateReceiptToStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receiptToStockService.remove(+id);
  }
}
