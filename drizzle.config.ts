import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Membaca file .env.local untuk mendapatkan URL database
dotenv.config({ path: '.env.local' });

export default defineConfig({
  schema: './drizzle/schema.ts',
  out: './drizzle',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});

// export default defineConfig({
//   schema: './drizzle/schema.ts',
//   out: './drizzle/migrations',
//   dialect: 'mysql',
//   dbCredentials: {
//     url: process.env.DATABASE_URL!,
//   },
// });
