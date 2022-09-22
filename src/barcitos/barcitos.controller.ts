import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '../users/entities/role.enum';
import { BarcitosService } from './barcitos.service';
import { CreateBarcitoDto } from './dto/create-barcito.dto';
import { UpdateBarcitoDto } from './dto/update-barcito.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from 'src/files/helpers';
import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';

@Controller('barcitos')
export class BarcitosController {
  constructor(private readonly barcitosService: BarcitosService) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      limits: { fileSize: 10000000 },
      storage: diskStorage({
        destination: '../files-storage/barcitos',
        filename: fileNamer,
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBarcitoDto: CreateBarcitoDto,
  ) {
    if (!file)
      throw new BadRequestException('Make sure image is of a valid type');

    createBarcitoDto.imagePath = `${process.env.HOST_API}files/barcito/${file.filename}`;

    return this.barcitosService.create(createBarcitoDto);
  }

  @Get()
  findAll() {
    return this.barcitosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.barcitosService.findById(id);
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.SUBMANAGER)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBarcitoDto: UpdateBarcitoDto,
  ) {
    return this.barcitosService.update(id, updateBarcitoDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.barcitosService.remove(id);
  }
}
