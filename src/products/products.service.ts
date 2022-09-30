import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository, Like } from 'typeorm';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = this.productsRepository.create(createProductDto);
    await this.productsRepository.save(createdProduct);
    return createdProduct;
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findAllSearched(search: string): Promise<Product[]> {
    return this.productsRepository.find({
      where: {
        description: Like(`%${search}%`),
      },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
