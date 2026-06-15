'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/Footer';
import Navbar from '@/components/ui/Navbar';

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCmsRoute = pathname === '/login' || pathname.startsWith('/dashboard');

  if (isCmsRoute) {
    return (
      <main className="flex w-full flex-col items-stretch justify-start bg-white">
        {children}
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex w-full flex-col items-center justify-between bg-dark sm:items-start">
        {children}
      </main>
      <Footer />
    </>
  );
}
