import { Injectable } from '@nestjs/common';
import { CreateProductToStockDto } from './dto/create-product-to-stock.dto';
import { UpdateProductToStockDto } from './dto/update-product-to-stock.dto';

@Injectable()
export class ProductToStockService {
  create(createProductToStockDto: CreateProductToStockDto) {
    return 'This action adds a new productToStock';
  }

  findAll() {
    return `This action returns all productToStock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productToStock`;
  }

  update(id: number, updateProductToStockDto: UpdateProductToStockDto) {
    return `This action updates a #${id} productToStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} productToStock`;
  }
}
