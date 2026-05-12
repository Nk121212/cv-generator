'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCVStore } from '@/store/useCVStore';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import AdsenseBanner from '@/components/shared/AdsenseBanner';

const templates = [
  {
    id: 'neo-minimal',
    name: 'Neo Minimal',
    price: 'FREE',
    premium: false,
    badge: 'FREE',
    description: 'ATS-friendly, clean, black & white.',
    previewColor: 'bg-white',
  },
  {
    id: 'cyber-blue',
    name: 'Cyber Blue',
    price: 'FREE',
    premium: false,
    badge: 'FREE',
    description: 'Modern corporate, sidebar, blue accents.',
    previewColor: 'bg-blue-50',
  },
  {
    id: 'tokyo-minimal',
    name: 'Tokyo Minimal',
    price: 'FREE',
    premium: false,
    badge: 'FREE',
    description: 'Japanese minimalism, clean typography.',
    previewColor: 'bg-slate-50',
  },
  {
    id: 'creative-gradient',
    name: 'Creative Gradient',
    price: 'FREE',
    premium: false,
    badge: 'FREE',
    description: 'Colorful gradients, bold design.',
    previewColor: 'bg-purple-50',
  },
  {
    id: 'executive-dark',
    name: 'Executive Dark',
    price: 'FREE',
    premium: false,
    badge: 'FREE',
    description: 'Elegant dark mode luxury layout.',
    previewColor: 'bg-slate-900',
  },
  {
    id: 'modern-avatar',
    name: 'Modern Avatar',
    price: 'FREE',
    premium: false,
    badge: 'FREE',
    description: 'Premium layout dengan foto profil, unik untuk HRD.',
    previewColor: 'bg-teal-50',
  },
];

export default function TemplatesPage() {
  const { setTemplate } = useCVStore();
  const router = useRouter();

  const handleSelectTemplate = (id: string) => {
    setTemplate(id);
    router.push('/builder');
  };

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Pilih Template CV Kamu</h1>
        <p className="text-slate-600">Didesain secara profesional untuk membantumu lolos screening HR.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all"
          >
            {/* Preview Card */}
            <div className={`aspect-[3/4] ${template.previewColor} relative flex flex-col p-6`}>
              <div className="flex justify-between items-start">
                <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
                  {template.badge}
                </Badge>
              </div>

              {/* Dummy Content for Preview */}
              <div className="mt-8 space-y-4 opacity-40">
                <div className={`h-8 w-3/4 rounded ${template.id === 'executive-dark' ? 'bg-white/20' : 'bg-slate-200'}`} />
                <div className={`h-4 w-1/2 rounded ${template.id === 'executive-dark' ? 'bg-white/10' : 'bg-slate-100'}`} />
                <div className="grid grid-cols-3 gap-2">
                  <div className={`h-20 rounded ${template.id === 'executive-dark' ? 'bg-white/5' : 'bg-slate-50'}`} />
                  <div className={`h-20 rounded col-span-2 ${template.id === 'executive-dark' ? 'bg-white/5' : 'bg-slate-50'}`} />
                </div>
              </div>
              
              {/* Select Button on Hover */}
              <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button onClick={() => handleSelectTemplate(template.id)} className="bg-white text-indigo-600 hover:bg-slate-50 shadow-lg">
                  Gunakan Template
                </Button>
              </div>
            </div>

            {/* Info Area */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-slate-900">{template.name}</h3>
                <span className="text-sm font-semibold text-indigo-600">{template.price}</span>
              </div>
              <p className="text-slate-600 text-sm mb-6">{template.description}</p>
              
              <Button onClick={() => handleSelectTemplate(template.id)} variant="outline" className="w-full">
                Pilih Template
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Embedded AdSense Placement below templates grid */}
      <div className="mt-12 border-t border-slate-100 pt-8">
        <AdsenseBanner slotId="templates-bottom" format="horizontal" />
      </div>
    </div>
  );
}
