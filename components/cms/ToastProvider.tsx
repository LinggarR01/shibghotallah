'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, Info, Loader2, X, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastType = 'success' | 'error' | 'loading';

type ToastItem = {
  id: string;
  type: ToastType;
  message: string;
};

type ToastPayload = {
  type: ToastType;
  message: string;
};

const toastMessages: Record<string, ToastPayload> = {
  'category-created': {
    type: 'success',
    message: 'Kategori berhasil ditambahkan.',
  },
  'category-updated': {
    type: 'success',
    message: 'Kategori berhasil diperbarui.',
  },
  'category-deleted': {
    type: 'success',
    message: 'Kategori berhasil dihapus.',
  },
  'category-delete-failed': {
    type: 'error',
    message: 'Gagal menghapus kategori.',
  },
  'article-created': {
    type: 'success',
    message: 'Artikel berhasil ditambahkan.',
  },
  'article-updated': {
    type: 'success',
    message: 'Artikel berhasil diperbarui.',
  },
  'article-deleted': {
    type: 'success',
    message: 'Artikel berhasil dihapus.',
  },
  'article-delete-failed': {
    type: 'error',
    message: 'Gagal menghapus artikel.',
  },
  'article-published': {
    type: 'success',
    message: 'Artikel berhasil dipublikasikan.',
  },
  'article-archived': {
    type: 'success',
    message: 'Artikel berhasil diarsipkan.',
  },
  'permission-denied': {
    type: 'error',
    message: 'Anda tidak memiliki izin untuk melakukan aksi ini.',
  },
  'logout-success': {
    type: 'success',
    message: 'Berhasil keluar dari dashboard.',
  },
};

function dispatchToast(payload: ToastPayload) {
  window.dispatchEvent(new CustomEvent<ToastPayload>('cms-toast', { detail: payload }));
}

export const toast = {
  success(message: string) {
    dispatchToast({ type: 'success', message });
  },
  error(message: string) {
    dispatchToast({ type: 'error', message });
  },
  loading(message: string) {
    dispatchToast({ type: 'loading', message });
  },
};

function ToastIcon({ type }: { type: ToastType }) {
  if (type === 'success') return <CheckCircle2 className="h-5 w-5" />;
  if (type === 'error') return <XCircle className="h-5 w-5" />;
  if (type === 'loading') return <Loader2 className="h-5 w-5 animate-spin" />;

  return <Info className="h-5 w-5" />;
}

function ToastUrlListener() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const toastKey = searchParams.get('toast');

  useEffect(() => {
    if (!toastKey) return;

    const payload = toastMessages[toastKey];

    if (payload) {
      dispatchToast(payload);
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete('toast');
    const nextUrl = params.toString() ? `${pathname}?${params}` : pathname;

    router.replace(nextUrl, { scroll: false });
  }, [pathname, router, searchParams, toastKey]);

  return null;
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    function handleToast(event: Event) {
      const payload = (event as CustomEvent<ToastPayload>).detail;

      if (!payload?.message) return;

      const id = crypto.randomUUID();

      setItems((current) => [...current, { id, ...payload }].slice(-4));

      if (payload.type !== 'loading') {
        window.setTimeout(() => {
          setItems((current) => current.filter((item) => item.id !== id));
        }, 4200);
      }
    }

    window.addEventListener('cms-toast', handleToast);

    return () => window.removeEventListener('cms-toast', handleToast);
  }, []);

  const renderedItems = useMemo(() => items, [items]);

  return (
    <>
      {children}
      <ToastUrlListener />
      <div className="pointer-events-none fixed right-4 top-4 z-[80] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3">
        {renderedItems.map((item) => (
          <div
            key={item.id}
            className={cn(
              'pointer-events-auto flex items-start gap-3 rounded-xl border bg-white p-4 text-sm shadow-lg shadow-gray-900/10',
              item.type === 'success' && 'border-emerald-200 text-emerald-800',
              item.type === 'error' && 'border-red-200 text-red-700',
              item.type === 'loading' && 'border-gray-200 text-gray-700',
            )}>
            <ToastIcon type={item.type} />
            <p className="flex-1 font-semibold leading-relaxed">{item.message}</p>
            <button
              type="button"
              aria-label="Tutup pesan"
              className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              onClick={() =>
                setItems((current) =>
                  current.filter((toastItem) => toastItem.id !== item.id),
                )
              }>
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
