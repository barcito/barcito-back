import { Module } from '@nestjs/common';
import { ProductToStockService } from './product-to-stock.service';
import { ProductToStockController } from './product-to-stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductToStock } from './entities/product-to-stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductToStock])],
  controllers: [ProductToStockController],
  providers: [ProductToStockService]
})
export class ProductToStockModule {}
