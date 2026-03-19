import { notFound } from 'next/navigation';
import BeritaSlug from '@/components/berita/BeritaSlug';
import { fetchPostBySlug } from '@/lib/fetch';

export default async function BeritaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  try {
    const post = await fetchPostBySlug(slug);
    return <BeritaSlug post={post} />;
  } catch (error) {
    notFound();
  }
}
