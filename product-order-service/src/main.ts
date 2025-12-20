// src/main.ts (product-order-service)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:3000' }); // Allow frontend
  await app.listen(3001);
  console.log('Product-Order Service running on http://localhost:3001');
}
bootstrap();
