import { Module } from '@nestjs/common';
import { OrderedProductsService } from './ordered-products.service';
import { OrderedProductsController } from './ordered-products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderedProduct } from './entities/ordered-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderedProduct])],
  controllers: [OrderedProductsController],
  providers: [OrderedProductsService],
})
export class OrderedProductsModule {}
