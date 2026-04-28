import 'reflect-metadata';
import { join } from 'node:path';
import { createDataSource } from '@enxoval/db';
import { StudentSchema } from './wire/student';

export const AppDataSource = createDataSource({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'persona',
  entities: [StudentSchema],
  migrationsDir: join(__dirname, 'migrations'),
});
