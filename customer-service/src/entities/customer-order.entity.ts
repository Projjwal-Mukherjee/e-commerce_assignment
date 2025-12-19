// src/entities/customer-order.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from './customer.entity';

@Entity('customer_orders')
export class CustomerOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sourceOrderId: string; // References order.id from product-order-service

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.orders, {
    onDelete: 'CASCADE',
  })
  customer: Customer;
}
