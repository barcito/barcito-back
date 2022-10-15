import { Module } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { ReceiptsController } from './receipts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './entities/receipt.entity';
import { ProductsModule } from 'modules/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt]), ProductsModule],
  controllers: [ReceiptsController],
  providers: [ReceiptsService]
})
export class ReceiptsModule {}
