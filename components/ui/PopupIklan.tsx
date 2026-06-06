'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function PopupIklan() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-300">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Tutup popup iklan"
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white shadow-md transition hover:bg-black/70">
          <X className="h-5 w-5" />
        </button>

        <Link
          href="/pendaftaran/informasi-pendaftaran"
          className="relative block aspect-[4/5] w-full">
          <Image
            src="/poster-pendaftaran.webp"
            alt="Iklan Pondok Modern Shibghatallah"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 512px"
            className="object-cover"
          />
        </Link>
      </div>
    </div>
  );
}
