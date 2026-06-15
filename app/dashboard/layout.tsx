import { connection } from 'next/server';
import DashboardShell from '@/components/cms/DashboardShell';
import { requireSession } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();

  const session = await requireSession();

  return <DashboardShell user={session.user}>{children}</DashboardShell>;
}
