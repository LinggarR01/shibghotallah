'use client';
import { motion } from 'framer-motion';
import News from '../ui/News';
import { Article } from '@/drizzle/actions/article';
import { fadeInUp, staggerContainer } from '../ui/Animations';

interface BeritaProps {
  articles: Article[];
}

export default function Berita({ articles }: BeritaProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}>
      <motion.div variants={fadeInUp}>
        <News articles={articles} />
      </motion.div>
    </motion.div>
  );
}
