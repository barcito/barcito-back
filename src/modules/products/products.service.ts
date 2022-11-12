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
    private productsRepository: Repository<Product>
  ) {}

  async create(barcito: number, createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = this.productsRepository.create({...createProductDto, barcitoId: barcito});
    await this.productsRepository.save(createdProduct);
    return createdProduct;
  }

  findAll(barcito: number): Promise<Product[]> {
    return this.productsRepository.find({
      where: {
        barcitoId: barcito
      },
      relations: {
        categories: true,
        productToStock: true
      }
    });
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: {
        categories: true,
        productToStock: true
      }
    });
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
    await this.productsRepository.save({...updateProductDto, id});
    const updatedProduct = await this.findById(id);
    return updatedProduct;
  }

  async remove(id: number) {
    const deleteResponse = await this.productsRepository.delete(id);
    if (!deleteResponse.affected)
      throw new NotFoundException('Product not found');
  }
}
