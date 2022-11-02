import { Injectable } from '@nestjs/common';
import { CreateProductToSupplyDto } from './dto/create-product-to-supply.dto';
import { UpdateProductToSupplyDto } from './dto/update-product-to-supply.dto';

@Injectable()
export class ProductToSupplyService {
  create(createProductToSupplyDto: CreateProductToSupplyDto) {
    return 'This action adds a new productToSupply';
  }

  findAll() {
    return `This action returns all productToSupply`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productToSupply`;
  }

  update(id: number, updateProductToSupplyDto: UpdateProductToSupplyDto) {
    return `This action updates a #${id} productToSupply`;
  }

  remove(id: number) {
    return `This action removes a #${id} productToSupply`;
  }
}
