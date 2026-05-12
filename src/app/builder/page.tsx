'use client';

import CVForm from '@/components/builder/CVForm';
import CVPreview from '@/components/builder/CVPreview';
import { Button, buttonVariants } from '@/components/ui/button';
import { Download, LayoutTemplate, CreditCard } from 'lucide-react';
import Link from 'next/link';
import ExportButton from '@/components/shared/ExportButton';
import { useCVStore } from '@/store/useCVStore';

export default function BuilderPage() {
  const { data } = useCVStore();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Bar for Actions */}
      <div className="bg-white border-b border-slate-200 px-4 h-16 flex items-center justify-between sticky top-16 z-40">
        <div className="flex items-center space-x-4">
          <Link 
            href="/templates" 
            className={buttonVariants({ variant: "ghost", size: "sm", className: "flex items-center" })}
          >
            <LayoutTemplate className="w-4 h-4 mr-2" />
            <span>Ganti Template</span>
          </Link>
          <div className="h-4 w-[1px] bg-slate-200" />
          <span className="text-sm font-medium text-slate-500">
            Editing: <span className="text-slate-900 font-bold">{data.templateId.replace('-', ' ').toUpperCase()}</span>
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <Link 
            href="/pricing" 
            className={buttonVariants({ variant: "outline", size: "sm", className: "hidden md:flex" })}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Upgrade PRO
          </Link>
          <ExportButton />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-128px)]">
        {/* Left Side: Form */}
        <div className="w-full lg:w-1/2 overflow-y-auto p-4 md:p-8 bg-slate-50 border-r border-slate-200">
          <div className="max-w-2xl mx-auto">
            <CVForm />
          </div>
        </div>

        {/* Right Side: Preview */}
        <div className="w-full lg:w-1/2 bg-slate-200 relative">
          <CVPreview />
        </div>
      </div>
    </div>
  );
}
