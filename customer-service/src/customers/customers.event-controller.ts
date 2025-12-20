// src/customers/customers.event-controller.ts
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CustomersService } from './customers.service';

@Controller()
export class CustomersEventController {
  constructor(private readonly customersService: CustomersService) {}

  @EventPattern('order.placed')
  async handleOrderPlaced(data: any) {
    await this.customersService.handleOrderPlaced(data);
  }
}
