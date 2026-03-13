import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Article } from '@/drizzle/actions/article';

export default async function BeritaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  const res = await fetch(`${API_URL}/api/posts?slug=${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    notFound();
  }

  const post: Article = await res.json();

  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-quicksand">
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
          <div className="mb-4 text-emerald-600 font-medium">
            {post.createdAt &&
              new Date(post.createdAt).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 border-b-4 pb-4 border-emerald-700 inline-block leading-tight">
            {post.title}
          </h1>

          {post.image && (
            <div className="relative w-full h-[400px] mb-10 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div
            className="prose prose-lg prose-emerald max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>
    </div>
  );
}
