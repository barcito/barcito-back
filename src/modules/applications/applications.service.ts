import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './entities/application.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async create(
    createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    const createdApplication = this.applicationRepository.create(
      createApplicationDto,
    );
    await this.applicationRepository.save(createdApplication);
    return createdApplication;
  }

  findAll() {
    return this.applicationRepository.find({
      relations:{
        applicantUser: true
      }
    });
  }

  async findById(id: number) {
    const application = await this.applicationRepository.findOne({ where: { id } });
    if(!application) throw new NotFoundException('Application not found');
    return application;
  }

  async update(id: number, updateApplicationDto: UpdateApplicationDto) {
    await this.applicationRepository.update(id, updateApplicationDto);
    const updatedApplication = await this.findById(id);
    return updatedApplication;
  }

  async remove(id: number) {
    const deleteResponse = await this.applicationRepository.delete(id);
    if (!deleteResponse.affected) throw new NotFoundException('Application not found');
  }
}
