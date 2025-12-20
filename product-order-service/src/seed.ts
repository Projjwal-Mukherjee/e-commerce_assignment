// src/seed.ts (updated)
import { AppDataSource } from './data-source';
import { Product } from './entities/product.entity';

async function seed() {
  await AppDataSource.initialize();

  const productRepository = AppDataSource.getRepository(Product);

  const productsData = [
    {
      name: 'MacBook Pro',
      price: 2499.99,
      description: 'Powerful laptop for professionals',
      stock: 10,
      image: '/product_images/shopping.avif', // Local image
    },
    {
      name: 'iPhone 15',
      price: 999.99,
      description: 'Latest Apple smartphone',
      stock: 20,
      image: 'product_images/iphone15.jpg', // Local image
    },
    {
      name: 'AirPods Pro',
      price: 249.99,
      description: 'Wireless earbuds with noise cancellation',
      stock: 50,
      image: '/product_images/airpods.jpg', // Local image
    },
    {
      name: 'Samsung Galaxy S24',
      price: 899.99,
      description: 'Flagship Android phone',
      stock: 15,
      image: '/product_images/s24.jpg', // Local image
    },
    {
      name: 'Dell XPS 13',
      price: 1299.99,
      description: 'Premium Windows ultrabook',
      stock: 8,
      image: '/product_images/dell.jpg', // Local image
    },
  ];

  for (const data of productsData) {
    let product = await productRepository.findOne({
      where: { name: data.name },
    });

    if (product) {
      // Update existing product with new image
      product.image = data.image;
      product.price = data.price;
      product.description = data.description;
      product.stock = data.stock;
    } else {
      // Create new
      product = productRepository.create(data);
    }

    await productRepository.save(product);
  }

  console.log('🌱 Seeding completed - all products updated with images!');
  await AppDataSource.destroy();
}

seed().catch(console.error);
