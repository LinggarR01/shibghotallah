'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  FolderTree,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  Users,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { logoutAction } from '@/lib/cms-actions';
import type { SessionUser } from '@/lib/auth';
import { Badge, Button } from '@/components/cms/ui';
import ToastProvider from '@/components/cms/ToastProvider';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/dashboard/posts',
    label: 'Artikel/Berita',
    icon: Newspaper,
  },
  {
    href: '/dashboard/categories',
    label: 'Kategori',
    icon: FolderTree,
  },
];

function SidebarContent({ user }: { user: SessionUser }) {
  const pathname = usePathname();
  const items =
    user.role === 'admin'
      ? [
          ...menuItems,
          {
            href: '/dashboard/users',
            label: 'User Management',
            icon: Users,
          },
        ]
      : menuItems;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-emerald-900/10 px-5 py-5">
        <Image
          src="/logo.webp"
          alt="Logo Pondok Modern Shibghatallah"
          width={46}
          height={46}
          className="h-11 w-11 rounded-full bg-white object-contain p-1"
          priority
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-bold leading-tight text-white">
            CMS Shibghatallah
          </p>
          <p className="truncate text-xs text-emerald-100">Artikel & Berita</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition',
                isActive
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-emerald-50 hover:bg-white/10 hover:text-white',
              )}>
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <form action={logoutAction}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start text-emerald-50 hover:bg-white/10 hover:text-white">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function DashboardShell({
  user,
  children,
}: {
  user: SessionUser;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="min-h-screen w-full bg-emerald-50/60 text-gray-950">
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 bg-emerald-900 shadow-xl lg:block">
          <SidebarContent user={user} />
        </aside>

        {open ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Tutup menu"
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
            />
            <aside className="relative h-full w-72 max-w-[86vw] bg-emerald-900 shadow-xl">
              <button
                type="button"
                aria-label="Tutup menu"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white">
                <X className="h-4 w-4" />
              </button>
              <SidebarContent user={user} />
            </aside>
          </div>
        ) : null}

        <div className="lg:pl-72">
          <header className="sticky top-0 z-30 border-b border-emerald-100 bg-white/90 backdrop-blur">
            <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setOpen(true)}>
                  <Menu className="h-4 w-4" />
                </Button>
                <div>
                  <p className="text-sm font-bold text-gray-950">
                    Pondok Modern Shibghatallah
                  </p>
                  <p className="hidden text-xs text-gray-500 sm:block">
                    Dashboard pengelolaan artikel dan berita
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 items-center gap-3">
                <div className="hidden min-w-0 text-right sm:block">
                  <p className="truncate text-sm font-bold text-gray-950">
                    {user.username}
                  </p>
                  <p className="truncate text-xs text-gray-500">{user.email}</p>
                </div>
                <Badge variant="published" className="capitalize">
                  {user.role}
                </Badge>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </div>
      </div>
    </ToastProvider>
  );
}
