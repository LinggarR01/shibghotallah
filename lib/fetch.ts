import type { Article } from '@/drizzle/actions/article';

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
};

export async function fetchAllPosts(): Promise<Article[]> {
  const API_URL = getBaseUrl();

  const res = await fetch(`${API_URL}/api/posts`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Gagal mengambil data posts');
  }

  return res.json();
}

export async function fetchPostBySlug(slug: string): Promise<Article> {
  const API_URL = getBaseUrl();

  const params = new URLSearchParams({
    slug,
  });

  const res = await fetch(`${API_URL}/api/posts?${params.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Gagal mengambil data post');
  }

  return res.json();
}
