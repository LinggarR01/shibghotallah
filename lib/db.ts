import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '@/drizzle/schema';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL belum diatur di file .env');
}

const pool = mysql.createPool(databaseUrl);

export const db = drizzle(pool, {
  schema,
  mode: 'default',
});
