import HomeClient from '@/components/home/HomeClient';
import { getAllPosts } from '@/drizzle/actions/posts';

export default async function HomePage() {
  const articles = await getAllPosts(3);

  return <HomeClient articles={articles} />;
}
