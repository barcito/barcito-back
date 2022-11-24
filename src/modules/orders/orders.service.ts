import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private OrderRepository: Repository<Order>,
  ) {}

  async create(barcito: number, createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = this.OrderRepository.create({...createOrderDto, barcitoId: barcito});
    await this.OrderRepository.save(createdOrder);
    return createdOrder;
  }

  async findAll(barcito: number): Promise<Order[]> {
    return this.OrderRepository.find({
      where: {
        barcitoId: barcito
      },
      relations: {
        barcito: true,
        user: true,
        products: true
      },
    });
  }

  async findById(id: number): Promise<Order> {
    const order = await this.OrderRepository.findOne({
      where: { id },
      relations: {
        barcito: true,
        user: true,
        products: true
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async findByCode(code: number): Promise<Order> {
    const order = await this.OrderRepository.findOne({
      where: { code },
      relations: {
        barcito: true,
        user: true,
        products: {
          product: true
        }
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    await this.OrderRepository.update(id, updateOrderDto);
    const updatedOrder = await this.findById(id);
    return updatedOrder;
  }

  async remove(id: number) {
    const deleteResponse = await this.OrderRepository.delete(id);
    if (!deleteResponse.affected)
      throw new NotFoundException('Order not found');
    return deleteResponse;
  }
}
