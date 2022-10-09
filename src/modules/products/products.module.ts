import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Supply } from 'modules/supplies/entities/supply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Supply])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
