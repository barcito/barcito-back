import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRespository: Repository<Category>
  ){}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const createdCategory = this.categoriesRespository.create(createCategoryDto);
    await this.categoriesRespository.save(createdCategory);
    return createdCategory;
  }

  findAll(): Promise<Category[]> {
    return this.categoriesRespository.find();
  }

  async findById(id: number): Promise<Category> {
    const product = await this.categoriesRespository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Category not found');
    return product;
  }

  async findAllByBarcito(barcitoId: number): Promise<Category[]> {
    return this.categoriesRespository.find({
      where: { barcitoId }
    })
  }

  async findAllSearched(query: string): Promise<Category[]> {
    return this.categoriesRespository.find({
      where: {
        description: Like(`%${query}%`),
      },
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoriesRespository.update(id, updateCategoryDto);
    const updatedCategory = this.findById(id);
    return updatedCategory;
  }

  async remove(id: number) {
    const deleteResponse = await this.categoriesRespository.delete(id);
    if (!deleteResponse.affected)
      throw new NotFoundException('Product not found');
  }
}
