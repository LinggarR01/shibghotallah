import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '@/drizzle/schema';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL belum diatur di file .env');
}

declare global {
  // eslint-disable-next-line no-var
  var mysqlPool: mysql.Pool | undefined;
}

const pool =
  globalThis.mysqlPool ??
  mysql.createPool({
    uri: databaseUrl,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,

    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

if (process.env.NODE_ENV !== 'production') {
  globalThis.mysqlPool = pool;
}

export const db = drizzle(pool, {
  schema,
  mode: 'default',
});
