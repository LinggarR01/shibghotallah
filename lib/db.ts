import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../drizzle/schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('Missing DATABASE_URL in .env.local');
}

// Menyimpan koneksi di object global agar tidak berlipat ganda saat Hot Reload
const globalForPostgres = globalThis as unknown as {
  postgres: postgres.Sql;
};

// Gunakan koneksi yang sudah ada di cache, atau buat baru jika belum ada
const client =
  globalForPostgres.postgres || postgres(connectionString, { prepare: false });

// Jika tidak di mode production, simpan koneksi ke cache global
if (process.env.NODE_ENV !== 'production') {
  globalForPostgres.postgres = client;
}

export const db = drizzle(client, { schema });
