import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderedProductsService } from './ordered-products.service';
import { CreateOrderedProductDto } from './dto/create-ordered-product.dto';
import { UpdateOrderedProductDto } from './dto/update-ordered-product.dto';

@Controller('ordered-products')
export class OrderedProductsController {
  constructor(
    private readonly orderedProductsService: OrderedProductsService,
  ) {}

  @Post()
  create(@Body() createOrderedProductDto: CreateOrderedProductDto) {
    return this.orderedProductsService.create(createOrderedProductDto);
  }

  @Get()
  findAll() {
    return this.orderedProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderedProductsService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderedProductDto: UpdateOrderedProductDto,
  ) {
    return this.orderedProductsService.update(id, updateOrderedProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderedProductsService.remove(id);
  }
}
