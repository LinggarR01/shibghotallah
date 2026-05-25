import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter, Quicksand } from 'next/font/google';
import './globals.css';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/Footer';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },

  openGraph: {
    title: 'Pondok Modern Shibghatallah',
    description:
      'Informasi resmi profil pesantren, program pendidikan, dan pendaftaran santri baru Pondok Modern Shibghatallah.',
    url: 'https://pondokmodernshibghatallah.com',
    siteName: 'Pondok Modern Shibghatallah',
    images: [
      {
        url: '/og-image.png',
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
        <Navbar />
        <main className="flex w-full flex-col items-center justify-between bg-dark sm:items-start">
          {children}
        </main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
