import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'common/decorators/roles.decorator';
import { Role } from 'enums/role.enum';
import { RolesGuard } from 'common/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { productFileFilter, productFileNamer } from 'files/helpers';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(Role.MANAGER, Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
  ) {
    const product = await this.productsService.create(createProductDto);
    return product;
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findById(id);
  }

  @Get('/barcito/:barcitoId')
  findByBarcito(@Param('barcitoId', ParseIntPipe) barcitoId: number){
    return this.productsService.findAllByBarcito(barcitoId);
  }

  @Get('search/:query')
  search(@Param('query') query: string) {
    return this.productsService.findAllSearched(query);
  }

  @Roles(Role.MANAGER, Role.ADMIN)
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Roles(Role.MANAGER, Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @Patch('/image-update/:id')
  @UseInterceptors(
    FileInterceptor('product_img', {
      fileFilter: productFileFilter,
      limits: { fileSize: 10000000 },
      storage: diskStorage({
        destination: '../files-storage/products',
        filename: productFileNamer,
      }),
    }),
  )
  imageUpdate(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File
  ){
    if (!file)
      throw new BadRequestException('Make sure image is of a valid type');

    const updateProductDto: UpdateProductDto = {imagePath: `${process.env.HOST_API}files/products/${file.filename}`};
    return this.productsService.update(id, updateProductDto);
  }
}
