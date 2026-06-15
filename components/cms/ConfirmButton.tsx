'use client';

import { useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/cms/ui';

export default function ConfirmButton({
  children,
  message,
  title = 'Konfirmasi aksi',
  confirmLabel = 'Lanjutkan',
  variant = 'danger',
}: {
  children: React.ReactNode;
  message: string;
  title?: string;
  confirmLabel?: string;
  variant?: 'danger' | 'outline' | 'default' | 'secondary' | 'ghost';
}) {
  const { pending } = useFormStatus();
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <>
      <Button
        type="button"
        variant={variant}
        disabled={pending}
        onClick={(event) => {
          formRef.current = event.currentTarget.form;
          setOpen(true);
        }}>
        {pending ? 'Memproses...' : children}
      </Button>

      {open ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 py-6">
          <button
            type="button"
            aria-label="Tutup konfirmasi"
            className="absolute inset-0 bg-gray-950/45"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-md rounded-2xl border border-emerald-100 bg-white p-5 shadow-2xl shadow-gray-950/20 sm:p-6">
            <div>
              <h2 className="text-lg font-bold text-gray-950">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {message}
              </p>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={pending}>
                Batal
              </Button>
              <Button
                type="button"
                variant={variant}
                disabled={pending}
                onClick={() => {
                  setOpen(false);
                  formRef.current?.requestSubmit();
                }}>
                {pending ? 'Memproses...' : confirmLabel}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
