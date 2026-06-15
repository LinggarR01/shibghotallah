import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/cms/ui';

export default function StatCard({
  title,
  value,
  icon: Icon,
  tone = 'emerald',
}: {
  title: string;
  value: number;
  icon: LucideIcon;
  tone?: 'emerald' | 'slate' | 'amber';
}) {
  const toneClasses = {
    emerald: 'bg-emerald-100 text-emerald-800',
    slate: 'bg-slate-100 text-slate-700',
    amber: 'bg-amber-100 text-amber-800',
  };

  return (
    <Card>
      <CardContent className="flex items-center justify-between gap-4 p-5">
        <div>
          <p className="text-sm font-semibold text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-950">{value}</p>
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${toneClasses[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}
