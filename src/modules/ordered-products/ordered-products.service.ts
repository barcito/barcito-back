import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderedProductDto } from './dto/create-ordered-product.dto';
import { UpdateOrderedProductDto } from './dto/update-ordered-product.dto';
import { OrderedProduct } from './entities/ordered-product.entity';

@Injectable()
export class OrderedProductsService {
  constructor(
    @InjectRepository(OrderedProduct)
    private OrderedProductRepository: Repository<OrderedProduct>,
  ) {}

  async create(
    createOrderedProductDto: CreateOrderedProductDto,
  ): Promise<OrderedProduct> {
    const createdOrderedProduct = this.OrderedProductRepository.create(
      createOrderedProductDto,
    );
    await this.OrderedProductRepository.save(createdOrderedProduct);
    return createdOrderedProduct;
  }

  async findAll(): Promise<OrderedProduct[]> {
    return this.OrderedProductRepository.find({
      relations: {
        product: true,
        order: true,
      },
    });
  }

  async findById(id: number): Promise<OrderedProduct> {
    const orderedProduct = await this.OrderedProductRepository.findOne({
      where: { id },
      relations: {
        product: true,
        order: true,
      },
    });
    if (!orderedProduct)
      throw new NotFoundException('Ordered product not found');
    return orderedProduct;
  }

  async update(
    id: number,
    updateOrderedProductDto: UpdateOrderedProductDto,
  ): Promise<OrderedProduct> {
    await this.OrderedProductRepository.update(id, updateOrderedProductDto);
    const updatedOrderedProduct = await this.findById(id);
    return updatedOrderedProduct;
  }

  async remove(id: number) {
    const deleteResponse = await this.OrderedProductRepository.delete(id);
    if (!deleteResponse.affected)
      throw new NotFoundException('Ordered product not found');
    return deleteResponse;
  }
}
