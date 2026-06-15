import { notFound } from 'next/navigation';
import BeritaSlug from '@/components/berita/BeritaSlug';
import { getPostBySlug, getPublishedPostSlugs } from '@/drizzle/actions/posts';

type BeritaDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BeritaDetailPage({
  params,
}: BeritaDetailPageProps) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BeritaSlug post={post} />;
}

export async function generateStaticParams() {
  const slugs = await getPublishedPostSlugs();

  return slugs.map((post) => ({
    slug: post.slug,
  }));
}
