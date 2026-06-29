'use client';

import { GraduationCap, MapPin, X } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function PopupIklan2() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-iklan-2-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={handleClose}>
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-2xl shadow-emerald-900/10"
        onClick={(event) => event.stopPropagation()}>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={handleClose}
          aria-label="Tutup popup informasi"
          className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-500 shadow-sm transition hover:bg-emerald-50 hover:text-emerald-700">
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3 bg-emerald-600 px-5 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-white">
            Informasi Pondok
          </span>
        </div>

        <div className="px-5 pb-2 pt-5">
          <h2
            id="popup-iklan-2-title"
            className="mb-3 text-xl font-extrabold leading-tight tracking-tight text-gray-900">
            Pondok Pesantren GONTOR ada di Jakarta
          </h2>

          <p className="mb-5 text-sm leading-relaxed text-gray-600">
            Pondok Modern Shibghatallah hadir di Jakarta sebagai lembaga
            pendidikan pesantren modern.
          </p>

          <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100">
              <MapPin className="h-4 w-4 text-emerald-700" />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">
                Pimpinan: KH. Noorshofa Thohir
              </p>
              <p className="mt-0.5 text-xs font-medium text-emerald-700">
                Alumnus Pondok Pesantren Darussalam Gontor
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 px-5 pb-5 sm:flex-row">
          <Link
            href="/pendaftaran/informasi-pendaftaran"
            onClick={handleClose}
            className="flex-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-emerald-500 active:scale-95">
            Informasi Pendaftaran
          </Link>

          <button
            type="button"
            onClick={handleClose}
            className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 active:scale-95">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
