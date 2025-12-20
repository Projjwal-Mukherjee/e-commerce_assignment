// src/customers/customers.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { CustomerOrder } from '../entities/customer-order.entity';
import { CustomersService } from './customers.service';
import { CustomersEventController } from './customers.event-controller';
import { CustomersController } from './customers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CustomerOrder])],
  providers: [CustomersService],
  controllers: [CustomersEventController, CustomersController], // This is key!
})
export class CustomersModule {}
