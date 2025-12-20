// src/main.ts (customer-service)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: 'http://localhost:3000' }); // Allow frontend

  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'],
      queue: 'orders_queue',
      queueOptions: { durable: true },
    },
  };

  app.connectMicroservice<MicroserviceOptions>(microserviceOptions);
  await app.startAllMicroservices();
  await app.listen(3002);
  console.log('Customer Service running on http://localhost:3002');
}
bootstrap();
