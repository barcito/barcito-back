import { Module } from '@nestjs/common';
import { ProductToSupplyService } from './product-to-supply.service';
import { ProductToSupplyController } from './product-to-supply.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductToSupply } from './entities/product-to-supply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductToSupply])],
  controllers: [ProductToSupplyController],
  providers: [ProductToSupplyService]
})
export class ProductToSupplyModule {}
