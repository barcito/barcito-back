import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories/:barcito')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Param('barcito', ParseIntPipe) barcito: number, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto, barcito);
  }

  @Get()
  findAll(@Param('barcito', ParseIntPipe) barcito: number) {
    return this.categoriesService.findAllByBarcito(barcito);
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

  @Get('products/:categoryId')
  async findProductsByCategory(@Param('categoryId', ParseIntPipe) categoryId: number){
    const category = await this.categoriesService.findWithProds(categoryId);
    return category;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
