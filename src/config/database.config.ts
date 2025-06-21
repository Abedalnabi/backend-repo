// src/config/database.config.ts
import { registerAs } from '@nestjs/config';

console.log('process.env.DB_HOST', process.env.DB_HOST);
export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: process.env.TYPEORM_SYNC === 'true',
  autoLoadEntities: true,
}));
