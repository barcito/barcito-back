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
import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Roles } from 'common/decorators/roles.decorator';
import { Role } from 'enums/role.enum';
import { RolesGuard } from 'common/guards/roles.guard';

@ApiTags('Orders')
@Controller('orders/:barcito')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(
    @Param('barcito', ParseIntPipe) barcito: number,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.create(barcito, createOrderDto);
  }

  @Get()
  findAll(@Param('barcito', ParseIntPipe) barcito: number) {
    return this.ordersService.findAll(barcito);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findById(id);
  }

  @Get('code/:code')
  findByCode(@Param('code', ParseIntPipe) code: number) {
    return this.ordersService.findByCode(code);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }
}
