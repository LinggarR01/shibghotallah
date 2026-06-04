import Image from 'next/image';
import { Article } from '@/drizzle/actions/posts';

interface BeritaSlugProps {
  post: Article;
}

export default function BeritaSlug({ post }: BeritaSlugProps) {
  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-quicksand animate-fade-in-up">
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
          <div className="animate-fade-in-up mb-4 text-emerald-600 font-medium">
            {post.createdAt &&
              new Date(post.createdAt).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
          </div>

          <h1 className="animate-scale-in text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 border-b-4 pb-4 border-emerald-700 inline-block leading-tight">
            {post.title}
          </h1>

          {post.image && (
            <div className="animate-scale-in relative w-full h-100 mb-10 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div
            className="animate-fade-in-up prose prose-lg prose-emerald max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>
    </div>
  );
}
