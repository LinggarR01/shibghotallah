'use client';

import { usePathname } from 'next/navigation';

type AppChromeProps = {
  children: React.ReactNode;
  siteFooter: React.ReactNode;
  siteHeader: React.ReactNode;
};

export default function AppChrome({
  children,
  siteFooter,
  siteHeader,
}: AppChromeProps) {
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
      {siteHeader}
      <main className="flex w-full flex-col items-center justify-between bg-dark sm:items-start">
        {children}
      </main>
      {siteFooter}
    </>
  );
}
