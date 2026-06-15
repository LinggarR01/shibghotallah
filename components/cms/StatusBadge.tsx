import { Badge } from '@/components/cms/ui';
import type { PostStatus } from '@/lib/cms-data';

const labels: Record<PostStatus, string> = {
  draft: 'Draft',
  published: 'Published',
  archived: 'Archived',
};

export default function StatusBadge({ status }: { status: PostStatus }) {
  return <Badge variant={status}>{labels[status]}</Badge>;
}
