// src/orders/orders.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { Product } from '../entities/product.entity';
import { ClientProxy } from '@nestjs/microservices';

export class CreateOrderDto {
  products: { id: string }[];
  customerName: string;
  customerEmail: string;
}

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @Inject('RABBITMQ_SERVICE') private rabbitClient: ClientProxy,
  ) {}

  async create(dto: CreateOrderDto) {
    const products = await this.productRepo.findByIds(
      dto.products.map((p) => p.id),
    );

    // FIX: Convert price to number explicitly
    const total = products.reduce((sum, p) => sum + Number(p.price), 0);

    const order = this.orderRepo.create({
      products,
      customerName: dto.customerName,
      customerEmail: dto.customerEmail,
      total, // Now a proper number like 4999.98
    });

    const savedOrder = await this.orderRepo.save(order);

    // Publish event to RabbitMQ
    this.rabbitClient.emit('order.placed', {
      orderId: savedOrder.id,
      customerName: dto.customerName,
      customerEmail: dto.customerEmail,
      total,
      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
      })),
      createdAt: savedOrder.createdAt,
    });

    return savedOrder;
  }
}
