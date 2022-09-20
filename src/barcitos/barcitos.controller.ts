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
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/users/entities/role.enum';
import { BarcitosService } from './barcitos.service';
import { CreateBarcitoDto } from './dto/create-barcito.dto';
import { UpdateBarcitoDto } from './dto/update-barcito.dto';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('barcitos')
export class BarcitosController {
  constructor(private readonly barcitosService: BarcitosService) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createBarcitoDto: CreateBarcitoDto) {
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
