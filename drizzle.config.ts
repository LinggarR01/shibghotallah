import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Membaca file .env.local untuk mendapatkan URL database
dotenv.config({ path: '.env.local' });

export default defineConfig({
  schema: './drizzle/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
