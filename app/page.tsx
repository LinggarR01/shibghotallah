import { connection } from 'next/server';
import HomeClient from '@/components/home/HomeClient';
import { getAllPosts } from '@/drizzle/actions/posts';

export default async function HomePage() {
  await connection();

  const articles = await getAllPosts(3);

  return <HomeClient articles={articles} />;
}
