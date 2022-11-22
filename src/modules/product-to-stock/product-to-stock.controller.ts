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
import { ProductToStockService } from './product-to-stock.service';
import { CreateProductToStockDto } from './dto/create-product-to-stock.dto';
import { UpdateProductToStockDto } from './dto/update-product-to-stock.dto';

@ApiTags('Product to Stock')
@Controller('product-to-stock')
export class ProductToStockController {
  constructor(private readonly productToStockService: ProductToStockService) {}

  @Post()
  create(@Body() createProductToStockDto: CreateProductToStockDto) {
    return this.productToStockService.create(createProductToStockDto);
  }

  @Get()
  findAll() {
    return this.productToStockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productToStockService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductToStockDto: UpdateProductToStockDto,
  ) {
    return this.productToStockService.update(+id, updateProductToStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productToStockService.remove(+id);
  }
}
