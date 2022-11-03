import { Module } from '@nestjs/common';
import { ReceiptToStockService } from './receipt-to-stock.service';
import { ReceiptToStockController } from './receipt-to-stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptToStock } from './entities/receipt-to-stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReceiptToStock])],
  controllers: [ReceiptToStockController],
  providers: [ReceiptToStockService]
})
export class ReceiptToStockModule {}
