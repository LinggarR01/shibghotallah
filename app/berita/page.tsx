import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Article } from '@/drizzle/actions/article';
import News from '@/components/ui/News';

export default async function BeritaPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${API_URL}/api/posts`, {
    cache: 'no-store',
  });
  const articlesData: Article[] = await res.json();
  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-quicksand">
      {/* News Section */}
      <section className="bg-white">
        <News articles={articlesData} />
      </section>
    </div>
  );
}
