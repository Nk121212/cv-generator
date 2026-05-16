'use client';

import CVForm from '@/components/builder/CVForm';
import CVPreview from '@/components/builder/CVPreview';
import { buttonVariants } from '@/components/ui/button';
import { LayoutTemplate, CreditCard, PenTool, Eye } from 'lucide-react';
import Link from 'next/link';
import ExportButton from '@/components/shared/ExportButton';
import { useCVStore } from '@/store/useCVStore';
import { useState } from 'react';

type MobileTab = 'form' | 'preview';

export default function BuilderPage() {
  const { data } = useCVStore();
  const [mobileTab, setMobileTab] = useState<MobileTab>('form');

  return (
    /*
     * h-[calc(100vh-64px)]: The root Navbar is sticky h-16 (64px).
     * This builder fills the remaining viewport height.
     * Then flex-col distributes: action bar (shrink-0) + tab switcher (shrink-0) + panels (flex-1 min-h-0).
     */
    <div className="flex flex-col overflow-x-hidden bg-slate-50" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Top Action Bar */}
      <div className="bg-white border-b border-slate-200 px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between z-40 shrink-0">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <Link
            href="/templates"
            className={buttonVariants({
              variant: 'ghost',
              size: 'sm',
              className: 'flex items-center gap-1.5 px-2 sm:px-3',
            })}
          >
            <LayoutTemplate className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Ganti Template</span>
          </Link>
          <div className="h-4 w-px bg-slate-200 shrink-0" />
          <span className="text-xs sm:text-sm font-medium text-slate-500 truncate">
            <span className="hidden sm:inline">Editing: </span>
            <span className="text-slate-900 font-bold">
              {data.templateId.replace(/-/g, ' ').toUpperCase()}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/pricing"
            className={buttonVariants({
              variant: 'outline',
              size: 'sm',
              className: 'hidden md:flex',
            })}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Upgrade PRO
          </Link>
          <ExportButton />
        </div>
      </div>

      {/* Mobile Tab Switcher — only visible on small screens */}
      <div className="lg:hidden flex border-b border-slate-200 bg-white shrink-0">
        <button
          onClick={() => setMobileTab('form')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
            mobileTab === 'form'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <PenTool className="w-4 h-4" />
          Edit Form
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
            mobileTab === 'preview'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Eye className="w-4 h-4" />
          Preview CV
        </button>
      </div>

      {/* Split Layout — fills remaining height via flex-1 min-h-0 */}
      <div className="flex flex-col lg:flex-row flex-1 min-h-0">
        {/* Left Panel: Form */}
        <div
          className={`
            w-full lg:w-1/2 overflow-y-auto bg-slate-50
            lg:border-r lg:border-slate-200
            lg:block
            ${mobileTab === 'form' ? 'flex-1 min-h-0 block' : 'hidden'}
          `}
        >
          <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <CVForm />
          </div>
        </div>

        {/* Right Panel: Preview */}
        <div
          className={`
            w-full lg:w-1/2 bg-slate-200 overflow-hidden
            lg:block
            ${mobileTab === 'preview' ? 'flex-1 min-h-0 block' : 'hidden'}
          `}
        >
          <CVPreview />
        </div>
      </div>
    </div>
  );
}
