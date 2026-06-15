import { connection } from 'next/server';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/cms/LoginForm';
import { getSession } from '@/lib/auth';

export default async function LoginPage() {
  await connection();

  const session = await getSession();

  if (session) {
    redirect('/dashboard');
  }

  return <LoginForm />;
}
