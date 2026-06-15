import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/cms/ui';

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actions,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center px-5 py-14 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-bold text-gray-950">{title}</h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-500">
          {description}
        </p>
        {actions ? <div className="mt-5 flex flex-wrap gap-2">{actions}</div> : null}
      </CardContent>
    </Card>
  );
}
