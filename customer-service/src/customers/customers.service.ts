// src/customers/customers.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { CustomerOrder } from '../entities/customer-order.entity';
import { EventPattern } from '@nestjs/microservices';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(CustomerOrder)
    private orderRepo: Repository<CustomerOrder>,
  ) {}

  @EventPattern('order.placed')
  async handleOrderPlaced(data: any) {
    console.log('Received order.placed event:', data);

    let customer = await this.customerRepo.findOne({
      where: { email: data.customerEmail },
    });
    if (!customer) {
      customer = this.customerRepo.create({
        name: data.customerName,
        email: data.customerEmail,
      });
      await this.customerRepo.save(customer);
    }

    const customerOrder = this.orderRepo.create({
      sourceOrderId: data.orderId,
      total: data.total,
      customer,
    });

    await this.orderRepo.save(customerOrder);
  }

  // Optional: Get order history
  async getOrders(customerId: string) {
    return this.orderRepo.find({
      where: { customer: { id: customerId } },
      relations: ['customer'],
    });
  }

  async findCustomerOrders(email: string) {
    const customer = await this.customerRepo.findOne({
      where: { email },
      relations: ['orders'],
    });
    return customer ? customer.orders : [];
  }
}
