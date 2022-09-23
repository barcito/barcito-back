import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Roles } from 'common/decorators/roles.decorator';
import { Role } from 'enums/role.enum';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { RolesGuard } from 'common/guards/roles.guard';
import { ParseIntPipe } from '@nestjs/common';
import { UsersService } from 'modules/users/users.service';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { applicationFileFilter, applicationFileNamer } from 'files/helpers';
import { diskStorage } from 'multer';

@Controller('applications')
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService,
    private readonly usersService: UsersService,
  ) {}

  //endpoint solo para usuario
  @Roles(Role.CLIENT)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: applicationFileFilter,
      limits: { fileSize: 10000000 },
      storage: diskStorage({
        destination: '../files-storage/applications',
        filename: applicationFileNamer,
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createApplicationDto: CreateApplicationDto,
    @Req() request: Request,
  ) {
    if (!file)
      throw new BadRequestException('Make sure image is of a valid type');

    const userId = request.user['id'];
    createApplicationDto.certificatePath = `${process.env.HOST_API}files/application/${file.filename}`;

    //! NO ME CAMBIA EL PATH
    //! Barcito me andaba con form data asi como esta

    const application = await this.applicationsService.create(
      createApplicationDto,
    );
    if (!application) throw new BadRequestException('Cannot create aplication');
    const user = await this.usersService.generateApplication(
      userId,
      application,
    );
    if (!user) throw new NotFoundException('User not found');
    return application;
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.applicationsService.findAll();
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.applicationsService.findById(id);
  }

  //endpoint para managers
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateApplicationDto: UpdateApplicationDto,
    @Req() request: Request,
  ) {
    const userId = request.user['id'];
    const application = await this.applicationsService.update(
      id,
      updateApplicationDto,
    );
    if (!application) throw new BadRequestException('Application not found');
    const user = await this.usersService.manageApplication(userId, application);
    if (!user) throw new NotFoundException('User not found');
    return application;
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.applicationsService.remove(id);
  }
}
