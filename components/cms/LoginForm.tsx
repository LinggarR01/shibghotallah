'use client';

import { useActionState, useEffect } from 'react';
import Image from 'next/image';
import { Alert, Button, Card, CardContent, Input, Label } from '@/components/cms/ui';
import ToastProvider, { toast } from '@/components/cms/ToastProvider';
import { loginAction } from '@/lib/cms-actions';

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, {});

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state.error]);

  return (
    <ToastProvider>
      <div className="min-h-screen w-full bg-linear-to-br from-white via-emerald-50 to-white px-4 py-10 text-gray-950">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
          <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_430px]">
            <div className="hidden lg:block">
              <div className="max-w-xl">
                <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-emerald-100">
                  <Image
                    src="/logo.webp"
                    alt="Logo Pondok Modern Shibghatallah"
                    width={52}
                    height={52}
                    className="h-14 w-14 object-contain"
                    priority
                  />
                </div>
                <p className="mb-3 text-sm font-bold uppercase text-emerald-700">
                  CMS Pondok Modern Shibghatallah
                </p>
                <h1 className="text-4xl font-bold leading-tight text-gray-950">
                  Kelola berita pondok dengan rapi dan aman.
                </h1>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-600">
                  Masuk menggunakan akun admin, editor, atau author untuk
                  menulis, mempublikasikan, dan merapikan konten artikel.
                </p>
              </div>
            </div>

            <Card className="mx-auto w-full max-w-md border-emerald-100 shadow-xl shadow-emerald-900/5">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-7 flex flex-col items-center text-center">
                  <Image
                    src="/logo.webp"
                    alt="Logo Pondok Modern Shibghatallah"
                    width={70}
                    height={70}
                    className="mb-4 h-16 w-16 rounded-full bg-white object-contain p-1 ring-1 ring-emerald-100"
                    priority
                  />
                  <h2 className="text-2xl font-bold text-gray-950">Masuk CMS</h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    Gunakan email dan password yang sudah terdaftar.
                  </p>
                </div>

                {state.error ? (
                  <Alert variant="danger" className="mb-5">
                    {state.error}
                  </Alert>
                ) : null}

                <form action={action} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="admin@shibghatallah.sch.id"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Masukkan password"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={pending}>
                    {pending ? 'Memeriksa...' : 'Masuk'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}
