import { Article } from '@/drizzle/actions/article';

export async function fetchAllPosts(): Promise<Article[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${API_URL}/api/posts`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Gagal mengambil data posts');
  }

  return res.json();
}

export async function fetchPostBySlug(slug: string): Promise<Article> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${API_URL}/api/posts?slug=${slug}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Gagal fetch post');
  return res.json();
}
