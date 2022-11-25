import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CategoryType } from 'enums/category-type.enum';
import { Product } from 'modules/products/entities/product.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>
  ){}

  async create(createCategoryDto: CreateCategoryDto, barcito: number): Promise<Category> {
    const createdCategory = this.categoriesRepository.create({...createCategoryDto, barcitoId: barcito });
    await this.categoriesRepository.save(createdCategory);
    return createdCategory;
  }

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  async findById(id: number): Promise<Category> {
    const product = await this.categoriesRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Category not found');
    return product;
  }

  async findWithProds(id: number): Promise<Product[]> {
    const categoryWithProducts = await this.categoriesRepository.findOne({
      where: { id },
      relations: {
        products: true
      }
    });
    return categoryWithProducts.products;
  }

  async findAllSearched(query: string): Promise<Category[]> {
    return this.categoriesRepository.find({
      where: {
        description: Like(`%${query}%`),
      },
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoriesRepository.update(id, updateCategoryDto);
    const updatedCategory = this.findById(id);
    return updatedCategory;
  }

  async remove(id: number) {
    const deleteResponse = await this.categoriesRepository.delete(id);
    if (!deleteResponse.affected)
      throw new NotFoundException('Product not found');
  }

  async getAllConsumables(barcito: number): Promise<Category[]>{
    return this.categoriesRepository.find({
      where: {
        barcitoId: barcito,
        type: CategoryType.CONSUMABLE
      }
    });
  }

  async getAllSupplies(barcito: number): Promise<Category[]>{
    return this.categoriesRepository.find({
      where: {
        barcitoId: barcito,
        type: CategoryType.SUPPLY
      }
    });
  }

  async getAllProducts(barcito: number): Promise<Category[]>{
    return this.categoriesRepository.find({
      where: {
        barcitoId: barcito,
        type: CategoryType.PRODUCT
      }
    });
  }

  async findAllByBarcito(barcito: number): Promise<Category[]>{
    return this.categoriesRepository.find({
      where: {
        barcitoId: barcito
      }
    });
  }
}
