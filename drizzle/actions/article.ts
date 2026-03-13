import { type InferSelectModel } from 'drizzle-orm';
import { posts } from '@/drizzle/schema';

export type PostModel = InferSelectModel<typeof posts>;

export interface Article extends PostModel {
  categoryName?: string;
}
