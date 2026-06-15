import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import BeritaSlug from '@/components/berita/BeritaSlug';
import { getPostBySlug } from '@/drizzle/actions/posts';

type BeritaDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BeritaDetailPage({
  params,
}: BeritaDetailPageProps) {
  await connection();

  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BeritaSlug post={post} />;
}
