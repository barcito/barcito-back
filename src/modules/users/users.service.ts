import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from 'modules/applications/entities/application.entity';
import { Not, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto = {
      ...createUserDto,
      password: await argon2.hash(createUserDto.password)
    }
    const createdUser = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(createdUser);
    return createdUser;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if(updateUserDto.password)
      updateUserDto = {
        ...updateUserDto,
        password: await argon2.hash(updateUserDto.password)
    }
    await this.usersRepository.update(id, updateUserDto);
    const updatedUser = await this.findById(id);
    return updatedUser;
  }

  async remove(id: number) {
    const deleteResponse = await this.usersRepository.delete(id);
    if (!deleteResponse.affected) throw new NotFoundException('User not found');
  }

  async generateApplication(id: number, idApplication: Application){
    const user = await this.findById(id);
    if(!user){
      throw new NotFoundException('User not found');
    }
    return await this.update(id, { applicationDone: idApplication });
  }

  async manageApplication(id: number, application: Application){
    const user = await this.findById(id);
    if(!user){
      throw new NotFoundException('User not found');
    }
    return await this.update(id, { applicationsValidated: [...user.applicationsValidated, application] });
  }
}
