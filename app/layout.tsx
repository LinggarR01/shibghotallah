import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import AppChrome from '@/components/AppChrome';

const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quicksand',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pondokmodernshibghatallah.com'),

  title: {
    default: 'Pondok Modern Shibghatallah',
    template: '%s | Pondok Modern Shibghatallah',
  },

  description:
    'Website resmi Pondok Modern Shibghatallah untuk informasi profil pesantren, program pendidikan, dan pendaftaran santri baru.',

  keywords: [
    'Pondok Modern Shibghatallah',
    'Pondok Pesantren',
    'Pesantren Modern',
    'Pendaftaran Santri Baru',
    'PSB Shibghatallah',
    'Pendidikan Islam',
  ],

  icons: {
    icon: '/logo.webp',
    shortcut: '/logo.webp',
    apple: '/logo.webp',
  },

  openGraph: {
    title: 'Pondok Modern Shibghatallah',
    description:
      'Informasi resmi profil pesantren, program pendidikan, dan pendaftaran santri baru Pondok Modern Shibghatallah.',
    url: 'https://pondokmodernshibghatallah.com',
    siteName: 'Pondok Modern Shibghatallah',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Pondok Modern Shibghatallah',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} antialiased`}>
        <Suspense
          fallback={
            <main className="min-h-screen w-full bg-white" aria-hidden="true" />
          }>
          <AppChrome>{children}</AppChrome>
        </Suspense>
      </body>
    </html>
  );
}
