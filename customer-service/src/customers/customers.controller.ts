// src/customers/customers.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get('orders')
  async getOrders(@Query('email') email: string) {
    return this.customersService.findCustomerOrders(email);
  }
}
