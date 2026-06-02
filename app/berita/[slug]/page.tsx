import { notFound } from 'next/navigation';
import BeritaSlug from '@/components/berita/BeritaSlug';
import { getPostBySlug } from '@/drizzle/actions/posts';

export const dynamic = 'force-dynamic';

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
