// src/customer.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CustomerOrder } from './entities/customer-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CustomerOrder])],
  exports: [TypeOrmModule],
})
export class CustomerModule {}
