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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from 'common/guards/roles.guard';
import { Roles } from 'common/decorators/roles.decorator';
import { Role } from 'enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Get('/email/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Get('/academic-unit/:academicUnitId')
  findAllByAcademicUnit(
    @Param('academicUnitId', ParseIntPipe) academicUnitId: number,
  ) {
    return this.usersService.findByAcademicUnit(academicUnitId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @Get('orders/:id')
  async getOrders(@Param('id', ParseIntPipe) id: number) {
    const user = await this.findOneById(id);
    return user.orders;
  }
}
