import News from '../ui/News';
import { Article } from '@/drizzle/actions/posts';

interface BeritaProps {
  articles: Article[];
}

export default function Berita({ articles }: BeritaProps) {
  return (
    <div className="animate-fade-in-up">
      <News articles={articles} />
    </div>
  );
}
