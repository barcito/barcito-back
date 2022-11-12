import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('stock/:barcito')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  create(@Param('barcito', ParseIntPipe) barcito: number, @Body() createStockDto: CreateStockDto) {
    return this.stockService.create(barcito, createStockDto);
  }

  @Get()
  findAll(@Param('barcito', ParseIntPipe) barcito: number) {
    return this.stockService.findAll(barcito);
  }

  @Get('consumables')
  findAllConsumables(@Param('barcito', ParseIntPipe) barcito: number) {
    return this.stockService.getAllConsumables(barcito);
  }

  @Get('supplies')
  findAllSupplies(@Param('barcito', ParseIntPipe) barcito: number) {
    return this.stockService.getAllSupplies(barcito);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.stockService.findById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.stockService.remove(id);
  }
}
