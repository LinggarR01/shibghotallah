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
  title: 'Pondok Modern Shibghatallah Al-Islamy',
  description:
    'Website resmi Pondok Modern Shibghatallah Al-Islamy untuk informasi pesantren, kegiatan, dan pendaftaran santri.',
  icons: {
    icon: '/logo.png',
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
