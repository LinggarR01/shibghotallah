import HomeClient from '@/components/home/HomeClient';
import { fetchAllPosts } from '@/lib/fetch';

export default async function Home() {
  const articlesData = await fetchAllPosts();

  return <HomeClient articles={articlesData} />;
}
