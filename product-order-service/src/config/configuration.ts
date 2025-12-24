// src/config/configuration.ts

export default () => ({
  port: parseInt(process.env.PORT ?? '3001', 10),

  database: {
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
    username: process.env.POSTGRES_USER ?? 'postgres',
    password: process.env.POSTGRES_PASSWORD ?? 'password',
    database: process.env.POSTGRES_DB ?? 'postgres',
  },

  rabbitmq: {
    url: process.env.RABBITMQ_URL ?? 'amqp://guest:guest@localhost:5672',
  },
});
