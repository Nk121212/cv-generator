import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { TooltipProvider } from "@/components/ui/tooltip"
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="google-adsense-account" content="ca-pub-2579251919353845"></meta>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2579251919353845"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>

        <TooltipProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </TooltipProvider>
      </body>
    </html>
  );
}
