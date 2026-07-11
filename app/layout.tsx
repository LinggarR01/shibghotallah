import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import AppChrome from '@/components/AppChrome';
import Footer from '@/components/Footer';
import Navbar from '@/components/ui/Navbar';

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
    icon: '/favicon.ico',
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
      <body className="antialiased">
        <Suspense
          fallback={
            <main className="min-h-screen w-full bg-white" aria-hidden="true" />
          }>
          <AppChrome siteHeader={<Navbar />} siteFooter={<Footer />}>
            {children}
          </AppChrome>
        </Suspense>
      </body>
    </html>
  );
}
