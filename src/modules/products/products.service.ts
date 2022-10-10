import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository, Like } from 'typeorm';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Supply } from 'modules/supplies/entities/supply.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Supply)
    private suppliesRepository: Repository<Supply>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = this.productsRepository.create(createProductDto);
    await this.productsRepository.save(createdProduct);
    return createdProduct;
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: {
        supplies: true
      }
    });
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findAllSearched(query: string): Promise<Product[]> {
    return this.productsRepository.find({
      where: {
        description: Like(`%${query}%`),
      },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.productsRepository.update(id, updateProductDto);
    const updatedProduct = this.findById(id);
    return updatedProduct;
  }

  async remove(id: number) {
    const deleteResponse = await this.productsRepository.delete(id);
    if (!deleteResponse.affected)
      throw new NotFoundException('Product not found');
  }
}
