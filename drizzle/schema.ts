import {
  mysqlTable,
  int,
  varchar,
  text,
  timestamp,
  mysqlEnum,
} from 'drizzle-orm/mysql-core';

// Users Table
export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  username: varchar('username', { length: 50 }).unique().notNull(),
  email: varchar('email', { length: 100 }).unique().notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  role: mysqlEnum('role', ['admin', 'editor', 'author'])
    .default('author')
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Categories Table
export const categories = mysqlTable('categories', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).unique().notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Posts Table
export const posts = mysqlTable('posts', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  image: varchar('image', { length: 255 }),
  status: mysqlEnum('status', ['draft', 'published', 'archived'])
    .default('draft')
    .notNull(),
  userId: int('user_id').references(() => users.id, {
    onDelete: 'set null',
  }),
  categoryId: int('category_id').references(() => categories.id, {
    onDelete: 'set null',
  }),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});
