import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  pgEnum,
} from 'drizzle-orm/pg-core';

// Roles & Status Enums
export const roleEnum = pgEnum('role', ['admin', 'editor', 'author']);
export const statusEnum = pgEnum('status', ['draft', 'published', 'archived']);

// Users Table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).unique().notNull(),
  email: varchar('email', { length: 100 }).unique().notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  role: roleEnum('role').default('author').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Categories Table
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).unique().notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Posts Table
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  image: varchar('image', { length: 255 }),
  status: statusEnum('status').default('draft').notNull(),
  userId: integer('user_id').references(() => users.id, {
    onDelete: 'set null',
  }),
  categoryId: integer('category_id').references(() => categories.id, {
    onDelete: 'set null',
  }),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});
