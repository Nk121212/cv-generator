import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { TooltipProvider } from "@/components/ui/tooltip";
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'CVForge | Create Modern ATS-Friendly CVs in Minutes',
  description: 'The ultimate CV builder for Gen Z job seekers. Modern templates, real-time preview, and premium designs.',
  keywords: ['CV Generator', 'Resume Builder', 'ATS CV', 'CV Online', 'Resume Modern'],
  // Adsense account verification via metadata API (Next.js-native, no manual <head>)
  other: {
    'google-adsense-account': 'ca-pub-2579251919353845',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        <TooltipProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </TooltipProvider>

        {/*
          next/script dengan strategy="afterInteractive":
          - Dijalankan setelah halaman interactive (client-side)
          - HARUS berada di dalam <body>, bukan <head>
          - Next.js App Router secara otomatis mengelola injeksinya
          - crossOrigin="anonymous" diperlukan oleh Google AdSense
        */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2579251919353845"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
