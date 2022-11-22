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
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@Controller('categories/:barcito')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(
    @Param('barcito', ParseIntPipe) barcito: number,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.create(createCategoryDto, barcito);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('consumables')
  findAllConsumables(@Param('barcito', ParseIntPipe) barcito: number) {
    return this.categoriesService.getAllConsumables(barcito);
  }

  @Get('supplies')
  findAllSupplies(@Param('barcito', ParseIntPipe) barcito: number) {
    return this.categoriesService.getAllSupplies(barcito);
  }

  @Get('products')
  findAllProducts(@Param('barcito', ParseIntPipe) barcito: number) {
    return this.categoriesService.getAllProducts(barcito);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
