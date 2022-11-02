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
import { Roles } from 'common/decorators/roles.decorator';
import { RolesGuard } from 'common/guards/roles.guard';
import { Role } from 'enums/role.enum';
import { AcademicUnitsService } from './academic-units.service';
import { CreateAcademicUnitDto } from './dto/create-academic-unit.dto';
import { UpdateAcademicUnitDto } from './dto/update-academic-unit.dto';
import { Public } from 'common/decorators/public.decorator';

@Controller('academic-units')
export class AcademicUnitsController {
  constructor(private readonly academicUnitsService: AcademicUnitsService) {}

  @Public()
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createAcademicUnitDto: CreateAcademicUnitDto) {
    return this.academicUnitsService.create(createAcademicUnitDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.academicUnitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.academicUnitsService.findById(id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAcademicUnitDto: UpdateAcademicUnitDto,
  ) {
    return this.academicUnitsService.update(+id, updateAcademicUnitDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.academicUnitsService.remove(+id);
  }
}
