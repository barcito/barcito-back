import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductToSupplyService } from './product-to-supply.service';
import { CreateProductToSupplyDto } from './dto/create-product-to-supply.dto';
import { UpdateProductToSupplyDto } from './dto/update-product-to-supply.dto';

@Controller('product-to-supply')
export class ProductToSupplyController {
  constructor(private readonly productToSupplyService: ProductToSupplyService) {}

  @Post()
  create(@Body() createProductToSupplyDto: CreateProductToSupplyDto) {
    return this.productToSupplyService.create(createProductToSupplyDto);
  }

  @Get()
  findAll() {
    return this.productToSupplyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productToSupplyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductToSupplyDto: UpdateProductToSupplyDto) {
    return this.productToSupplyService.update(+id, updateProductToSupplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productToSupplyService.remove(+id);
  }
}
