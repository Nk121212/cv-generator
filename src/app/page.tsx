'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button, buttonVariants } from '@/components/ui/button';
import AdsenseBanner from '@/components/shared/AdsenseBanner';
import { 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Star, 
  Rocket, 
  Download,
  Layout,
  MousePointer2
} from 'lucide-react';

const features = [
  {
    title: 'ATS-Friendly',
    description: 'Template kami didesain untuk lolos sistem screening HR modern.',
    icon: ShieldCheck,
  },
  {
    title: 'Real-time Preview',
    description: 'Lihat perubahan CV kamu secara instan saat mengetik.',
    icon: Zap,
  },
  {
    title: 'Premium Templates',
    description: 'Pilihan template modern dan profesional ala startup Silicon Valley.',
    icon: Star,
  },
  {
    title: 'High Quality Export',
    description: 'Download CV dalam format PDF berkualitas tinggi siap print.',
    icon: Download,
  },
];

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-52 bg-white">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-50" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-[120px] opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-6 border border-indigo-100">
              🚀 #1 CV Builder for Gen Z
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
              Buat CV modern dalam <br />
              <span className="text-indigo-600">5 menit</span> dan tingkatkan <br />
              peluang interview.
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
              Platform pembuat CV online paling simpel, cepat, dan profesional. 
              Didesain khusus untuk fresh graduate, freelancer, dan remote worker.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/builder" 
                className={buttonVariants({ size: "lg", className: "h-14 px-8 text-lg bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200" })}
              >
                Buat CV Gratis
              </Link>
              <Link 
                href="/templates" 
                className={buttonVariants({ variant: "outline", size: "lg", className: "h-14 px-8 text-lg border-2" })}
              >
                Lihat Template
              </Link>
            </div>
          </motion.div>

          {/* Floating UI Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-20 relative max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl border border-slate-200 shadow-2xl bg-white overflow-hidden aspect-[16/9] md:aspect-[21/9]">
              <div className="absolute inset-0 bg-slate-50 flex items-center justify-center">
                {/* Mockup content */}
                <div className="w-full h-full grid grid-cols-12 gap-4 p-4 md:p-8">
                  <div className="col-span-4 bg-white rounded-xl shadow-sm border border-slate-100 p-4 space-y-4">
                    <div className="h-4 w-3/4 bg-slate-100 rounded" />
                    <div className="h-4 w-1/2 bg-slate-100 rounded" />
                    <div className="h-20 w-full bg-slate-50 rounded" />
                    <div className="h-4 w-2/3 bg-slate-100 rounded" />
                  </div>
                  <div className="col-span-8 bg-white rounded-xl shadow-lg border border-slate-100 p-6 flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Layout className="text-indigo-600 w-8 h-8" />
                    </div>
                    <div className="h-6 w-1/2 bg-slate-100 rounded" />
                    <div className="h-4 w-3/4 bg-slate-50 rounded" />
                    <div className="h-4 w-1/3 bg-slate-50 rounded" />
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute top-10 right-10 bg-white p-4 rounded-xl shadow-lg border border-slate-100 hidden md:block"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="text-green-600 w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">ATS Score: 98%</span>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
                className="absolute bottom-10 left-10 bg-white p-4 rounded-xl shadow-lg border border-slate-100 hidden md:block"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Download className="text-blue-600 w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">Exported to PDF</span>
                </div>
              </motion.div>
            </div>
            
            {/* Cursor Animation */}
            <motion.div
              animate={{ 
                x: [0, 100, 50, 0],
                y: [0, 50, -20, 0]
              }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute top-1/2 left-1/2 z-20 pointer-events-none"
            >
              <MousePointer2 className="w-8 h-8 text-indigo-600 fill-indigo-600/20" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Strategic Ad Placement 1 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdsenseBanner slotId="homepage-top" format="horizontal" />
      </div>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Kenapa memilih CVForge?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Fitur lengkap untuk membantumu mendapatkan pekerjaan impian lebih cepat.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-xl"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <feature.icon className="text-indigo-600 w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Ad Placement 2 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdsenseBanner slotId="homepage-bottom" format="horizontal" />
      </div>

      {/* CTA Section */}
      <section className="py-24 bg-indigo-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Rocket className="w-16 h-16 text-indigo-200 mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Siap bangun karier impianmu?</h2>
          <p className="text-indigo-100 text-lg mb-10">Mulai buat CV profesionalmu sekarang secara gratis. Tidak perlu kartu kredit.</p>
          <Link 
            href="/builder" 
            className={buttonVariants({ size: "lg", className: "h-16 px-12 text-xl bg-white text-indigo-600 hover:bg-slate-50 shadow-2xl" })}
          >
            Buat CV Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}
