import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '@/drizzle/schema';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL belum diatur di file .env');
}

declare global {
  var mysqlPool: mysql.Pool | undefined;
}

const connectionLimit = Number(process.env.DB_CONNECTION_LIMIT ?? 3);

const pool =
  globalThis.mysqlPool ??
  mysql.createPool({
    uri: databaseUrl,
    waitForConnections: true,
    connectionLimit:
      Number.isInteger(connectionLimit) && connectionLimit > 0
        ? connectionLimit
        : 3,
    queueLimit: 0,

    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

globalThis.mysqlPool = pool;

export const db = drizzle(pool, {
  schema,
  mode: 'default',
});
