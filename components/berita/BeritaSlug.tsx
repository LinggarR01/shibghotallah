'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Article } from '@/drizzle/actions/article';
import { fadeInUp, scaleIn } from '../ui/Animations';

interface BeritaSlugProps {
  post: Article;
}

export default function BeritaSlug({ post }: BeritaSlugProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="min-h-screen bg-white w-full flex flex-col font-quicksand">
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
          <motion.div
            variants={fadeInUp}
            className="mb-4 text-emerald-600 font-medium">
            {post.createdAt &&
              new Date(post.createdAt).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
          </motion.div>

          <motion.h1
            variants={scaleIn}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 border-b-4 pb-4 border-emerald-700 inline-block leading-tight">
            {post.title}
          </motion.h1>

          {post.image && (
            <motion.div
              variants={scaleIn}
              className="relative w-full h-100 mb-10 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </motion.div>
          )}

          <motion.div
            variants={fadeInUp}
            className="prose prose-lg prose-emerald max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>
    </motion.div>
  );
}
