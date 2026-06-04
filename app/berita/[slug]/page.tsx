import { cacheLife } from 'next/cache';
import { notFound } from 'next/navigation';
import BeritaSlug from '@/components/berita/BeritaSlug';
import { getPostBySlug, getPublishedPostSlugs } from '@/drizzle/actions/posts';

type BeritaDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  'use cache';
  cacheLife('minutes');

  const posts = await getPublishedPostSlugs();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BeritaDetailPage({
  params,
}: BeritaDetailPageProps) {
  'use cache';
  cacheLife('minutes');

  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BeritaSlug post={post} />;
}
